class IndustrialHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ ДЛЯ МАСЕЛ TU-20",
        image: "https://stanok-rvd.ru/prom_rukava/tu_20_titul.jpg",
        link: "../industrial-hoses/oil.html",
        description: "ШЛАНГ МБС SEMPERIT TU20 TU10 TU25 TU40",
      },
      {
        title: "РУКАВ ДЛЯ ТОПЛИВА TM-30",
        image: "https://stanok-rvd.ru/prom_rukava/tm30_titul.jpg",
        link: "../industrial-hoses/fuel.html",
        description:
          "РУКАВ ТОПЛИВНЫЙ МБС SEMPERIT TM30. Топливозаправочные машины.",
      },
      {
        title: "РУКАВ ДЛЯ ПАРА И ГОРЯЧЕЙ ВОДЫ DS-1",
        image: "https://stanok-rvd.ru/prom_rukava/ds_1_titul.jpg",
        link: "../industrial-hoses/steam.html",
        description:
          "РУКАВ ШЛАНГ ДЛЯ ПАРА DS1 210гр SEMPERIT, IVG Colbachini SPA",
      },
      {
        title: "РУКАВ ДЛЯ ПЕСКОСТРУЙНОЙ ОЧИСТКИ",
        image: "https://stanok-rvd.ru/prom_rukava/sm2_titul.jpg",
        link: "../industrial-hoses/abradant.html",
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
            <div class="hose-card">
                <a href="${hose.link}" title="${hose.description}">
                    <img src="${hose.image}" alt="${hose.title}" class="hose-image" loading="lazy">
                </a>
                <h3 class="hose-title">${hose.title}</h3>
                <a href="${hose.link}" class="hose-link" title="${hose.description}">
                    Подробнее
                </a>
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
