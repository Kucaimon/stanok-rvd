class ParkerHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ Parker 371LT",
        image: "https://stanok-rvd.ru/media/content/parker/371lt_titul.jpg",
        link: "parker-hoses/371lt.html",
        description:
          "РУКАВ Parker 371LT отвечает стандартам DIN EN856 4SP, DIN 20023 4SP, SAE 100R12 и применяется в гидросистемах с большим давлением. Шланг Parker 371LT соответствует и превышает требования ГОСТ 25452-90.",
      },
      {
        title: "РУКАВ Parker 461LT",
        image: "https://stanok-rvd.ru/media/content/parker/461lt_titul.jpg",
        link: "parker-hoses/461lt.html",
        description:
          "РУКАВ Parker 461LT отвечает стандартам DIN EN 857 2SC, DIN 20022 2SC, SAE 100R2AT и применяется в гидросистемах со средним давлением. Шланг Parker 461LT DIN EN 857 2SC соответствует и превышает требования ГОСТ 6286-73 Тип 2.",
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
            <div class="product-card">
                <div class="product-card__image">
                    <img src="${hose.image}" alt="${hose.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${hose.title}</h3>
                    <p class="product-card__description">${hose.description}</p>
                    <div class="product-card__specs">
                        <div class="spec-item">
                            <span class="spec-label">Производитель:</span>
                            <span class="spec-value">Parker</span>
                        </div>
                    </div>
                    <a href="${hose.link}" class="product-card__button" title="${hose.title}">
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
