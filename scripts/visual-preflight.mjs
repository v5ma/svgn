// Structural release guard. Recorded review is evidence, not automated artistic approval.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export const digest = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const requiredText = (v) => typeof v === 'string' && v.trim().length > 0;
const fail = (id, text) => { throw new Error(`visual preflight ${id}: ${text}`); };
const read = (repo, value, id) => {
  if (!requiredText(value) || path.isAbsolute(value) || value.includes('..') || value.includes('\\')) fail(id, 'unsafe path');
  const full = path.join(repo, value);
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) fail(id, `missing file ${value}`);
  if (fs.realpathSync(full) !== path.resolve(full)) fail(id, `symlink not allowed: ${value}`);
  return fs.readFileSync(full);
};
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]));
const resolveImage = (article, src) => {
  if (src?.startsWith('/wiki/svgn/articles/')) return `content/articles/${src.slice('/wiki/svgn/articles/'.length)}`;
  if (!src || /^(?:[a-z]+:|\/)/i.test(src)) return null;
  return path.posix.normalize(path.posix.join(path.posix.dirname(article), src));
};
export function validateNewStoryVisuals(repo, record, legacyIds) {
  const id = record.id;
  if (legacyIds.has(id)) return { checked: false, legacyUnreviewed: true };
  const prefix = `content/articles/media/${id}/`;
  const media = new Map((record.media || []).map(v => [v.path, v.sha256]));
  if (!media.size) fail(id, 'new story has no committed media');
  for (const [p, sha] of media) if (!p.startsWith(prefix) || digest(read(repo, p, id)) !== sha) fail(id, `media hash/path mismatch: ${p}`);
  const creditsPath = prefix + 'credits.json';
  if (!media.has(creditsPath)) fail(id, 'credits.json not tracked in manifest media');
  const credits = JSON.parse(read(repo, creditsPath, id));
  if (credits.article_id !== id || !Array.isArray(credits.assets)) fail(id, 'invalid credits identity/assets');
  const assets = credits.assets;
  if (new Set(assets.map(v => v.path)).size !== assets.length) fail(id, 'duplicate visual asset path');
  const subject = assets.find(v => ['subject-photo','documentary-screenshot'].includes(v.role));
  const graphic = assets.find(v => v.role === 'infographic');
  if (!subject || !graphic || subject.path === graphic.path) fail(id, 'distinct authentic subject image and infographic required');
  for (const asset of assets) {
    if (!asset.path?.startsWith(prefix) || !media.has(asset.path) || media.get(asset.path) !== asset.sha256) fail(id, 'asset missing/hash mismatch');
    for (const key of ['alt','caption','creator_credit','rights','modifications']) if (!requiredText(asset[key])) fail(id, `missing ${key}`);
    if (!Number.isInteger(asset.width) || !Number.isInteger(asset.height) || asset.width <= 0 || asset.height <= 0) fail(id, 'invalid image dimensions');
    const bytes = read(repo, asset.path, id);
    const supported = bytes.subarray(0,3).equals(Buffer.from([255,216,255])) || bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || (bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP');
    if (!supported) fail(id, 'unsupported or non-image bytes');
  }
  for (const field of ['source_page','rights_url']) if (!/^https:\/\//.test(subject[field] || '')) fail(id, `subject ${field} required`);
  if (record.hero?.path !== subject.path || !requiredText(record.hero?.alt)) fail(id, 'hero must select authentic subject image');
  const html = read(repo, record.article, id).toString();
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => attrs(m[0]));
  if (resolveImage(record.article, images[0]?.src) !== subject.path) fail(id, 'first body image must be subject');
  for (const asset of [subject,graphic]) if (!images.some(i=> resolveImage(record.article,i.src) === asset.path && requiredText(i.alt))) fail(id, 'body image/alt missing');
  if ((html.match(/<figcaption\b/gi) || []).length < 2 || !html.includes(subject.source_page) || !html.includes(subject.rights_url)) fail(id, "reader-facing captions/subject attribution missing");
  const deck = JSON.parse(read(repo, record.cards, id));
  if (resolveImage(record.article, deck.slides?.[0]?.image) !== subject.path) fail(id, 'lead card must select subject');
  if (record.markdown) {
    const md = read(repo, record.markdown, id).toString();
    const first = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (!first || path.posix.normalize(path.posix.join(path.posix.dirname(record.markdown),first[1])) !== subject.path) fail(id, 'Markdown first image must select subject');
  }
  const reviewPath = prefix + 'visual-review.json';
  if (!media.has(reviewPath)) fail(id, 'recorded visual review missing');
  const review = JSON.parse(read(repo,reviewPath,id));
  if (review.article_id !== id || review.status !== 'passed' || !requiredText(review.reviewed_at) || !requiredText(review.reviewer)) fail(id, 'recorded review incomplete');
  for (const key of ['factual_fidelity','rights_and_credit','editorial_art','mobile_accessibility']) if (!requiredText(review.checks?.[key])) fail(id, `review lacks ${key}`);
  for (const asset of [subject,graphic]) if (review.asset_sha256?.[asset.path] !== asset.sha256) fail(id, 'visual review stale for image bytes');
  if (review.credits_sha256 !== media.get(creditsPath)) fail(id, 'visual review stale for credits');
  for (const field of ['article','cards',...(record.markdown?['markdown']:[])]) if (review.content_sha256?.[field] !== digest(read(repo,record[field],id))) fail(id, `visual review stale for ${field}`);
  return { checked: true, legacyUnreviewed: false };
}
