class Navigation {
  constructor() {
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.navList = document.querySelector(".nav-list");
    this.init();
  }

  init() {
    if (this.mobileMenuBtn && this.navList) {
      this.mobileMenuBtn.addEventListener("click", () =>
        this.toggleMobileMenu()
      );

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !e.target.closest(".main-nav") &&
          this.navList.classList.contains("nav-list--active")
        ) {
          this.closeMobileMenu();
        }
      });

      // Set active menu item based on current page
      this.setActiveMenuItem();
      
      // Prevent click on span elements with has-nested class
      this.preventSpanClicks();
    }
  }

  preventSpanClicks() {
    // Prevent navigation when clicking on span elements with has-nested class
    document.querySelectorAll('span.nav-dropdown-item.has-nested').forEach(span => {
      span.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    });
  }

  setActiveMenuItem() {
    const currentPath = this.normalizePath(window.location.pathname);
    if (!currentPath) {
      return;
    }

    // Remove existing active classes
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("nav-link--active");
    });
    document.querySelectorAll(".nav-dropdown-item").forEach((item) => {
      item.classList.remove("nav-dropdown-item--active");
    });
    document.querySelectorAll(".nav-list > li").forEach((li) => {
      li.classList.remove("active-parent");
    });

    const links = document.querySelectorAll(".nav-link, .nav-dropdown-item");
    let bestMatch = null;

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const normalizedLinkPath = this.resolveHrefToPath(href);
      if (!normalizedLinkPath) {
        return;
      }

      const isExactMatch = currentPath === normalizedLinkPath;
      const isSectionMatch =
        !isExactMatch &&
        normalizedLinkPath !== "/" &&
        currentPath.startsWith(normalizedLinkPath);

      if (isExactMatch || isSectionMatch) {
        if (
          !bestMatch ||
          normalizedLinkPath.length > bestMatch.path.length
        ) {
          bestMatch = {
            element: link,
            path: normalizedLinkPath,
            exact: isExactMatch,
          };
        }
      }
    });

    if (!bestMatch) {
      return;
    }

    this.applyActiveState(bestMatch.element);
  }

  resolveHrefToPath(href) {
    try {
      const tempLink = document.createElement("a");
      tempLink.href = href;
      return this.normalizePath(tempLink.pathname);
    } catch (e) {
      return null;
    }
  }

  normalizePath(pathname) {
    if (!pathname) {
      return null;
    }

    let normalized = pathname.split("?")[0].split("#")[0];
    normalized = normalized.replace(/index\.html$/i, "");
    normalized = normalized.replace(/\/+$/, "");

    if (normalized === "") {
      normalized = "/";
    }

    return normalized.toLowerCase();
  }

  applyActiveState(element) {
    if (!element) {
      return;
    }

    if (element.classList.contains("nav-link")) {
      element.classList.add("nav-link--active");
      return;
    }

    if (element.classList.contains("nav-dropdown-item")) {
      element.classList.add("nav-dropdown-item--active");

      const nestedParent = element.closest(".nav-dropdown-item.has-nested");
      if (nestedParent && nestedParent !== element) {
        nestedParent.classList.add("nav-dropdown-item--active");
      }

      const parentLi = element.closest(".nav-list > li");
      if (parentLi) {
        parentLi.classList.add("active-parent");
        const parentLink = parentLi.querySelector(".nav-link");
        if (parentLink) {
          parentLink.classList.add("nav-link--active");
        }
      }
    }
  }

  toggleMobileMenu() {
    this.navList.classList.toggle("nav-list--active");
    this.mobileMenuBtn.innerHTML = this.navList.classList.contains(
      "nav-list--active"
    )
      ? "✕"
      : "☰";
  }

  closeMobileMenu() {
    this.navList.classList.remove("nav-list--active");
    this.mobileMenuBtn.innerHTML = "☰";
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
});
