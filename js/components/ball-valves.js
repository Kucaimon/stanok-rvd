// ball-valves.js
class BallValvesPage {
  constructor() {
    this.valvesItems = [
      {
        title: "КРАН ШАРОВЫЙ ВЫСОКОГО ДАВЛЕНИЯ 2Х ХОДОВОЙ",
        image: "https://stanok-rvd.ru/kran_sharovyy/bvs-2.png",
        link: "valves/2x_xodovoy.html",
        description:
          "КРАНЫ ШАРОВЫЕ ВЫСОКОГО ДАВЛЕНИЯ 2Х ХОДОВОЙ, INTEVA, HOLMBURY, GEMELS, PISTER, LSQ",
      },
      {
        title:
          "КРАН ШАРОВЫЙ ВЫСОКОГО ДАВЛЕНИЯ 2Х ХОДОВОЙ МЕТРИЧЕСКАЯ РЕЗЬБА DIN 2353",
        image: "https://stanok-rvd.ru/kran_sharovyy/bvs-2.png",
        link: "valves/2x_hodovoy_din2353.html",
        description:
          "КРАНЫ ШАРОВЫЕ ВЫСОКОГО ДАВЛЕНИЯ 2Х ХОДОВОЙ МЕТРИЧЕСКАЯ РЕЗЬБА DIN 2353",
      },
      {
        title: "КРАН ШАРОВЫЙ ВЫСОКОГО ДАВЛЕНИЯ 3Х ХОДОВОЙ",
        image: "https://stanok-rvd.ru/kran_sharovyy/bvs-3.png",
        link: "valves/3x_xodovoy.html",
        description:
          "КРАНЫ ШАРОВЫЕ ВЫСОКОГО ДАВЛЕНИЯ 3Х ХОДОВОЙ, INTEVA, HOLMBURY, GEMELS, PISTER, LSQ",
      },
    ];

    this.init();
  }

  init() {
    this.renderValves();
    this.addCardInteractions();
    this.initImageZoom();
  }

  renderValves() {
    const valvesGrid = document.getElementById("valves-grid");
    if (!valvesGrid) return;

    valvesGrid.innerHTML = this.valvesItems
      .map(
        (item) => `
            <div class="valve-card">
                <a href="${item.link}" title="${item.description}">
                    <img src="${item.image}" alt="${item.title}" class="valve-image" loading="lazy">
                </a>
                <h3 class="valve-title">${item.title}</h3>
                <p class="product-card__description">${item.description}</p>
                <div class="product-card__specs">
                    <div class="spec-item">
                        <span class="spec-label">Тип:</span>
                        <span class="spec-value">${item.title.includes('2Х') ? '2-х ходовой' : item.title.includes('3Х') ? '3-х ходовой' : 'Кран шаровой'}</span>
                    </div>
                </div>
                <a href="${item.link}" class="valve-link" title="${item.description}">
                    Подробнее
                </a>
            </div>
        `
      )
      .join("");
  }

  addCardInteractions() {
    const cards = document.querySelectorAll(".valve-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-8px)";
      });
    });
  }

  initImageZoom() {
    const images = document.querySelectorAll(".valve-image");

    images.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        this.openImageZoom(img.src, img.alt);
      });
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeImageZoom();
      }
    });
  }

  openImageZoom(src, alt) {
    const overlay = document.createElement("div");
    overlay.className = "image-zoom-overlay";
    overlay.innerHTML = `
            <div class="zoom-content">
                <button class="zoom-close">&times;</button>
                <img src="${src}" alt="${alt}" class="zoomed-img">
                <p class="zoom-caption">${alt}</p>
            </div>
        `;

    overlay.querySelector(".zoom-close").addEventListener("click", () => {
      this.closeImageZoom();
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.closeImageZoom();
      }
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }

  closeImageZoom() {
    const overlay = document.querySelector(".image-zoom-overlay");
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = "";
    }
  }
}

// Initialize Ball Valves page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BallValvesPage();
});
