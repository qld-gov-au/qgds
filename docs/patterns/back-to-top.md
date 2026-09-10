---
title: Back to top
nav_order: 10
summary: >-
  A persistent control that returns users to the top of a long page.
---

On pages longer than about three screens, a back-to-top control saves users a
long scroll back to the navigation.

## When to use it

Use it when:

- The page is longer than roughly three viewport heights
- The primary navigation sits at the top of the page and is needed again at the
  end
- Content is read sequentially — guidance, legislation, long reference material

Do not use it on short pages, or on pages with a persistent header that already
carries the navigation. A control that appears on a page users never scroll is
clutter.

## How to build it

The pattern is a `qgds-direction-link` fixed to the end of the content flow,
revealed once the user has scrolled past the first viewport.

{% capture demo_backtotop %}
<qgds-direction-link direction="up" href="#main-content" label="Back to top"></qgds-direction-link>
{% endcapture %}
{% include example.html code=demo_backtotop title="Back to top link" %}

```js
const control = document.querySelector("[data-back-to-top]");
const sentinel = document.querySelector("#main-content");

new IntersectionObserver(([entry]) => {
  control.hidden = entry.isIntersecting;
}).observe(sentinel);
```

## Accessibility

**2.4.1 Bypass Blocks (A)** — A back-to-top control complements, but does not
replace, skip links. Keep both.

**2.4.7 Focus Visible (AA)** — The control must be reachable by keyboard and
show a visible focus indicator. Do not remove it from the tab order when it is
visually hidden — set `hidden` so it leaves the accessibility tree entirely,
rather than hiding it with opacity.

**3.2.5 Change on Request (AAA)** — Move focus to the target after activation, so
keyboard and screen reader users continue from the top rather than from where
they were.

```js
control.addEventListener("click", () => {
  const target = document.querySelector("#main-content");
  target.focus({ preventScroll: false });
});
```

The target needs `tabindex="-1"` to be focusable. The page layout in this site
already sets it on `<main id="main-content">`.

## Do and don't

<div class="dsq-guidance">
  <div class="dsq-guidance__item dsq-guidance__item--do">
    <h4>Do</h4>
    <ul>
      <li>Reveal the control only after the user has scrolled</li>
      <li>Move focus to the top target, not just the scroll position</li>
      <li>Respect <code>prefers-reduced-motion</code> for the scroll animation</li>
    </ul>
  </div>
  <div class="dsq-guidance__item dsq-guidance__item--dont">
    <h4>Don't</h4>
    <ul>
      <li>Cover content or controls with a floating control on small screens</li>
      <li>Hide it with opacity while leaving it in the tab order</li>
      <li>Use it as a substitute for shortening an over-long page</li>
    </ul>
  </div>
</div>
