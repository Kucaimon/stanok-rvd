// UNIFLEX products data extracted from the original HTML
const uniflexProductsData = [
  {
    id: 1,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S2M",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с четырьмя спиралями и 1.1/4" с двумя оплётками. Многофункциональная машина для сервиса вне помещений.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S2M_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS2M/",
    specs: [
      { label: "Тип:", value: "Мобильный" },
      { label: "Диапазон:", value: 'до 1.1/4"' },
    ],
  },
  {
    id: 2,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S2A",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с 4 спиралями и 1.1/4" с 2 оплётками. Многофункциональная машина для сервиса небольших размеров.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S2A_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS2a/",
    specs: [
      { label: "Тип:", value: "Компактный" },
      { label: "Диапазон:", value: 'до 1.1/4"' },
    ],
  },
  {
    id: 3,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S2P",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с 4 спиралями и 1.1/4" с 2 оплётками. Многофункциональная машина для сервиса небольших размеров.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S2P_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS2P/",
    specs: [
      { label: "Тип:", value: "Профессиональный" },
      { label: "Диапазон:", value: 'до 1.1/4"' },
    ],
  },
  {
    id: 4,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S3 ECOLINE",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1.1/4" с четырьмя спиралями и до 2" с двумя оплётками. Многофункциональная машина для сервиса.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S4Ecoline_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS3Ecoline/",
    specs: [
      { label: "Тип:", value: "Ecoline" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 5,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S4",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1.1/2" с четырьмя спиралями и до 2" с двумя оплётками. Многофункциональная машина для сервиса.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S4_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS4/",
    specs: [
      { label: "Тип:", value: "Стандартный" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 6,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S4 ECOLINE",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1.1/2" с четырьмя спиралями и до 2" с двумя оплётками. Многофункциональная машина для сервиса.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S4Ecoline_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS4Ecoline/",
    specs: [
      { label: "Тип:", value: "Ecoline" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 7,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S6",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1.1/2" с шестью спиралями и до 2" с четырьмя спиралями. Многофункциональная машина для сервиса.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S6_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/UNIFLEXS6/",
    specs: [
      { label: "Тип:", value: "Мощный" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 8,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX S6 ECOLINE",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1.1/4" с четырьмя спиралями и до 2" с двумя оплётками. Многофункциональная машина для сервиса.',
    image: "https://stanok-rvd.ru/media/content/uniflex/S4Ecoline_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/uniflex-s6_ecoline/",
    specs: [
      { label: "Тип:", value: "Ecoline" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 9,
    name: "ОБЖИМНОЙ ПРЕСС UNIFLEX HM 325iB/HM 375i/HM 380i",
    description:
      'Идеален для опрессовки гидравлических рукавов 3" и промышленного рукава до 6" включительно. Характеризуется высокой скоростью работы для крупного производства.',
    image: "https://stanok-rvd.ru/media/content/uniflex/HM325_title.jpg",
    link: "/stanok-rvd/pages/products/uniflex/uniflex-hm325ib_hm375i_hm380i/",
    specs: [
      { label: "Тип:", value: "Промышленный" },
      { label: "Диапазон:", value: 'до 6"' },
    ],
  },
];

// Initialize UNIFLEX products grid
document.addEventListener("DOMContentLoaded", function () {
  loadUniflexProducts();
});

// Load UNIFLEX products function
function loadUniflexProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML =
    '<div class="loading">Загрузка оборудования UNIFLEX...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(uniflexProductsData);
  }, 800);
}

// Display products in grid
function displayProducts(products) {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Clear container
  container.innerHTML = "";

  // Add products to grid
  products.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

// Create product card element
function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  // Create product card HTML
  article.innerHTML = `
        <div class="product-card__image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-card__content">
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__specs">
                ${product.specs
                  .map(
                    (spec) => `
                    <div class="spec-item">
                        <span class="spec-label">${spec.label}</span>
                        <span class="spec-value">${spec.value}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <a href="${product.link}" class="product-card__button">Подробнее</a>
        </div>
    `;

  return article;
}

// Error handling
function displayError() {
  const container = document.getElementById("products-container");
  if (container) {
    container.innerHTML = `
            <div class="loading" style="color: var(--color-error);">
                Ошибка загрузки товаров UNIFLEX. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadUniflexProducts,
    displayProducts,
    createProductCard,
  };
}
