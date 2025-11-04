class ParkerHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "Рукав Parker 371LT",
        image: "https://stanok-rvd.ru/media/content/parker/371lt_titul.jpg",
        link: "../parker-hoses/371lt.html",
        description:
          "Рукав Parker 371LT отвечает стандартам DIN EN856 4SP, DIN 20023 4SP, SAE 100R12 и применяется в гидросистемах с большим давлением. Шланг Parker 371LT соответствует и превышает требования ГОСТ 25452-90.",
      },
      {
        title: "Рукав Parker 461LT",
        image: "https://stanok-rvd.ru/media/content/parker/461lt_titul.jpg",
        link: "../parker-hoses/461lt.html",
        description:
          "Рукав Parker 461LT отвечает стандартам DIN EN 857 2SC, DIN 20022 2SC, SAE 100R2AT и применяется в гидросистемах со средним давлением. Шланг Parker 461LT DIN EN 857 2SC соответствует и превышает требования ГОСТ 6286-73 Тип 2.",
      },
    ];

    this.render();
  }

  render() {
    this.renderHoses();
  }

  renderHoses() {
    const hosesList = document.getElementById("hoses-list");
    if (!hosesList) return;

    hosesList.innerHTML = this.hoses
      .map(
        (hose) => `
            <div class="hose-item">
                <a href="${hose.link}" title="${hose.title}">
                    <img src="${hose.image}" alt="${hose.title}" class="hose-image" loading="lazy">
                </a>
                <div class="hose-content">
                    <h3 class="hose-title">${hose.title}</h3>
                    <p class="hose-description">${hose.description}</p>
                    <a href="${hose.link}" class="hose-link" title="${hose.title}">
                        Подробнее
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Initialize parker hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ParkerHosesPage();
});
