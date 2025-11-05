class TeflonHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "РУКАВ PTFE1",
        image: "https://stanok-rvd.ru/teflon/ptfe1.jpg",
        link: "teflon-hoses/rvd_ptfe1.html",
        description:
          "РУКАВА ФТОРОПЛАСТОВЫЕ И ТЕФЛОНОВЫЕ PTFE1, SAE 100 R14 (с одной металлической оплеткой)",
      },
      {
        title: "РУКАВ PTFE2",
        image: "https://stanok-rvd.ru/teflon/ptfe2.jpg",
        link: "teflon-hoses/rvd_ptfe2.html",
        description:
          "РУКАВА ФТОРОПЛАСТОВЫЕ И ТЕФЛОНОВЫЕ PTFE2, SAE 100 R14 (с двумя металлическими оплетками)",
      },
      {
        title: "РУКАВ PTFEGW (ГОФРА)",
        image: "https://stanok-rvd.ru/teflon/ptfegw.jpg",
        link: "teflon-hoses/rvd_gwm1.html",
        description:
          "РУКАВА ФТОРОПЛАСТОВЫЕ И ТЕФЛОНОВЫЕ PTFE GW, SAE 100 R14 (гофрированный тефлон)",
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

// Initialize teflon hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TeflonHosesPage();
});
