---
# Front matter makes Jekyll process this file. `layout: null` stops the
# site-wide default layout from wrapping it in HTML.
layout: null
sitemap: false
---
/* =========================================================================
   Documentation site behaviour
   -------------------------------------------------------------------------
   1. Dock the whole-site vertical nav into the left rail on wide viewports
   2. Expand the branch of that nav containing the current page
   3. Build the "On this page" nav from the h2 headings in the content
   4. Copy-to-clipboard on example code blocks
   5. Header search: type-ahead suggestions + a /search.html results page
   All of it degrades gracefully — none of it is required to read a page.
   ========================================================================= */
(function () {
  "use strict";

  var BASE = "{{ site.baseurl }}";

  /* ---------------------------------------------------------------------
     0. Dock the navigation
     ---------------------------------------------------------------------
     qgds-navigation must sit in qgds-header's `navigation` slot for the
     header to render its mobile Menu button — the header only shows it when
     that slot holds exactly one qgds-navigation, and the button dispatches
     the document-level event this component listens for.

     Below 992px the component turns itself into a modal drawer, which is
     exactly what we want from the Menu button. At and above 992px we want it
     in the page's left rail instead, so we physically move the element.
     Moving it re-runs connected/disconnectedCallback, which re-registers its
     document listeners correctly either way.
     --------------------------------------------------------------------- */
  var DESKTOP = "(min-width: 992px)";

  function dockNav() {
    var nav = document.getElementById("main-nav");
    var rail = document.getElementById("dsq-nav-rail");
    var header = document.querySelector("qgds-header");
    if (!nav || !header) return;

    var wide = window.matchMedia(DESKTOP).matches;

    if (wide && rail && nav.parentElement !== rail) {
      nav.removeAttribute("slot");
      rail.appendChild(nav);
    } else if (!wide && nav.parentElement !== header) {
      nav.setAttribute("slot", "navigation");
      header.appendChild(nav);
    }
  }

  function watchViewport() {
    var mq = window.matchMedia(DESKTOP);
    var handler = function () { dockNav(); expandCurrentBranch(); };
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  /* ---------------------------------------------------------------------
     1. Expand the current branch
     ---------------------------------------------------------------------
     qgds-link-item starts collapsed and has no notion of a current page, so
     the section the reader is in would otherwise be shut. The chevron toggle
     lives in the component's shadow root; clicking it is the only supported
     way to open the item from outside.
     --------------------------------------------------------------------- */
  function expandCurrentBranch() {
    var nav = document.getElementById("main-nav");
    if (!nav || !window.customElements) return;

    Promise.all([
      customElements.whenDefined("qgds-navigation"),
      customElements.whenDefined("qgds-link-item"),
    ]).then(function () {
      var current = nav.querySelector("qgds-link-item[data-section-current]");
      if (!current) return;

      // The toggle only exists once the component has moved the nested items
      // into a qgds-link-column and re-rendered, which takes an indeterminate
      // number of frames. Poll for it rather than guessing a delay.
      var attempts = 0;
      (function tryExpand() {
        var toggle = current.shadowRoot &&
          current.shadowRoot.querySelector("button.dropdown-toggle");

        if (toggle) {
          if (toggle.getAttribute("aria-expanded") === "false") toggle.click();
          return;
        }
        if (++attempts > 60) return; // ~1s at 60fps, then give up quietly
        requestAnimationFrame(tryExpand);
      })();
    });
  }

  /* ---------------------------------------------------------------------
     1. On this page
     --------------------------------------------------------------------- */
  function buildInpageNav() {
    var nav = document.getElementById("dsq-inpage-nav");
    var content = document.querySelector("[data-content]");
    if (!nav || !content) return;

    var headings = content.querySelectorAll("h2[id]");
    if (headings.length < 2) {
      nav.remove();
      return;
    }

    headings.forEach(function (h) {
      var item = document.createElement("qgds-inpage-nav-item");
      item.setAttribute("href", "#" + h.id);
      item.textContent = h.textContent.trim();
      nav.appendChild(item);
    });

    nav.hidden = false;
  }

  /* ---------------------------------------------------------------------
     1b. Wrap markdown tables in <qgds-table>
     ---------------------------------------------------------------------
     Kramdown renders a plain <table> from markdown table syntax. qgds-table
     slots exactly one native <table>, so wrapping the rendered element gives
     the component treatment without forcing authors to write raw HTML in
     every content file.

     Per-table overrides come from an attribute list on the preceding
     comment-free marker, or from the page's `table_options` front matter;
     both are optional and the defaults suit a documentation table.
     --------------------------------------------------------------------- */
  function wrapTables() {
    var content = document.querySelector("[data-content]");
    if (!content) return;

    var defaults = (window.DSQ_TABLE_DEFAULTS || {});
    var tables = content.querySelectorAll("table");

    Array.prototype.forEach.call(tables, function (table) {
      // Skip anything already inside a qgds-table, and anything inside a live
      // example — those are authored markup and must render exactly as written.
      if (table.closest("qgds-table")) return;
      if (table.closest(".dsq-example__preview")) return;

      var wrapper = document.createElement("qgds-table");
      wrapper.setAttribute("responsive", table.dataset.responsive || defaults.responsive || "scroll");
      if (table.dataset.striped !== "false" && defaults.striped !== false) wrapper.setAttribute("is-striped", "");
      if (table.dataset.border === "true" || defaults.border) wrapper.setAttribute("has-border", "");

      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  /* ---------------------------------------------------------------------
     2. Copy code
     --------------------------------------------------------------------- */
  function wireCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pre = btn.parentElement.querySelector("pre");
        if (!pre || !navigator.clipboard) return;
        navigator.clipboard.writeText(pre.innerText).then(function () {
          var original = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = original; }, 1600);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. Search
     --------------------------------------------------------------------- */
  var indexPromise = null;

  function loadIndex(endpoint) {
    if (!indexPromise) {
      indexPromise = fetch(endpoint)
        .then(function (r) { return r.json(); })
        .catch(function () { return []; });
    }
    return indexPromise;
  }

  function score(entry, terms) {
    var title = entry.title.toLowerCase();
    var body = (entry.section + " " + entry.summary + " " + entry.body).toLowerCase();
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      if (title === t) total += 100;
      else if (title.indexOf(t) === 0) total += 50;
      else if (title.indexOf(t) > -1) total += 25;
      else if (body.indexOf(t) > -1) total += 5;
      else return 0;
    }
    return total;
  }

  function search(entries, query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return entries
      .map(function (e) { return { entry: e, score: score(e, terms) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (r) { return r.entry; });
  }

  function wireHeaderSearch() {
    var input = document.getElementById("site-search");
    if (!input) return;

    var endpoint = input.dataset.searchEndpoint;
    var resultsPage = input.dataset.searchPage;

    input.addEventListener("qgds-input", function (event) {
      var value = (event.detail && event.detail.value) || "";
      if (value.trim().length < 2) {
        input.suggestions = [];
        return;
      }
      loadIndex(endpoint).then(function (entries) {
        var hits = search(entries, value).slice(0, 6);
        input.suggestions = hits.length
          ? [{
              type: "suggestion",
              heading: "Pages",
              items: hits.map(function (e) {
                return { label: e.title + " — " + e.section, href: e.url, icon: "arrow-right" };
              }),
              viewMoreLabel: "See all results",
              viewMoreUrl: resultsPage + "?q=" + encodeURIComponent(value)
            }]
          : [];
      });
    });

    input.addEventListener("qgds-search", function (event) {
      var value = (event.detail && event.detail.value) || input.value || "";
      if (!value.trim()) return;
      window.location.href = resultsPage + "?q=" + encodeURIComponent(value);
    });
  }

  function renderResultsPage() {
    var host = document.getElementById("dsq-search-results");
    if (!host) return;

    var query = new URLSearchParams(window.location.search).get("q") || "";
    var heading = document.getElementById("dsq-search-heading");
    var field = document.getElementById("dsq-search-field");
    if (field) field.value = query;

    if (!query.trim()) {
      if (heading) heading.textContent = "Enter a search term to begin.";
      return;
    }

    loadIndex(host.dataset.searchEndpoint).then(function (entries) {
      var hits = search(entries, query);
      if (heading) {
        heading.textContent = hits.length +
          (hits.length === 1 ? " result for " : " results for ") + "“" + query + "”";
      }
      host.innerHTML = hits.map(function (e) {
        return '<li><span class="dsq-results__section">' + escapeHtml(e.section) + "</span>" +
          '<a href="' + e.url + '">' + escapeHtml(e.title) + "</a>" +
          "<p>" + escapeHtml(e.summary || e.body.slice(0, 180)) + "</p></li>";
      }).join("");
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* --------------------------------------------------------------------- */
  function init() {
    dockNav();
    watchViewport();
    expandCurrentBranch();
    wrapTables();
    buildInpageNav();
    wireCopyButtons();
    wireHeaderSearch();
    renderResultsPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
