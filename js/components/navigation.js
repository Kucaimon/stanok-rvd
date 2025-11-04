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
    }
  }

  toggleMobileMenu() {
    this.navList.classList.toggle("nav-list--active");
    this.mobileMenuBtn.innerHTML = this.navList.classList.contains(
      "nav-list--active"
    )
      ? "&#10006;"
      : "&#9776;";
  }

  closeMobileMenu() {
    this.navList.classList.remove("nav-list--active");
    this.mobileMenuBtn.innerHTML = "&#9776;";
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
});
