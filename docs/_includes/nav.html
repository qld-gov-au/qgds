{%- comment -%}
================================================================================
  Whole-site vertical navigation — <qgds-navigation variant="vertical">
================================================================================
  One navigation for the entire site, built from the repository folder
  structure. Nothing is hand-maintained: drop a .md file into a section folder
  and it appears here.

  Structure it understands (these are SOURCE paths, so this is independent of
  whatever `permalink` style you use):

    components/index.md            -> top-level item
    components/button.md           -> child of "Components"
    components/form/index.md       -> child of "Components", with children
    components/form/text-input.md  -> child of "Form"

  Front matter each page can set:
    title:        required — a page without a title is skipped
    nav_title:    optional shorter label to show in the nav
    nav_order:    optional integer, ascending (default 100 via _config.yml)
    nav_exclude:  optional, true to hide the page from navigation

  It lives in the header's `navigation` slot, which is what makes the header
  render its mobile Menu button (the header only shows it when that slot holds
  exactly one qgds-navigation). On viewports >= 992px, assets/js/site.js moves
  this element into the left rail; below that it stays in the header and opens
  as the standard mobile drawer. Without JavaScript it renders in the header —
  vertical, complete and usable, just not in the rail.
================================================================================
{%- endcomment -%}

{%- assign current_section = page.path | split: "/" | first -%}
{%- assign nav_pages = site.pages
      | where_exp: "p", "p.title"
      | where_exp: "p", "p.nav_exclude != true"
      | sort: "nav_order" -%}

<qgds-navigation
  slot="navigation"
  id="main-nav"
  variant="vertical"
  navigation-label="Main">

  <qgds-link-item
    is-nav-item
    href="{{ '/' | relative_url }}"
    label="Home"
    {% if page.url == '/' %}is-current{% endif %}></qgds-link-item>

  {%- for section in nav_pages -%}
    {%- assign sseg = section.path | split: "/" -%}
    {%- if sseg.size != 2 or sseg[1] != "index.md" -%}{%- continue -%}{%- endif -%}
    {%- assign section_slug = sseg[0] -%}

    <qgds-link-item
      is-nav-item
      href="{{ section.url | relative_url }}"
      label="{{ section.nav_title | default: section.title }}"
      {% if page.url == section.url %}is-current{% endif %}
      {% if current_section == section_slug %}data-section-current{% endif %}>

      {%- for item in nav_pages -%}
        {%- assign seg = item.path | split: "/" -%}
        {%- if seg[0] != section_slug -%}{%- continue -%}{%- endif -%}
        {%- assign depth = seg | size -%}

        {%- comment -%} Child: a file directly in the section folder {%- endcomment -%}
        {%- assign is_leaf = false -%}
        {%- if depth == 2 and seg[1] != "index.md" -%}{%- assign is_leaf = true -%}{%- endif -%}

        {%- comment -%} Child: the index.md of a sub-folder {%- endcomment -%}
        {%- assign is_folder = false -%}
        {%- if depth == 3 and seg[2] == "index.md" -%}{%- assign is_folder = true -%}{%- endif -%}

        {%- unless is_leaf or is_folder -%}{%- continue -%}{%- endunless -%}

        <qgds-link-item
          href="{{ item.url | relative_url }}"
          label="{{ item.nav_title | default: item.title }}"
          {% if page.url == item.url %}data-current{% endif %}>
          {%- if is_folder -%}
            {%- assign folder_slug = seg[1] -%}
            {%- for child in nav_pages -%}
              {%- assign cseg = child.path | split: "/" -%}
              {%- if cseg.size != 3 -%}{%- continue -%}{%- endif -%}
              {%- if cseg[0] != section_slug -%}{%- continue -%}{%- endif -%}
              {%- if cseg[1] != folder_slug -%}{%- continue -%}{%- endif -%}
              {%- if cseg[2] == "index.md" -%}{%- continue -%}{%- endif -%}
              <qgds-link-item
                class="dsq-nav-level-3"
                href="{{ child.url | relative_url }}"
                label="{{ child.nav_title | default: child.title }}"
                {% if page.url == child.url %}data-current{% endif %}></qgds-link-item>
            {%- endfor -%}
          {%- endif -%}
        </qgds-link-item>

      {%- endfor -%}
    </qgds-link-item>
  {%- endfor -%}
</qgds-navigation>
