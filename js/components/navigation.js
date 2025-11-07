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
    }
  }

  setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (linkPath) {
        // Remove active class from all links
        link.classList.remove("nav-link--active");

        // Check if current page matches link
        if (this.isCurrentPage(linkPath, currentPath)) {
          link.classList.add("nav-link--active");
        }
      }
    });
  }

  isCurrentPage(linkPath, currentPath) {
    // Get current page URL
    const currentUrl = window.location.href;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentPageName = currentPage.replace('.html', '');
    
    // Normalize link path - resolve relative paths
    let normalizedLink = linkPath;
    
    // Convert relative paths to absolute-like paths
    if (normalizedLink.startsWith('../')) {
      // Count ../ to determine depth
      const depth = (normalizedLink.match(/\.\.\//g) || []).length;
      const pathParts = window.location.pathname.split('/').filter(p => p);
      const basePath = pathParts.slice(0, pathParts.length - depth).join('/');
      normalizedLink = '/' + basePath + '/' + normalizedLink.replace(/\.\.\//g, '');
    } else if (normalizedLink.startsWith('./')) {
      normalizedLink = normalizedLink.replace('./', '');
    }
    
    // Remove leading/trailing slashes and get page name
    normalizedLink = normalizedLink.replace(/^\/+|\/+$/g, '');
    const linkPageName = normalizedLink.split('/').pop()?.replace('.html', '') || normalizedLink.replace('.html', '');
    
    // Handle main page (index.html or root)
    if (linkPageName === "index" || linkPageName === "" || normalizedLink === "index.html" || normalizedLink.endsWith('/index.html')) {
      return currentPage === "" || 
             currentPage === "index.html" || 
             currentPageName === "index" || 
             window.location.pathname === "/" ||
             window.location.pathname.endsWith("/") ||
             window.location.pathname.endsWith("/index.html");
    }
    
    // Check for exact match
    if (currentPageName === linkPageName && linkPageName !== '') {
      return true;
    }
    
    // Check if current URL contains the link path
    if (currentUrl.includes(normalizedLink.replace(/\.html$/, ''))) {
      // Special handling for main sections
      const mainSections = {
        'certificate': ['certificate'],
        'spravka': ['spravka', 'thread-guide', 'manufacturing-rvd', 'rvd-recommendations', 'rvd-lifespan', 'hose-selection', 'hose-installation', 'gost-6286-73', 'gost-25452-90', 'pressure-units'],
        'contact': ['contact'],
        'order': ['order']
      };
      
      for (const [section, pages] of Object.entries(mainSections)) {
        if (linkPageName === section && pages.some(page => currentPageName.includes(page))) {
          return true;
        }
      }
      
      // For other cases, check if the link path is in the current URL
      if (normalizedLink && currentUrl.includes(normalizedLink)) {
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
