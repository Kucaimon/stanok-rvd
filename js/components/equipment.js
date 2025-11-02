class EquipmentPage {
  constructor() {
    this.brands = [
      {
        title: "D-HYDRO OY",
        country: "ФИНЛЯНДИЯ",
        image: "https://stanok-rvd.ru/stanki_rvd/d_hydro_titul.png",
        link: "/stanok-rvd/pages/products/d-hydro.html",
        description: "Оборудование для производства РВД D-HYDRO OY",
      },
      {
        title: "FINN-POWER",
        country: "ФИНЛЯНДИЯ",
        image: "https://stanok-rvd.ru/stanki_rvd/finnpower_collage_small.gif",
        link: "/stanok-rvd/pages/products/finnpower.html",
        description: "Оборудование FINN-POWER для производства РВД",
      },
      {
        title: "О+Р",
        country: "ИТАЛИЯ",
        image: "https://stanok-rvd.ru/stanki_rvd/oborudovanie_op_small.gif",
        link: "/stanok-rvd/pages/products/op.html",
        description: "Обжимные станки для сборки РВД О+Р",
      },
      {
        title: "UNIFLEX",
        country: "ГЕРМАНИЯ",
        image: "https://stanok-rvd.ru/stanki_rvd/uniflex_small.jpg",
        link: "/stanok-rvd/pages/products/uniflex.html",
        description: "Обжимные станки для сборки РВД UNIFLEX",
      },
      {
        title: "BARBOFLEX",
        country: "ПОРТУГАЛИЯ",
        image: "https://stanok-rvd.ru/stanki_rvd/titul_barb.jpg",
        link: "/stanok-rvd/pages/products/barboflex.html",
        description: "Отрезные и зачистные станки BARBOFLEX",
      },
      {
        title: "SAMWAY",
        country: "КНР",
        image: "https://stanok-rvd.ru/stanki_rvd/titul.png",
        link: "/stanok-rvd/pages/products/samway.html",
        description: "Обжимные станки для изготовления РВД SAMWAY",
      },
    ];

    this.render();
  }

  render() {
    this.renderBrands();
  }

  renderBrands() {
    const brandsGrid = document.getElementById("brands-grid");
    if (!brandsGrid) return;

    brandsGrid.innerHTML = this.brands
      .map(
        (brand) => `
            <div class="brand-card">
                <a href="${brand.link}" title="${brand.description}">
                    <img src="${brand.image}" alt="${brand.title}" class="brand-image" loading="lazy">
                </a>
                <h3 class="brand-title">${brand.title}</h3>
                <div class="brand-country">${brand.country}</div>
                <a href="${brand.link}" class="brand-link" title="${brand.description}">
                    Смотреть оборудование
                </a>
            </div>
        `
      )
      .join("");
  }
}

// Initialize equipment page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EquipmentPage();
});
