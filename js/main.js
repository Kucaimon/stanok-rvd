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
    
    // Handle product images loading errors
    this.initProductImages();
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

  initProductImages() {
    // Обработка ошибок для всех изображений товаров
    const productImages = document.querySelectorAll(
      ".product-card__image img, .disk-card img, .fitting-card img, .brs-card img, .valve-card img, .connection-card img, .brand-card img"
    );
    
    productImages.forEach((img) => {
      img.addEventListener("error", function () {
        // Если изображение не загрузилось, показываем placeholder
        this.style.display = "none";
        const container = this.closest(".product-card__image, .disk-card, .fitting-card, .brs-card, .valve-card, .connection-card, .brand-card");
        if (container && !container.querySelector(".image-placeholder")) {
          const placeholder = document.createElement("div");
          placeholder.className = "image-placeholder";
          placeholder.innerHTML = "📚";
          placeholder.style.cssText = "font-size: 3rem; color: var(--metal-light); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;";
          container.appendChild(placeholder);
        }
      });
    });
  }
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
