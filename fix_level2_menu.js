const fs = require('fs');
const path = require('path');

// Список файлов уровня 2 (pages/products/*.html)
const level2Files = [
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

// Старый блок меню (РУКАВА ВЫСОКОГО ДАВЛЕНИЯ первым)
const oldMenuPattern = /(<ul class="nav-dropdown">\s*)(<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>\s*)(<li><a[^>]*fittings\.html[^>]*>ФИТИНГИ И МУФТЫ ДЛЯ РВД<\/a><\/li>\s*)(<li><a[^>]*industrial-hoses\.html[^>]*>ПРОМЫШЛЕННЫЕ РУКАВА<\/a><\/li>\s*)(<li><a[^>]*teflon-hoses\.html[^>]*>ТЕФЛОНОВЫЕ РУКАВА<\/a><\/li>\s*)(<li><a[^>]*thermoplastic-hoses\.html[^>]*>ТЕРМОПЛАСТИКОВЫЕ РУКАВА<\/a><\/li>\s*)(<li><a[^>]*parker-hoses\.html[^>]*>МОРОЗОСТОЙКИЕ РУКАВА PARKER<\/a><\/li>\s*)(<li><a[^>]*kanalopromyvochnye-hoses\.html[^>]*>КАНАЛОПРОМЫВОЧНЫЕ РУКАВА<\/a><\/li>\s*)(<li><a[^>]*quick-connections\.html[^>]*>БЫСТРОРАЗЪЁМНЫЕ СОЕДИНЕНИЯ<\/a><\/li>\s*)(<li><a[^>]*ball-valves\.html[^>]*>КРАНЫ ШАРОВЫЕ ВД<\/a><\/li>\s*)(<li><a[^>]*pipe-connections\.html[^>]*>ТРУБНЫЕ СОЕДИНЕНИЯ<\/a><\/li>\s*)(<li><a[^>]*cutting-disks\.html[^>]*>ОТРЕЗНЫЕ ДИСКИ ДЛЯ РВД<\/a><\/li>\s*)(<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>\s*)(<li><a[^>]*termozashita\.html[^>]*>ТЕРМОЗАЩИТА<\/a><\/li>\s*)(<\/ul>)/;

// Новый блок меню (ОБОРУДОВАНИЕ ДЛЯ РВД первым)
function createNewMenu(content) {
    // Находим блок "ОБОРУДОВАНИЕ ДЛЯ РВД"
    const equipmentMatch = content.match(/(<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>)/);
    // Находим блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesMatch = content.match(/(<li>\s*<a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a>\s*<\/li>)/);
    // Находим остальные элементы между ними
    const menuStart = content.indexOf('<ul class="nav-dropdown">');
    const menuEnd = content.indexOf('</ul>', menuStart + '<ul class="nav-dropdown">'.length);
    
    if (!equipmentMatch || !hosesMatch || menuStart === -1 || menuEnd === -1) {
        return null;
    }
    
    // Извлекаем все элементы меню между "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" и "ОБОРУДОВАНИЕ ДЛЯ РВД"
    const hosesIndex = content.indexOf(hosesMatch[0], menuStart);
    const equipmentIndex = content.indexOf(equipmentMatch[0], menuStart);
    
    if (hosesIndex < equipmentIndex) {
        // Находим все элементы между "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" и "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const betweenContent = content.substring(hosesIndex + hosesMatch[0].length, equipmentIndex);
        // Находим элемент после "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const afterEquipment = content.substring(equipmentIndex + equipmentMatch[0].length, menuEnd);
        
        // Формируем новое меню
        const beforeMenu = content.substring(0, menuStart + '<ul class="nav-dropdown">'.length);
        const afterMenu = content.substring(menuEnd);
        
        const indent = '              ';
        const newMenu = beforeMenu + '\n' +
                       indent + equipmentMatch[0] + '\n' +
                       indent + hosesMatch[0] + 
                       betweenContent +
                       afterEquipment.replace(/^\s*<li><a[^>]*termozashita\.html[^>]*>ТЕРМОЗАЩИТА<\/a><\/li>\s*/, '') +
                       indent + '<li><a href="../../pages/products/termozashita.html" class="nav-dropdown-item">ТЕРМОЗАЩИТА</a></li>\n' +
                       afterMenu;
        
        return newMenu;
    }
    
    return null;
}

let updated = 0;

level2Files.forEach(filePath => {
    try {
        if (!fs.existsSync(filePath)) {
            return;
        }
        
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем, нужно ли обновление
        const hosesIndex = content.indexOf('high-pressure-hoses.html');
        const equipmentIndex = content.indexOf('equipment.html');
        const navDropdownIndex = content.indexOf('<ul class="nav-dropdown">');
        
        if (hosesIndex === -1 || equipmentIndex === -1 || navDropdownIndex === -1) {
            return;
        }
        
        // Проверяем порядок в меню
        const hosesInMenu = content.indexOf('high-pressure-hoses.html', navDropdownIndex);
        const equipmentInMenu = content.indexOf('equipment.html', navDropdownIndex);
        
        // Если "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" идет раньше "ОБОРУДОВАНИЕ ДЛЯ РВД" в меню
        if (hosesInMenu < equipmentInMenu && hosesInMenu !== -1 && equipmentInMenu !== -1) {
            const newContent = createNewMenu(content);
            if (newContent) {
                fs.writeFileSync(filePath, newContent, 'utf-8');
                console.log(`✓ Updated: ${filePath}`);
                updated++;
            }
        }
    } catch (error) {
        console.error(`✗ Error: ${filePath} - ${error.message}`);
    }
});

console.log(`\nSummary: Updated ${updated} files`);

