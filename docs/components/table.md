---
title: Table
nav_order: 50
status: Stable
since: "0.2.0"
summary: >-
  Tables present data that users need to compare across two dimensions. The
  component wraps a native table and handles small-screen behaviour.
---

The table component takes a standard, semantic `<table>` and adds Queensland
Government styling, a border and striping option, a sticky header, and a
responsive mode for narrow screens.

## Variants

- **Scroll** — the table scrolls horizontally inside its container. Preserves
  row and column relationships.
- **Stack** — each row becomes a block of label and value pairs on small
  screens.

{% capture demo_table %}
<qgds-table is-striped has-border responsive="scroll">
  <table>
    <caption>Concession card fees, 2026&ndash;27</caption>
    <thead>
      <tr>
        <th scope="col">Card type</th>
        <th scope="col">First issue</th>
        <th scope="col">Replacement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Seniors Card</th>
        <td>No fee</td>
        <td>$47.90</td>
      </tr>
      <tr>
        <th scope="row">Companion Card</th>
        <td>No fee</td>
        <td>No fee</td>
      </tr>
      <tr>
        <th scope="row">Carer Business Discount Card</th>
        <td>No fee</td>
        <td>$21.50</td>
      </tr>
    </tbody>
  </table>
</qgds-table>
{% endcapture %}
{% include example.html code=demo_table title="Striped table with a caption" %}

## Usage guidance

### When to use a table

Use a table when users need to compare values across rows and columns — fees by
card type, opening hours by location, eligibility by circumstance.

### When not to use a table

Do not use a table for layout. Do not use one for a simple list of items with a
single attribute each — a description list is clearer and reads better on a
phone.

### Do and don't

| Do | Don't |
|---|---|
| Give every table a `<caption>` | Rely on a nearby heading to describe the table |
| Use `<th scope="col">` and `<th scope="row">` | Use `<td>` with bold text for headers |
| Right-align numeric columns | Centre-align columns of numbers |
| Keep column headers to two or three words | Wrap header text over four lines |

### Choosing a responsive mode

Use `scroll` when the relationships between columns matter and users will
compare across them. Use `stack` when each row can stand alone as a record.
Stacking breaks column comparison, so it is the wrong choice for a rate table.

## Design rationale

### The component wraps a native table

The component slots a real `<table>` rather than generating one from data. This
keeps the semantics that assistive technology relies on — caption, scope,
header association — under the author's control, and means a table remains
readable if JavaScript has not loaded.

### Scroll is the default

Transforming a table into stacked blocks removes the ability to compare values
down a column, which is usually the reason the data is in a table at all. Users
handle a horizontally scrolling region better than they handle silently
restructured data, provided the scroll region is focusable and announced
(W3C 2023).

### References

Digital Transformation Agency (2018) *Table*, Gold Design System, accessed
10 September 2026.

W3C (2023) *Tables Tutorial*, Web Accessibility Initiative, accessed
10 September 2026.

## Accessibility

### Perceivable

**1.3.1 Info and Relationships (A)** — Header cells must use `<th>` with an
explicit `scope`. Without it, screen reader users hear values with no idea which
column they belong to.

**1.4.10 Reflow (AA)** — At 320 CSS pixels wide the table scrolls within its own
region rather than forcing the page to scroll horizontally.

### Operable

**2.1.1 Keyboard (A)** — The scroll region is focusable so keyboard users can
scroll it without a pointer.

### What you still own

The component styles the table you give it. It cannot add a caption, fix missing
`scope` attributes, or merge cells sensibly. Complex tables with merged cells
need `headers` and `id` attributes, which you must write yourself.

## Implementation

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `is-striped` | boolean | `false` | Alternating row backgrounds |
| `has-border` | boolean | `false` | Outer border and cell dividers |
| `has-sticky-header` | boolean | `false` | Header row stays visible while scrolling |
| `responsive` | `scroll` \| `stack` | `scroll` | Small-screen behaviour |

The default slot accepts exactly one native `<table>` element.

### Markdown tables

Plain markdown tables in a content page are styled by the documentation site
stylesheet, not by this component. Use `qgds-table` when you need striping,
borders, a sticky header or the stacking mode.
