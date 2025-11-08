const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Check if navigation has PRODUCT dropdown
function hasProductDropdown(content) {
    // Check for both Cyrillic and potential mojibake
    return (content.includes('ПРОДУКЦИЯ') || content.includes('ПРОДУКТ') || content.includes('nav-dropdown')) &&
           (content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ') || content.includes('high-pressure-hoses.html'));
}

// Get navigation HTML for different depths
function getNavigationHTML(depth) {
    const paths = {
        1: { base: '../', products: '../pages/products/', pages: '../pages/' },
        2: { base: '../../', products: '../../pages/products/', pages: '../../pages/' },
        3: { base: '../../../', products: '../../../pages/products/', pages: '../../../pages/' },
        4: { base: '../../../../', products: '../../../../pages/products/', pages: '../../../../pages/' },
        5: { base: '../../../../../', products: '../../../../../pages/products/', pages: '../../../../../pages/' }
    };
    
    const p = paths[depth] || paths[4];
    
    return `          <li><a href="${p.base}index.html" class="nav-link">О КОМПАНИИ</a></li>
          <li>
            <a href="#" class="nav-link">ПРОДУКЦИЯ</a>
            <ul class="nav-dropdown">
              <li><a href="${p.products}high-pressure-hoses.html" class="nav-dropdown-item">РУКАВА ВЫСОКОГО ДАВЛЕНИЯ</a></li>
              <li><a href="${p.products}fittings.html" class="nav-dropdown-item">ФИТИНГИ И МУФТЫ ДЛЯ РВД</a></li>
              <li><a href="${p.products}industrial-hoses.html" class="nav-dropdown-item">ПРОМЫШЛЕННЫЕ РУКАВА</a></li>
              <li><a href="${p.products}teflon-hoses.html" class="nav-dropdown-item">ТЕФЛОНОВЫЕ РУКАВА</a></li>
              <li><a href="${p.products}thermoplastic-hoses.html" class="nav-dropdown-item">ТЕРМОПЛАСТИКОВЫЕ РУКАВА</a></li>
              <li><a href="${p.products}parker-hoses.html" class="nav-dropdown-item">МОРОЗОСТОЙКИЕ РУКАВА PARKER</a></li>
              <li><a href="${p.products}kanalopromyvochnye-hoses.html" class="nav-dropdown-item">КАНАЛОПРОМЫВОЧНЫЕ РУКАВА</a></li>
              <li><a href="${p.products}quick-connections.html" class="nav-dropdown-item">БЫСТРОРАЗЪЁМНЫЕ СОЕДИНЕНИЯ</a></li>
              <li><a href="${p.products}ball-valves.html" class="nav-dropdown-item">КРАНЫ ШАРОВЫЕ ВД</a></li>
              <li><a href="${p.products}pipe-connections.html" class="nav-dropdown-item">ТРУБНЫЕ СОЕДИНЕНИЯ</a></li>
              <li><a href="${p.products}cutting-disks.html" class="nav-dropdown-item">ОТРЕЗНЫЕ ДИСКИ ДЛЯ РВД</a></li>
              <li>
                <a href="${p.products}equipment.html" class="nav-dropdown-item">ОБОРУДОВАНИЕ ДЛЯ РВД</a>
                <ul class="nav-dropdown-nested">
                  <li><a href="${p.products}finnpower.html" class="nav-dropdown-item">FINN-POWER</a></li>
                  <li><a href="${p.products}d-hydro.html" class="nav-dropdown-item">D-HYDRO</a></li>
                  <li><a href="${p.products}op.html" class="nav-dropdown-item">О+Р (ИТАЛИЯ)</a></li>
                  <li><a href="${p.products}samway.html" class="nav-dropdown-item">SAMWAY</a></li>
                  <li><a href="${p.products}barboflex.html" class="nav-dropdown-item">BARBOFLEX</a></li>
                  <li><a href="${p.products}uniflex.html" class="nav-dropdown-item">UNIFLEX</a></li>
                </ul>
              </li>
              <li><a href="${p.products}termozashita.html" class="nav-dropdown-item">ТЕРМОЗАЩИТА</a></li>
            </ul>
          </li>
          <li>
            <a href="${p.pages}certificate.html" class="nav-link">СЕРТИФИКАТЫ</a>
          </li>
          <li><a href="${p.pages}spravka.html" class="nav-link">СПРАВОЧНИК</a></li>
          <li><a href="${p.pages}contact.html" class="nav-link">КОНТАКТЫ</a></li>
          <li><a href="${p.pages}order.html" class="nav-link">ЗАКАЗ С САЙТА</a></li>`;
}

// Update navigation in file
function updateNavigation(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already has product dropdown
        if (hasProductDropdown(content)) {
            return false;
        }
        
        // Skip root index.html
        if (filePath === 'index.html' || (filePath.includes('index.html') && !filePath.includes('pages'))) {
            return false;
        }
        
        // Calculate depth (number of ../ needed)
        const normalizedPath = filePath.replace(/\\/g, '/');
        const parts = normalizedPath.split('/');
        let depth = 0;
        
        // Count depth: pages = 1, pages/products = 2, etc.
        if (parts.includes('pages')) {
            depth = parts.length - parts.indexOf('pages') - 2; // -2 for filename and one more level
            if (depth < 1) depth = 1;
        }
        
        // Find navigation ul element - look for nav-list
        const navListRegex = /<ul\s+class=["']nav-list["'][^>]*>/i;
        const navListMatch = content.match(navListRegex);
        
        if (!navListMatch) {
            console.log(`No nav-list found in: ${filePath}`);
            return false;
        }
        
        const navStartIndex = navListMatch.index + navListMatch[0].length;
        
        // Find the closing </ul> for nav-list by tracking nested ul/li
        let ulDepth = 1;
        let ulEndIndex = navStartIndex;
        let inTag = false;
        
        for (let i = navStartIndex; i < content.length; i++) {
            if (content[i] === '<') {
                if (content.substr(i, 4) === '<ul ') {
                    ulDepth++;
                    i += 3;
                } else if (content.substr(i, 5) === '</ul>') {
                    ulDepth--;
                    if (ulDepth === 0) {
                        ulEndIndex = i;
                        break;
                    }
                    i += 4;
                }
            }
        }
        
        if (ulDepth !== 0) {
            console.log(`Could not find closing </ul> in: ${filePath}`);
            return false;
        }
        
        // Extract existing nav items to check structure
        const existingNav = content.substring(navStartIndex, ulEndIndex);
        
        // Check if it's a simple nav without PRODUCT dropdown
        // Look for pattern: О КОМПАНИИ, СЕРТИФИКАТЫ, СПРАВОЧНИК, КОНТАКТЫ, ЗАКАЗ С САЙТА
        // without ПРОДУКЦИЯ dropdown
        
        // Replace the entire nav-list content
        const beforeNav = content.substring(0, navStartIndex);
        const afterNav = content.substring(ulEndIndex);
        const newNav = getNavigationHTML(depth);
        
        content = beforeNav + '\n' + newNav + '\n        ' + afterNav;
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
        return false;
    }
}

// Main execution
console.log('Finding all HTML files...');
const files = getAllHtmlFiles('pages');
let updatedCount = 0;
let skippedCount = 0;

files.forEach(filePath => {
    if (updateNavigation(filePath)) {
        updatedCount++;
        console.log(`✓ Updated: ${filePath}`);
    } else {
        skippedCount++;
    }
});

console.log(`\nSummary:`);
console.log(`  Updated: ${updatedCount} files`);
console.log(`  Skipped: ${skippedCount} files (already have PRODUCT dropdown or no nav-list)`);

