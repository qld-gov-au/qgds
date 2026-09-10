---
title: Release notes
nav_order: 20
inpage_nav: false
summary: >-
  What changed in each release of the QGDS web components library.
---

The library is pre-release. Minor versions may contain breaking changes. Pin an
exact version in `package.json` and read this page before upgrading.

## 0.3.4 — alpha

- Side navigation gains automatic level detection for nested items
- Search input accepts a `suggestions` property for type-ahead results
- Table adds a `stack` responsive mode

## 0.3.3 — latest

- Header search slot is now independently configurable
- Card adds `action="multiple"` for footer links and tags
- Fixes focus order in the accordion group controls

## 0.2.0

- Adds form components: text input, textarea, select, checkbox, radio, file
  upload
- Adds table, tag and pagination
- Colour tokens reorganised into semantic families

## 0.1.0

- First public alpha: header, footer, button, callout, accordion, icon, link

## Upgrading

Check the component pages for attribute changes before you upgrade, then run
your accessibility tests. A minor version bump in an alpha library is not safe to
apply without review.

```bash
npm install @qld-gov-au/qgds-web-components@{{ site.qgds.version }}
```

Release notes are maintained on the
[library repository](https://github.com/qld-gov-au/qgds-web-components/releases).
The entries above are illustrative for this demonstration site.
