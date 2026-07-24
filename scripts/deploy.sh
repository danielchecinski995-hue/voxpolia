#!/usr/bin/env bash
# One-shot deploy to Cloudflare Pages: build, then push dist/ to the `endstreet`
# Pages project — that's what serves endstreet.games (apex + www). GitHub Pages
# is NOT the live host, so don't push there.
#
# Usage:  npm run deploy   (needs wrangler auth: `npx wrangler login`)
set -euo pipefail

HERE="$(cd "$(dirname "$0")/.." && pwd)"
cd "$HERE"

npm run build

# --branch=main → PRODUCTION deployment (maps to endstreet.games); any other
# branch would only get a preview *.pages.dev URL. --commit-dirty silences the
# uncommitted-changes warning (we deploy the working tree on purpose).
npx wrangler pages deploy dist --project-name=endstreet --branch=main --commit-dirty=true

echo "Deployed → https://endstreet.games/"
