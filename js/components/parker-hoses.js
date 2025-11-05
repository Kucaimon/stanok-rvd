class ParkerHosesPage {
  constructor() {
    this.hoses = [
      {
        title: "Р СѓРєР°РІ Parker 371LT",
        image: "https://stanok-rvd.ru/media/content/parker/371lt_titul.jpg",
        link: "../parker-hoses/371lt.html",
        description:
          "Р СѓРєР°РІ Parker 371LT РѕС‚РІРµС‡Р°РµС‚ СЃС‚Р°РЅРґР°СЂС‚Р°Рј DIN EN856 4SP, DIN 20023 4SP, SAE 100R12 Рё РїСЂРёРјРµРЅСЏРµС‚СЃСЏ РІ РіРёРґСЂРѕСЃРёСЃС‚РµРјР°С… СЃ Р±РѕР»СЊС€РёРј РґР°РІР»РµРЅРёРµРј. РЁР»Р°РЅРі Parker 371LT СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓРµС‚ Рё РїСЂРµРІС‹С€Р°РµС‚ С‚СЂРµР±РѕРІР°РЅРёСЏ Р“РћРЎРў 25452-90.",
      },
      {
        title: "Р СѓРєР°РІ Parker 461LT",
        image: "https://stanok-rvd.ru/media/content/parker/461lt_titul.jpg",
        link: "../parker-hoses/461lt.html",
        description:
          "Р СѓРєР°РІ Parker 461LT РѕС‚РІРµС‡Р°РµС‚ СЃС‚Р°РЅРґР°СЂС‚Р°Рј DIN EN 857 2SC, DIN 20022 2SC, SAE 100R2AT Рё РїСЂРёРјРµРЅСЏРµС‚СЃСЏ РІ РіРёРґСЂРѕСЃРёСЃС‚РµРјР°С… СЃРѕ СЃСЂРµРґРЅРёРј РґР°РІР»РµРЅРёРµРј. РЁР»Р°РЅРі Parker 461LT DIN EN 857 2SC СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓРµС‚ Рё РїСЂРµРІС‹С€Р°РµС‚ С‚СЂРµР±РѕРІР°РЅРёСЏ Р“РћРЎРў 6286-73 РўРёРї 2.",
      },
    ];

    this.render();
  }

  render() {
    this.renderHoses();
  }

  renderHoses() {
    const hosesList = document.getElementById("hoses-list");
    if (!hosesList) return;

    hosesList.innerHTML = this.hoses
      .map(
        (hose) => `
            <div class="hose-item">
                <a href="${hose.link}" title="${hose.title}">
                    <img src="${hose.image}" alt="${hose.title}" class="hose-image" loading="lazy">
                </a>
                <div class="hose-content">
                    <h3 class="hose-title">${hose.title}</h3>
                    <p class="hose-description">${hose.description}</p>
                    <a href="${hose.link}" class="hose-link" title="${hose.title}">
                        РџРѕРґСЂРѕР±РЅРµРµ
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Initialize parker hoses page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ParkerHosesPage();
});
