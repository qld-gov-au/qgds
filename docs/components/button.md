---
title: Button
nav_order: 20
status: Stable
since: "0.1.0"
summary: >-
  Buttons let users carry out an action. Use one button per screen for the
  action you want most users to take.
---

A button triggers an action — submitting a form, starting an application,
confirming a decision. A link navigates. Choose between them by what happens
next, not by how the control looks.

## Variants

- **Primary** — the action you want most users to take. One per screen.
- **Secondary** — an alternative action of equal weight, or a step backwards.
- **Tertiary** — a low-emphasis action that must not compete with the content.

{% capture demo_buttons %}
<qgds-button label="Start application" variant="primary"></qgds-button>
<qgds-button label="Save and exit" variant="secondary"></qgds-button>
<qgds-button label="Cancel" variant="tertiary"></qgds-button>
{% endcapture %}
{% include example.html code=demo_buttons title="Button variants" %}

## Usage guidance

### When to use a button

Use a button when the control changes something: submits data, opens a dialog,
starts a process, or confirms an action.

### When not to use a button

Use a link when the control takes the user to another page or to another point
on the same page. Styling a link as a button does not change what it does, and
users who open links in a new tab will find that the control does not behave as
expected.

### Do and don't

| Do | Don't |
|---|---|
| Start the label with a verb: "Submit application" | Use "Click here" or "Submit" with no object |
| Use one primary button per screen | Place two primary buttons side by side |
| Put the primary action first in the reading order | Order actions by how destructive they are |
| Use `is-loading` while an action is in flight | Disable a button to indicate a validation error |

### Content guidelines

Label the button with the action it performs, in the user's words. "Start
application" is better than "Continue", because it survives being read out of
context by a screen reader listing every control on the page.

Avoid disabling buttons to communicate that a form is incomplete. A disabled
control gives users nothing to act on and is not announced consistently. Let the
user submit, then show them what needs fixing.

## Design rationale

### Three levels of emphasis, not more

Research on visual hierarchy shows that users identify the primary action fastest
when there is exactly one high-emphasis control in view (Nielsen Norman Group
2020). A fourth level of emphasis reduces the distinction between the others
without adding useful information.

### Loading state instead of disabling on submit

Disabling a button on submit removes it from the tab order, which moves focus
unpredictably. The `is-loading` state keeps the control focusable, announces the
loading label to assistive technology, and prevents double submission.

### References

Digital Transformation Agency (2018) *Buttons*, Gold Design System, accessed
10 September 2026.

Nielsen Norman Group (2020) *Visual Hierarchy in UX Design*, accessed
10 September 2026.

UK Government Digital Service (2024) *Button component*, GOV.UK Design System,
accessed 10 September 2026.

## Accessibility

### Perceivable

**1.4.3 Contrast (Minimum) (AA)** — Button text meets a 4.5:1 contrast ratio
against its background in every variant and state.

**1.4.11 Non-text Contrast (AA)** — Button boundaries and focus indicators meet
a 3:1 contrast ratio against adjacent colours.

### Operable

**2.1.1 Keyboard (A)** — Buttons are reachable and activatable with
<kbd>Enter</kbd> and <kbd>Space</kbd>.

**2.5.5 Target Size (Enhanced) (AAA)** — The default target is at least 44 × 44
CSS pixels.

### Understandable

**3.2.4 Consistent Identification (AA)** — Use the same label for the same
action across a service.

### Robust

**4.1.2 Name, Role, Value (A)** — The component renders a native `<button>`, or
an `<a>` when `href` is set, so role and state are exposed without extra ARIA.

### What you still own

Setting `href` renders a link, not a button. If you do that, the label must
describe a destination rather than an action. Also check that the label alone is
meaningful — `aria-label` overrides the visible text for screen reader users,
which creates a mismatch if the two say different things.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | `""` | The visible button text |
| `variant` | `primary` \| `secondary` \| `tertiary` | `primary` | Emphasis level |
| `href` | string | — | Renders an anchor instead of a button |
| `target` | `_self` \| `_blank` \| `_parent` \| `_top` | — | Only with `href` |
| `type` | `button` \| `submit` \| `reset` | `button` | Native button type |
| `icon-name` | icon id | — | Adds an icon |
| `icon-position` | `leading` \| `trailing` | — | Icon placement |
| `is-loading` | boolean | `false` | Shows the loading state |
| `loading-label` | string | `"Loading..."` | Announced while loading |
| `disabled` | boolean | `false` | Disables the control |

### With an icon

{% capture demo_icon %}
<qgds-button label="Download the form" variant="secondary" icon-name="download" icon-position="leading"></qgds-button>
<qgds-button label="Open in a new tab" variant="tertiary" icon-name="external-link" icon-position="trailing" href="https://www.qld.gov.au" target="_blank"></qgds-button>
{% endcapture %}
{% include example.html code=demo_icon title="Buttons with icons" %}

### Loading state

{% capture demo_loading %}
<qgds-button label="Submitting" variant="primary" is-loading loading-label="Submitting your application"></qgds-button>
{% endcapture %}
{% include example.html code=demo_loading title="Loading" %}
