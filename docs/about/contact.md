---
title: Contact
nav_order: 30
inpage_nav: false
summary: >-
  How to reach the design system team.
---

{% capture demo_contact %}
<qgds-inpage-alert variant="info" heading="Before you get in touch" heading-level="3">
  <p>Check the <a href="/about/contribute.html">Contribute</a> page first — most questions about adding a page or proposing a component are answered there.</p>
</qgds-inpage-alert>
{% endcapture %}
{% include example.html code=demo_contact padded="false" %}

## Email

For questions, feedback and change proposals:
[{{ site.contact.email }}](mailto:{{ site.contact.email }})

## Raise an issue

For defects in the component library, including accessibility defects, open an
issue on GitHub:

- [qgds-web-components](https://github.com/qld-gov-au/qgds-web-components/issues)
- [qgds-bootstrap5](https://github.com/qld-gov-au/qgds-bootstrap5/issues)
- [qgds-vanilla](https://github.com/qld-gov-au/qgds-vanilla/issues)

## What to include

A useful report has four things:

1. What you were trying to do
2. What happened instead
3. The component, version and browser
4. A link to a reproduction, or the markup you used
