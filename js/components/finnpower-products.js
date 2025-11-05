// Finn-Power products data extracted from the original HTML
const finnpowerProductsData = [
  {
    id: 1,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P16HP",
    description:
      "Радиальный обжимной пресс для изготовления и производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p16hp_small.jpg",
    link: "finnpower/p16hp_p20hp/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 2,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P20HP",
    description:
      "Радиальный обжимной пресс для профессионального использования",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p20hp_small.jpg",
    link: "finnpower/press_p20hp/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 3,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P20X",
    description: "Оборудование для изготовления и производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p20x_small.jpg",
    link: "finnpower/p21ms_p32x/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Производство РВД" },
    ],
  },
  {
    id: 4,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P20NMS",
    description:
      "Радиальный обжимной пресс для изготовления и производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p20nms_small.jpg",
    link: "finnpower/p20nms/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 5,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P20MS",
    description: "Радиальный обжимной пресс для профессионального производства",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p20ms_small.jpg",
    link: "finnpower/20ms_32ms/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 6,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P32X",
    description: "Оборудование для изготовления и производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p32x_small.jpg",
    link: "finnpower/press_p32x/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Производство РВД" },
    ],
  },
  {
    id: 7,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P32NMS",
    description:
      "Радиальный обжимной пресс для профессионального использования",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p32nms_small.jpg",
    link: "finnpower/p32nms/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 8,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P32MS",
    description: "Радиальный обжимной пресс для серийного производства",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p32ms_small.jpg",
    link: "finnpower/press_p32ms/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Ремонт шлангов" },
    ],
  },
  {
    id: 9,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P51UC",
    description: "Гидравлические фитинги Interlock. Радиальный обжимной пресс",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p51uc_small.jpg",
    link: "finnpower/51uc/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Мастерские для сервиса" },
    ],
  },
  {
    id: 10,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER P60UC",
    description: "Гидравлические фитинги Interlock. Радиальный обжимной пресс",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/p60uc_small.jpg",
    link: "finnpower/p60uc/",
    specs: [
      { label: "Тип:", value: "Радиальный пресс" },
      { label: "Назначение:", value: "Мобильные мастерские" },
    ],
  },
  {
    id: 11,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER FP20UC",
    description:
      "Пресс для серийного производства. Мастерские для сервиса шлангов",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/120uc_small.jpg",
    link: "finnpower/fp20_fp120/",
    specs: [
      { label: "Тип:", value: "Пресс серийный" },
      { label: "Назначение:", value: "Сервис шлангов" },
    ],
  },
  {
    id: 12,
    name: "ОБЖИМНОЙ СТАНОК FINN-POWER FP120UC",
    description:
      "Пресс для серийного производства. Гидравлические фитинги Interlock",
    image: "https://stanok-rvd.ru/stanki_rvd/finnpower/120uc_small.jpg",
    link: "finnpower/fp120/",
    specs: [
      { label: "Тип:", value: "Пресс серийный" },
      { label: "Назначение:", value: "Сервис шлангов" },
    ],
  },
];

// Initialize Finn-Power products grid
document.addEventListener("DOMContentLoaded", function () {
  loadFinnPowerProducts();
});

// Load Finn-Power products function
function loadFinnPowerProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML =
    '<div class="loading">Загрузка оборудования FINN-POWER...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(finnpowerProductsData);
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
                Ошибка загрузки товаров FINN-POWER. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadFinnPowerProducts,
    displayProducts,
    createProductCard,
  };
}
