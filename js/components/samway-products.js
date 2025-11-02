// SAMWAY products data
const samwayProductsData = [
  {
    id: 1,
    name: "ОБЖИМНОЙ СТАНОК SAMWAY P16HP",
    description:
      "Профессиональный обжимной станок для производства РВД. Идеально подходит для сервисных центров и небольших производств.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_p16hp.jpg",
    link: "/stanok-rvd/pages/products/samway/p16hp_samway/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модель:", value: "P16HP" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 2,
    name: "ОБЖИМНОЙ СТАНОК SAMWAY P20HP",
    description:
      "Мощный обжимной станок для профессионального использования. Обеспечивает высокую точность обжима РВД.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_p20hp_small.png",
    link: "/stanok-rvd/pages/products/samway/p20hp_samway/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модель:", value: "P20HP" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 3,
    name: "ОБЖИМНОЙ СТАНОК SAMWAY P20Q",
    description:
      "Компактный и эффективный обжимной станок для работы с различными типами рукавов высокого давления.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_p20q.png",
    link: "/stanok-rvd/pages/products/samway/p20q_samway/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модель:", value: "P20Q" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 4,
    name: "ОБЖИМНОЙ СТАНОК SAMWAY P32Q",
    description:
      "Профессиональный обжимной станок для крупных производств. Обеспечивает высокую производительность.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_p32q.png",
    link: "/stanok-rvd/pages/products/samway/p32q_samway/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модель:", value: "P32Q" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 5,
    name: "ОБЖИМНОЙ СТАНОК SAMWAY S51",
    description:
      "Специализированный обжимной станок для работы со сложными типами рукавов и фитингов.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_s51.png",
    link: "/stanok-rvd/pages/products/samway/s51_samway/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модель:", value: "S51" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 6,
    name: "ОТРЕЗНОЙ СТАНОК SAMWAY C401/C400",
    description:
      "Профессиональный отрезной станок для точной резки рукавов высокого давления.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_c401.png",
    link: "/stanok-rvd/pages/products/samway/c401_samway/",
    specs: [
      { label: "Тип:", value: "Отрезной" },
      { label: "Модель:", value: "C401/C400" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
  {
    id: 7,
    name: "ЗАЧИСТНОЙ СТАНОК SAMWAY 51ESC",
    description:
      "Эффективный зачистной станок для подготовки рукавов перед установкой фитингов.",
    image: "https://stanok-rvd.ru/stanki_rvd/samway/titul_skiver_51esc.jpg",
    link: "/stanok-rvd/pages/products/samway/skiver_51esc/",
    specs: [
      { label: "Тип:", value: "Зачистной" },
      { label: "Модель:", value: "51ESC" },
      { label: "Производитель:", value: "SAMWAY" },
    ],
  },
];

// Initialize SAMWAY products grid
document.addEventListener("DOMContentLoaded", function () {
  loadSamwayProducts();
});

// Load SAMWAY products function
function loadSamwayProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML =
    '<div class="loading">Загрузка оборудования SAMWAY...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(samwayProductsData);
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
                Ошибка загрузки товаров SAMWAY. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}
