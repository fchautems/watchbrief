import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/data/editorial.ts", import.meta.url), "utf8");
const candidates = JSON.parse(await readFile(new URL("../src/data/review-candidates.json", import.meta.url), "utf8"));
const candidateUrls = candidates.flatMap(({ watch }) => [
  watch.productUrl,
  watch.priceSourceUrl,
  watch.imageSourceUrl,
  ...(watch.sources ?? []),
]).filter(Boolean);
const urls = [...new Set([
  ...[...source.matchAll(/https:\/\/[^"'\s]+/g)].map(([url]) => url),
  ...candidateUrls,
])];
async function request(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "WatchBrief-Link-Check/0.4" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(urls.map(async (url) => {
  try {
    let response = await request(url, "HEAD");
    if (response.status === 405 || response.status === 501) response = await request(url, "GET");
    const state = response.status === 404 || response.status === 410
      ? "broken"
      : response.ok
        ? "ok"
        : "inconclusive";
    return { url, status: response.status, state };
  } catch (error) {
    return {
      url,
      status: null,
      state: "inconclusive",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}));

for (const result of results) {
  console.log(`${result.state.padEnd(12)} ${String(result.status ?? "-").padEnd(4)} ${result.url}`);
}

const broken = results.filter((result) => result.state === "broken");
const inconclusive = results.filter((result) => result.state === "inconclusive");
console.log(`\n${results.length} liens contrôlés · ${broken.length} cassés · ${inconclusive.length} non concluants`);
if (broken.length) process.exitCode = 1;
