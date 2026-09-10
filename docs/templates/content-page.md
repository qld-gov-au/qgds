---
title: Content page
nav_order: 10
summary: >-
  The standard layout: a whole-site vertical navigation in the left rail, and
  a single content column.
---

This is the template every page on this site uses. It is a `qgds-header`
carrying the site's vertical navigation, a two-column grid holding that
navigation and the content, and a `qgds-footer`.

## Structure

```html
<body class="qgds" data-qgds-theme="light">
  <qgds-skip-links content-target="#main-content" navigation-target="#main-nav"></qgds-skip-links>

  <qgds-header site-name="Design System">
    <qgds-attribution-bar slot="pre-header">…</qgds-attribution-bar>
    <qgds-logo slot="logo" href="/" alt="Queensland Government home"></qgds-logo>
    <qgds-search-input slot="search" placeholder="Search"></qgds-search-input>

    <qgds-navigation slot="navigation" id="main-nav" variant="vertical" navigation-label="Main">
      <qgds-link-item is-nav-item href="/" label="Home"></qgds-link-item>
      <qgds-link-item is-nav-item href="/components/" label="Components">
        <qgds-link-item href="/components/button.html" label="Button"></qgds-link-item>
        <qgds-link-item href="/components/card.html" label="Card"></qgds-link-item>
      </qgds-link-item>
    </qgds-navigation>
  </qgds-header>

  <main id="main-content" tabindex="-1">
    <div class="qgds-container layout">
      <div id="nav-rail"></div>
      <div>
        <qgds-breadcrumbs aria-label="Breadcrumb">…</qgds-breadcrumbs>
        <h1>Page title</h1>
        <qgds-inpage-nav heading="On this page">…</qgds-inpage-nav>
        <!-- content -->
      </div>
    </div>
  </main>

  <qgds-footer>…</qgds-footer>
</body>
```

```css
.layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: start;
}

/* --qgds-breakpoint-lg */
@media (min-width: 992px) {
  .layout { grid-template-columns: 17rem minmax(0, 1fr); gap: 3rem; }
}
```

## Two things the body element must carry

`class="qgds"` scopes the library's CSS reset to the page. `data-qgds-theme="light"`
is what defines the colour tokens — the `--qgds-color-*` custom properties are
declared on `[data-qgds-theme="light"], .qgds-palette-default`, not on `:root`.
Without one of those on an ancestor, components render with unresolved colours.

## Where the navigation lives

`qgds-navigation` must sit in the header's `navigation` slot for the header to
render its mobile Menu button — the header only shows that button when the slot
holds exactly one `qgds-navigation`, and the button dispatches the
document-level event the navigation listens for.

Below 992px the navigation turns itself into a modal drawer, which is what the
Menu button should open. At and above 992px, this site moves the element into
the left rail with a few lines of JavaScript, so it reads as a persistent
vertical navigation. Without JavaScript it renders inside the header —
vertical, complete and usable, just not in the rail.

Use only one `qgds-navigation` per page. A second one also listens for the
global toggle event, so the Menu button would open two stacked drawers.

## Landmark order

The order below is what assistive technology users navigate. Keep it.

1. Skip links — first focusable element on the page
2. `banner` — the header
3. `navigation` — the site navigation, labelled "Main"
4. `main` — one per page, focusable with `tabindex="-1"`
5. `contentinfo` — the footer

**2.4.1 Bypass Blocks (A)** — Skip links let a keyboard user jump past the
header and navigation. They must be the first thing in the tab order and become
visible on focus.

**1.3.1 Info and Relationships (A)** — Give every `nav` an accessible name via
`navigation-label`.

## One h1 per page

The page title is the only `h1`. Section headings inside the content start at
`h2`. Components that render headings take a `heading-level` attribute so you
can keep the outline correct.

## Where this template comes from

The Jekyll implementation is in `_layouts/page.html`, and the navigation is
generated from the folder structure in `_includes/site-nav.html`. See
[Contribute]({{ '/about/contribute.html' | relative_url }}).
