class Spravka {
  constructor() {
    this.quickLinks = [
      {
        title: "ОПРЕДЕЛИТЕЛЬ РЕЗЬБ",
        description: "Как определить резьбу и тип фитинга",
        link: "spravka/thread-guide.html",
        icon: "🔍",
        category: "Инструменты",
      },
      {
        title: "ИЗГОТОВЛЕНИЕ РВД",
        description:
          "Правила и технологии изготовления рукавов высокого давления",
        link: "spravka/manufacturing-rvd.html",
        icon: "⚙️",
        category: "Производство",
      },
      {
        title: "ВЫБОР И ПРОКЛАДКА ШЛАНГА",
        description:
          "Правильный выбор и прокладка шлангов для оптимальной работы",
        link: "spravka/hose-selection.html",
        icon: "📏",
        category: "Монтаж",
      },
    ];

    this.detailedLinks = [
      {
        title: "УСТАНОВКА И ЗАМЕНА ШЛАНГА",
        description: "Правильная установка и замена шлангов высокого давления",
        link: "spravka/hose-installation.html",
        category: "Монтаж",
      },
      {
        title: "РЕКОМЕНДАЦИИ ПО ЭКСПЛУАТАЦИИ АРМИРОВАННЫХ РВД",
        description:
          "Рекомендации по эксплуатации армированных рукавов высокого давления",
        link: "spravka/rvd-recommendations.html",
        category: "Эксплуатация",
      },
      {
        title: "КАК ДОБИТЬСЯ МАКСИМАЛЬНОГО СРОКА СЛУЖБЫ РВД",
        description:
          "Как добиться максимального срока службы рукавов высокого давления",
        link: "spravka/rvd-lifespan.html",
        category: "Эксплуатация",
      },
      {
        title: "КОЭФФИЦИЕНТЫ (СООТНОШЕНИЯ) ДЛЯ ПЕРЕРАСЧЕТА ЕДИНИЦ ДАВЛЕНИЯ",
        description: "Коэффициенты для перерасчета единиц давления",
        link: "spravka/pressure-units.html",
        category: "Справочные данные",
      },
      {
        title: "ОПИСАНИЕ РВД ГОСТ 25452-90",
        description: "Технические характеристики и требования по ГОСТ 25452-90",
        link: "spravka/gost-25452-90.html",
        category: "Нормативы",
      },
      {
        title: "ОПИСАНИЕ РВД ГОСТ 6286-73",
        description: "Технические характеристики и требования по ГОСТ 6286-73",
        link: "spravka/gost-6286-73.html",
        category: "Нормативы",
      },
    ];

    this.render();
    this.initSearch();
  }

  render() {
    this.renderQuickLinks();
    this.renderDetailedLinks();
  }

  renderQuickLinks() {
    const quickLinksContainer = document.getElementById("quick-links");
    if (!quickLinksContainer) return;

    quickLinksContainer.innerHTML = this.quickLinks
      .map(
        (link) => `
            <div class="quick-link-card">
                <div class="quick-link-icon">${link.icon}</div>
                <h3 class="quick-link-title">${link.title}</h3>
                <p class="quick-link-description">${link.description}</p>
                <span class="category-badge">${link.category}</span>
                <a href="${link.link}" class="quick-link-button" title="${link.description}">
                    Открыть справочник
                </a>
            </div>
        `
      )
      .join("");
  }

  renderDetailedLinks() {
    const detailedLinksContainer = document.getElementById("detailed-links");
    if (!detailedLinksContainer) return;

    detailedLinksContainer.innerHTML = this.detailedLinks
      .map(
        (link) => `
            <div class="detailed-link-item">
                <div class="detailed-link-content">
                    <div class="detailed-link-icon">📄</div>
                    <div class="detailed-link-text">
                        <h3 class="detailed-link-title">
                            <a href="${link.link}" title="${link.description}">
                                ${link.title}
                            </a>
                        </h3>
                        <p class="detailed-link-description">${link.description}</p>
                        <span class="category-badge">${link.category}</span>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  initSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");

    if (searchInput && searchButton) {
      const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
          this.filterContent(query);
        } else {
          this.showAllContent();
        }
      };

      searchButton.addEventListener("click", performSearch);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch();
        }
      });

      // Real-time search
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length >= 2) {
          this.filterContent(query);
        } else if (query.length === 0) {
          this.showAllContent();
        }
      });
    }
  }

  filterContent(query) {
    const allLinks = [...this.quickLinks, ...this.detailedLinks];
    const filteredQuickLinks = this.quickLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.category.toLowerCase().includes(query)
    );

    const filteredDetailedLinks = this.detailedLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.category.toLowerCase().includes(query)
    );

    this.renderFilteredContent(filteredQuickLinks, filteredDetailedLinks);
  }

  renderFilteredContent(quickLinks, detailedLinks) {
    const quickLinksContainer = document.getElementById("quick-links");
    const detailedLinksContainer = document.getElementById("detailed-links");

    if (quickLinksContainer && detailedLinksContainer) {
      // Render filtered quick links
      quickLinksContainer.innerHTML =
        quickLinks.length > 0
          ? quickLinks
              .map(
                (link) => `
                    <div class="quick-link-card">
                        <div class="quick-link-icon">${link.icon}</div>
                        <h3 class="quick-link-title">${link.title}</h3>
                        <p class="quick-link-description">${link.description}</p>
                        <span class="category-badge">${link.category}</span>
                        <a href="${link.link}" class="quick-link-button" title="${link.description}">
                            Открыть справочник
                        </a>
                    </div>
                `
              )
              .join("")
          : '<div class="no-results">По вашему запросу ничего не найдено в быстром доступе</div>';

      // Render filtered detailed links
      detailedLinksContainer.innerHTML =
        detailedLinks.length > 0
          ? detailedLinks
              .map(
                (link) => `
                    <div class="detailed-link-item">
                        <div class="detailed-link-content">
                            <div class="detailed-link-icon">📄</div>
                            <div class="detailed-link-text">
                                <h3 class="detailed-link-title">
                                    <a href="${link.link}" title="${link.description}">
                                        ${link.title}
                                    </a>
                                </h3>
                                <p class="detailed-link-description">${link.description}</p>
                                <span class="category-badge">${link.category}</span>
                            </div>
                        </div>
                    </div>
                `
              )
              .join("")
          : '<div class="no-results">По вашему запросу ничего не найдено в подробных материалах</div>';
    }
  }

  showAllContent() {
    this.renderQuickLinks();
    this.renderDetailedLinks();
  }
}

// Initialize spravka when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Spravka();
});
