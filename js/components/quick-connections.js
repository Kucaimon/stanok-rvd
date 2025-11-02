// brs.js
class BRSPage {
  constructor() {
    this.brsItems = [
      {
        title: "БРС ISO-A, ISO7241-A",
        image: "https://stanok-rvd.ru/brs/iso_a_titul.jpg",
        link: "/stanok-rvd/pages/products/brs/iso_a.html",
        description:
          "ГИДРАВЛИЧЕСКИЕ БРС С КЛАПАНОМ КОНИЧЕСКОЙ ФОРМЫ И ШАРИКОВЫМ ЗАМКОМ ISO-A, ISO7241-A",
      },
      {
        title: "БРС FIRG FLAT, ISO 16028",
        image: "https://stanok-rvd.ru/brs/firg_titul.jpg",
        link: "/stanok-rvd/pages/products/brs/firg.html",
        description:
          "ГИДРАВЛИЧЕСКИЕ БРС С ПЛОСКИМ КЛАПАНОМ И ШАРИКОВЫМ ЗАМКОМ ISO 16028, FIRG",
      },
      {
        title: "БРС HPA БРСН-БРСД",
        image: "https://stanok-rvd.ru/brs/hpa_titul.jpg",
        link: "/stanok-rvd/pages/products/brs/hpa.html",
        description:
          "ГИДРАВИЧЕСКИЕ БРС ДЛЯ ДОМКРАТОВ И ГИДРОИНСТРУМЕНТА HPA, БРСН/БРСД",
      },
      {
        title: "БРС TGW РЕЗЬБОВЫЕ",
        image: "https://stanok-rvd.ru/brs/tgw_titul.jpg",
        link: "#",
        description: "БЫСТРОРАЗЪЁМНЫЕ СОЕДИНЕНИЯ TGW РЕЗЬБОВЫЕ",
      },
      {
        title: "БРС JCB 3CX SM, 4CX SM, 5CX",
        image: "https://stanok-rvd.ru/brs/brs_jsb.jpg",
        link: "/stanok-rvd/pages/products/brs/brs_jsb.html",
        description:
          "БРС ЭКСКАВАТОР-ПОГРУЗЧИК JCB 3CX, JCB 4CX SM, JCB 5CX 45-920047 29/18",
        special: true,
      },
    ];

    this.init();
  }

  init() {
    this.renderBRS();
    this.addCardInteractions();
    this.initImageZoom();
  }

  renderBRS() {
    const brsGrid = document.getElementById("brs-grid");
    if (!brsGrid) return;

    brsGrid.innerHTML = this.brsItems
      .map(
        (item) => `
            <div class="brs-card ${item.special ? "jcb-card" : ""}">
                <a href="${item.link}" title="${item.description}">
                    <img src="${item.image}" alt="${
          item.title
        }" class="brs-image" loading="lazy">
                </a>
                <h3 class="brs-title">${item.title}</h3>
                <a href="${item.link}" class="brs-link" title="${
          item.description
        }">
                    Подробнее
                </a>
            </div>
        `
      )
      .join("");
  }

  addCardInteractions() {
    const cards = document.querySelectorAll(".brs-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(-5px)";
      });
    });
  }

  initImageZoom() {
    const images = document.querySelectorAll(".brs-image");

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

    // Add styles if not exists
    if (!document.querySelector("#zoom-styles")) {
      const styles = document.createElement("style");
      styles.id = "zoom-styles";
      styles.textContent = `
                .image-zoom-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                .zoom-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }
                .zoomed-img {
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                    border-radius: 8px;
                }
                .zoom-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: var(--primary-green);
                    color: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    font-size: 18px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .zoom-caption {
                    color: white;
                    margin-top: 10px;
                    font-size: 14px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
      document.head.appendChild(styles);
    }
  }

  closeImageZoom() {
    const overlay = document.querySelector(".image-zoom-overlay");
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = "";
    }
  }
}

// Initialize BRS page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BRSPage();
});
