# Agent instructions for SVGN publishing

This repository is the canonical Markdown source for SVGN.io. Follow these rules whenever a user asks to create, revise, or publish a story.

## Default workflow

1. Read `PUBLISHING.md` before editing.
2. Create or update exactly one file in `content/stories/` unless the user explicitly requests a multi-story batch.
3. Use a branch named `story/YYYY-MM-DD-short-slug` or `agent/short-description`.
4. Run `node tools/validate-stories.mjs <changed-story-path>`.
5. Open a draft pull request by default. Do not merge or push directly to `main` unless the user explicitly says to publish immediately.
6. Do not hand-edit `graph.json`; it is a derived artifact rebuilt by the publishing system.

## Story format

Use `node tools/create-story.mjs --input <json-file>` when starting a new story. Preserve the existing frontmatter contract: `id`, `title`, `date`, `slug`, `canonical`, `source`, `audience`, `topics`, `related`, and `images`.

The article body begins with one H1 matching `title`. A one-line deck may follow in italics. Use Markdown for the article body and headings.

## Images

GitHub stores text and structure. Production media belongs under the existing Cloudflare path `/wiki/svgn/articles/media/<story-id>/...` or at another approved public HTTPS URL. Never invent an image URL. Do not merge a story containing `TODO`, `TBD`, or `MEDIA_TODO` placeholders.

When the user supplies images, preserve the requested order, write useful alt text, and confirm that each final URL is public before publishing. The `images` frontmatter value must equal the number of Markdown or HTML image elements in the story.

## Editorial safety

Do not silently turn a draft into a published story. Preserve the author's voice while separating reported facts, analysis, and opinion. Verify time-sensitive claims before publication and keep source URLs in `source` or in the article body as appropriate.
