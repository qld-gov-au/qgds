#!/usr/bin/env bash
#
# Copy the QGDS web components dist into assets/vendor/qgds so the site can be
# built and served without reaching a CDN.
#
# After running this, set `qgds.source: local` in _config.yml.
#
# Usage:
#   ./scripts/vendor-qgds.sh            # version from _config.yml
#   ./scripts/vendor-qgds.sh 0.3.4      # explicit version

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/assets/vendor/qgds"

VERSION="${1:-}"
if [ -z "$VERSION" ]; then
  VERSION="$(grep -E '^\s+version:' "$ROOT/_config.yml" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
fi

if [ -z "$VERSION" ]; then
  echo "Could not determine a version. Pass one: ./scripts/vendor-qgds.sh 0.3.4" >&2
  exit 1
fi

echo "Vendoring @qld-gov-au/qgds-web-components@$VERSION"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$TMP"
npm pack "@qld-gov-au/qgds-web-components@$VERSION" >/dev/null
tar xzf ./*.tgz

rm -rf "$DEST"
mkdir -p "$DEST"
cp -R package/dist/assets/css "$DEST/css"
cp -R package/dist/assets/js  "$DEST/js"

echo "Wrote $(find "$DEST" -type f | wc -l | tr -d ' ') files to assets/vendor/qgds"
echo
echo "Now set the following in _config.yml:"
echo "  qgds:"
echo "    version: \"$VERSION\""
echo "    source: local"
