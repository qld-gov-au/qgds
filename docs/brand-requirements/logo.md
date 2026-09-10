---
title: Logo and Coat of Arms
nav_order: 10
summary: >-
  How to place the Queensland Government Coat of Arms, and the variants
  available.
---

The `qgds-logo` component renders the Coat of Arms at the correct size, with the
correct clear space, and links it to the site home page.

{% capture demo_logo %}
<qgds-logo logo="coa-delivering-for-qld" href="/" alt="Queensland Government home"></qgds-logo>
{% endcapture %}
{% include example.html code=demo_logo title="Coat of Arms" %}

## Variants

| Value | Use for |
|---|---|
| `coa-delivering-for-qld` | Default for most services |
| `coa-stacked` | Narrow header layouts |

For a co-branded or endorsed service, supply your own mark with `custom-logo` and
`custom-logo-alt`. Do not replace the Coat of Arms with a departmental mark on a
master-brand service.

## Alternative text

The logo is a link, so its accessible name must describe the destination, not the
image. "Queensland Government home" is correct. "Coat of Arms" describes the
picture and leaves a screen reader user with no idea where the link goes.

**2.4.4 Link Purpose (In Context) (A)** — The purpose of each link can be
determined from the link text alone.

## Do and don't

<div class="dsq-guidance">
  <div class="dsq-guidance__item dsq-guidance__item--do">
    <h4>Do</h4>
    <ul>
      <li>Use the component rather than an image file</li>
      <li>Link the logo to the home page of the service</li>
      <li>Keep the surrounding clear space free of other content</li>
    </ul>
  </div>
  <div class="dsq-guidance__item dsq-guidance__item--dont">
    <h4>Don't</h4>
    <ul>
      <li>Recolour, rotate, outline or add a shadow to the Coat of Arms</li>
      <li>Place it on a busy image or a low-contrast background</li>
      <li>Set it beside another mark of greater visual weight on a master-brand service</li>
    </ul>
  </div>
</div>

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `logo` | `coa-delivering-for-qld` \| `coa-stacked` | `coa-delivering-for-qld` | Which mark to render |
| `href` | string | `""` | Link destination |
| `alt` | string | `""` | Accessible name |
| `custom-logo` | string | `""` | URL of a custom mark |
| `custom-logo-alt` | string | `""` | Accessible name for a custom mark |
