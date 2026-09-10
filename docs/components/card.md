---
title: Card
nav_order: 40
status: Stable
since: "0.2.0"
summary: >-
  Cards group a heading, short description and a link into a single target,
  usually as one item in a set of comparable choices.
---

A card presents one item in a collection — a service, a guide, a news item — as
a self-contained, clickable block.

## Variants

- **Default** — heading, body text and an arrow affordance.
- **Feature** — larger layout for a promoted item.
- **With image** — an image at the start or end of the card.
- **Multiple actions** — footer links and tags instead of a single card-wide
  link.

{% capture demo_card %}
<qgds-card heading="Apply for a concession" heading-level="h3" href="#" variant="arrow">
  Check whether you are eligible and apply online. Most applications are decided within 10 business days.
</qgds-card>
{% endcapture %}
{% include example.html code=demo_card title="Card with a single action" %}

## Usage guidance

### When to use a card

Use cards for a set of three or more comparable items that users will scan and
choose between.

### When not to use a card

Avoid cards when:

- There is only one item — a card with nothing to compare against adds a border
  and no meaning
- The items are not comparable, or vary greatly in length
- Users need to read the content rather than choose between items — use headings
  and paragraphs
- The set is long and users are looking for a known item — use a list, which is
  faster to scan (Whitenton 2016)

### Do and don't

| Do | Don't |
|---|---|
| Keep body text to roughly the same length across a set | Mix one-line and five-line cards in one grid |
| Make the whole card the link target | Put several independent links inside a `single` action card |
| Write headings that distinguish one card from another | Repeat the same leading words on every card |
| Use `action="multiple"` when a card needs more than one link | Nest an interactive control inside a card-wide link |

## Design rationale

### The whole card is the target

When only the heading is clickable, users who aim at the card body get no
response and often conclude the item is unavailable. Making the entire card a
target reduces pointing effort in line with Fitts's law and matches the
expectation set by other government and commercial systems (Digital
Transformation Agency 2018).

### Nested links require an explicit mode

A link inside a link is invalid HTML and produces unpredictable behaviour in
assistive technology. Rather than allowing it and hoping, the component makes it
an explicit choice: `action="single"` makes the card one target,
`action="multiple"` removes the card-wide target and exposes footer links
individually.

### References

Digital Transformation Agency (2018) *Card*, Gold Design System, accessed
10 September 2026.

Whitenton K (2016) *Cards: UI-Component Definition*, Nielsen Norman Group,
accessed 10 September 2026.

## Accessibility

### Perceivable

**1.3.1 Info and Relationships (A)** — Card headings render as real heading
elements, so a screen reader user can navigate a grid of cards by heading.

**1.4.11 Non-text Contrast (AA)** — The card border and the arrow affordance
meet 3:1 against the page background.

### Operable

**2.4.4 Link Purpose (In Context) (A)** — The accessible name of a card link is
its heading. Headings must therefore make sense read on their own.

**2.4.7 Focus Visible (AA)** — The focus indicator is drawn around the whole
card, not just the heading.

### What you still own

Set `image-alt` on every card that has an image, or mark the image decorative.
Check that heading levels are consistent across a grid — a set of cards should
all sit at the same level.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `heading` | string | `""` | Card heading |
| `heading-level` | `h2`–`h6` | `h3` | Heading element rendered |
| `href` | string | — | Makes the whole card a link |
| `action` | `none` \| `single` \| `multiple` | `none` | How the card is interacted with |
| `variant` | `none` \| `arrow` \| `leading-icon` \| `stacked-icon` | `none` | Affordance style |
| `layout` | `default` \| `feature` | `default` | Card size |
| `image-src` | string | — | Image URL |
| `image-alt` | string | — | Alternative text |
| `image-position` | `none` \| `start` \| `end` | `start` | Image placement |
| `icon-name` | icon id | — | Icon for icon variants |

Slots: default (body text), `footer-links`, `footer-tags`, `footer-text`.

### Card with multiple actions

{% capture demo_card_multi %}
<qgds-card heading="Transport concessions" heading-level="h3" action="multiple">
  Reduced fares for seniors, students and Queenslanders holding a concession card.
  <qgds-tag slot="footer-tags" label="Transport" size="sm"></qgds-tag>
  <qgds-tag slot="footer-tags" label="Concessions" size="sm"></qgds-tag>
  <qgds-link slot="footer-links" href="#" label="Check eligibility"></qgds-link>
  <qgds-link slot="footer-links" href="#" label="Apply now"></qgds-link>
</qgds-card>
{% endcapture %}
{% include example.html code=demo_card_multi title="Card with footer links and tags" %}

### Laying out a grid

Cards do not lay themselves out. Use a grid on the container:

```css
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
}
```
