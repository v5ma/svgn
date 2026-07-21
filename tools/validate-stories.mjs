#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

const STORIES_DIR = resolve('content/stories');
const REQUIRED_FIELDS = [
  'id',
  'title',
  'date',
  'slug',
  'canonical',
  'source',
  'audience',
  'topics',
  'related',
  'images',
];

function walkMarkdownFiles(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) files.push(...walkMarkdownFiles(fullPath));
    else if (stats.isFile() && extname(entry).toLowerCase() === '.md') files.push(fullPath);
  }
  return files.sort();
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (value === '') return '';
  if (value.startsWith('[') || value.startsWith('{') || value.startsWith('"')) {
    return JSON.parse(value);
  }
  if (/^-?\d+$/.test(value)) return Number(value);
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  return value;
}

function parseStory(filePath) {
  const source = readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error('Missing opening YAML frontmatter delimiter.');
  }
  const closingIndex = normalized.indexOf('\n---\n', 4);
  if (closingIndex === -1) {
    throw new Error('Missing closing YAML frontmatter delimiter.');
  }

  const frontmatterText = normalized.slice(4, closingIndex);
  const body = normalized.slice(closingIndex + 5).trim();
  const metadata = {};

  for (const [lineIndex, line] of frontmatterText.split('\n').entries()) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      throw new Error(`Unsupported frontmatter syntax on line ${lineIndex + 2}: ${line}`);
    }
    const [, key, rawValue] = match;
    try {
      metadata[key] = parseScalar(rawValue);
    } catch (error) {
      throw new Error(`Invalid value for ${key}: ${error.message}`);
    }
  }

  return { metadata, body, source: normalized };
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

function countImages(markdown) {
  const markdownImages = markdown.match(/!\[[^\]]*\]\([^\n)]+\)/g)?.length ?? 0;
  const htmlImages = markdown.match(/<img\b[^>]*>/gi)?.length ?? 0;
  return markdownImages + htmlImages;
}

function firstNonEmptyLine(body) {
  return body.split('\n').find((line) => line.trim())?.trim() ?? null;
}

function displayPath(filePath) {
  return relative(process.cwd(), filePath).replaceAll('\\', '/');
}

function validateTarget(filePath, parsed) {
  const errors = [];
  const { metadata, body, source } = parsed;

  for (const field of REQUIRED_FIELDS) {
    if (!(field in metadata)) errors.push(`Missing frontmatter field: ${field}`);
  }
  if (errors.length) return errors;

  if (typeof metadata.id !== 'string' || !/^[A-Za-z0-9._-]+$/.test(metadata.id)) {
    errors.push('id must contain only letters, digits, dots, underscores, and hyphens.');
  }
  if (typeof metadata.title !== 'string' || !metadata.title.trim()) {
    errors.push('title must be a non-empty string.');
  }
  if (typeof metadata.date !== 'string' || !isRealDate(metadata.date)) {
    errors.push('date must be a real date in YYYY-MM-DD format.');
  }
  if (typeof metadata.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
    errors.push('slug must use lowercase letters, digits, and single hyphens.');
  }
  if (typeof metadata.canonical !== 'string') {
    errors.push('canonical must be a string.');
  } else if (typeof metadata.slug === 'string' && metadata.canonical !== `https://svgn.io/p/${metadata.slug}`) {
    errors.push(`canonical must equal https://svgn.io/p/${metadata.slug}.`);
  }
  if (typeof metadata.source !== 'string') errors.push('source must be a string, even when empty.');
  if (typeof metadata.audience !== 'string' || !metadata.audience.trim()) {
    errors.push('audience must be a non-empty string.');
  }
  if (!Array.isArray(metadata.topics) || metadata.topics.some((item) => typeof item !== 'string')) {
    errors.push('topics must be an array of strings.');
  }
  if (!Array.isArray(metadata.related) || metadata.related.some((item) => typeof item !== 'string')) {
    errors.push('related must be an array of story ids.');
  }
  if (!Number.isInteger(metadata.images) || metadata.images < 0) {
    errors.push('images must be a non-negative integer.');
  }

  const expectedFilename = `${metadata.date}-${metadata.slug}.md`;
  if (basename(filePath) !== expectedFilename) {
    errors.push(`filename must be ${expectedFilename}.`);
  }

  const firstLine = firstNonEmptyLine(body);
  if (!firstLine || !firstLine.startsWith('# ')) errors.push('body must begin with an H1 headline.');
  else if (firstLine !== `# ${metadata.title}`) errors.push('first H1 must exactly match the title field.');

  if (!body.replace(/^# .*$/m, '').trim()) errors.push('story body is empty.');

  const actualImages = countImages(body);
  if (Number.isInteger(metadata.images) && metadata.images !== actualImages) {
    errors.push(`images is ${metadata.images}, but the Markdown contains ${actualImages} image(s).`);
  }

  if (/\b(?:TODO|TBD|MEDIA_TODO)\b/.test(source)) {
    errors.push('story contains an unresolved TODO/TBD/MEDIA_TODO marker.');
  }

  return errors;
}

function resolveTargets(argv) {
  const explicit = argv.filter((argument) => argument !== '--all');
  const allRequested = argv.includes('--all');
  if (allRequested || explicit.length === 0) return walkMarkdownFiles(STORIES_DIR);
  return explicit.map((filePath) => resolve(filePath));
}

function isInsideStoriesDirectory(filePath) {
  const prefix = STORIES_DIR.endsWith(sep) ? STORIES_DIR : `${STORIES_DIR}${sep}`;
  return filePath.startsWith(prefix);
}

function main() {
  const targets = resolveTargets(process.argv.slice(2));
  if (targets.length === 0) {
    process.stdout.write('No story files found.\n');
    return;
  }

  const allFiles = walkMarkdownFiles(STORIES_DIR);
  const parsedByFile = new Map();
  const parseErrors = new Map();

  for (const filePath of allFiles) {
    try {
      parsedByFile.set(filePath, parseStory(filePath));
    } catch (error) {
      parseErrors.set(filePath, error.message);
    }
  }

  const errors = [];
  for (const filePath of targets) {
    if (!existsSync(filePath)) {
      errors.push(`${displayPath(filePath)}: file does not exist.`);
      continue;
    }
    if (!isInsideStoriesDirectory(filePath)) {
      errors.push(`${displayPath(filePath)}: story must be inside content/stories/.`);
      continue;
    }
    const parsed = parsedByFile.get(filePath);
    if (!parsed) {
      errors.push(`${displayPath(filePath)}: ${parseErrors.get(filePath) ?? 'could not parse story.'}`);
      continue;
    }
    for (const message of validateTarget(filePath, parsed)) {
      errors.push(`${displayPath(filePath)}: ${message}`);
    }
  }

  const indexes = [
    ['id', new Map()],
    ['slug', new Map()],
    ['canonical', new Map()],
  ];
  for (const [filePath, parsed] of parsedByFile.entries()) {
    for (const [field, index] of indexes) {
      const value = parsed.metadata[field];
      if (typeof value !== 'string' || !value) continue;
      const files = index.get(value) ?? [];
      files.push(filePath);
      index.set(value, files);
    }
  }

  const targetSet = new Set(targets);
  for (const [field, index] of indexes) {
    for (const [value, files] of index.entries()) {
      if (files.length < 2 || !files.some((filePath) => targetSet.has(filePath))) continue;
      errors.push(
        `Duplicate ${field} ${JSON.stringify(value)} in ${files.map(displayPath).join(', ')}.`,
      );
    }
  }

  if (errors.length) {
    process.stderr.write(`Story validation failed with ${errors.length} error(s):\n`);
    for (const error of errors) process.stderr.write(`- ${error}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`Validated ${targets.length} story file(s).\n`);
}

main();
