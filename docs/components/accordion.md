---
title: Accordion
nav_order: 10
status: Stable
since: "0.1.0"
summary: >-
  Accordions show and hide sections of related content on the same page, so
  users only see the information they need.
---

Accordions allow users to show and hide sections of related content on the same
page, reducing cognitive load by presenting only the information a user needs at
any given time.

Also known as: expandable section, collapsible panel, disclosure widget.

## Variants

- **Single accordion** — one expandable panel. Use for video transcripts, or for
  reference material at the foot of an article.
- **Accordion group** — a set of related panels with optional "Open all" and
  "Close all" controls.

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

## Usage guidance

### When to use an accordion

Use an accordion when:

- The page holds several sections of content and users are unlikely to need all
  of them at once
- Screen space is limited and content can be disclosed selectively
- Users know which section holds the information they came for

### When not to use an accordion

Avoid an accordion when:

- Your audience needs most or all of the content to answer their question —
  showing it by default is more appropriate (Loranger 2014)
- The content is short enough to display in full
- Users need to compare information across panels — use a table instead
- There is only one item to expand — use a standard content section

### Do and don't

| Do | Don't |
|---|---|
| Write headings that describe what is inside the panel | Use vague labels like "More information" |
| Allow multiple panels to be open at once | Collapse one panel when another opens |
| Use "Open all" / "Close all" for groups of three or more | Put content every user needs inside an accordion |
| Use a single accordion for transcripts and footnotes | Nest an accordion inside another accordion |

### Content guidelines

Keep headings under 10 words. The heading must tell users what they will find so
they can decide whether to open the panel. Prefer noun-led headings ("Fees and
charges") over gerunds ("Paying your fees").

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
