class IndustrialHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ ДЛЯ МАСЕЛ TU-20",
        image: "https://stanok-rvd.ru/prom_rukava/tu_20_titul.jpg",
        link: "industrial-hoses/oil.html",
        description: "ШЛАНГ МБС SEMPERIT TU20 TU10 TU25 TU40",
      },
      {
        title: "РУКАВ ДЛЯ ТОПЛИВА TM-30",
        image: "https://stanok-rvd.ru/prom_rukava/tm30_titul.jpg",
        link: "industrial-hoses/fuel.html",
        description:
          "РУКАВ ТОПЛИВНЫЙ МБС SEMPERIT TM30. Топливозаправочные машины.",
      },
      {
        title: "РУКАВ ДЛЯ ПАРА И ГОРЯЧЕЙ ВОДЫ DS-1",
        image: "https://stanok-rvd.ru/prom_rukava/ds_1_titul.jpg",
        link: "industrial-hoses/steam.html",
        description:
          "РУКАВ ШЛАНГ ДЛЯ ПАРА DS1 210гр SEMPERIT, IVG Colbachini SPA",
      },
      {
        title: "РУКАВ ДЛЯ ПЕСКОСТРУЙНОЙ ОЧИСТКИ",
        image: "https://stanok-rvd.ru/prom_rukava/sm2_titul.jpg",
        link: "industrial-hoses/abradant.html",
        description: "РУКАВ ДЛЯ ПЕСКОСТРУЙНЫХ МАШИН SEMPERIT SM 2",
      },
    ];

    this.render();
  }

  render() {
    this.renderHoses();
  }

  renderHoses() {
    const hosesGrid = document.getElementById("hoses-grid");
    if (!hosesGrid) return;

    hosesGrid.innerHTML = this.hoses
      .map(
        (hose) => `
            <div class="product-card">
                <div class="product-card__image">
                    <img src="${hose.image}" alt="${hose.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${hose.title}</h3>
                    <a href="${hose.link}" class="product-card__button">
                        Подробнее
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Initialize industrial hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new IndustrialHosesPage();
});
