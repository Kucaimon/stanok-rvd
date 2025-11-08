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
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const currentPageName = currentPage.replace('.html', '');
    
    // Remove all active states
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("nav-link--active");
    });
    document.querySelectorAll(".nav-dropdown-item").forEach(item => {
      item.classList.remove("nav-dropdown-item--active");
    });
    document.querySelectorAll(".nav-list > li").forEach(li => {
      li.classList.remove("active-parent");
    });

    let activeFound = false;
    let activeParent = null;

    // Check main navigation links first
    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (linkPath && !activeFound) {
        if (this.isExactPageMatch(linkPath, currentPath, currentPageName)) {
          link.classList.add("nav-link--active");
          activeFound = true;
          return;
        }
      }
    });

    // Check dropdown items if no main link is active
    if (!activeFound) {
      document.querySelectorAll(".nav-dropdown-item").forEach((item) => {
        const itemPath = item.getAttribute("href");
        if (itemPath && !activeFound) {
          if (this.isExactPageMatch(itemPath, currentPath, currentPageName)) {
            item.classList.add("nav-dropdown-item--active");
            // Mark parent as active
            const parentLi = item.closest(".nav-list > li");
            if (parentLi) {
              parentLi.classList.add("active-parent");
              const parentLink = parentLi.querySelector(".nav-link");
              if (parentLink) {
                parentLink.classList.add("nav-link--active");
              }
            }
            activeFound = true;
            activeParent = parentLi;
            return;
          }
        }
      });
    }

    // Check nested dropdown items (for equipment manufacturers)
    if (!activeFound) {
      document.querySelectorAll(".nav-dropdown-nested .nav-dropdown-item").forEach((item) => {
        const itemPath = item.getAttribute("href");
        if (itemPath && !activeFound) {
          if (this.isExactPageMatch(itemPath, currentPath, currentPageName)) {
            item.classList.add("nav-dropdown-item--active");
            // Mark all parents as active
            const nestedParent = item.closest(".nav-dropdown-item.has-nested");
            if (nestedParent) {
              nestedParent.classList.add("nav-dropdown-item--active");
            }
            const parentLi = item.closest(".nav-list > li");
            if (parentLi) {
              parentLi.classList.add("active-parent");
              const parentLink = parentLi.querySelector(".nav-link");
              if (parentLink) {
                parentLink.classList.add("nav-link--active");
              }
            }
            activeFound = true;
            return;
          }
        }
      });
    }
  }

  isExactPageMatch(linkPath, currentPath, currentPageName) {
    if (!linkPath) return false;
    
    // Normalize link path
    let normalizedLink = linkPath;
    
    // Resolve relative paths
    if (normalizedLink.startsWith('../')) {
      const depth = (normalizedLink.match(/\.\.\//g) || []).length;
      const pathParts = currentPath.split('/').filter(p => p);
      const basePath = pathParts.slice(0, pathParts.length - depth).join('/');
      normalizedLink = '/' + basePath + '/' + normalizedLink.replace(/\.\.\//g, '');
    } else if (normalizedLink.startsWith('./')) {
      normalizedLink = normalizedLink.replace('./', '');
    }
    
    // Normalize paths
    normalizedLink = normalizedLink.replace(/^\/+|\/+$/g, '');
    const linkPageName = normalizedLink.split('/').pop()?.replace('.html', '') || normalizedLink.replace('.html', '');
    
    // Handle index page
    if (linkPageName === "index" || linkPageName === "" || normalizedLink === "index.html") {
      return currentPageName === "index" || 
             currentPageName === "" || 
             window.location.pathname === "/" ||
             window.location.pathname.endsWith("/") ||
             currentPath.endsWith("/index.html");
    }
    
    // Exact page name match
    if (currentPageName === linkPageName && linkPageName !== '') {
      return true;
    }
    
    // Check if current path includes the link path (for nested pages)
    const currentPathNormalized = currentPath.replace(/^\/+|\/+$/g, '').toLowerCase();
    const linkPathNormalized = normalizedLink.toLowerCase();
    
    // For product pages, check if current path contains the link path
    if (currentPathNormalized.includes(linkPathNormalized) && linkPathNormalized.length > 0) {
      // Special cases for main sections
      const sectionMappings = {
        'certificate': ['certificate'],
        'spravka': ['spravka', 'thread-guide', 'manufacturing-rvd', 'rvd-recommendations', 'rvd-lifespan', 'hose-selection', 'hose-installation', 'gost-6286-73', 'gost-25452-90', 'pressure-units'],
        'contact': ['contact'],
        'order': ['order'],
        'high-pressure-hoses': ['high-pressure-hoses', 'en853-1sn', 'en853-2sn', 'en856-4sp', 'en856-4sh', 'en856-r13', 'en856-r15'],
        'fittings': ['fittings', 'fitingi', 'bsp', 'jic', 'orfs', 'dkol', 'dkos', 'sfl', 'sfs', 'banjo', 'jis', 'nptf', 'bspt', 'vtulki'],
        'equipment': ['equipment', 'finnpower', 'd-hydro', 'op', 'samway', 'barboflex', 'uniflex'],
        'industrial-hoses': ['industrial-hoses', 'steam', 'oil', 'fuel', 'abradant'],
        'teflon-hoses': ['teflon-hoses', 'rvd_ptfe', 'rvd_gwm'],
        'thermoplastic-hoses': ['thermoplastic-hoses', 'sae_100', 'mt_'],
        'parker-hoses': ['parker-hoses', '371lt', '461lt'],
        'quick-connections': ['quick-connections', 'brs'],
        'ball-valves': ['ball-valves', 'valves'],
        'pipe-connections': ['pipe-connections'],
        'cutting-disks': ['cutting-disks', 'disks']
      };
      
      // Check section mappings
      for (const [section, patterns] of Object.entries(sectionMappings)) {
        if (linkPageName === section || linkPathNormalized.includes(section)) {
          if (patterns.some(pattern => currentPathNormalized.includes(pattern))) {
            return true;
          }
        }
      }
      
      // Direct path match
      if (currentPathNormalized.includes(linkPathNormalized)) {
        return true;
      }
    }
    
    return false;
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
