class Navigation {
  constructor() {
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.navList = document.querySelector(".nav-list");
    this.rootPrefix = this.getRootPrefix();
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

      this.buildProductsDropdown();

      // Set active menu item based on current page
      this.setActiveMenuItem();
      
      // Prevent click on span elements with has-nested class
      this.preventSpanClicks();
  getRootPrefix() {
    const path = window.location.pathname
      ? window.location.pathname.replace(/\\/g, "/")
      : "";
    const pagesIndex = path.lastIndexOf("/pages/");

    if (pagesIndex !== -1) {
      const afterPages = path.slice(pagesIndex + "/pages/".length);
      const segments = afterPages.split("/").filter(Boolean);
      return "../".repeat(segments.length || 0);
    }

    const trimmed = path.replace(/^\//, "");
    const segments = trimmed.split("/").filter(Boolean);
    return segments.length > 1 ? "../".repeat(segments.length - 1) : "";
  }

  resolveLink(href) {
    if (!href) {
      return "#";
    }

    if (/^(https?:)?\/\//i.test(href)) {
      return href;
    }

    const normalized = href.replace(/^\/+/, "");
    return `${this.rootPrefix}${normalized}`;
  }

  getProductCatalogs() {
    return [
      {
        title: "Рукава высокого давления",
        link: "pages/products/high-pressure-hoses.html",
      },
      {
        title: "Фитинги и муфты для РВД",
        link: "pages/products/fittings.html",
      },
      {
        title: "Промышленные рукава",
        link: "pages/products/industrial-hoses.html",
      },
      {
        title: "Тефлоновые рукава",
        link: "pages/products/teflon-hoses.html",
      },
      {
        title: "Термопластиковые рукава",
        link: "pages/products/thermoplastic-hoses.html",
      },
      {
        title: "Морозостойкие рукава Parker",
        link: "pages/products/parker-hoses.html",
      },
      {
        title: "Каналопромывочные рукава",
        link: "pages/products/kanalopromyvochnye-hoses.html",
      },
      {
        title: "Термо защита рукава",
        link: "pages/products/termozashita.html",
      },
      {
        title: "Быстроразъёмные соединения (БРС)",
        link: "pages/products/quick-connections.html",
      },
      {
        title: "Краны шаровые высокого давления",
        link: "pages/products/ball-valves.html",
      },
      {
        title: "Трубные соединения DIN2353",
        link: "pages/products/pipe-connections.html",
      },
      {
        title: "Обрезные диски для РВД",
        link: "pages/products/cutting-disks.html",
      },
      {
        title: "Barboflex оборудование",
        link: "pages/products/barboflex.html",
      },
      {
        title: "Finn-Power оборудование",
        link: "pages/products/finnpower.html",
      },
      {
        title: "D-Hydro оборудование",
        link: "pages/products/d-hydro.html",
      },
      {
        title: "O+P (Италия)",
        link: "pages/products/op.html",
      },
      {
        title: "SAMWAY оборудование",
        link: "pages/products/samway.html",
      },
      {
        title: "UNIFLEX оборудование",
        link: "pages/products/uniflex.html",
      },
      {
        title: "Оборудование для РВД",
        link: "pages/products/equipment.html",
      },
    ];
  }

  buildProductsDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    if (!dropdown) {
      return;
    }

    const catalogs = this.getProductCatalogs();
    dropdown.innerHTML = "";

    catalogs.forEach((catalog) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.className = "nav-dropdown-item";
      link.href = this.resolveLink(catalog.link);
      link.textContent = catalog.title;
      li.appendChild(link);
      dropdown.appendChild(li);
    });
  }

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
