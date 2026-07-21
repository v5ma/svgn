#!/usr/bin/env node
// Rebuild content/manifest.json from the files in this GitHub corpus.
// This is the source-first path for future ChatGPT-authored HTML articles.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const articleDir = path.join(repo, "content/articles");
const markdownDir = path.join(repo, "content/stories");
const cardDir = path.join(repo, "content/cards");
const manifestPath = path.join(repo, "content/manifest.json");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const slash = (value) => value.split(path.sep).join("/");
const relative = (value) => slash(path.relative(repo, value));
const textValue = (html, regex) => (html.match(regex) || [])[1] || "";
const decode = (value) => String(value).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

let previous = { records: [] };
try { previous = JSON.parse(fs.readFileSync(manifestPath, "utf8")); } catch {}
const previousById = new Map((previous.records || []).map((record) => [record.id, record]));

const markdownById = new Map();
for (const name of fs.readdirSync(markdownDir).filter((n) => n.endsWith(".md"))) {
  const full = path.join(markdownDir, name);
  const head = fs.readFileSync(full, "utf8").slice(0, 1000);
  const id = (head.match(/^id:\s*([^\r\n]+)$/m) || [])[1]?.trim();
  if (id) markdownById.set(id, full);
}

const records = [];
for (const name of fs.readdirSync(articleDir).filter((n) => n.endsWith(".html")).sort()) {
  const articlePath = path.join(articleDir, name);
  const article = fs.readFileSync(articlePath);
  const html = article.toString("utf8");
  const id = textValue(html, /data-svgn-article-id="([^"]+)"/i);
  if (!/^svgn-\d+$/.test(id)) throw new Error(`missing or invalid data-svgn-article-id in ${name}`);
  const old = previousById.get(id) || {};
  const declaredSlug = textValue(html, /<meta\s+name="svgn:slug"\s+content="([^"]+)"/i);
  const slug = declaredSlug || old.slug;
  if (!slug) throw new Error(`new article ${id} must declare <meta name="svgn:slug" content="...">`);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(old.date || "")
    ? old.date
    : textValue(name, /^(\d{4}-\d{2}-\d{2})-/);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`missing YYYY-MM-DD date for ${id}`);

  const cardPath = path.join(cardDir, `${id}.json`);
  if (!fs.existsSync(cardPath)) throw new Error(`missing card deck for ${id}`);
  const cardBuffer = fs.readFileSync(cardPath);
  const card = JSON.parse(cardBuffer.toString("utf8").replace(/^\uFEFF/, ""));
  if (card.id !== id || card.schema !== "svgn.designed_deck.v1") throw new Error(`card contract mismatch for ${id}`);

  const markdownPath = markdownById.get(id) || null;
  const markdownBuffer = markdownPath ? fs.readFileSync(markdownPath) : null;
  records.push({
    id,
    title: decode(textValue(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    slug,
    date,
    canonical: `https://svgn.io/p/${slug}`,
    historicalAudience: old.historicalAudience || "everyone",
    article: relative(articlePath),
    articleSha256: sha256(article),
    markdown: markdownPath ? relative(markdownPath) : null,
    markdownSha256: markdownBuffer ? sha256(markdownBuffer) : null,
    cards: relative(cardPath),
    cardsSha256: sha256(cardBuffer),
    cardCount: card.slides.length
  });
}

records.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
const manifest = {
  schema: "svgn.public_corpus.v2",
  generatedAt: new Date().toISOString(),
  policy: {
    exactArticle: "HTML",
    searchableProjection: "Markdown",
    spatialProjection: "svgn.designed_deck.v1 JSON",
    runtime: "Synchronize at build/deploy time; do not fetch GitHub from every visitor browser."
  },
  articleCount: records.length,
  records
};
const temp = manifestPath + ".new";
fs.writeFileSync(temp, JSON.stringify(manifest, null, 2) + "\n");
fs.renameSync(temp, manifestPath);
console.log(JSON.stringify({ ok: true, articles: records.length, manifest: relative(manifestPath) }, null, 2));
