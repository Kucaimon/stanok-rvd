const fs = require('fs');
const path = require('path');

// List of files that need PRODUCT dropdown menu added
// These are files at depth 2 (pages/products/*.html) without PRODUCT dropdown
const filesToFix = [
    'pages/products/ball-valves.html',
    'pages/products/barboflex.html',
    'pages/products/cutting-disks.html',
    'pages/products/d-hydro.html',
    'pages/products/equipment.html',
    'pages/products/finnpower.html',
    'pages/products/fittings.html',
    'pages/products/high-pressure-hoses.html',
    'pages/products/industrial-hoses.html',
    'pages/products/kanalopromyvochnye-hoses.html',
    'pages/products/op.html',
    'pages/products/parker-hoses.html',
    'pages/products/pipe-connections.html',
    'pages/products/quick-connections.html',
    'pages/products/samway.html',
    'pages/products/teflon-hoses.html',
    'pages/products/termozashita.html',
    'pages/products/thermoplastic-hoses.html',
    'pages/products/uniflex.html'
];

// Navigation HTML for depth 2 (pages/products/*.html)
const navHTMLDepth2 = `          <li><a href="../../index.html" class="nav-link">О КОМПАНИИ</a></li>
          <li>
            <a href="#" class="nav-link">ПРОДУКЦИЯ</a>
            <ul class="nav-dropdown">
              <li><a href="../../pages/products/high-pressure-hoses.html" class="nav-dropdown-item">РУКАВА ВЫСОКОГО ДАВЛЕНИЯ</a></li>
              <li><a href="../../pages/products/fittings.html" class="nav-dropdown-item">ФИТИНГИ И МУФТЫ ДЛЯ РВД</a></li>
              <li><a href="../../pages/products/industrial-hoses.html" class="nav-dropdown-item">ПРОМЫШЛЕННЫЕ РУКАВА</a></li>
              <li><a href="../../pages/products/teflon-hoses.html" class="nav-dropdown-item">ТЕФЛОНОВЫЕ РУКАВА</a></li>
              <li><a href="../../pages/products/thermoplastic-hoses.html" class="nav-dropdown-item">ТЕРМОПЛАСТИКОВЫЕ РУКАВА</a></li>
              <li><a href="../../pages/products/parker-hoses.html" class="nav-dropdown-item">МОРОЗОСТОЙКИЕ РУКАВА PARKER</a></li>
              <li><a href="../../pages/products/kanalopromyvochnye-hoses.html" class="nav-dropdown-item">КАНАЛОПРОМЫВОЧНЫЕ РУКАВА</a></li>
              <li><a href="../../pages/products/quick-connections.html" class="nav-dropdown-item">БЫСТРОРАЗЪЁМНЫЕ СОЕДИНЕНИЯ</a></li>
              <li><a href="../../pages/products/ball-valves.html" class="nav-dropdown-item">КРАНЫ ШАРОВЫЕ ВД</a></li>
              <li><a href="../../pages/products/pipe-connections.html" class="nav-dropdown-item">ТРУБНЫЕ СОЕДИНЕНИЯ</a></li>
              <li><a href="../../pages/products/cutting-disks.html" class="nav-dropdown-item">ОТРЕЗНЫЕ ДИСКИ ДЛЯ РВД</a></li>
              <li>
                <a href="equipment.html" class="nav-dropdown-item">ОБОРУДОВАНИЕ ДЛЯ РВД</a>
                <ul class="nav-dropdown-nested">
                  <li><a href="../../pages/products/finnpower.html" class="nav-dropdown-item">FINN-POWER</a></li>
                  <li><a href="../../pages/products/d-hydro.html" class="nav-dropdown-item">D-HYDRO</a></li>
                  <li><a href="../../pages/products/op.html" class="nav-dropdown-item">О+Р (ИТАЛИЯ)</a></li>
                  <li><a href="../../pages/products/samway.html" class="nav-dropdown-item">SAMWAY</a></li>
                  <li><a href="../../pages/products/barboflex.html" class="nav-dropdown-item">BARBOFLEX</a></li>
                  <li><a href="../../pages/products/uniflex.html" class="nav-dropdown-item">UNIFLEX</a></li>
                </ul>
              </li>
              <li><a href="../../pages/products/termozashita.html" class="nav-dropdown-item">ТЕРМОЗАЩИТА</a></li>
            </ul>
          </li>
          <li>
            <a href="../../pages/certificate.html" class="nav-link">СЕРТИФИКАТЫ</a>
          </li>
          <li><a href="../../pages/spravka.html" class="nav-link">СПРАВОЧНИК</a></li>
          <li><a href="../../pages/contact.html" class="nav-link">КОНТАКТЫ</a></li>
          <li><a href="../../pages/order.html" class="nav-link">ЗАКАЗ С САЙТА</a></li>`;

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already has PRODUCT dropdown
        if (content.includes('ПРОДУКЦИЯ') && content.includes('nav-dropdown') && 
            (content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ') || content.includes('high-pressure-hoses.html'))) {
            console.log(`✓ Already has PRODUCT dropdown: ${filePath}`);
            return false;
        }
        
        // Find the entire nav block
        const navMatch = content.match(/(<ul\s+class=["']nav-list["'][^>]*>)([\s\S]*?)(<\/ul>\s*<\/div>\s*<\/nav>)/);
        if (!navMatch) {
            console.log(`✗ No nav block found: ${filePath}`);
            return false;
        }
        
        // Replace the entire nav-list content
        const navListStart = navMatch[1];
        const navListEnd = navMatch[3];
        
        content = content.replace(
            navMatch[0],
            navListStart + '\n' + navHTMLDepth2 + '\n        ' + navListEnd
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Updated: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`✗ Error processing ${filePath}: ${error.message}`);
        return false;
    }
}

// Process all files
let updated = 0;
filesToFix.forEach(filePath => {
    if (updateFile(filePath)) {
        updated++;
    }
});

console.log(`\nSummary: Updated ${updated} files`);

