class ProductsGrid {
  constructor() {
    this.products = [
      {
        title: "ОБОРУДОВАНИЕ ДЛЯ РВД",
        image: "https://stanok-rvd.ru/stanok_titul.jpg",
        link: "pages/products/equipment.html",
        description:
          "FINN-POWER (Финляндия), D-HYDRO OY (Финляндия), YEONG LONG (Тайвань), UNIFLEX (Германия)",
      },
      {
        title: "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ",
        image: "https://stanok-rvd.ru/ryk.png",
        link: "pages/products/high-pressure-hoses.html",
        description:
          "EN853 1SN SAE, EN 853 2SN, EN856 4SP, EN856 4SH, EN856 R13, EN856 R15",
      },
      {
        title: "ФИТИНГИ И МУФТЫ ДЛЯ РВД",
        image: "https://stanok-rvd.ru/fitingy_small.gif",
        link: "pages/products/fittings.html",
        description:
          "Обжимные фитинги BSP, DIN2353, JIC, ORFS, BANJO, фланцы SFL/SFS",
      },
      {
        title: "ПРОМЫШЛЕННЫЕ РУКАВА",
        image: "https://stanok-rvd.ru/prom.png",
        link: "pages/products/industrial-hoses.html",
        description: "SEMPERIT TU 10, TU 20, TUC 20, TM 30, SM2, SM40",
      },
      {
        title: "ТЕФЛОНОВЫЕ РУКАВА",
        image: "https://stanok-rvd.ru/ptfe_titul.jpg",
        link: "pages/products/teflon-hoses.html",
        description: "PTFE1, PTFE2, SAE 100 R14, гофрированный GW",
      },
      {
        title: "ТЕРМОПЛАСТИКОВЫЕ РУКАВА",
        image: "https://stanok-rvd.ru/titul.jpg",
        link: "pages/products/thermoplastic-hoses.html",
        description: "MT1, MT2, SAE 100 R7, SAE 100 R8, SAE 100 R7 TWIN",
      },
      {
        title: "МОРОЗОСТОЙКИЕ РУКАВА PARKER",
        image: "https://stanok-rvd.ru/parker.jpg",
        link: "pages/products/parker-hoses.html",
        description: "PARKER 371LT, 461LT - специальные морозостойкие решения",
      },
      {
        title: "КАНАЛОПРОМЫВОЧНЫЕ РУКАВА",
        image: "https://stanok-rvd.ru/ko514.png",
        link: "pages/products/kanalopromyvochnye-hoses.html",
        description:
          "Для машин КОММАШ КО502, КО504, КО-514, КО-514-1, КО-560, КО-564",
      },
      {
        title: "БЫСТРОРАЗЪЁМНЫЕ СОЕДИНЕНИЯ",
        image: "https://stanok-rvd.ru/brs_titul.jpg",
        link: "pages/products/quick-connections.html",
        description:
          "ISO A ISO7241-A, FLAT FACE ISO16028, HPA NPTF, резьбовые серии S/TGW",
      },
      {
        title: "КРАНЫ ШАРОВЫЕ ВД",
        image: "https://stanok-rvd.ru/kran_titul.jpg",
        link: "pages/products/ball-valves.html",
        description:
          "Шаровые краны высокого давления, 2-х ходовые, 3-х ходовые",
      },
      {
        title: "ТРУБНЫЕ СОЕДИНЕНИЯ",
        image: "https://stanok-rvd.ru/din_2353_titul.jpg",
        link: "pages/products/pipe-connections.html",
        description:
          "DIN2353 LR/SR, ISO 8434-1 - надежные соединения для гидравлики",
      },
      {
        title: "ОТРЕЗНЫЕ ДИСКИ ДЛЯ РВД",
        image: "https://stanok-rvd.ru/titul_glavnai.jpg",
        link: "pages/products/cutting-disks.html",
        description:
          "Специальные отрезные диски для работы с рукавами высокого давления",
      },
      {
        title: "ТЕРМОЗАЩИТА РУКАВА",
        image: "https://stanok-rvd.ru/rukav_termozashita_titul.jpg",
        link: "pages/products/termozashita.html",
        description: "Термозащита для РВД FSS",
      },
      {
        title: "ТЕХНИЧЕСКИЙ СПРАВОЧНИК",
        image: null,
        icon: "📚",
        link: "pages/spravka.html",
        description: "Вся техническая информация и документация",
      },
    ];

    this.render();
  }

  render() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    grid.innerHTML = this.products
      .map(
        (product) => `
                    <div class="product-card">
                        <div class="product-card__image">
                            ${
                              product.image
                                ? `<img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">`
                                : product.icon
                                ? `<div class="product-icon" style="font-size: 4rem;">${product.icon}</div>`
                                : ""
                            }
                        </div>
                        <div class="product-card__content">
                            <h3 class="product-card__title">${product.title}</h3>
                            <a href="${product.link}" class="product-card__button">Подробнее</a>
                        </div>
                    </div>
                `
      )
      .join("");
  }
}

// Initialize products when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProductsGrid();
});
