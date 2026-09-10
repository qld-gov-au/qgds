---
layout: section
title: Form components
nav_title: Form
nav_order: 70
summary: >-
  Inputs, selects and the supporting elements users need to give you
  information.
cards_heading: Form components
---

This folder demonstrates a nested section. Because the navigation is built from
the folder structure, `components/form/index.md` becomes a level-1 item under
**Components**, and every other file in the folder nests beneath it.

Form components share a common set of attributes: `label`, `hint`, `required`,
`validation-state` and `validation-message`. Learn them once and they apply
across every input.

## Ask for one thing per page

Where a form is part of a transaction, ask one question per page. Users complete
long forms more reliably when each screen holds a single decision, and error
recovery is far simpler when an error can only belong to one field.

## Never rely on placeholder text

Placeholder text disappears the moment a user types, is often too low-contrast
to read, and is not reliably announced. Every field needs a visible `label`. Use
`hint` for supporting guidance that must stay on screen.
