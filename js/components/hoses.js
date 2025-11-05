class HosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ EN 853 1SN",
        image: "https://stanok-rvd.ru/rvd/shlang_1sn.jpg",
        link: "hoses/en853-1sn.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN853 1SN SAE 100R1AT",
      },
      {
        title: "РУКАВ EN 853 2SN",
        image: "https://stanok-rvd.ru/rvd/shlang_2sn.jpg",
        link: "hoses/en853-2sn.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN853 2SN SAE 100 R2AT",
      },
      {
        title: "РУКАВ EN 856 4SP",
        image: "https://stanok-rvd.ru/rvd/shlahg_4sp.jpg",
        link: "hoses/en856-4sp.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN856 4SP SAE100R9",
      },
      {
        title: "РУКАВ EN 856 4SH",
        image: "https://stanok-rvd.ru/rvd/shlahg_4sp.jpg",
        link: "hoses/en856-4sh.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN856 4SH SAE100R9",
      },
      {
        title: "РУКАВ EN 856 R13",
        image: "https://stanok-rvd.ru/rvd/shlang_r13.jpg",
        link: "hoses/en856-r13.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN856 R13",
      },
      {
        title: "РУКАВ EN 856 R15",
        image: "https://stanok-rvd.ru/rvd/shlang_r13.jpg",
        link: "hoses/en856-r15.html",
        description: "РУКАВ ВЫСОКОГО ДАВЛЕНИЯ EN856 R15",
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
                    <p class="product-card__description">${hose.description}</p>
                    <div class="product-card__specs">
                        <div class="spec-item">
                            <span class="spec-label">Стандарт:</span>
                            <span class="spec-value">${hose.title.match(/EN\s*\d+/)?.[0] || hose.description.match(/EN\s*\d+/)?.[0] || 'ГОСТ'}</span>
                        </div>
                    </div>
                    <a href="${hose.link}" class="product-card__button" title="${hose.description}">
                        Подробнее
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Initialize hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HosesPage();
});
