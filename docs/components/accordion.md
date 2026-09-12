---
title: Accordion
nav_order: 10
status: Stable
since: "0.1.0"
summary: >-
  May also be known as:
  Arrow toggle, collapsible sections, disclosure, expander
---

## Overview

Accordions expand and collapse sections of content.

There are 2 types of accordions available in the Design System, single action accordions and accordion groups.

## Single accordion

A singular method of expanding and collapsing a piece of content with a title. These are best used for transcripts of videos, or for references at the footer of an article.

{% capture demo_accordion %}
<qgds-accordion-group show-controls="auto">
  <qgds-accordion title="What you need to apply">
    <p>You will need your customer reference number, a form of photo identification, and proof of your current address.</p>
  </qgds-accordion>
  <qgds-accordion title="How long it takes">
    <p>Most applications are decided within 10 business days. Applications that need supporting documents can take up to 20 business days.</p>
  </qgds-accordion>
  <qgds-accordion title="What it costs">
    <p>There is no fee for a first application. Replacement documents cost $47.90.</p>
  </qgds-accordion>
</qgds-accordion-group>
{% endcapture %}
{% include example.html code=demo_accordion title="Accordion group" %}

## Accordion group

A group of accordions that expand and collapse on click. Only the accordion that's clicked changes.

{% capture demo_accordion %}
  <qgds-accordion title="Transcript">
    <p>You will need your customer reference number, a form of photo identification, and proof of your current address.</p>
  </qgds-accordion>
{% endcapture %}
{% include example.html code=demo_accordion title="Single accordion" %}

## Usage guidelines

### When to use an accordion

We recommend accordions be used sparingly for primary content on a page. While they can be appropriate for organising small, specific sections of content, accordions aren’t a suitable replacement for well formatted plain text. If a user needs all, or most of the information on the page it should be visible, not hidden inside an accordion.

Before using an accordion, consider whether the benefits outweigh the negative usability impacts.

- **Hiding content makes it harder for a user to scan a webpage.** If your content is hidden inside an accordion, it can be difficult for a user to scan the whole page for content relevant to them. Web browsers' ‘Find on page…' search functions don’t detect content hidden by accordions, making it harder for users to locate text.
- **Accordions increase cognitive load.** Forcing a user to click on each accordion to get the full text fragments their user experience, causing them to switch focus between accordions to get to the information. It’s also possible with hidden content, that a user might not see important information.

**Use an accordion when:**
- users need only a few key pieces of content on a single page
- hiding unimportant content within an accordion means users can efficiently focus on the few topics that matter (Loranger 2014).

### When not to use an accordion

**Avoid an accordion when:**
- your audience needs most or all of the content on the page to answer their questions (Loranger 2014)
- the amount of content it would need to contain will make the page slow to load
- you need to split up a series of questions into sections, use separate pages instead
- you have very short content, use lists or paragraphs instead
- you have very long content, use tabs or separate pages instead
- you use any other UI elements within the header
- there is important information which if hidden could be missed
- you want to shorten a page.

### Open and close all button

If you have 3 or more accordion buttons in a stack, you can add the expand and close all button as an option.

<hr>

## Design rationale

### Adapted from the DTA Gold Design System

The accordion design and guidance are based on the Digital Transformation
Agency's Gold Design System (Digital Transformation Agency 2018). The main
change is the addition of "Open all" and "Close all" controls on groups, which
reduces the number of interactions needed when users scan across sections.

### Multiple panels stay open

Some implementations collapse an open panel when another is opened. That
behaviour is unpredictable, because content the user was reading disappears
without them asking for it. Allowing panels to stay open gives users control
over what remains visible (Laubheimer and Budiu 2020).

### Chevron rather than plus and minus

Up and down chevrons indicate the expanded and collapsed states. Plus and minus
symbols read as additive actions — adding a dependant to a form, for example —
and arrows read as navigation. Chevrons are the most consistently recognised
indicator of expandable content (Laubheimer and Budiu 2020).

### References

Digital Transformation Agency (2018) *Accordion*, Gold Design System, accessed
10 September 2026.

Laubheimer P and Budiu R (2020) *Accordion Icons: Definition, Best Practices,
and Examples*, Nielsen Norman Group, accessed 10 September 2026.

Loranger H (2014) *Accordions Are Not Always the Answer for Complex Content on
Desktops*, Nielsen Norman Group, accessed 10 September 2026.

## Accessibility

Keep these considerations in mind if you are modifying the design system or
building a custom component.

### Perceivable

**1.3.1 Info and Relationships (A)** — Accordion headings are marked up as
heading elements so their structural role is conveyed to assistive technology.
Set a heading level that reflects the panel's place in the page hierarchy.

### Operable

**2.1.1 Keyboard (A)** — Every panel can be expanded and collapsed with a
keyboard alone.

**2.4.3 Focus Order (A)** — When a panel expands, focus stays on the trigger.
Focus must not jump into the revealed content.

**2.4.7 Focus Visible (AA)** — The focused trigger has a visible focus indicator
that meets the minimum contrast requirement.

### Understandable

**3.2.2 On Input (A)** — Panels expand only when the user asks. Nothing expands
as a side effect of another control changing.

### Robust

**4.1.2 Name, Role, Value (A)** — The trigger exposes `aria-expanded` and
`aria-controls`, so assistive technology can announce the current state.

### Keyboard interaction

| Key | Action |
|---|---|
| <kbd>Tab</kbd> | Move focus to the next focusable element |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move focus to the previous focusable element |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Toggle the focused panel |

### What you still own

The component cannot check that your heading levels are in order, that panel
headings are meaningful, or that the content inside a panel is itself
accessible. Those remain your responsibility.

## Implementation

### Single accordion

{% capture demo_single %}
<qgds-accordion title="Video transcript" is-open>
  <p>The Queensland Government provides a range of concessions to help with the cost of living.</p>
</qgds-accordion>
{% endcapture %}
{% include example.html code=demo_single title="Single accordion, open by default" %}

### Attributes

#### `qgds-accordion`

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | string | `""` | The panel heading |
| `is-open` | boolean | `false` | Renders the panel expanded on load |

Emits `qgds-toggle` when the panel opens or closes.

#### `qgds-accordion-group`

| Attribute | Type | Default | Description |
|---|---|---|---|
| `show-controls` | `true` \| `false` \| `"auto"` | `"auto"` | Show "Open all" / "Close all". `auto` shows them from three panels up |

The default slot accepts `qgds-accordion` elements only. Any other element is
not rendered.

### Listening for state changes

```js
document.querySelector("qgds-accordion")
  .addEventListener("qgds-toggle", (event) => {
    console.log(event.detail);
  });
```
