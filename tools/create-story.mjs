#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const DEFAULT_OUTPUT_DIR = 'content/stories';
const DEFAULT_TIME_ZONE = 'America/Los_Angeles';

function usage(exitCode = 0) {
  const text = `Usage:
  node tools/create-story.mjs --input story.json [--output-dir content/stories] [--dry-run] [--force]
  cat story.json | node tools/create-story.mjs --input - --dry-run

Required JSON fields:
  title   Story headline.
  body    Markdown body.

Optional JSON fields:
  deck, date, slug, id, canonical, source, audience, topics, related, leadImage

leadImage may be a URL string or an object: { "url": "...", "alt": "...", "caption": "..." }.
`;
  const stream = exitCode === 0 ? process.stdout : process.stderr;
  stream.write(text);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = {
    input: null,
    outputDir: DEFAULT_OUTPUT_DIR,
    dryRun: false,
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    switch (token) {
      case '--input':
        args.input = argv[++index];
        break;
      case '--output-dir':
        args.outputDir = argv[++index];
        break;
      case '--dry-run':
        args.dryRun = true;
        break;
      case '--force':
        args.force = true;
        break;
      case '--help':
      case '-h':
        usage(0);
        break;
      default:
        throw new Error(`Unknown argument: ${token}`);
    }
  }

  if (!args.input) {
    throw new Error('Missing required --input argument.');
  }
  if (!args.outputDir) {
    throw new Error('--output-dir cannot be empty.');
  }

  return args;
}

function readStdin() {
  return readFileSync(0, 'utf8');
}

function localDate(timeZone = DEFAULT_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function slugify(value) {
  const slug = String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 96)
    .replace(/-+$/g, '');
  return slug || 'story';
}

function normalizeList(value, fieldName) {
  if (value === undefined || value === null || value === '') return [];
  const items = Array.isArray(value) ? value : String(value).split(',');
  const normalized = items
    .map((item) => String(item).trim())
    .filter(Boolean);
  if (normalized.some((item) => item.includes('\n'))) {
    throw new Error(`${fieldName} entries must be single-line strings.`);
  }
  return [...new Set(normalized)];
}

function normalizeTopics(value) {
  return normalizeList(value, 'topics').map((topic) => topic.toLowerCase());
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function yamlArray(values) {
  return JSON.stringify(values);
}

function normalizeLeadImage(value) {
  if (!value) return null;
  if (typeof value === 'string') {
    return { url: value.trim(), alt: '', caption: '' };
  }
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('leadImage must be a URL string or an object.');
  }
  const url = String(value.url ?? '').trim();
  if (!url) throw new Error('leadImage.url is required when leadImage is provided.');
  return {
    url,
    alt: String(value.alt ?? '').trim(),
    caption: String(value.caption ?? '').trim(),
  };
}

function markdownImage(image) {
  const safeAlt = image.alt.replace(/\]/g, '\\]');
  const lines = [`![${safeAlt}](${image.url})`];
  if (image.caption) lines.push(`*${image.caption}*`);
  return lines.join('\n\n');
}

function countImages(markdown) {
  const markdownImages = markdown.match(/!\[[^\]]*\]\([^\n)]+\)/g)?.length ?? 0;
  const htmlImages = markdown.match(/<img\b[^>]*>/gi)?.length ?? 0;
  return markdownImages + htmlImages;
}

function buildStory(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Input must be a JSON object.');
  }

  const title = String(input.title ?? '').trim();
  const body = String(input.body ?? '').trim();
  const deck = String(input.deck ?? '').trim();
  const date = String(input.date ?? localDate()).trim();

  if (!title) throw new Error('title is required.');
  if (!body) throw new Error('body is required.');
  if (title.includes('\n')) throw new Error('title must be a single line.');
  if (deck.includes('\n')) throw new Error('deck must be a single line.');
  if (!isRealDate(date)) throw new Error(`Invalid date: ${date}. Expected YYYY-MM-DD.`);

  const slug = input.slug ? String(input.slug).trim() : slugify(title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug: ${slug}. Use lowercase letters, digits, and hyphens.`);
  }

  const digest = createHash('sha256')
    .update(`${date}\0${slug}\0${title}`)
    .digest('hex')
    .slice(0, 8);
  const idStem = slug.slice(0, 40).replace(/-+$/g, '');
  const id = String(input.id ?? `svgn-${date.replaceAll('-', '')}-${idStem}-${digest}`).trim();
  if (!/^[A-Za-z0-9._-]+$/.test(id)) {
    throw new Error(`Invalid id: ${id}. Use letters, digits, dots, underscores, and hyphens.`);
  }

  const canonical = String(input.canonical ?? `https://svgn.io/p/${slug}`).trim();
  const source = String(input.source ?? '').trim();
  const audience = String(input.audience ?? 'everyone').trim();
  const topics = normalizeTopics(input.topics);
  const related = normalizeList(input.related, 'related');
  const leadImage = normalizeLeadImage(input.leadImage);

  const contentParts = [`# ${title}`];
  if (deck) contentParts.push(`*${deck}*`);
  if (leadImage) contentParts.push(markdownImage(leadImage));
  contentParts.push(body);
  const content = contentParts.join('\n\n').trim();
  const imageCount = countImages(content);

  const frontmatter = [
    '---',
    `id: ${id}`,
    `title: ${yamlString(title)}`,
    `date: ${yamlString(date)}`,
    `slug: ${yamlString(slug)}`,
    `canonical: ${yamlString(canonical)}`,
    `source: ${yamlString(source)}`,
    `audience: ${yamlString(audience)}`,
    `topics: ${yamlArray(topics)}`,
    `related: ${yamlArray(related)}`,
    `images: ${imageCount}`,
    '---',
  ].join('\n');

  return {
    id,
    date,
    slug,
    filename: `${date}-${slug}.md`,
    markdown: `${frontmatter}\n\n${content}\n`,
  };
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const raw = args.input === '-' ? readStdin() : readFileSync(resolve(args.input), 'utf8');
    const input = JSON.parse(raw);
    const story = buildStory(input);

    if (args.dryRun) {
      process.stdout.write(story.markdown);
      return;
    }

    const outputDir = resolve(args.outputDir);
    const outputPath = join(outputDir, story.filename);
    if (existsSync(outputPath) && !args.force) {
      throw new Error(`Refusing to overwrite existing file: ${outputPath}. Use --force to replace it.`);
    }

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, story.markdown, 'utf8');
    process.stdout.write(`Created ${outputPath}\nStory id: ${story.id}\n`);
  } catch (error) {
    process.stderr.write(`create-story: ${error.message}\n`);
    process.exitCode = 1;
  }
}

main();
