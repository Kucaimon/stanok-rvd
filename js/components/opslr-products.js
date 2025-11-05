// O+P products data extracted from the original HTML
const opslrProductsData = [
  {
    id: 1,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H47 РМ",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с двумя спиралями. Мобильные прессы имеют привод от ручного насоса для использования в полевых условиях.',
    image: "https://stanok-rvd.ru/media/content/opslr/h47pm.jpg",
    link: "../op/tubomatic_h47pm/",
    specs: [
      { label: "Тип:", value: "Мобильный пресс" },
      { label: "Диапазон:", value: 'до 1" 2 спирали' },
    ],
  },
  {
    id: 2,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H47 E",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с двумя спиралями. Мобильные прессы для использования в полевых условиях.',
    image: "https://stanok-rvd.ru/media/content/opslr/h47e.jpg",
    link: "../op/tubomatic_h47e/",
    specs: [
      { label: "Тип:", value: "Мобильный пресс" },
      { label: "Диапазон:", value: 'до 1" 2 спирали' },
    ],
  },
  {
    id: 3,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H47 EL",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с четырьмя спиралями. Многофункциональная машина для сервисных подразделений.',
    image: "https://stanok-rvd.ru/media/content/opslr/h47el.jpg",
    link: "../op/tubomatic_h47el/",
    specs: [
      { label: "Тип:", value: "Многофункциональный" },
      { label: "Диапазон:", value: 'до 1" 4 спирали' },
    ],
  },
  {
    id: 4,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H47 PI",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с двумя спиралями. Многофункциональная машина для сервисных подразделений.',
    image: "https://stanok-rvd.ru/media/content/opslr/h47pi.jpg",
    link: "../op/tubomatic_h47pi/",
    specs: [
      { label: "Тип:", value: "Многофункциональный" },
      { label: "Диапазон:", value: 'до 1" 2 спирали' },
    ],
  },
  {
    id: 5,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H54 РМ",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1-1/4" с четырьмя спиралями.',
    image: "https://stanok-rvd.ru/media/content/opslr/h54pm.jpg",
    link: "../op/tubomatic_h54pm/",
    specs: [
      { label: "Тип:", value: "Сервисный" },
      { label: "Диапазон:", value: 'до 1-1/4"' },
    ],
  },
  {
    id: 6,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H54 РI",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1-1/4" с четырьмя спиралями.',
    image: "https://stanok-rvd.ru/media/content/opslr/h54pi.jpg",
    link: "../op/tubomatic_h54pi/",
    specs: [
      { label: "Тип:", value: "Сервисный" },
      { label: "Диапазон:", value: 'до 1-1/4"' },
    ],
  },
  {
    id: 7,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H54 EL",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1.1/4" с четырьмя спиралями.',
    image: "https://stanok-rvd.ru/media/content/opslr/h54el.jpg",
    link: "../op/tubomatic_h54el/",
    specs: [
      { label: "Тип:", value: "Стандартный" },
      { label: "Диапазон:", value: 'до 1.1/4"' },
    ],
  },
  {
    id: 8,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H54 ES",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1.1/4" с четырьмя спиралями. Имеет электронное управление.',
    image: "https://stanok-rvd.ru/media/content/opslr/h54es.jpg",
    link: "../op/tubomatic_h54es/",
    specs: [
      { label: "Тип:", value: "Электронный" },
      { label: "Диапазон:", value: 'до 1.1/4"' },
    ],
  },
  {
    id: 9,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H83 EEL",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1.1/4" четырьмя спиралями. Максимальный диаметр оплеточного рукава с одной оплеткой 1.1/2".',
    image: "https://stanok-rvd.ru/media/content/opslr/H83EEL.jpg",
    link: "../op/tubomatic_h83eel/",
    specs: [
      { label: "Тип:", value: "Современный" },
      { label: "Диапазон:", value: 'до 1.1/2"' },
    ],
  },
  {
    id: 10,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H88 EL",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1.1/2" четырьмя спиралями. Максимальный диаметр оплеточного рукава с одной оплеткой 2".',
    image: "https://stanok-rvd.ru/media/content/opslr/H88EL.jpg",
    link: "../op/tubomatic_h88el/",
    specs: [
      { label: "Тип:", value: "Профессиональный" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
  {
    id: 11,
    name: "ОБЖИМНОЙ СТАНОК TUBOMATIC H88 ES",
    description:
      'Идеален для опрессовки гидравлических рукавов до 1" с шестью спиралями и 1.1/2" четырьмя спиралями. Максимальный диаметр оплеточного рукава с одной оплеткой 2". Имеет электронное управление.',
    image: "https://stanok-rvd.ru/media/content/opslr/H88ES.jpg",
    link: "../op/tubomatic_h88es/",
    specs: [
      { label: "Тип:", value: "Электронный" },
      { label: "Диапазон:", value: 'до 2"' },
    ],
  },
];

// Initialize O+P products grid
document.addEventListener("DOMContentLoaded", function () {
  loadOPSLRProducts();
});

// Load O+P products function
function loadOPSLRProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML =
    '<div class="loading">Загрузка оборудования О+Р...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(opslrProductsData);
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
                Ошибка загрузки товаров О+Р. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadOPSLRProducts,
    displayProducts,
    createProductCard,
  };
}
