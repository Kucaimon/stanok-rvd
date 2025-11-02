// Main application script
class App {
  constructor() {
    this.init();
  }

  init() {
    this.initAnalytics();
    this.addEventListeners();
    console.log("App initialized successfully");
  }

  initAnalytics() {
    // Modern Google Analytics 4
    if (typeof gtag !== "undefined") {
      gtag("config", "UA-3370896-6");
    }

    // Yandex Metrika
    if (typeof ym !== "undefined") {
      ym(10115065, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        trackHash: true,
      });
    }
  }

  addEventListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    // Lazy loading images
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // Handle delivery logos loading errors
    this.initDeliveryLogos();
  }

  initDeliveryLogos() {
    const deliveryLogos = document.querySelectorAll(".delivery-logo img");
    
    deliveryLogos.forEach((img) => {
      const deliveryName = img.parentElement.querySelector(".delivery-name");
      
      // Обработка ошибок загрузки локальных изображений
      img.addEventListener("error", function () {
        // Если локальное изображение не загрузилось, делаем название более заметным
        this.style.display = "none";
        if (deliveryName) {
          deliveryName.style.fontSize = "22px";
          deliveryName.style.fontWeight = "700";
          deliveryName.style.color = "var(--dark-green)";
          deliveryName.style.textAlign = "center";
          deliveryName.style.width = "100%";
        }
      });
      
      // Принудительно загружаем изображение сразу
      img.loading = "eager";
    });
  }
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
