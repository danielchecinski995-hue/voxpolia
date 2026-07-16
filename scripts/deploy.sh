#!/usr/bin/env bash
# One-shot deploy to GitHub Pages: build, then force-push dist/ to the
# `gh-pages` branch (Pages serves that branch's root). No workflow scope needed.
#
# Usage:  npm run deploy
set -euo pipefail

REMOTE="https://github.com/danielchecinski995-hue/voxpolia.git"
HERE="$(cd "$(dirname "$0")/.." && pwd)"

cd "$HERE"
npm run build

cd dist
touch .nojekyll
rm -rf .git
git init -b gh-pages -q
git add -A
git -c user.email="danielchecinski995@gmail.com" -c user.name="Daniel" commit -qm "deploy $(git -C "$HERE" rev-parse --short HEAD 2>/dev/null || echo dist)"
git push -f -q "$REMOTE" gh-pages
rm -rf .git

echo "Deployed → https://danielchecinski995-hue.github.io/voxpolia/"
