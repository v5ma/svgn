#!/usr/bin/env node
// Preserve the public SVGN archive in Git-friendly source forms.
//
// Exact HTML is copied byte-for-byte. Markdown remains a searchable projection.
// Fable's designed card decks are copied as the 2D/3D presentation projection.
// A SHA-256 manifest binds all three forms to one stable SVGN article id.
//
// Usage:
//   node scripts/sync-from-site.mjs
//   node scripts/sync-from-site.mjs --site-root "D:/path/to/wiki/svgn"
//
// This command only writes inside this repository. It does not deploy or push.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : "";
};

const defaultSiteRoot = path.resolve(repo, "../v5ma.github.io/wiki/svgn");
const siteRoot = path.resolve(arg("--site-root") || defaultSiteRoot);
const hostedPath = path.join(siteRoot, "articles/hosted-articles.json");
const markdownDir = path.join(repo, "content/stories");
const articleDir = path.join(repo, "content/articles");
const cardDir = path.join(repo, "content/cards");
const manifestPath = path.join(repo, "content/manifest.json");

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const slash = (value) => value.split(path.sep).join("/");
const rel = (value) => slash(path.relative(repo, value));
const atomicWrite = (target, data) => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temp = target + ".new";
  fs.writeFileSync(temp, data);
  fs.renameSync(temp, target);
};

if (!fs.existsSync(hostedPath)) {
  throw new Error(`SVGN hosted manifest not found: ${hostedPath}`);
}

fs.mkdirSync(articleDir, { recursive: true });
fs.mkdirSync(cardDir, { recursive: true });

// Index existing Markdown projections by stable id. No Markdown conversion is
// required for publication; these files remain useful for wiki search/linking.
const markdownById = new Map();
for (const name of fs.readdirSync(markdownDir).filter((n) => n.endsWith(".md"))) {
  const full = path.join(markdownDir, name);
  const head = fs.readFileSync(full, "utf8").slice(0, 1000);
  const id = (head.match(/^id:\s*([^\r\n]+)$/m) || [])[1]?.trim();
  if (id) markdownById.set(id, full);
}

const hosted = JSON.parse(fs.readFileSync(hostedPath, "utf8"));
const records = [];

for (const [id, item] of Object.entries(hosted)) {
  if (!id.startsWith("svgn-") || !item.path) continue;

  const sourceArticle = path.join(siteRoot, item.path);
  const sourceCard = path.join(siteRoot, "cards/designed", `${id}.json`);
  if (!fs.existsSync(sourceArticle)) throw new Error(`missing article for ${id}: ${sourceArticle}`);
  if (!fs.existsSync(sourceCard)) throw new Error(`missing designed card deck for ${id}: ${sourceCard}`);

  const articleBytes = fs.readFileSync(sourceArticle);
  const cardBytes = fs.readFileSync(sourceCard);
  const card = JSON.parse(cardBytes.toString("utf8").replace(/^\uFEFF/, ""));
  if (card.id !== id || card.schema !== "svgn.designed_deck.v1") {
    throw new Error(`card contract mismatch for ${id}`);
  }

  const articleOut = path.join(articleDir, path.basename(item.path));
  const cardOut = path.join(cardDir, `${id}.json`);
  atomicWrite(articleOut, articleBytes);
  atomicWrite(cardOut, cardBytes);

  const markdown = markdownById.get(id) || null;
  const markdownBytes = markdown ? fs.readFileSync(markdown) : null;
  records.push({
    id,
    slug: item.slug,
    date: item.date || "",
    canonical: `https://svgn.io/p/${item.slug}`,
    historicalAudience: item.audience || "unspecified",
    article: rel(articleOut),
    articleSha256: sha256(articleBytes),
    markdown: markdown ? rel(markdown) : null,
    markdownSha256: markdownBytes ? sha256(markdownBytes) : null,
    cards: rel(cardOut),
    cardsSha256: sha256(cardBytes),
    cardCount: Array.isArray(card.slides) ? card.slides.length : 0
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
atomicWrite(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(JSON.stringify({
  ok: true,
  articles: records.length,
  markdown: records.filter((r) => r.markdown).length,
  cardDecks: records.filter((r) => r.cards).length,
  manifest: rel(manifestPath)
}, null, 2));
