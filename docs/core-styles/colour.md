---
title: Colour
nav_order: 10
summary: >-
  The Queensland Government palette, the tokens that expose it, and the rules
  for applying it accessibly.
---

Colour in the design system is applied through semantic tokens, not raw values.
A token names the job the colour does — `--qgds-color-link-default` — rather than
what it looks like. That means a palette change updates every component at once,
and a component is guaranteed to be legible in the palette it sits in.

## Palettes

Components accept a `palette` attribute, and sections accept a
`qgds-palette-*` class. Five palettes are available: `default`, `soft`, `muted`,
`bold` and `deep`. Setting a palette on a container re-points the colour tokens
for everything inside it.

{% capture demo_palette %}
<section class="qgds-palette-bold" style="padding:1.5rem; background:var(--qgds-color-background);">
  <qgds-callout heading="Bold palette" heading-level="h3">
    <p>The same callout markup, resolving colour tokens from the bold palette.</p>
  </qgds-callout>
</section>
{% endcapture %}
{% include example.html code=demo_palette title="Applying a palette to a section" %}

## Core colours

<ul class="dsq-swatches">
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#09549f;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Sapphire blue</span>
      <span class="dsq-swatch__token">--qgds-color-primary-sapphire-blue</span>
    </div>
  </li>
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#000053;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Dark blue</span>
      <span class="dsq-swatch__token">--qgds-color-primary-dark-blue</span>
    </div>
  </li>
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#84d3ff;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Light blue</span>
      <span class="dsq-swatch__token">--qgds-color-primary-light-blue</span>
    </div>
  </li>
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#7ac143;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Light green</span>
      <span class="dsq-swatch__token">--qgds-color-primary-light-green</span>
    </div>
  </li>
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#9c2aa0;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Maroon</span>
      <span class="dsq-swatch__token">--qgds-color-other-modern-maroon</span>
    </div>
  </li>
  <li class="dsq-swatch">
    <div class="dsq-swatch__chip" style="background:#1a1a1a;"></div>
    <div class="dsq-swatch__body">
      <span class="dsq-swatch__name">Neutral darkest</span>
      <span class="dsq-swatch__token">--qgds-color-neutral-darkest</span>
    </div>
  </li>
</ul>

The values above are illustrative. Read the authoritative values from the
published stylesheet — every token is defined on `:root`, so you can inspect
them in devtools or read them at runtime:

```js
getComputedStyle(document.documentElement)
  .getPropertyValue("--qgds-color-link-default");
```

## Status colours

Status colours carry meaning and must not be reused for decoration.

| Meaning | Token family |
|---|---|
| Success | `--qgds-color-status-success-*` |
| Error | `--qgds-color-status-error-*` |
| Caution | `--qgds-color-status-caution-*` |
| Information | `--qgds-color-status-info-*` |

Each family has `lightest`, `lighter`, `default` and `darker` steps, so a status
message can pair a light background with a dark foreground and still meet
contrast.

## Applying colour accessibly

**1.4.1 Use of Color (A)** — Never let colour be the only thing that carries
meaning. A red field border must be accompanied by a text message. A status tag
must state its status in words.

**1.4.3 Contrast (Minimum) (AA)** — Body text must reach 4.5:1 against its
background. Text at 18.66px bold or 24px regular and above may drop to 3:1.

**1.4.11 Non-text Contrast (AA)** — Component boundaries, icons that carry
meaning and focus indicators must reach 3:1 against adjacent colours.

<div class="dsq-guidance">
  <div class="dsq-guidance__item dsq-guidance__item--do">
    <h4>Do</h4>
    <ul>
      <li>Use semantic tokens: <code>--qgds-color-text-default</code></li>
      <li>Set a palette on a container and let components inherit it</li>
      <li>Check contrast in every palette a component can appear in</li>
    </ul>
  </div>
  <div class="dsq-guidance__item dsq-guidance__item--dont">
    <h4>Don't</h4>
    <ul>
      <li>Hard-code hex values in component overrides</li>
      <li>Use a status colour for emphasis or branding</li>
      <li>Introduce a new colour to distinguish one team's service</li>
    </ul>
  </div>
</div>

## References

W3C (2023) *Web Content Accessibility Guidelines 2.2*, World Wide Web
Consortium, accessed 10 September 2026.
