// pipe-connections.js
class PipeConnectionsPage {
  constructor() {
    this.connectionsItems = [
      {
        title: "СОЕДИНЕНИЕ DIN2353 LR/SR ПРЯМОЕ",
        image: "https://stanok-rvd.ru/trubnye_soedineniya/truba.jpg",
        link: "../../pages/products/pipe-connections/pryamoye.html",
        description:
          "ТРУБНОЕ СОЕДИНЕНИЕ DIN2353 LR/SR, ISO 8434-1. ПРЯМОЕ Rastelli Raccordi, Cast, VOSS, Parker, FOR S.p.a.",
      },
      {
        title: "СОЕДИНЕНИЕ DIN2353 LR/SR УГОЛЬНИК",
        image: "https://stanok-rvd.ru/trubnye_soedineniya/truba90.jpg",
        link: "../../pages/products/pipe-connections/uglovoe.html",
        description:
          "ТРУБНОЕ СОЕДИНЕНИЕ DIN2353 LR/SR, ISO 8434-1. УГОЛЬНИК Rastelli Raccordi, Cast, VOSS, Parker, FOR S.p.a.",
      },
      {
        title: "СОЕДИНЕНИЕ DIN2353 LR/SR ТРОЙНИК",
        image: "https://stanok-rvd.ru/trubnye_soedineniya/truba_troinik.jpg",
        link: "../../pages/products/pipe-connections/troynik.html",
        description:
          "ТРУБНОЕ СОЕДИНЕНИЕ DIN2353 LR/SR, ISO 8434-1. ТРОЙНИК Rastelli Raccordi, Cast, VOSS, Parker, FOR S.p.a.",
      },
      {
        title: "СОЕДИНЕНИЕ DIN2353 LR/SR КРЕСТ",
        image: "https://stanok-rvd.ru/trubnye_soedineniya/truba_krest.jpg",
        link: "#",
        description:
          "ТРУБНОЕ СОЕДИНЕНИЕ DIN2353 LR/SR, ISO 8434-1. КРЕСТ Rastelli Raccordi, Cast, VOSS, Parker, FOR S.p.a.",
      },
    ];

    this.init();
  }

  init() {
    this.renderConnections();
    this.addCardInteractions();
    this.initImageZoom();
  }

  renderConnections() {
    const connectionsGrid = document.getElementById("connections-grid");
    if (!connectionsGrid) return;

    connectionsGrid.innerHTML = this.connectionsItems
      .map(
        (item) => `
            <div class="connection-card">
                <a href="${item.link}" title="${item.description}">
                    <img src="${item.image}" alt="${item.title}" class="connection-image" loading="lazy">
                </a>
                <h3 class="connection-title">${item.title}</h3>
                <a href="${item.link}" class="connection-link" title="${item.description}">
                    Подробнее
                </a>
            </div>
        `
      )
      .join("");
  }

  addCardInteractions() {
    const cards = document.querySelectorAll(".connection-card");

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
    const images = document.querySelectorAll(".connection-image");

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

// Initialize Pipe Connections page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PipeConnectionsPage();
});
