const githubApi = "https://api.github.com";
const buildVersion = "2026-08-25-concurrency-v5";
const githubUserAgent = "WatchBrief-Review-Worker";

class GitHubResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "GitHubResponseError";
    this.status = status;
  }
}

function cors(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, X-Review-Password",
    "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
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

function derLength(length) {
  if (length < 128) return Uint8Array.of(length);
  const bytes = [];
  for (let remaining = length; remaining > 0; remaining >>= 8) bytes.unshift(remaining & 0xff);
  return Uint8Array.of(0x80 | bytes.length, ...bytes);
}

function joinBytes(...chunks) {
  const result = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

function pkcs1ToPkcs8(pkcs1) {
  const version = Uint8Array.of(0x02, 0x01, 0x00);
  const rsaAlgorithm = Uint8Array.of(0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00);
  const privateKey = joinBytes(Uint8Array.of(0x04), derLength(pkcs1.length), pkcs1);
  const body = joinBytes(version, rsaAlgorithm, privateKey);
  return joinBytes(Uint8Array.of(0x30), derLength(body.length), body).buffer;
}

function normalizePrivateKey(value) {
  let normalized = value.trim();
  if (normalized.startsWith('"') && normalized.endsWith('"')) {
    try {
      normalized = JSON.parse(normalized);
    } catch {
      normalized = normalized.slice(1, -1);
    }
  } else if (normalized.startsWith("'") && normalized.endsWith("'")) {
    normalized = normalized.slice(1, -1);
  }
  return normalized.replace(/\\r\\n|\\n|\\r/g, "\n").replace(/\r\n?/g, "\n").trim();
}

function readDerLength(bytes, offset) {
  const first = bytes[offset];
  if (first < 0x80) return { length: first, next: offset + 1 };
  const count = first & 0x7f;
  if (count === 0 || count > 4 || offset + count >= bytes.length) throw new Error("Longueur DER invalide");
  let length = 0;
  for (let index = 0; index < count; index += 1) length = (length << 8) | bytes[offset + 1 + index];
  return { length, next: offset + 1 + count };
}

function nextDerValue(bytes, offset, expectedTag) {
  if (bytes[offset] !== expectedTag) throw new Error("Structure DER invalide");
  const { length, next } = readDerLength(bytes, offset + 1);
  if (next + length > bytes.length) throw new Error("Structure DER tronquée");
  return { start: next, end: next + length };
}

function privateKeyFormat(bytes) {
  try {
    const sequence = nextDerValue(bytes, 0, 0x30);
    const version = nextDerValue(bytes, sequence.start, 0x02);
    return bytes[version.end] === 0x02 ? "pkcs1" : bytes[version.end] === 0x30 ? "pkcs8" : "unknown";
  } catch {
    return "unknown";
  }
}

function pemToArrayBuffer(pem) {
  const normalized = normalizePrivateKey(pem);
  const content = normalized.replace(/-----BEGIN [^-]+-----|-----END [^-]+-----|\s/g, "");
  const binary = atob(content);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const format = normalized.includes("BEGIN RSA PRIVATE KEY") ? "pkcs1" : privateKeyFormat(bytes);
  if (format === "unknown") throw new Error(`Clé GitHub illisible (${buildVersion})`);
  return { buffer: format === "pkcs1" ? pkcs1ToPkcs8(bytes) : bytes.buffer, format };
}

async function appJwt(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: env.GITHUB_APP_ID }));
  const input = `${header}.${payload}`;
  const privateKey = pemToArrayBuffer(env.GITHUB_APP_PRIVATE_KEY);
  let key;
  try {
    key = await crypto.subtle.importKey(
      "pkcs8",
      privateKey.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
  } catch {
    throw new Error(`Clé GitHub invalide (format ${privateKey.format}, ${buildVersion})`);
  }
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(input));
  let binary = "";
  for (const byte of new Uint8Array(signature)) binary += String.fromCharCode(byte);
  return `${input}.${btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")}`;
}

async function readGithubResponse(response, stage) {
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    const detail = text.trim().replace(/\s+/g, " ").slice(0, 160) || "réponse vide";
    throw new GitHubResponseError(`${stage} : GitHub HTTP ${response.status} — ${detail}`, response.status);
  }
  if (!response.ok) {
    throw new GitHubResponseError(
      `${stage} : GitHub HTTP ${response.status} — ${result.message ?? "requête refusée"}`,
      response.status,
    );
  }
  return result;
}

async function installationToken(env) {
  const jwt = await appJwt(env);
  const installationResponse = await fetch(`${githubApi}/repos/${env.REPOSITORY}/installation`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "User-Agent": githubUserAgent,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const installation = await readGithubResponse(installationResponse, "Installation GitHub App");
  const response = await fetch(`${githubApi}/app/installations/${installation.id}/access_tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "User-Agent": githubUserAgent,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const result = await readGithubResponse(response, "Création du jeton GitHub App");
  return result.token;
}

async function githubJson(url, token, init = {}, stage = "Requête GitHub") {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": githubUserAgent,
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  return readGithubResponse(response, stage);
}

function passwordsMatch(received, expected) {
  if (received.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < received.length; index += 1) difference |= received.charCodeAt(index) ^ expected.charCodeAt(index);
  return difference === 0;
}

function assertReviewer(request, env) {
  const password = request.headers.get("X-Review-Password");
  if (!env.REVIEW_PASSWORD || !password || !passwordsMatch(password, env.REVIEW_PASSWORD)) {
    throw new Error("Mot de passe de validation invalide");
  }
}

async function updateCandidate(request, env, candidateId) {
  assertReviewer(request, env);
  const { status } = await request.json();
  if (!["published", "rejected"].includes(status)) throw new Error("Décision invalide");
  const token = await installationToken(env);
  const path = "src/data/review-candidates.json";
  const endpoint = `${githubApi}/repos/${env.REPOSITORY}/contents/${path}?ref=${env.BRANCH}`;
  const action = status === "published" ? "Publier" : "Refuser";

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const file = await githubJson(
      endpoint,
      token,
      { headers: { "Cache-Control": "no-cache" } },
      "Lecture des candidates",
    );
    const candidates = JSON.parse(decodeBase64(file.content));
    const candidate = candidates.find((item) => item.id === candidateId);
    if (!candidate) throw new Error("Candidate introuvable");
    if (candidate.status === status) return;
    if (["published", "rejected"].includes(candidate.status)) {
      throw new Error(`Cette candidate est déjà ${candidate.status === "published" ? "publiée" : "refusée"}`);
    }
    if (candidate.status === "needs-review" && status === "published") {
      throw new Error("Cette candidate doit d’abord être complétée");
    }
    candidate.status = status;
    candidate.reviewedAt = new Date().toISOString().slice(0, 10);

    try {
      await githubJson(`${githubApi}/repos/${env.REPOSITORY}/contents/${path}`, token, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${action} candidate WatchBrief : ${candidate.watch.brand} ${candidate.watch.model}`,
          content: encodeBase64(`${JSON.stringify(candidates, null, 2)}\n`),
          sha: file.sha,
          branch: env.BRANCH,
        }),
      }, "Enregistrement de la décision");
      return;
    } catch (error) {
      const concurrentUpdate = error instanceof GitHubResponseError
        && [409, 422].includes(error.status)
        && /expected|sha|conflict/i.test(error.message);
      if (!concurrentUpdate || attempt === 5) throw error;
    }
  }
}

export { normalizePrivateKey, pemToArrayBuffer };

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(env) });
    const url = new URL(request.url);
    try {
      if (url.pathname === "/" && request.method === "GET") {
        return json({ message: "Service de validation WatchBrief actif", version: buildVersion }, 200, env);
      }
      if (url.pathname === "/auth/check" && request.method === "GET") {
        assertReviewer(request, env);
        return json({ message: "Mot de passe valide" }, 200, env);
      }
      const match = url.pathname.match(/^\/candidates\/([a-z0-9-]+)$/);
      if (match && request.method === "PATCH") {
        await updateCandidate(request, env, match[1]);
        return json({ message: "Candidate mise à jour" }, 200, env);
      }
      return json({ error: "Route introuvable" }, 404, env);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Erreur interne" }, 400, env);
    }
  },
};
