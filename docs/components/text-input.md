---
title: Text input
nav_order: 10
status: Stable
since: "0.2.0"
summary: >-
  A single-line field for short free-text answers such as a name, reference
  number or email address.
---

Use a text input when the answer is short, free-form, and cannot be offered as a
set of choices.

## Variants

- **Filled** and **outlined** visual variants.
- **Types**: `text`, `email`, `password`, `number`, `tel`, `search`, `url`.
- **Sizes**: a character-width hint, or `full` to fill the container.

{% capture demo_input %}
<qgds-text-input
  id="crn"
  name="crn"
  label="Customer reference number"
  hint="You will find this at the top right of your notice, for example QLD-4471-2280."
  required></qgds-text-input>
{% endcapture %}
{% include example.html code=demo_input title="Text input with a hint" %}

## Usage guidance

### When to use a text input

Use it for a short answer the user knows and can type: a name, a reference
number, an email address, a postcode.

### When not to use a text input

Do not use one when the answer belongs to a known, finite set — use radios or a
select. Do not use one for a long answer — use a textarea. Do not use one for a
date; a single free-text date field produces unparseable input.

### Do and don't

| Do | Don't |
|---|---|
| Size the field to the expected answer | Make every field full width regardless of content |
| Give an example in the `hint` | Put the example in the placeholder |
| Set `autocomplete` for known personal data | Disable autocomplete on address or name fields |
| Say what is wrong and how to fix it | Write "Invalid input" |

### Writing hints and errors

A hint explains what to enter before the user types. An error explains what went
wrong and what to do about it. "Enter your customer reference number in the
format QLD-0000-0000" works as both; "This field is required" works as neither.

## Design rationale

### Field width signals expected length

A four-character field for a postcode and a full-width field for an email
address tell the user how long the answer should be before they start typing.
Uniform full-width fields remove that signal and increase correction rates
(Silver 2018).

### Errors sit below the label, above the field

Placing the error message between the label and the input means it is read as
part of the field's accessible description, in the order a screen reader
encounters it, and it is visible without scrolling on a small screen
(UK Government Digital Service 2024).

### References

Silver A (2018) *Form Design Patterns*, Smashing Magazine.

UK Government Digital Service (2024) *Text input component*, GOV.UK Design
System, accessed 10 September 2026.

## Accessibility

### Perceivable

**1.3.1 Info and Relationships (A)** — The label is programmatically associated
with the input, and hints and error messages are linked with
`aria-describedby`.

**1.3.5 Identify Input Purpose (AA)** — Set `autocomplete` on fields collecting
information about the user, so browsers and assistive technology can fill or
announce them.

**1.4.3 Contrast (Minimum) (AA)** — Label, hint and error text all meet 4.5:1.

### Operable

**2.4.6 Headings and Labels (AA)** — Labels describe the information being
requested, not the control.

**2.4.7 Focus Visible (AA)** — The focused field has a visible indicator that
does not rely on the border colour alone.

### Understandable

**3.3.1 Error Identification (A)** — Errors are described in text, not by colour
or an icon alone.

**3.3.2 Labels or Instructions (A)** — Every input has a visible label.

**3.3.3 Error Suggestion (AA)** — Where a fix is known, the error message says
what it is.

### What you still own

Server-side validation. `native-validate` uses the browser's constraint
validation, which a user can bypass. Always validate again on the server, and
render the same message text so the user sees a consistent explanation.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Visible label. Required. |
| `hint` | string | — | Guidance shown under the label |
| `type` | `text` \| `email` \| `password` \| `number` \| `tel` \| `search` \| `url` | `text` | Input type |
| `size` | number \| `full` | — | Character width, or full width |
| `variant` | `filled` \| `outlined` | — | Visual style |
| `required` | boolean | `false` | Marks the field required |
| `indicate-if` | `required` \| `optional` \| `none` | `required` | Which state gets a visible marker |
| `validation-state` | `success` \| `error` | — | Validation appearance |
| `validation-message` | string | — | Message shown with the state |
| `native-validate` | boolean | `false` | Use browser constraint validation |
| `autocomplete` | string | — | HTML autocomplete token |
| `readonly` / `disabled` | boolean | `false` | Field state |

Emits `qgds-change` with the value in `event.detail`.

### Error state

{% capture demo_input_error %}
<qgds-text-input
  id="email"
  name="email"
  type="email"
  label="Email address"
  autocomplete="email"
  validation-state="error"
  validation-message="Enter an email address in the format name@example.com"
  required></qgds-text-input>
{% endcapture %}
{% include example.html code=demo_input_error title="Text input in an error state" %}

### Reading the value

```js
document.querySelector("#crn")
  .addEventListener("qgds-change", (event) => {
    console.log(event.detail.value);
  });
```
