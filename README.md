# SVGN Corpus

Canonical Markdown source for SVGN.io (Silicon Valley Global News).
Architecture (per SVGN_wiki_github vision): **GitHub holds the living Markdown; Cloudflare builds, indexes, and renders it.**

- `content/stories/` — one Markdown file per story: YAML frontmatter (id, date, canonical URL, source URL, topics, related ids) + full lossless body + `[[wikilinks]]` to connected stories.
- `graph.json` — derived index (nodes, edges, backlinks) in a D1-ready shape; regenerate, never hand-edit.
- Large media stays on Cloudflare (`/wiki/svgn/articles/media/…`); Markdown references it by URL — GitHub holds text + structure only (respects the wiki 5,000-file soft limit guidance).

## Conversational and mobile publishing

Use the workflow in [`PUBLISHING.md`](PUBLISHING.md) to turn a ChatGPT or Codex conversation into a validated draft pull request from a phone. Repository agents follow [`AGENTS.md`](AGENTS.md). New stories can be generated with `tools/create-story.mjs`, and changed stories are checked by `tools/validate-stories.mjs` and GitHub Actions.

Regenerate from the live site data:
`node production-canon/tools/svgn-deck-compiler/build-corpus.mjs --out <this dir>`

Flow: edit Markdown → commit → Cloudflare rebuild → svgn.io updates. Agents (Codex/Claude) may edit and cross-link pages; every change is a dated commit in the provenance record.
