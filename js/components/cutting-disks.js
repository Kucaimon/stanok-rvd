// cutting-disks.js
class CuttingDisksPage {
  constructor() {
    this.disksItems = [
      {
        title: "ДИСК Uniflex EM1 SB 160х20х2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em1_160_20_2.html",
        description: "Отрезной диск Uniflex EM1 SB 160х20х2",
      },
      {
        title: "ДИСК O+P TF1 eCUT 165x20x1.4",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/op_tf1_ecut.html",
        description: "Отрезной диск О+Р TF1 eCUT 165х20х1.4",
      },
      {
        title: "ДИСК Uniflex EM 1 S MVD 190x15x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em1_190_15_2.html",
        description: "Отрезной диск Uniflex EM1 S MVD 190х15х2",
      },
      {
        title: "ДИСК Uniflex EM 1 S MVC 190x30x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em1_190_30_3.html",
        description: "Отрезной диск Uniflex EM1 S MVC 190х30х2",
      },
      {
        title: "ДИСК Uniflex EM 3.2 200x25.4x1.6",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em3_2_200_25_1_6.html",
        description: "Отрезной диск Uniflex EM3.2 200x25.4x1.6",
      },
      {
        title: "ДИСК Uniflex EM 3.2 Ecoline 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em3_2_200_25_3.html",
        description: "Отрезной диск Uniflex EM3.2 Ecoline 200x25.4x3",
      },
      {
        title: "ДИСК D-Hydro CM 70 250х32х2.5",
        image: "https://stanok-rvd.ru/disk/cm70_100_250_32_3.png",
        link: "../../pages/products/disks/d_hydro_250_32_2_5.html",
        description: "Отрезной диск D-Hydro CM 70 250х32х2.5",
      },
      {
        title: "ДИСК О+Р TF2 E, TF2, TF1 E 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/op_250_40_3.html",
        description: "Отрезной диск 250х40х3 О+Р TF2 E, TF2, TF1 E+",
      },
      {
        title: "ДИСК Barboflex CUT225 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/cut_225_250_40_3.html",
        description: "Отрезной диск Barboflex CUT 225 250x40x3",
      },
      {
        title: "ДИСК SAMWAY C400 A, C400, C401 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/samway_250_40_3.html",
        description: "Отрезной диск SAMWAY C401, 400 A, C400 250x40x3",
      },
      {
        title: "ДИСК Techmaflex S CUT 22, S CUT 30 L 254x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/techmaflex_cut_22.html",
        description: "Отрезной диск Techmaflex S CUT 22, S CUT 30 L 254x25.4x3",
      },
      {
        title: "ДИСК Uniflex EM 6 Ecoline MVC 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../../pages/products/disks/uniflex_em6_275_25_3.html",
        description: "Отрезной диск Uniflex EM6 Ecoline 275x25.4x3",
      },
    ];

    this.init();
  }

  init() {
    this.renderDisks();
    this.addCardInteractions();
    this.initImageZoom();
  }

  renderDisks() {
    const disksGrid = document.getElementById("disks-grid");
    if (!disksGrid) return;

    disksGrid.innerHTML = this.disksItems
      .map(
        (item) => `
            <div class="disk-card">
                <a href="${item.link}" title="${item.title}">
                    <img src="${item.image}" alt="${item.title}" class="disk-image" loading="lazy">
                </a>
                <h3 class="disk-title">${item.title}</h3>
                <a href="${item.link}" class="disk-link">
                    Подробнее
                </a>
            </div>
        `
      )
      .join("");
  }

  addCardInteractions() {
    const cards = document.querySelectorAll(".disk-card");

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
    const images = document.querySelectorAll(".disk-image");

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

// Initialize Cutting Disks page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CuttingDisksPage();
});
