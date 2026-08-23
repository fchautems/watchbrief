const githubApi = "https://api.github.com";

function cors(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "PATCH, OPTIONS",
    Vary: "Origin",
  };
}

function json(body, status, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors(env) },
  });
}

function decodeBase64(value) {
  const binary = atob(value.replace(/\n/g, ""));
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64Url(value) {
  return encodeBase64(value).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pemToArrayBuffer(pem) {
  const content = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const binary = atob(content);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0)).buffer;
}

async function appJwt(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: env.GITHUB_APP_ID }));
  const input = `${header}.${payload}`;
  const privateKey = env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n");
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(input));
  let binary = "";
  for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte);
  return `${input}.${btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")}`;
}

async function installationToken(env) {
  const jwt = await appJwt(env);
  const installationsResponse = await fetch(`${githubApi}/app/installations`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const installations = await installationsResponse.json();
  if (!installationsResponse.ok || !Array.isArray(installations)) throw new Error("Installations GitHub App introuvables");
  const owner = env.REPOSITORY.split("/")[0];
  const installation = installations.find((item) => item.account?.login === owner);
  if (!installation) throw new Error("Installation GitHub App du dépôt introuvable");
  const response = await fetch(`${githubApi}/app/installations/${installation.id}/access_tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? "Jeton GitHub App impossible à obtenir");
  return result.token;
}

async function githubJson(url, token, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? "GitHub a refusé la mise à jour");
  return result;
}

async function updateCandidate(request, env, candidateId, ctx) {
  if (!ctx.access) throw new Error("Accès Cloudflare requis");
  const { status } = await request.json();
  if (!["published", "rejected"].includes(status)) throw new Error("Décision invalide");
  const token = await installationToken(env);
  const path = "src/data/review-candidates.json";
  const endpoint = `${githubApi}/repos/${env.REPOSITORY}/contents/${path}?ref=${env.BRANCH}`;
  const file = await githubJson(endpoint, token);
  const candidates = JSON.parse(decodeBase64(file.content));
  const candidate = candidates.find((item) => item.id === candidateId);
  if (!candidate) throw new Error("Candidate introuvable");
  if (candidate.status === "needs-review" && status === "published") throw new Error("Cette candidate doit d’abord être complétée");
  candidate.status = status;
  candidate.reviewedAt = new Date().toISOString().slice(0, 10);
  const action = status === "published" ? "Publier" : "Refuser";
  await githubJson(`${githubApi}/repos/${env.REPOSITORY}/contents/${path}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `${action} candidate WatchBrief : ${candidate.watch.brand} ${candidate.watch.model}`,
      content: encodeBase64(`${JSON.stringify(candidates, null, 2)}\n`),
      sha: file.sha,
      branch: env.BRANCH,
    }),
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(env) });
    const url = new URL(request.url);
    try {
      if (url.pathname === "/" && request.method === "GET") {
        if (!ctx.access) return json({ error: "Accès Cloudflare requis" }, 401, env);
        return json({ message: "Accès validation WatchBrief autorisé" }, 200, env);
      }
      const match = url.pathname.match(/^\/candidates\/([a-z0-9-]+)$/);
      if (match && request.method === "PATCH") {
        await updateCandidate(request, env, match[1], ctx);
        return json({ message: "Candidate mise à jour" }, 200, env);
      }
      return json({ error: "Route introuvable" }, 404, env);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Erreur interne" }, 400, env);
    }
  },
};
