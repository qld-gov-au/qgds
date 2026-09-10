---
title: Callout
nav_order: 30
status: Stable
since: "0.1.0"
summary: >-
  Callouts draw attention to information that is important but not urgent, and
  that sits outside the main flow of the page.
---

A callout separates a short block of related information from the surrounding
content — what a user needs before they start, or a caveat that applies to the
whole page.

## Variants

The callout has one visual treatment. Vary the heading level to fit the page
hierarchy, and the palette to fit the surrounding section.

{% capture demo_callout %}
<qgds-callout heading="Before you start" heading-level="h3">
  <p>You will need your customer reference number and a form of photo identification. The application cannot be saved once you begin.</p>
</qgds-callout>
{% endcapture %}
{% include example.html code=demo_callout title="Callout" %}

## Usage guidance

### When to use a callout

Use a callout for information that is relevant to the whole page and that a user
needs before acting — prerequisites, eligibility summaries, or an important
caveat.

### When not to use a callout

Do not use a callout for:

- **Time-sensitive or system status information.** Use an
  [in-page alert]({{ '/components/' | relative_url }}) instead, which
  carries a status role and colour.
- **Ordinary body content.** A page where several blocks are called out has no
  emphasis at all.
- **Promotional content.** Use a promotional panel.

### Do and don't

| Do | Don't |
|---|---|
| Use at most one callout per page | Stack callouts one after another |
| Keep the content to a short paragraph or a short list | Put long-form content inside a callout |
| Write a heading that summarises what is inside | Leave the default heading text in place |
| Set `heading-level` to match the surrounding hierarchy | Skip heading levels to get a particular size |

## Design rationale

### Emphasis by containment, not by colour

The callout is distinguished by a border and background shade rather than a
status colour. Status colours carry meaning — error, warning, success — and
reusing them for neutral emphasis erodes that meaning across a service
(W3C 2023). Users who cannot perceive colour differences still see the container.

### One per page

Emphasis is relative. Testing across government services consistently shows that
when more than one block on a page is visually promoted, users stop treating any
of them as more important than body content (Digital Transformation Agency 2018).

### References

Digital Transformation Agency (2018) *Callout*, Gold Design System, accessed
10 September 2026.

W3C (2023) *Understanding Success Criterion 1.4.1: Use of Color*, Web Content
Accessibility Guidelines 2.2, accessed 10 September 2026.

## Accessibility

### Perceivable

**1.3.1 Info and Relationships (A)** — The heading is a real heading element, so
the callout appears in the page's heading outline and can be navigated to.

**1.4.1 Use of Color (A)** — The callout does not rely on colour alone. The
border, background and heading all mark it as distinct.

**1.4.3 Contrast (Minimum) (AA)** — Text inside the callout meets 4.5:1 against
the callout background in every palette.

### Understandable

**3.2.3 Consistent Navigation (AA)** — Where a callout appears in the same
position on similar pages, keep it there.

### What you still own

Choose `heading-level` deliberately. The default is `h3`; if the callout sits
directly under the page `h1` with no `h2` between them, the outline will skip a
level. The component cannot detect this.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `heading` | string | `"Callout heading"` | Heading text |
| `heading-level` | `h2`–`h6` | `h3` | Heading element rendered |
| `heading-size` | `xs` \| `sm` \| `md` | — | Visual size, independent of level |

The default slot accepts typographic content — paragraphs, lists, links and
other components.

### With a nested action

{% capture demo_callout_action %}
<qgds-callout heading="Check your eligibility first" heading-level="h3">
  <p>Concessions are means tested. Check whether you qualify before you apply.</p>
  <qgds-link href="#" label="Check eligibility" icon-name="arrow-right" has-trailing-icon></qgds-link>
</qgds-callout>
{% endcapture %}
{% include example.html code=demo_callout_action title="Callout with a link" %}

### Choosing between callout and in-page alert

| Use | When |
|---|---|
| Callout | Information a user needs to read before acting, present on every visit |
| In-page alert | Something that has changed, gone wrong, or succeeded right now |
| Global alert | A message that applies across the whole site |
