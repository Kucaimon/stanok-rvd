class ThermoplasticHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ SAE 100 R7",
        image: "https://stanok-rvd.ru/termoplastik/r7_mini.png",
        link: "thermoplastic-hoses/sae_100_r7.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ SAE 100 R7",
      },
      {
        title: "РУКАВ SAE 100 R8",
        image: "https://stanok-rvd.ru/termoplastik/r8_mini.png",
        link: "thermoplastic-hoses/sae_100_r8.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ SAE 100 R8",
      },
      {
        title: "РУКАВ MT-1",
        image: "https://stanok-rvd.ru/termoplastik/mt1_mini.png",
        link: "thermoplastic-hoses/mt_1.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ MT-1, SAE 100 R1",
      },
      {
        title: "РУКАВ MT-2",
        image: "https://stanok-rvd.ru/termoplastik/mt2_mini.png",
        link: "thermoplastic-hoses/mt_2.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ MT-2, SAE 100 R2",
      },
      {
        title: "РУКАВ SAE 100 R7 TWIN",
        image: "https://stanok-rvd.ru/termoplastik/twin_mini.png",
        link: "thermoplastic-hoses/sae_100_r7_twin.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ SAE 100 R7 TWIN",
      },
      {
        title: "РУКАВ MT-2 TWIN",
        image: "https://stanok-rvd.ru/termoplastik/twin_mini.png",
        link: "thermoplastic-hoses/mt_2_twin.html",
        description: "РУКАВ ТЕРМОПЛАСТИКОВЫЙ MT-2 TWIN, SAE 100 R2",
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
                            <span class="spec-label">Тип:</span>
                            <span class="spec-value">${hose.title.split(' ')[1] || 'Рукав'}</span>
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

// Initialize thermoplastic hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThermoplasticHosesPage();
});
