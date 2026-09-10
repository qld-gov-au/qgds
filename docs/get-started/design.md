---
title: Designing
nav_order: 10
summary: Set up your design tools, then work from the foundations up.
---

## Before you start

Confirm three things before you open a design tool.

1. **Which brand applies.** Read [Brand requirements]({{ '/brand-requirements/' | relative_url }})
   and identify whether your service is master brand, sub-brand, co-brand,
   endorsed or standalone. The answer changes the header, footer and colour use.
2. **What the user is trying to do.** The design system solves interface
   problems, not service design problems. It will not tell you what the right
   journey is.
3. **Whether a pattern already exists.** Check [Patterns]({{ '/patterns/' | relative_url }})
   before designing something new.

## Get the UI Kit

The [Queensland Government Design System UI Kit](https://www.figma.com/community/file/1577907940583715898/queensland-government-design-system-ui-kit)
is published to the Figma Community. Duplicate it into your team's project
rather than editing the community file directly.

The kit contains:

- Variables for colour, typography and spacing that map 1:1 to the CSS custom
  properties in the code library
- Components with the same variants and states as the web components
- Page templates for the most common layouts

## Work from the foundations up

Use the foundations before you use components. If a component does not exist for
what you need, compose one from the foundations rather than inventing new colour
or spacing values.

<div class="dsq-guidance">
  <div class="dsq-guidance__item dsq-guidance__item--do">
    <h4>Do</h4>
    <ul>
      <li>Use design tokens for every colour, size and spacing decision</li>
      <li>Detach a component only when you have exhausted its variants</li>
      <li>Annotate anything that departs from the system, and why</li>
    </ul>
  </div>
  <div class="dsq-guidance__item dsq-guidance__item--dont">
    <h4>Don't</h4>
    <ul>
      <li>Introduce new brand colours to signal state or hierarchy</li>
      <li>Change component padding to fit a layout — change the layout</li>
      <li>Rely on colour alone to communicate meaning</li>
    </ul>
  </div>
</div>

## Hand over to developers

A hand-off is complete when a developer can build the screen without asking you
what a value should be. Name the component and variant you used — for example
"callout, heading level 3" — rather than describing its appearance.

## Propose a change

If the system is missing something, raise it with the design system team before
building a one-off. See [Contribute]({{ '/about/contribute.html' | relative_url }}).
