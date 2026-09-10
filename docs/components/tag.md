---
title: Tag
nav_order: 60
status: Stable
since: "0.2.0"
summary: >-
  Tags label, categorise or filter content with a short piece of metadata.
---

A tag is a short label attached to an item — a topic, a status, or an active
filter the user can remove.

## Variants

- **Default** — a static label.
- **Info** — a label carrying status or category meaning.
- **Action** — a tag that acts as a link or a filter control.
- **Dismissible** — an applied filter the user can remove.

{% capture demo_tags %}
<qgds-tag label="Transport"></qgds-tag>
<qgds-tag label="In progress" variant="info"></qgds-tag>
<qgds-tag label="Concessions" variant="action" href="#"></qgds-tag>
<qgds-tag label="Brisbane" variant="dismissible"></qgds-tag>
{% endcapture %}
{% include example.html code=demo_tags title="Tag variants" %}

## Usage guidance

### When to use a tag

Use a tag to show the category or status of an item within a list, or to show
which filters a user has applied to a set of results.

### When not to use a tag

Do not use a tag as a button. A tag is metadata; a button performs an action on
the page. Do not use a tag for a long phrase — anything over about three words
stops reading as a label.

### Do and don't

| Do | Don't |
|---|---|
| Keep labels to one to three words | Write a sentence inside a tag |
| Use consistent capitalisation across a set | Mix sentence case and title case |
| Pair a status tag with visible text elsewhere | Use tag colour as the only signal of status |
| Group applied filters together above the results | Scatter dismissible tags through a page |

## Design rationale

### Status is never carried by colour alone

The `info` variant changes the tag's colour, but the label always states the
status in words. Colour differences are unavailable to users with certain forms
of colour vision deficiency and are lost entirely in high-contrast modes
(W3C 2023).

### Dismissible tags announce what they remove

A dismissible tag's accessible name includes both the filter and the action, so
a screen reader user hears "Remove filter Brisbane" rather than an unlabelled
close control.

### References

W3C (2023) *Understanding Success Criterion 1.4.1: Use of Color*, Web Content
Accessibility Guidelines 2.2, accessed 10 September 2026.

## Accessibility

### Perceivable

**1.4.1 Use of Color (A)** — Meaning is carried by the label text, not by the
tag colour.

**1.4.3 Contrast (Minimum) (AA)** — Tag text meets 4.5:1 against the tag
background in every variant.

### Operable

**2.5.5 Target Size (Enhanced) (AAA)** — Interactive tags, including the dismiss
control, meet the minimum target size.

### What you still own

A group of tags needs a programmatic relationship to what it describes. Wrap a
filter set in a labelled region, and announce the change to the result count
when a tag is dismissed — the component does not know what your results are.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | `""` | Tag text |
| `variant` | `default` \| `info` \| `action` \| `dismissible` | `default` | Tag type |
| `size` | `sm` \| `lg` | — | Tag size |
| `href` | string | — | Renders the tag as a link |
| `target` | string | — | Only with `href` |

Emits `qgds-click` when an action tag is activated, and `qgds-dismiss` when a
dismissible tag is removed.

### Handling dismissal

```js
document.querySelector("#filters")
  .addEventListener("qgds-dismiss", (event) => {
    event.target.remove();
    updateResults();
  });
```
