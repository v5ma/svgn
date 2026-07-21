# Mobile-first SVGN publishing

SVGN already has the core automation required for conversational publishing: Markdown committed to this repository is the canonical source, and the existing Cloudflare build turns merged story files into pages on svgn.io.

The intended phone workflow is:

1. Talk to ChatGPT or Codex and provide raw notes, links, desired angle, and any images.
2. Say: `Create an SVGN draft PR.`
3. The agent writes the article, generates the required frontmatter, validates the story, commits it to a branch, and opens a draft pull request.
4. Review the draft pull request from the GitHub mobile app or browser.
5. Merge the pull request when the article is ready. The existing Cloudflare publishing path then rebuilds svgn.io.

A draft pull request is the default because it gives the author a reliable approval step. Use `Publish this SVGN story now` only when a direct-to-main publication is intentional.

## What to send from a phone

A useful request contains the raw idea or transcript, the desired headline or angle, source links, the intended tone, and where each image should appear. Images may be attached to the conversation, but the final article must reference an approved public URL. The existing corpus convention is `/wiki/svgn/articles/media/<story-id>/<filename>`.

A concise reusable request is:

`Turn this into an SVGN news story. Verify time-sensitive claims, preserve my voice, use the attached first image as the lead image, then create an SVGN draft PR.`

## Story generator

The repository includes a dependency-free Node.js generator. Create a JSON payload using the shape in `tools/story.example.json`, then run:

```sh
node tools/create-story.mjs --input tools/story.example.json
```

Preview the generated Markdown without writing a file:

```sh
node tools/create-story.mjs --input tools/story.example.json --dry-run
```

The generator supplies a Los Angeles date when none is provided, creates a stable story id, generates the slug and canonical URL, counts images, and writes the file to `content/stories/`.

The minimum payload is:

```json
{
  "title": "Story headline",
  "body": "The article in Markdown."
}
```

Supported optional fields are `deck`, `date`, `slug`, `id`, `canonical`, `source`, `audience`, `topics`, `related`, and `leadImage`.

## Validation

Validate a single story with:

```sh
node tools/validate-stories.mjs content/stories/YYYY-MM-DD-slug.md
```

The validator checks the frontmatter contract, filename, date, canonical URL, headline, image count, duplicate ids/slugs/canonical URLs, and unresolved placeholders. GitHub Actions runs the same check for changed stories in pull requests and on pushes to `main`.

## Image handling

This repository intentionally does not become a large media archive. A production image should be uploaded to the existing Cloudflare media system, then referenced from the Markdown. The article generator accepts a lead image URL and counts images already embedded in the Markdown body.

Until a Cloudflare upload endpoint is connected to the conversational workflow, an agent should open a draft pull request rather than publish a story whose attached images do not yet have final public URLs. This keeps the text workflow usable now without weakening the existing media architecture.

## Codex behavior

`AGENTS.md` gives Codex the same publishing contract. A Codex task can therefore be as small as: `Create an SVGN draft PR from this material.` Codex should create the story file, run validation, and open a draft pull request without editing `graph.json`.
