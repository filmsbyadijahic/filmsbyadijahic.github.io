/* adijahicfilm — small progressive enhancements. The site works without JS. */
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Current year in the footer
  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Publish the sticky header's height so the photography page can offset
  // its jump bar and its scroll targets against it.
  var header = document.querySelector(".site-header");
  if (header) {
    var setHeaderHeight = function () {
      document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    };
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
  }

  // Home page: the header floats over the photo until the photo has scrolled
  // past, then becomes the normal solid bar again (styling in styles.css).
  var photo = document.querySelector(".photo-hero");
  if (header && photo) {
    header.classList.add("is-overlay");
    var syncHeader = function () {
      var limit = photo.offsetTop + photo.offsetHeight - header.offsetHeight;
      header.classList.toggle("is-solid", window.pageYOffset > limit - 1);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    window.addEventListener("resize", syncHeader);
  }

  // Highlight the jump link for the series currently in view
  var jumpLinks = document.querySelectorAll(".photo-nav-link");
  if (jumpLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    Array.prototype.forEach.call(jumpLinks, function (link) {
      byId[link.getAttribute("href").slice(1)] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Array.prototype.forEach.call(jumpLinks, function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    document.querySelectorAll(".photo-series").forEach(function (section) {
      observer.observe(section);
    });
  }
})();
