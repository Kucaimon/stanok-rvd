class FittingsPage {
  constructor() {
    this.fittings = [
      {
        title: "Фитинг BSP-BSI 5200",
        image: "https://stanok-rvd.ru/fitingi/fit_bsp_small.png",
        link: "../../pages/products/fittings/fitingi_bsp.html",
        description: "Фитинг BSP ISO 228-1 AGR",
      },
      {
        title: "Фитинг DK или DKL",
        image: "https://stanok-rvd.ru/fitingi/dkl.png",
        link: "../../pages/products/fittings/fitingi_dkl.html",
        description:
          "ФИТИНГ ДЛЯ РВД ТИП DK DKL СФЕРА КОНУС УПЛОТНЕНИЯ 24°, 37°, 60°",
      },
      {
        title: "Фитинг DKO-L, DIN 2353",
        image: "https://stanok-rvd.ru/fitingi/fit_dko_small.png",
        link: "../../pages/products/fittings/fitingi_dkol.html",
        description:
          "ФИТИНГИ С МЕТРИЧЕСКИМИ РЕЗЬБАМИ DKOL/CEL, DIN 2353/3865, ISO8434-4",
      },
      {
        title: "Фитинг DKO-S, DIN 2353",
        image: "https://stanok-rvd.ru/fitingi/fit_dko_small.png",
        link: "../../pages/products/fittings/fitingi_dkos.html",
        description:
          "ФИТИНГИ С МЕТРИЧЕСКИМИ РЕЗЬБАМИ, DKOS/CES, DIN 2353/3865, ISO8434-4, DIN 20066",
      },
      {
        title: "Фитинг JIC, SAE J514",
        image: "https://stanok-rvd.ru/fitingi/fit_jic.png",
        link: "../../pages/products/fittings/fitingi_jic.html",
        description:
          "ГИДРАВЛИЧЕСКИЕ ФИТИНГИ JIС SAE J514 и ISO 725 или ISO 8434-2 конус уплотнения 37гр",
      },
      {
        title: "Фитинг-фланец SFL, 3000 psi",
        image: "https://stanok-rvd.ru/fitingi/sflsfs.png",
        link: "../../pages/products/fittings/fitingi_sfl.html",
        description: "ФИТИНГ-ФЛАНЕЦ SFL 3000psi, SAE J516/J518, ISO 6162-1/-2",
      },
      {
        title: "Фитинг-фланец SFS, 6000 psi",
        image: "https://stanok-rvd.ru/fitingi/sflsfs.png",
        link: "../../pages/products/fittings/fitingi_sfs.html",
        description: "ФИТИНГ-ФЛАНЕЦ SFL 6000psi, SAE J516/J518, ISO 6162-1/-2",
      },
      {
        title: "Фитинг ORFS, SAE J1453",
        image: "https://stanok-rvd.ru/fitingi/fit_orfs.png",
        link: "../../pages/products/fittings/fitingi_orfs.html",
        description:
          "ГИДРАВЛИЧЕСКИЕ ФИТИНГИ ORFS РЕЗЬБА UNF/UN SAE J1453 И ISO 8434-3",
      },
      {
        title: "Фитинг штуцер BSPT",
        image: "https://stanok-rvd.ru/fitingi/fit_nptf.png",
        link: "../../pages/products/fittings/fitingi_bspt.html",
        description: "ФИТИНГ BSPT(Ш) ШТУЦЕР С КОНИЧЕСКИМИ РЕЗЬБАМИ",
      },
      {
        title: "Фитинг штуцер NPTF",
        image: "https://stanok-rvd.ru/fitingi/fit_nptf.png",
        link: "../../pages/products/fittings/fitingi_nptf.html",
        description: "Фитинг NPTF(Ш) ШТУЦЕР коническая наружная резьба",
      },
      {
        title: "Фитинг JIS (Komatsu)",
        image: "https://stanok-rvd.ru/fitingi/fit_jis.png",
        link: "../../pages/products/fittings/jis_k.html",
        description: "ФИТИНГ JIS KOMATSU обратный конус 60° метрическая резьба",
      },
      {
        title: "Фитинги стандарта JIS (Toyota)",
        image: "https://stanok-rvd.ru/fitingi/fit_jis.png",
        link: "../../pages/products/fittings/jis_t.html",
        description:
          "ФИТИНГ JIS TOYOTA обратный конус 60° Трубная цилиндрическая резьба",
      },
      {
        title: "Фитинг BANJO",
        image: "https://stanok-rvd.ru/fitingi/banjo_sh.png",
        link: "../../pages/products/fittings/banjo.html",
        description: "ФИТИНГИ BANJO DIN 7642 МЕТРИЧЕСКИЕ И ДЮЙМОВЫЕ БОЛТЫ",
      },
      {
        title: "Зажимы фланца",
        image: "https://stanok-rvd.ru/fitingi/sflsfs_z.png",
        link: "../../pages/products/fittings/skoba.html",
        description: "ПОЛУФЛАНЕЦ (СКОБА) SAE, SFL 3000PSI, SFS 6000PSI",
      },
      {
        title: "Муфта обжимная 1SN/2SN/2SC",
        image: "https://stanok-rvd.ru/fitingi/vtulki_sn_small.png",
        link: "../../pages/products/fittings/vtulki_1sn_2sn.html",
        description: "Обжимные муфты для РВД 1SN, 2SN",
      },
      {
        title: "Муфта обжимная 4SP/4SH",
        image: "https://stanok-rvd.ru/fitingi/vtulki_sp_small.png",
        link: "../../pages/products/fittings/vtulki_4sp_4sh.html",
        description: "ОБЖИМНЫЕ МУФТЫ (ГИЛЬЗЫ) 4SP, 4SH",
      },
    ];

    this.render();
  }

  render() {
    this.renderFittings();
  }

  renderFittings() {
    const fittingsGrid = document.getElementById("fittings-grid");
    if (!fittingsGrid) return;

    fittingsGrid.innerHTML = this.fittings
      .map(
        (fitting) => `
            <div class="fitting-card">
                <a href="${fitting.link}" title="${fitting.description}">
                    <img src="${fitting.image}" alt="${fitting.title}" class="fitting-image" loading="lazy">
                </a>
                <h3 class="fitting-title">${fitting.title}</h3>
                <a href="${fitting.link}" class="fitting-link" title="${fitting.description}">
                    Подробнее
                </a>
            </div>
        `
      )
      .join("");
  }
}

// Initialize fittings page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FittingsPage();
});
