#!/usr/bin/env bash
#
# Copy the QGDS web components dist into assets/vendor/qgds so the site can be
# built and served without reaching a CDN.
#
# After running this, set `qgds.source: local` in _config.yml.
#
# Usage:
#   ./scripts/vendor-qgds.sh                 # version from _config.yml, via npm
#   ./scripts/vendor-qgds.sh 0.3.4           # explicit npm version
#   ./scripts/vendor-qgds.sh --from-source   # build from the repo's main branch
#   ./scripts/vendor-qgds.sh --from-source v1.2.3   # build from a tag/branch
#
# --from-source exists because the published npm releases lag the repository.
# <qgds-navigation-item>, which this site's navigation uses, is not in 0.3.4 —
# the newest release at the time of writing. Building from source is the only
# way to get it until the next publish. Once it is published, prefer a pinned
# npm version: a source build is a moving target and is not reproducible.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/assets/vendor/qgds"
REPO="https://github.com/qld-gov-au/qgds-web-components.git"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if [ "${1:-}" = "--from-source" ]; then
  REF="${2:-main}"
  echo "Building @qld-gov-au/qgds-web-components from source ($REF)"
  echo "NOTE: an unreleased build. Pin an npm version instead once one ships."

  git clone --depth 1 --branch "$REF" "$REPO" "$TMP/src" 2>/dev/null \
    || git clone --depth 1 "$REPO" "$TMP/src"
  cd "$TMP/src"
  npm install --no-audit --no-fund
  npm run build
  SRC_DIST="$TMP/src/dist"
  BUILT_VERSION="$(node -p "require('./package.json').version")-$REF"
else
  VERSION="${1:-}"
  if [ -z "$VERSION" ]; then
    VERSION="$(grep -E '^\s+version:' "$ROOT/_config.yml" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
  fi
  if [ -z "$VERSION" ]; then
    echo "Could not determine a version. Pass one, or use --from-source." >&2
    exit 1
  fi

  echo "Vendoring @qld-gov-au/qgds-web-components@$VERSION from npm"
  cd "$TMP"
  npm pack "@qld-gov-au/qgds-web-components@$VERSION" >/dev/null
  tar xzf ./*.tgz
  SRC_DIST="$TMP/package/dist"
  BUILT_VERSION="$VERSION"
fi

if [ ! -d "$SRC_DIST/assets/js" ]; then
  echo "Build produced no dist/assets/js — aborting without touching $DEST" >&2
  exit 1
fi

rm -rf "$DEST"
mkdir -p "$DEST"
cp -R "$SRC_DIST/assets/css" "$DEST/css"
cp -R "$SRC_DIST/assets/js"  "$DEST/js"
printf '%s\n' "$BUILT_VERSION" > "$DEST/VERSION"

echo "Wrote $(find "$DEST" -type f | wc -l | tr -d ' ') files to assets/vendor/qgds ($BUILT_VERSION)"

if grep -q "qgds-navigation-item" "$DEST/js/qgds-web-components.js" 2>/dev/null \
   || grep -rq "qgds-navigation-item" "$DEST/js/chunks" 2>/dev/null; then
  echo "OK: this build includes <qgds-navigation-item>."
else
  echo
  echo "WARNING: this build does NOT include <qgds-navigation-item>."
  echo "         _includes/nav.html uses it, so the navigation will render"
  echo "         empty. Re-run with --from-source, or use a newer npm version."
fi

echo
echo "Now set the following in _config.yml:"
echo "  qgds:"
echo "    source: local"
