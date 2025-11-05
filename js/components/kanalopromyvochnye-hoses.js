// sewer-hoses.js
class SewerHosesPage {
  constructor() {
    this.init();
  }

  init() {
    this.addTableInteractivity();
    this.addImageZoom();
    this.initSmoothScrolling();
  }

  // Добавляем интерактивность таблице
  addTableInteractivity() {
    const tableRows = document.querySelectorAll(
      ".specifications-table tbody tr"
    );

    tableRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = "rgba(76, 175, 80, 0.05)";
      });

      row.addEventListener("mouseleave", () => {
        row.style.backgroundColor = "";
      });
    });
  }

  // Функция для увеличения изображений при клике
  addImageZoom() {
    const images = document.querySelectorAll(
      ".description-image img, .options-image img, .applications-image img"
    );

    images.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        this.toggleImageZoom(img);
      });
    });

    // Закрытие увеличенного изображения при клике вне его
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("zoomed-image-backdrop")) {
        this.closeZoomedImage();
      }
    });

    // Закрытие по ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeZoomedImage();
      }
    });
  }

  toggleImageZoom(img) {
    const existingBackdrop = document.querySelector(".zoomed-image-backdrop");
    if (existingBackdrop) {
      this.closeZoomedImage();
      return;
    }

    const backdrop = document.createElement("div");
    backdrop.className = "zoomed-image-backdrop";

    const zoomedImg = document.createElement("img");
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;
    zoomedImg.className = "zoomed-image";

    const closeBtn = document.createElement("button");
    closeBtn.className = "zoom-close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("aria-label", "Закрыть");
    closeBtn.addEventListener("click", () => this.closeZoomedImage());

    backdrop.appendChild(zoomedImg);
    backdrop.appendChild(closeBtn);
    document.body.appendChild(backdrop);

    // Анимация появления
    setTimeout(() => {
      backdrop.classList.add("active");
    }, 10);
  }

  closeZoomedImage() {
    const backdrop = document.querySelector(".zoomed-image-backdrop");
    if (backdrop) {
      backdrop.classList.remove("active");
      setTimeout(() => {
        backdrop.remove();
      }, 300);
    }
  }

  // Плавная прокрутка для якорных ссылок
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        if (href !== "#") {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  }

  // Динамическое обновление заголовка при скролле
  initScrollEffects() {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      lastScrollY = currentScrollY;
    });
  }
}

// Р�РЅРёС†РёР°Р»РёР·Р°С†РёСЏ РїСЂРё Р·Р°РіСЂСѓР·РєРµ DOM
document.addEventListener("DOMContentLoaded", () => {
  new SewerHosesPage();
});
