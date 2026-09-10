---
title: Developing
nav_order: 20
summary: Install the QGDS web components and render your first page.
---

## Choose an implementation

There are three published implementations. This site uses **web components**.

| Implementation | Package | Use when |
|---|---|---|
| Web components | `@qld-gov-au/qgds-web-components` | Any framework, or plain HTML |
| Bootstrap 5 | `@qld-gov-au/qgds-bootstrap5` | An existing Bootstrap 5 codebase |
| Vanilla | `@qld-gov-au/qgds-vanilla` | No build step, no framework |

The web components library is framework agnostic. It is built with
[Lit](https://lit.dev/) and ships as standard custom elements, so the same
markup works in React, Vue, Angular, a static site, or a CMS template.

## Install

The library is published to npm and is currently pre-release. Expect breaking
changes between minor versions and pin an exact version.

```bash
npm install @qld-gov-au/qgds-web-components@{{ site.qgds.version }}
```

```js
import "@qld-gov-au/qgds-web-components/styles";
import "@qld-gov-au/qgds-web-components";
```

## Or load it from a CDN

The bundle is ESM-only, so it must be loaded with `type="module"`. There is no
UMD or IIFE build — a plain `<script src>` will not register the elements.

```html
<link rel="stylesheet"
      href="{{ site.qgds.cdn_base }}@{{ site.qgds.version }}/dist/assets/css/qgds-web-components.css">
<script type="module"
        src="{{ site.qgds.cdn_base }}@{{ site.qgds.version }}/dist/assets/js/qgds-web-components.js"></script>
```

Import individual components instead of the full bundle when you only need a
few:

```js
import "@qld-gov-au/qgds-web-components/button";
import "@qld-gov-au/qgds-web-components/callout";
```

## Render a page

Components are configured with attributes and composed with slots. Attributes
take strings, booleans and numbers; anything richer — an array, an object — is
set as a property in JavaScript.

{% capture demo_page %}
<qgds-callout heading="Before you apply" heading-level="h3">
  <p>You will need your customer reference number and a form of photo identification.</p>
  <qgds-button label="Start application" variant="primary"></qgds-button>
</qgds-callout>
{% endcapture %}
{% include example.html code=demo_page title="Attributes and slots" %}

## Working with the shadow DOM

Each component renders into a shadow root. That has two practical consequences.

- **Your page styles will not leak into a component.** Customise components
  through the QGDS CSS custom properties, or through exposed CSS parts where the
  component provides them. Do not try to reach into a shadow root with a
  descendant selector — it will not match, and if it ever does it will break on
  the next release.
- **Events cross the boundary, but native form participation varies.** Form
  components emit a `qgds-change` event with the value in `event.detail`. Check
  the component's page before assuming a native `input` event will fire.

## Server-side rendering

SSR support is still being validated during the alpha. If you render on the
server, expect a flash of unstyled custom elements before the module loads.
Reserve layout space for above-the-fold components, or gate rendering on
`customElements.whenDefined()`.

```js
await customElements.whenDefined("qgds-header");
document.body.removeAttribute("data-loading");
```

## Accessibility is not automatic

The components handle their own semantics, focus management and keyboard
behaviour. They cannot check that you have used them correctly. You are still
responsible for heading order, meaningful link text, form labels, and the
reading order of the page.
