---
title: Select
nav_order: 20
status: Stable
since: "0.2.0"
summary: >-
  A dropdown for choosing one option from a long list where radios would be
  impractical.
---

Use a select when the answer comes from a known list that is too long to show in
full.

{% capture demo_select %}
<qgds-select id="region" name="region" label="Which region do you live in?" required>
  <qgds-select-option value="brisbane">Brisbane</qgds-select-option>
  <qgds-select-option value="cairns">Cairns</qgds-select-option>
  <qgds-select-option value="darling-downs">Darling Downs</qgds-select-option>
  <qgds-select-option value="mackay">Mackay</qgds-select-option>
  <qgds-select-option value="townsville">Townsville</qgds-select-option>
</qgds-select>
{% endcapture %}
{% include example.html code=demo_select title="Select" %}

## Usage guidance

### When to use a select

Use a select when there are more than about seven options and the user knows the
answer already — a state, a country, a region.

### When not to use a select

- **Fewer than seven options** — use radios. Every option is visible, comparison
  is possible, and it takes one interaction instead of three.
- **A yes/no question** — use radios.
- **The user is deciding rather than recalling** — a select hides the options
  during the decision.
- **A date** — use dedicated day, month and year inputs.

### Do and don't

| Do | Don't |
|---|---|
| Order options logically: alphabetically, or by likelihood | Order options by internal system code |
| Use a group heading when the list has natural sections | Use blank options as separators |
| Keep the default as "Please select" | Preselect an option the user did not choose |

## Design rationale

### Selects are a last resort

Research across government services consistently finds that dropdowns are among
the least usable form controls: they hide their options, they behave differently
on every platform, and on touch devices they take over the screen. GOV.UK's
guidance is to consider a select only after ruling out radios, an autocomplete,
and progressive disclosure (UK Government Digital Service 2024).

### No preselected value

A preselected option is frequently submitted unchanged, which produces data that
records a default rather than a user's answer. The default is a non-value
placeholder, so an unanswered required question fails validation instead of
passing silently.

### References

UK Government Digital Service (2024) *Select component*, GOV.UK Design System,
accessed 10 September 2026.

## Accessibility

### Perceivable

**1.3.1 Info and Relationships (A)** — The label is associated with the control,
and option groups use a real grouping element so their headings are announced.

### Operable

**2.1.1 Keyboard (A)** — The control opens, moves through options and commits a
choice with the keyboard alone.

### Understandable

**3.2.2 On Input (A)** — Changing the selection must not submit the form or
navigate. Require a separate control for that.

**3.3.2 Labels or Instructions (A)** — Every select has a visible label.

### What you still own

If choosing an option changes what else is on the page, announce the change in a
live region. The component does not know what your form does in response.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Visible label. Required. |
| `hint` | string | — | Guidance shown under the label |
| `placeholder` | string | `"Please select"` | Non-value first option |
| `multiple` | boolean | `false` | Allow multiple selection |
| `required` | boolean | `false` | Marks the field required |
| `validation-state` | `success` \| `error` | — | Validation appearance |
| `validation-message` | string | — | Message shown with the state |
| `variant` | `filled` \| `outlined` | — | Visual style |

The default slot accepts `qgds-select-option` and `qgds-select-optgroup`
elements. Emits `qgds-change`.
