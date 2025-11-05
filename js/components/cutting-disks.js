// cutting-disks.js
class CuttingDisksPage {
  constructor() {
    this.disksItems = [
      {
        title: "Р”Р�РЎРљ Uniflex EM1 SB 160С…20С…2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em1_160_20_2.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM1 SB 160С…20С…2",
      },
      {
        title: "Р”Р�РЎРљ O+P TF1 eCUT 165x20x1.4",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/op_tf1_ecut.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Рћ+Р  TF1 eCUT 165С…20С…1.4",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM 1 S MVD 190x15x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em1_190_15_2.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM1 S MVD 190С…15С…2",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM 1 S MVC 190x30x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em1_190_30_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM1 S MVC 190С…30С…2",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM 3.2 200x25.4x1.6",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em3_2_200_25_1_6.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM3.2 200x25.4x1.6",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM 3.2 Ecoline 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em3_2_200_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM3.2 Ecoline 200x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ D-Hydro CM 70 250С…32С…2.5",
        image: "https://stanok-rvd.ru/disk/cm70_100_250_32_3.png",
        link: "../disks/d_hydro_250_32_2_5.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє D-Hydro CM 70 250С…32С…2.5",
      },
      {
        title: "Р”Р�РЎРљ Рћ+Р  TF2 E, TF2, TF1 E 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/op_250_40_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє 250С…40С…3 Рћ+Р  TF2 E, TF2, TF1 E+",
      },
      {
        title: "Р”Р�РЎРљ Barboflex CUT225 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/cut_225_250_40_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Barboflex CUT 225 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ SAMWAY C400 A, C400, C401 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/samway_250_40_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє SAMWAY C401, 400 A, C400 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ Techmaflex S CUT 22, S CUT 30 L 254x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/techmaflex_cut_22.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Techmaflex S CUT 22, S CUT 30 L 254x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM 6 Ecoline MVC 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em6_275_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM6 Ecoline 275x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM1 S MVC 190x25x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em1_190_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM1 S MVC 190x25x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM1 S MVC 200x25x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em1_200_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM1 S MVC 200x25x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM2 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em2_200_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM2 200x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM3 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em3_200_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM3 200x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM4 250x32x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em4_250_32_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM4 250x32x3",
      },
      {
        title: "Р”Р�РЎРљ Uniflex EM5 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/uniflex_em5_275_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Uniflex EM5 275x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ O+P TF1 165x20x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/op_tf1_165_20_2.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Рћ+Р  TF1 165x20x2",
      },
      {
        title: "Р”Р�РЎРљ O+P TF2 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/op_tf2_250_40_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Рћ+Р  TF2 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ O+P TF3 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/op_tf3_275_25_3.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Рћ+Р  TF3 275x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Barboflex CUT125 165x20x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/barboflex_cut125.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Barboflex CUT125 165x20x2",
      },
      {
        title: "Р”Р�РЎРљ Barboflex CUT325 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/barboflex_cut325.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Barboflex CUT325 275x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ D-Hydro CM 100 250x32x3",
        image: "https://stanok-rvd.ru/disk/cm70_100_250_32_3.png",
        link: "../disks/d_hydro_cm100.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє D-Hydro CM 100 250x32x3",
      },
      {
        title: "Р”Р�РЎРљ D-Hydro CM 70 250x32x2.5",
        image: "https://stanok-rvd.ru/disk/cm70_100_250_32_3.png",
        link: "../disks/d_hydro_250_32_2_5.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє D-Hydro CM 70 250x32x2.5",
      },
      {
        title: "Р”Р�РЎРљ SAMWAY C400 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/samway_c400.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє SAMWAY C400 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ SAMWAY C400A 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/samway_c400a.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє SAMWAY C400A 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ Techmaflex S CUT 30 254x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/techmaflex_cut30.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Techmaflex S CUT 30 254x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Finnpower FP 160x20x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/finnpower_fp.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Finnpower FP 160x20x2",
      },
      {
        title: "Р”Р�РЎРљ Finnpower FP 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/finnpower_fp200.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Finnpower FP 200x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ Finnpower FP 250x40x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/finnpower_fp250.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє Finnpower FP 250x40x3",
      },
      {
        title: "Р”Р�РЎРљ YEONG LONG YL-20 160x20x2",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/yl_20.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє YEONG LONG YL-20 160x20x2",
      },
      {
        title: "Р”Р�РЎРљ YEONG LONG YL-32 200x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/yl_32.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє YEONG LONG YL-32 200x25.4x3",
      },
      {
        title: "Р”Р�РЎРљ YEONG LONG YL-65 250x32x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/yl_65.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє YEONG LONG YL-65 250x32x3",
      },
      {
        title: "Р”Р�РЎРљ YEONG LONG YL-80 275x25.4x3",
        image: "https://stanok-rvd.ru/disk/titul.png",
        link: "../disks/yl_80.html",
        description: "РћС‚СЂРµР·РЅРѕР№ РґРёСЃРє YEONG LONG YL-80 275x25.4x3",
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
                <div class="product-card__image">
                    <img src="${item.image}" alt="${item.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${item.title}</h3>
                    <p class="product-card__description">${item.description}</p>
                    <div class="product-card__specs">
                        <div class="spec-item">
                            <span class="spec-label">Р Р°Р·РјРµСЂС‹:</span>
                            <span class="spec-value">${item.title.match(/\d+[xС…]\d+[xС…]\d+\.?\d*/)?.[0] || item.title.match(/\d+[xС…]\d+[xС…]\d+\.?\d*/)?.[0] || 'РџРѕ Р·Р°РїСЂРѕСЃСѓ'}</span>
                        </div>
                    </div>
                    <a href="${item.link}" class="product-card__button">
                        РџРѕРґСЂРѕР±РЅРµРµ
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }

  addCardInteractions() {
    const cards = document.querySelectorAll(".disk-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });
  }

  initImageZoom() {
    const images = document.querySelectorAll(".disk-card .product-image");

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
