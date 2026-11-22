#!/usr/bin/env bash
# Builds a standalone static copy of the site into ./static-site
# as a single self-contained index.html (CSS, fonts, JS and images all inlined).
# The Next.js project itself is not modified.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

tar -C "$ROOT" --exclude=node_modules --exclude=.next --exclude=.git --exclude=static-site --exclude=out -cf - . | tar -C "$TMP" -xf -
ln -s "$ROOT/node_modules" "$TMP/node_modules"
rm -rf "$TMP/src/app/api"   # API routes are not available in a static export
# write image paths as plain literals so the inliner can embed them as data URIs
sed -i 's|\${IMG}|images/|g' "$TMP/src/content/site.ts"

(cd "$TMP" && STATIC_EXPORT=1 NEXT_PUBLIC_STATIC_EXPORT=1 npx next build)
python3 "$ROOT/scripts/inline-static.py" "$TMP/out" "$ROOT/static-site"
mkdir -p "$ROOT/docs" && cp "$ROOT/static-site/index.html" "$ROOT/docs/index.html" && touch "$ROOT/docs/.nojekyll"
echo "Static site written to $ROOT/static-site/index.html (copied to docs/ for GitHub Pages)"
