# QGDS documentation site

A Jekyll site that recreates the structure of
[designsystem.qld.gov.au](https://www.designsystem.qld.gov.au/) using the
[QGDS web components](https://github.com/qld-gov-au/qgds-web-components) library.

Content is markdown. Navigation, breadcrumbs, section index cards and the search
index are all generated from the folder structure — adding a page is one file
with front matter, nothing else.

## Run it locally

```bash
bundle install
bundle exec jekyll serve --livereload
# http://127.0.0.1:4000
```

Ruby 3.1+ is required.

## Deploy to GitHub Pages

1. Push to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. `.github/workflows/jekyll.yml` builds and deploys on every push. It passes the
   correct `--baseurl` automatically, so a project site at
   `https://<org>.github.io/<repo>/` works with no config change.

If you prefer the classic (no Actions) Pages build, it also works — the site only
uses plugins on the GitHub Pages allow-list (`jekyll-seo-tag`,
`jekyll-sitemap`). In that case, set `baseurl` in `_config.yml` yourself.

## How the navigation works

There is **one** navigation for the whole site — a `qgds-navigation` with
`variant="vertical"`, matching designsystem.qld.gov.au. `_includes/nav.html`
reads `page.path` — the *source* path of each page — and groups `site.pages` by
folder:

```
components/index.md            ->  top-level item
components/button.md           ->  child of "Components"
components/form/index.md       ->  child of "Components", with children
components/form/text-input.md  ->  child of "Form"
```

Because it reads the source path rather than the URL, it is independent of your
permalink style. Breadcrumbs, section index cards and `search.json` use the same
rule, so all four stay in sync automatically.

The section you are reading is expanded on load and the current page is marked —
`qgds-link-item` does neither by default, so `assets/js/site.js` does it.

### Where the navigation element lives

`qgds-navigation` is authored inside `qgds-header`'s `navigation` slot, because
the header only renders its mobile **Menu** button when that slot holds exactly
one `qgds-navigation`, and that button dispatches the document-level event the
navigation listens for.

Below 992px the component turns itself into a modal drawer — which is exactly
what the Menu button should open. At and above 992px, `site.js` moves the
element into `#dsq-nav-rail` in the page's left column so it reads as a
persistent vertical nav. With JavaScript off it renders inside the header:
vertical, complete and usable, just not in the rail.

**Use only one `qgds-navigation` per page.** A second instance also listens for
the global toggle event, so the Menu button opens two stacked drawers. This is
why there is no separate section-level nav.

### Two attributes the `<body>` must carry

`_layouts/default.html` sets `class="qgds" data-qgds-theme="light"`. The first
scopes the library's CSS reset to the page. The second is what defines the
colour tokens — `--qgds-color-*` are declared on
`[data-qgds-theme="light"], .qgds-palette-default`, **not** on `:root`. Without
one of them on an ancestor, every component renders with unresolved colours.

> **Do not set `permalink: pretty` in `_config.yml`.** It is not required —
> Jekyll already gives `index.md` files a directory URL (`/components/`) and
> everything else `/components/button.html`. Changing the style alters
> `page.dir` in ways that make the folder/URL mapping harder to reason about.

## Adding a page

Create a markdown file in a section folder:

```yaml
---
title: Pagination
nav_order: 80
summary: Splits a long list of results across multiple pages.
---
```

| Front matter | Purpose |
|---|---|
| `title` | Page title and nav label. Required — a page without one is skipped |
| `nav_title` | Shorter label used in navigation only |
| `nav_order` | Integer, ascending. Defaults to 100 |
| `nav_exclude` | `true` to hide from navigation |
| `search_exclude` | `true` to keep out of the search index |
| `summary` | Shown under the h1, on index cards, and in search results |
| `status`, `since` | Optional tags under the page title |
| `layout` | `page` (default), `section` for a folder index, `home` |
| `inpage_nav` | `false` to suppress the "On this page" nav |

Adding a folder with an `index.md` (`layout: section`) creates a new top-level
section.

## Live component examples

```liquid
{% raw %}{% capture demo %}
<qgds-button label="Save and continue" variant="primary"></qgds-button>
{% endcapture %}
{% include example.html code=demo title="Primary button" %}{% endraw %}
```

The markup is rendered live and shown as copyable source below it.

## Loading the components

The library is **ESM only** — there is no UMD build, so a plain `<script src>`
will not register the custom elements. It must be `type="module"`.

`_config.yml` switches between two sources:

```yaml
qgds:
  version: "0.3.4"
  source: cdn      # cdn | local
```

- **`cdn`** (default) loads the CSS and ESM bundle from jsDelivr. Nothing to
  install, nothing vendored into the repo.
- **`local`** loads from `assets/vendor/qgds`. Run `./scripts/vendor-qgds.sh`
  first to copy the npm dist in. Use this to pin the site to an exact build and
  remove the CDN dependency.

The library is pre-release. Pin an exact version and read the release notes
before upgrading.

## Structure

```
_config.yml              site + QGDS config
_layouts/
  default.html           header, footer, skip links
  page.html              nav rail + breadcrumbs + content + on-this-page
  section.html           section landing page with auto card grid
  home.html              home page with hero banner
_includes/
  head.html              CDN/local asset switch
  header.html            header, search, and the navigation
  footer.html            footer
  nav.html               folder-driven whole-site vertical navigation
  breadcrumbs.html       path-driven breadcrumbs
  section-cards.html     auto card grid of child pages
  example.html           live example + copyable source
assets/
  css/site.css          documentation chrome only
  js/site.js             nav docking, on-this-page, copy code, search
  vendor/                target for scripts/vendor-qgds.sh
search.json              generated search index
search.html              search results page
<section>/index.md       one folder per top-level section
```

## What is deliberately not styled here

`assets/css/site.css` styles the documentation chrome — layout, long-form
typography, example blocks, code. It never reaches into a component. Components
render into shadow roots; customise them through the QGDS CSS custom properties
(`--qgds-color-*`, `--qgds-line-height-*`, and so on), not with descendant
selectors.

## Licence

Site scaffolding: use it however you like. The QGDS web components library is
published by the Queensland Government under its own licence — see
[qgds-web-components](https://github.com/qld-gov-au/qgds-web-components).

The Queensland Government Coat of Arms is protected and may only be used by, or
with the permission of, the Queensland Government.
