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
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentPageName = currentPage.replace('.html', '');
    
    // Normalize link path
    let normalizedLink = linkPath.replace(/^\.\.\//g, "").replace(/^\.\//g, "");
    normalizedLink = normalizedLink.split('/').pop() || normalizedLink;
    const linkPageName = normalizedLink.replace('.html', '');
    
    // Handle index.html and main page
    if (linkPageName === "index" || linkPageName === "" || normalizedLink === "index.html") {
      return currentPage === "" || currentPage === "index.html" || currentPageName === "index" || window.location.pathname.endsWith("/");
    }
    
    // Check for exact match or if current page contains link page name
    if (currentPageName === linkPageName) {
      return true;
    }
    
    // Special cases for main sections
    const sectionMap = {
      'certificate': 'certificate',
      'spravka': 'spravka',
      'contact': 'contact',
      'order': 'order'
    };
    
    if (sectionMap[linkPageName] && currentPageName.includes(sectionMap[linkPageName])) {
      return true;
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
