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

  // Р”РѕР±Р°РІР»СЏРµРј РёРЅС‚РµСЂР°РєС‚РёРІРЅРѕСЃС‚СЊ С‚Р°Р±Р»РёС†Рµ
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

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ СѓРІРµР»РёС‡РµРЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёР№ РїСЂРё РєР»РёРєРµ
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

    // Р—Р°РєСЂС‹С‚РёРµ СѓРІРµР»РёС‡РµРЅРЅРѕРіРѕ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РїСЂРё РєР»РёРєРµ РІРЅРµ РµРіРѕ
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("zoomed-image-backdrop")) {
        this.closeZoomedImage();
      }
    });

    // Р—Р°РєСЂС‹С‚РёРµ РїРѕ ESC
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
    closeBtn.setAttribute("aria-label", "Р—Р°РєСЂС‹С‚СЊ");
    closeBtn.addEventListener("click", () => this.closeZoomedImage());

    backdrop.appendChild(zoomedImg);
    backdrop.appendChild(closeBtn);
    document.body.appendChild(backdrop);

    // РђРЅРёРјР°С†РёСЏ РїРѕСЏРІР»РµРЅРёСЏ
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

  // РџР»Р°РІРЅР°СЏ РїСЂРѕРєСЂСѓС‚РєР° РґР»СЏ СЏРєРѕСЂРЅС‹С… СЃСЃС‹Р»РѕРє
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

  // Р”РёРЅР°РјРёС‡РµСЃРєРѕРµ РѕР±РЅРѕРІР»РµРЅРёРµ Р·Р°РіРѕР»РѕРІРєР° РїСЂРё СЃРєСЂРѕР»Р»Рµ
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
