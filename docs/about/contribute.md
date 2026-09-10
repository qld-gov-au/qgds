---
title: Contribute
nav_order: 10
summary: >-
  How to add a page, propose a component, or fix something that is wrong.
---

## Add or edit a page

Content is markdown. The navigation, breadcrumbs and search index are all built
from the folder structure, so adding a page is one file.

1. Create a `.md` file in the right section folder — for example
   `components/pagination.md`.
2. Give it front matter with at least a `title`.
3. Commit. The vertical navigation, the section index cards, the breadcrumbs
   and the search index update themselves.

```yaml
---
title: Pagination
nav_order: 80
summary: >-
  Splits a long list of results across multiple pages.
status: Stable
since: "0.3.0"
---
```

### Front matter reference

| Key | Purpose |
|---|---|
| `title` | Page title and nav label. A page without one is skipped by the nav |
| `nav_title` | Shorter label to use in navigation only |
| `nav_order` | Integer, ascending. Defaults to 100 |
| `nav_exclude` | `true` to hide the page from navigation |
| `search_exclude` | `true` to keep the page out of the search index |
| `summary` | One or two sentences. Used on cards, in search, and under the h1 |
| `status` / `since` | Optional tags shown under the page title |
| `layout` | `page` (default), `section` for a folder index, `home` |
| `inpage_nav` | `false` to suppress the "On this page" navigation |

### Adding a section

Create a folder with an `index.md` that uses `layout: section`. It becomes a
top-level navigation item, ordered by its `nav_order`.

### Nesting

A sub-folder with its own `index.md` nests one level deeper in the navigation.
`components/form/text-input.md` renders as **Components → Form → Text input**.
`_includes/site-nav.html` supports three levels. To go deeper, copy the
innermost loop and match on `depth == 5`.

### One navigation, everywhere

There is a single `qgds-navigation` for the whole site, in
`_includes/site-nav.html`. It lists every section with its pages nested
beneath, the section you are reading is expanded on load, and the current page
is marked. Do not add a second `qgds-navigation` to a page: both would listen
for the same global toggle event and the header's Menu button would open two
stacked drawers.

## Live examples in a page

Wrap the markup in a `capture` and pass it to the `example.html` include. It is
rendered live and shown as copyable source.

{% raw %}
```liquid
{% capture demo %}
<qgds-button label="Save and continue" variant="primary"></qgds-button>
{% endcapture %}
{% include example.html code=demo title="Primary button" %}
```
{% endraw %}

## Propose a component

Before proposing a new component, check that:

- The problem has been solved more than once, by more than one team
- No existing component can be composed to solve it
- You have evidence from research or testing, not just a preference

Open an issue on the [component library repository](https://github.com/qld-gov-au/qgds-web-components/issues)
with the problem, the evidence, and any existing implementations.

## Report a problem

If something on this site is wrong, out of date, or inaccessible, raise an issue.
Accessibility defects are treated as bugs, not enhancements.
