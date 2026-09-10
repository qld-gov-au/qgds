---
layout: section
title: Core styles
nav_order: 30
summary: >-
  The foundations every component is built from — colour, typography, spacing
  and layout.
cards_heading: Foundations
---

Core styles are the values components share. They are published as CSS custom
properties on `:root`, so a component and your own page code always resolve to
the same value.

```css
.my-panel {
  color: var(--qgds-color-text-default);
  background: var(--qgds-color-background-shade);
  border-radius: var(--qgds-border-radius);
  font-family: var(--qgds-font-family);
}
```

Use a token wherever a value exists for what you need. A hard-coded hex value or
pixel measurement will not follow a palette change and will not respond to a
user's contrast settings.
