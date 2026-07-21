# SVGN Public Corpus

GitHub is the versioned public source for SVGN.io. The corpus deliberately
supports more than one source representation:

- `content/articles/` preserves every published article as exact HTML.
- `content/stories/` keeps a searchable Markdown projection with frontmatter and
  `[[wikilinks]]`. Markdown is especially useful for wikis, but is not required
  for an SVGN news article.
- `content/cards/` contains Fable's lossless designed card decks. These are the
  shared projection for 2D card browsing and the member-only 3D WebXR rooms.
- `content/manifest.json` binds HTML, Markdown, and card JSON to one stable
  article id with SHA-256 hashes.
- `graph.json` is the derived story/link graph; regenerate it rather than
  hand-editing it.

All 2D articles are public. `historicalAudience` in the manifest records how an
article was originally distributed; it does not restrict the public archive.
Membership applies to the interactive 3D WebXR content experience.

Large media remains same-origin on SVGN.io under
`/wiki/svgn/articles/media/...`; the Git repository preserves the article,
structure, cards, provenance, and references without duplicating the media
warehouse.

## Publishing flow

`ChatGPT conversation -> reviewed HTML article -> Git commit -> validation -> Cloudflare sync/build -> SVGN.io`

The website should synchronize from this repository when content changes. A
visitor's browser should not contact GitHub for every page view. That keeps the
site fast and avoids GitHub API/rate-limit dependence.

For a new article, an agent may add reviewed HTML directly. The same stable id
must be used in its card deck and manifest record. Public wikis may use the same
flow with Markdown as their canonical source; private or unfinished wikis must
not be copied here.

A new HTML article must contain `data-svgn-article-id="svgn-..."`, an `<h1>`,
an `<article>`, and `<meta name="svgn:slug" content="...">`. Add its matching
`svgn.designed_deck.v1` JSON file under `content/cards/`, then rebuild and
validate the manifest. Existing imported articles retain their slug from the
previous manifest, so their exact HTML bytes do not need to be altered.

## Commands

From this repository:

```text
npm run sync
npm run manifest
npm run validate
npm run install-site -- --site-root "D:/path/to/wiki/svgn"
```

`sync` imports the exact currently hosted public corpus and Fable card decks
from the sibling `v5ma.github.io` checkout. It never deploys or pushes.
`manifest` rebuilds the hashes and index from this repository, making the
GitHub-first authoring direction independent of the old website archive.
`validate` proves file identity, hashes, article ids, and card-deck contracts.
`install-site` copies the validated exact HTML and designed card decks into an
SVGN.io source checkout and updates its hosted-article manifest. Cloudflare can
run this during a build after checking out this corpus; browsers never need to
fetch raw GitHub files at page-view time.
