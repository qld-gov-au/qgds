---
title: Spacing and grid
nav_order: 30
summary: >-
  The container, the responsive gutter scale, and how to space content
  consistently.
---

## The container

`.qgds-container` centres content and applies the responsive gutter. It caps the
content at 1312px plus gutters.

```html
<div class="qgds-container">
  <!-- page content -->
</div>
```

```css
.qgds-container {
  max-inline-size: calc(1312px + var(--qgds-grid-padding) * 2);
  padding-inline: var(--qgds-grid-padding);
  margin-inline: auto;
}
```

## Gutters and padding

Two tokens carry the responsive rhythm, and both change at breakpoints.

| Token | ≥320px | ≥700px | ≥992px |
|---|---|---|---|
| `--qgds-grid-padding` | 1rem | 2rem | 2rem |
| `--qgds-grid-gutter` | 1rem | 1.5rem | 2rem |

Use these rather than fixed values so that a layout you build matches the
padding of every component beside it.

## Breakpoints

| Token | Value |
|---|---|
| `--qgds-breakpoint-xs` | 320px |
| `--qgds-breakpoint-sm` | 400px |
| `--qgds-breakpoint-md` | 700px |
| `--qgds-breakpoint-lg` | 992px |
| `--qgds-breakpoint-xl` | 1312px |
| `--qgds-breakpoint-xxl` | 1599px |

Custom properties cannot be used inside a media query condition, so write the
value directly and treat the token as the reference:

```css
/* --qgds-breakpoint-lg */
@media (min-width: 992px) {
  .layout { grid-template-columns: 17rem minmax(0, 1fr); }
}
```

## Logical properties

The design system uses logical properties — `padding-inline`,
`margin-block-start`, `inline-size` — throughout, so layouts work unchanged in
right-to-left languages. Use them in your own code for the same reason.

| Physical | Logical |
|---|---|
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `margin-top` / `margin-bottom` | `margin-block-start` / `margin-block-end` |
| `width` / `height` | `inline-size` / `block-size` |

## Reflow

**1.4.10 Reflow (AA)** requires content to be usable at 320 CSS pixels wide
without two-dimensional scrolling. Wide content that genuinely cannot reflow —
a data table, a code sample, a diagram — is allowed to scroll inside its own
container, but the page itself must not.

## References

W3C (2023) *Understanding Success Criterion 1.4.10: Reflow*, Web Content
Accessibility Guidelines 2.2, accessed 10 September 2026.
