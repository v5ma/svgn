#!/usr/bin/env node
// Fail-closed validation for the public SVGN GitHub corpus.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const manifestPath = path.join(repo, "content/manifest.json");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const fail = (message) => { throw new Error(message); };

if (!fs.existsSync(manifestPath)) fail(`missing manifest: ${manifestPath}`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (manifest.schema !== "svgn.public_corpus.v2") fail(`unexpected schema: ${manifest.schema}`);
if (!Array.isArray(manifest.records)) fail("manifest records must be an array");
if (manifest.articleCount !== manifest.records.length) fail("articleCount does not match records.length");

const ids = new Set();
const paths = new Set();
let htmlBytes = 0;
let markdownBytes = 0;
let cardBytes = 0;
let cards = 0;

for (const record of manifest.records) {
  if (!/^svgn-\d+$/.test(record.id)) fail(`invalid id: ${record.id}`);
  if (ids.has(record.id)) fail(`duplicate id: ${record.id}`);
  ids.add(record.id);

  for (const field of ["article", "cards", ...(record.markdown ? ["markdown"] : [])]) {
    const value = record[field];
    if (!value || path.isAbsolute(value) || value.includes("..")) fail(`unsafe ${field} path for ${record.id}`);
    if (paths.has(value)) fail(`duplicate corpus path: ${value}`);
    paths.add(value);
  }

  const articlePath = path.join(repo, record.article);
  const article = fs.readFileSync(articlePath);
  if (sha256(article) !== record.articleSha256) fail(`article hash mismatch: ${record.id}`);
  const html = article.toString("utf8");
  if (!html.includes(`data-svgn-article-id="${record.id}"`)) fail(`article id mismatch: ${record.id}`);
  if (!/<article[\s>]/i.test(html) || !/<h1[\s>]/i.test(html)) fail(`article structure missing: ${record.id}`);
  htmlBytes += article.length;

  const cardPath = path.join(repo, record.cards);
  const cardBuffer = fs.readFileSync(cardPath);
  if (sha256(cardBuffer) !== record.cardsSha256) fail(`card hash mismatch: ${record.id}`);
  const card = JSON.parse(cardBuffer.toString("utf8").replace(/^\uFEFF/, ""));
  if (card.id !== record.id || card.schema !== "svgn.designed_deck.v1") fail(`card identity mismatch: ${record.id}`);
  if (!Array.isArray(card.slides) || !card.slides.length) fail(`empty card deck: ${record.id}`);
  if (card.slides.length !== record.cardCount) fail(`cardCount mismatch: ${record.id}`);
  cards += card.slides.length;
  cardBytes += cardBuffer.length;

  if (record.markdown) {
    const markdownPath = path.join(repo, record.markdown);
    const markdown = fs.readFileSync(markdownPath);
    if (sha256(markdown) !== record.markdownSha256) fail(`Markdown hash mismatch: ${record.id}`);
    if (!markdown.toString("utf8").slice(0, 1000).match(new RegExp(`^id:\\s*${record.id}$`, "m"))) {
      fail(`Markdown id mismatch: ${record.id}`);
    }
    markdownBytes += markdown.length;
  }
}

console.log(JSON.stringify({
  ok: true,
  schema: manifest.schema,
  articles: manifest.records.length,
  cards,
  bytes: { html: htmlBytes, markdown: markdownBytes, cards: cardBytes }
}, null, 2));
