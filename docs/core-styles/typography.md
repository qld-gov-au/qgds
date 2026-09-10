---
title: Typography
nav_order: 20
summary: >-
  Noto Sans, a modular type scale, and the rules for setting readable text.
---

The design system sets all text in **Noto Sans**, with a system fallback stack.
Noto Sans has wide language coverage, which matters for a government audience
that reads in more than a hundred languages.

```css
--qgds-font-family: "Noto Sans", "Helvetica Neue", helvetica, arial, sans-serif;
```

## Line height

Two line-height tokens cover almost every case.

| Token | Value | Use for |
|---|---|---|
| `--qgds-line-height-default` | 1.45 | Body text, lists, table cells |
| `--qgds-line-height-heading` | 1.25 | Headings |
| `--qgds-line-height-none` | 1 | Single-line labels and tags |

WCAG **1.4.12 Text Spacing (AA)** requires that content remains readable when a
user sets line height to 1.5× the font size. Because spacing is expressed in
relative units throughout, layouts reflow rather than clip.

## Headings

Use headings to describe structure, not to get a particular size. Skipping from
`h1` to `h3` breaks the outline that screen reader users navigate by, and it
cannot be undone with CSS.

Every component that renders a heading exposes a `heading-level` attribute so
you can keep the outline correct while choosing the visual size separately.

{% capture demo_heading %}
<qgds-callout heading="A heading at level 2, sized small" heading-level="h2" heading-size="sm">
  <p>Level and size are independent, so the outline stays correct.</p>
</qgds-callout>
{% endcapture %}
{% include example.html code=demo_heading title="Heading level and heading size" %}

## Measure

Keep body text to roughly 60–75 characters per line. Longer lines make it hard to
find the start of the next one; much shorter lines break reading rhythm. The
documentation layout caps content at 42rem for this reason.

## Links

Links are underlined by default. The underline is the only affordance available
to users who cannot distinguish the link colour from body text, so do not remove
it in body copy.

| Token | Purpose |
|---|---|
| `--qgds-link-decoration` | Underline style at rest |
| `--qgds-link-decoration-thickness` | Underline thickness at rest |
| `--qgds-link-decoration-thickness-hover` | Thickness on hover |
| `--qgds-link-underline-offset` | Distance from the baseline |

<div class="dsq-guidance">
  <div class="dsq-guidance__item dsq-guidance__item--do">
    <h4>Do</h4>
    <ul>
      <li>Write link text that makes sense read on its own</li>
      <li>Set text in relative units so it scales with user settings</li>
      <li>Use sentence case for headings and labels</li>
    </ul>
  </div>
  <div class="dsq-guidance__item dsq-guidance__item--dont">
    <h4>Don't</h4>
    <ul>
      <li>Use "click here" or "read more" as link text</li>
      <li>Remove underlines from links in body copy</li>
      <li>Set body text below 16px</li>
    </ul>
  </div>
</div>

## References

W3C (2023) *Understanding Success Criterion 1.4.12: Text Spacing*, Web Content
Accessibility Guidelines 2.2, accessed 10 September 2026.
