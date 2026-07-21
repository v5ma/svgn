#!/usr/bin/env node
// Install this validated GitHub corpus into an SVGN.io source checkout.
// Intended for a controlled Cloudflare/build step after content review.
// It never contacts GitHub, deploys, or changes routes on its own.
//
// Usage:
//   node scripts/install-to-site.mjs --site-root "D:/path/to/wiki/svgn"
//   node scripts/install-to-site.mjs --site-root "D:/path/to/wiki/svgn" --dry-run

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const corpus = path.resolve(here, "..");
const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : "";
};
const dryRun = args.includes("--dry-run");
const defaultSiteRoot = path.resolve(corpus, "../v5ma.github.io/wiki/svgn");
const siteRoot = path.resolve(getArg("--site-root") || defaultSiteRoot);
const manifestPath = path.join(corpus, "content/manifest.json");
const hostedPath = path.join(siteRoot, "articles/hosted-articles.json");
const importReportPath = path.join(siteRoot, "data/public-corpus-import.json");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const atomicWrite = (target, data) => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temp = target + ".new";
  fs.writeFileSync(temp, data);
  fs.renameSync(temp, target);
};

if (!fs.existsSync(manifestPath)) throw new Error(`missing corpus manifest: ${manifestPath}`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (manifest.schema !== "svgn.public_corpus.v2" || !Array.isArray(manifest.records)) {
  throw new Error("unsupported SVGN corpus manifest");
}

let hosted = {};
try { hosted = JSON.parse(fs.readFileSync(hostedPath, "utf8")); } catch {}
const imported = [];

for (const record of manifest.records) {
  const articleSource = path.join(corpus, record.article);
  const cardSource = path.join(corpus, record.cards);
  const article = fs.readFileSync(articleSource);
  const cards = fs.readFileSync(cardSource);
  if (sha256(article) !== record.articleSha256) throw new Error(`article hash mismatch: ${record.id}`);
  if (sha256(cards) !== record.cardsSha256) throw new Error(`card hash mismatch: ${record.id}`);

  const articleName = path.basename(record.article);
  const articleTarget = path.join(siteRoot, "articles", articleName);
  const cardTarget = path.join(siteRoot, "cards/designed", `${record.id}.json`);
  if (!dryRun) {
    atomicWrite(articleTarget, article);
    atomicWrite(cardTarget, cards);
  }
  hosted[record.id] = {
    ...(hosted[record.id] || {}),
    slug: record.slug,
    path: `articles/${articleName}`,
    date: record.date,
    hostedAt: record.date,
    audience: "everyone"
  };
  imported.push({ id: record.id, article: `articles/${articleName}`, cards: `cards/designed/${record.id}.json` });
}

if (!dryRun) {
  atomicWrite(hostedPath, JSON.stringify(hosted, null, 2) + "\n");
  atomicWrite(importReportPath, JSON.stringify({
    schema: "svgn.public_corpus_import.v1",
    importedAt: new Date().toISOString(),
    corpusSchema: manifest.schema,
    corpusGeneratedAt: manifest.generatedAt,
    count: imported.length,
    imported
  }, null, 2) + "\n");
}

console.log(JSON.stringify({
  ok: true,
  dryRun,
  installed: imported.length,
  siteRoot,
  report: dryRun ? null : path.relative(siteRoot, importReportPath).replace(/\\/g, "/")
}, null, 2));
