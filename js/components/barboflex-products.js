// BARBOFLEX products data
const barboflexProductsData = [
  {
    id: 1,
    name: "ОТРЕЗНОЙ СТАНОК BARBOFLEX CUT 125",
    description:
      'Ручные отрезные станки Barboflex CUT 125 позволяют производить резку гидравлических, пневматических и промышленных шлангов. Идеально подходит для резки гибких гидравлических четырехнавивочных рукавов до 1".',
    image: "https://stanok-rvd.ru/stanki_rvd/barboflex/cut125_titull.png",
    link: "barboflex/cut125/",
    specs: [
      { label: "Тип:", value: "Ручной" },
      { label: "Диапазон:", value: 'до 1"' },
      { label: "Назначение:", value: "Резка РВД" },
    ],
  },
  {
    id: 2,
    name: "ОТРЕЗНОЙ СТАНОК BARBOFLEX CUT 225",
    description:
      "Отрезной станок для РВД Barboflex CUT 225 разработан для применения в ремонтных и сервисных предприятиях с месячными объемами производства РВД порядка 3000 штук в месяц.",
    image: "https://stanok-rvd.ru/stanki_rvd/barboflex/cut225_titul.png",
    link: "barboflex/cut225/",
    specs: [
      { label: "Тип:", value: "Стационарный" },
      { label: "Диапазон:", value: 'до 1.14"' },
      { label: "Производительность:", value: "3000 шт/мес" },
    ],
  },
  {
    id: 3,
    name: "ОТРЕЗНОЙ СТАНОК BARBOFLEX CUT 325",
    description:
      "Отрезной станок для РВД Barboflex CUT 325 разработан для применения в ремонтных и сервисных предприятиях с месячными объемами производства РВД порядка 10000 штук в месяц.",
    image: "https://stanok-rvd.ru/stanki_rvd/barboflex/cut325_titull.png",
    link: "barboflex/cut325/",
    specs: [
      { label: "Тип:", value: "Промышленный" },
      { label: "Диапазон:", value: 'до 2"' },
      { label: "Производительность:", value: "10000 шт/мес" },
    ],
  },
  {
    id: 4,
    name: "ЗАЧИСТНОЙ СТАНОК BARBOFLEX SKM 100",
    description:
      'Зачистной станок Barboflex SKM 100 предназначен для зачистки четырёхнавивочных рукавов высокого давления. Позволяет производить внутреннюю и внешнюю зачистку гидравлических рукавов до 2".',
    image: "https://stanok-rvd.ru/stanki_rvd/barboflex/skm100_titul.png",
    link: "barboflex/skm100/",
    specs: [
      { label: "Тип:", value: "Зачистной" },
      { label: "Диапазон:", value: 'до 2"' },
      { label: "Назначение:", value: "Зачистка РВД" },
    ],
  },
];

// Initialize BARBOFLEX products grid
document.addEventListener("DOMContentLoaded", function () {
  loadBarboflexProducts();
});

// Load BARBOFLEX products function
function loadBarboflexProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML =
    '<div class="loading">Загрузка оборудования BARBOFLEX...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(barboflexProductsData);
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
                Ошибка загрузки товаров BARBOFLEX. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}
