import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/data/editorial.ts", import.meta.url), "utf8");
const urls = [...new Set([...source.matchAll(/imageUrl:\s*\n?\s*"(https:\/\/[^"\n]+)"/g)].map(([, url]) => url))];

async function checkImage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "WatchBrief-Image-Check/0.5" },
    });
    const type = response.headers.get("content-type") ?? "";
    const state = !response.ok
      ? response.status === 404 || response.status === 410 ? "broken" : "inconclusive"
      : type.startsWith("image/") ? "ok" : "broken";
    return { url, status: response.status, type: type || "-", state };
  } catch (error) {
    return { url, status: null, type: "-", state: "inconclusive", detail: String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(urls.map(checkImage));
for (const result of results) {
  console.log(`${result.state.padEnd(12)} ${String(result.status ?? "-").padEnd(4)} ${result.type.padEnd(22)} ${result.url}`);
}

const broken = results.filter((result) => result.state === "broken");
const inconclusive = results.filter((result) => result.state === "inconclusive");
console.log(`\n${results.length} images contrôlées · ${broken.length} cassées · ${inconclusive.length} non concluantes`);
if (broken.length) process.exitCode = 1;
