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

## New article media

New lightweight article assets may be committed under `content/articles/media/<article-id>/` with a `credits.json` provenance record. The manifest builder hashes these assets, identifies the authentic subject-photo hero, and the installer copies verified media to the same-origin `articles/media/` location. The photo should be the Markdown hero, first body image and lead-card image; explanatory infographics remain separate. Source hero metadata does not establish that a live catalog has synchronized it.

## New-story visual release guard

`npm run validate` now rejects new story IDs without the complete visual source package. The 380 historical IDs listed in `content/editorial/legacy-visual-baseline.json` are explicitly **unreviewed legacy imports**, not approved examples. Dates do not grant exemptions. Do not add new IDs to this frozen baseline to bypass a failed check; historical additions require the same package or a separately reviewed migration decision.

Before committing a new story:

1. Acquire an authentic subject photograph or documentary screenshot and a separate substantive explanatory infographic. Review source rights and factual/editorial quality, not just asset count.
2. Commit image bytes and `credits.json` in `content/articles/media/<id>/`. Include distinct roles, source/rights URL for the subject asset, creator, rights, modifications, dimensions, SHA-256, caption and useful alt text.
3. Select the subject image in the manifest hero, first HTML/Markdown image and first card. Include both visuals in the article body. Live catalog synchronization remains a separate verification.
4. Actually inspect the assets at full and mobile size. Record factual fidelity, rights/credit, editorial art and mobile accessibility in `visual-review.json`. Use `status: passed` only after that review, with reviewer/date, image hashes, the credits hash and article/card/Markdown hashes. Preserve any limitations. Changed content/credits/assets invalidate the recorded review until rechecked.
5. Run `npm run manifest`, `npm test`, and `npm run validate`. Test site installation where applicable, then check exact remote contents and CI.

This guard validates the **presence, consistency and freshness of recorded evidence**. It cannot decide whether a photo is authentic, a license really applies, an illustration is good, or a reviewer actually inspected it. A passing check is not owner approval, legal clearance, or proof of live website rendering. Do not fabricate review records to pass it. The review record is independent of the manifest, so rebuilding hashes does not silently approve new material.
