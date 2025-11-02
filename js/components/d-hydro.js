// Products data extracted from the original HTML
const productsData = [
  {
    id: 1,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO SM-625E",
    description:
      "Ручной переносной пресс для работы в полевых условиях без электричества",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/sm625_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/sm_625e/",
    specs: [
      { label: "Диапазон обжима:", value: "8-49 мм" },
      { label: "Сила сжатия:", value: "1100 кН" },
    ],
  },
  {
    id: 2,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO SM-32CM",
    description:
      "Компактный обжимной станок для профессионального использования",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/sm32mc_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/sm_32cm/",
    specs: [
      { label: "Диапазон обжима:", value: "8-32 мм" },
      { label: "Тип кулачков:", value: "P16" },
    ],
  },
  {
    id: 3,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO SM-38EC",
    description: "Электрический пресс для производства и ремонта РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/sm38ec_sc_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/sm_38ec/",
    specs: [
      { label: "Диапазон обжима:", value: "8-38 мм" },
      { label: "Питание:", value: "380В" },
    ],
  },
  {
    id: 4,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO SM-38SC",
    description: "Стационарный пресс для серийного производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/sm38ec_sc_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/sm_38sc/",
    specs: [
      { label: "Диапазон обжима:", value: "8-38 мм" },
      { label: "Тип:", value: "Стационарный" },
    ],
  },
  {
    id: 5,
    name: "ЗАЧИСТНОЙ СТАНОК D-HYDRO HS-50",
    description: "Для снятия наружного и внутреннего слоя резины РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/hs50_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/hs_50/",
    specs: [
      { label: "Тип:", value: "Зачистной" },
      { label: "Назначение:", value: "4SP, 4SH, R13, R15" },
    ],
  },
  {
    id: 6,
    name: "ОТРЕЗНОЙ СТАНОК D-HYDRO CM-70/CM-100",
    description: "Для резки РВД всех типов и диаметров",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/cm70_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/cm_70/",
    specs: [
      { label: "Диапазон резки:", value: "до 100 мм" },
      { label: "Тип:", value: "Отрезной" },
    ],
  },
  {
    id: 7,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO YL-20",
    description: "Универсальный пресс для изготовления РВД и опрессовки",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/yl_20_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/yl_20/",
    specs: [
      { label: "Диапазон обжима:", value: "6-20 мм" },
      { label: "Сила сжатия:", value: "200 кН" },
    ],
  },
  {
    id: 8,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO YL-32",
    description: "Мощный пресс для профессионального производства РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/yl_32_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/yl_32/",
    specs: [
      { label: "Диапазон обжима:", value: "10-32 мм" },
      { label: "Сила сжатия:", value: "320 кН" },
    ],
  },
  {
    id: 9,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO YL-20S",
    description:
      "Изготовление и производство РВД. Опрессовка труб. Грузоподъемных тросов",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/yl_20s_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/yl_20s/",
    specs: [
      { label: "Тип:", value: "Обжимной" },
      { label: "Модификация:", value: "YL-20S" },
    ],
  },
  {
    id: 10,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO YL-65",
    description: "Для изготовления РВД опрессовка труб грузоподъемных тросов",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/yl_65_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/yl_65/",
    specs: [
      { label: "Диапазон обжима:", value: "до 65 мм" },
      { label: "Тип:", value: "Обжимной" },
    ],
  },
  {
    id: 11,
    name: "ОБЖИМНОЙ СТАНОК D-HYDRO YL-80",
    description: "Для изготовления РВД опрессовка труб грузоподъемных тросов",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/yl_80_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/yl_80/",
    specs: [
      { label: "Диапазон обжима:", value: "до 80 мм" },
      { label: "Тип:", value: "Обжимной" },
    ],
  },
  {
    id: 12,
    name: "ЗАЧИСТНОЙ СТАНОК D-HYDRO HS-50M",
    description: "Для снятия наружного и внутреннего слоя резины РВД",
    image: "https://stanok-rvd.ru/stanki_rvd/d-hydro/hs50m_small.jpg",
    link: "/stanok-rvd/pages/products/d-hydro/hs_50m/",
    specs: [
      { label: "Тип:", value: "Зачистной" },
      { label: "Модификация:", value: "HS-50M" },
    ],
  },
];

// Initialize products grid
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
});

// Load products function
function loadProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  // Show loading state
  container.innerHTML = '<div class="loading">Загрузка оборудования...</div>';

  // Simulate API call delay
  setTimeout(() => {
    displayProducts(productsData);
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
                Ошибка загрузки товаров. Пожалуйста, попробуйте позже.
            </div>
        `;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadProducts,
    displayProducts,
    createProductCard,
  };
}
