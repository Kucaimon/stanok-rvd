const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска всех HTML файлов
function findAllHtmlFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                findAllHtmlFiles(filePath, fileList);
            } else if (file.endsWith('.html')) {
                fileList.push(filePath);
            }
        } catch (error) {
            // Пропускаем файлы, которые не удается прочитать
        }
    });
    
    return fileList;
}

// Функция для замены меню - более простой подход
function swapMenuItems(content) {
    // Ищем блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" - он может быть в разных форматах
    // Паттерн: <li><a href="...high-pressure-hoses.html" ...>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ</a></li>
    const hosesPattern = /<li>\s*<a\s+[^>]*high-pressure-hoses\.html[^>]*>\s*РУКАВА ВЫСОКОГО ДАВЛЕНИЯ\s*<\/a>\s*<\/li>/;
    
    // Ищем блок "ОБОРУДОВАНИЕ ДЛЯ РВД" со всем вложенным меню
    // Это более сложный блок, который включает вложенный <ul>
    const equipmentPattern = /<li>\s*<a\s+[^>]*equipment\.html[^>]*>\s*ОБОРУДОВАНИЕ ДЛЯ РВД\s*<\/a>\s*<ul\s+class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>/;
    
    const hosesMatch = content.match(hosesPattern);
    const equipmentMatch = content.match(equipmentPattern);
    
    if (!hosesMatch || !equipmentMatch) {
        return null; // Не нашли один из элементов
    }
    
    // Проверяем порядок
    const hosesIndex = content.indexOf(hosesMatch[0]);
    const equipmentIndex = content.indexOf(equipmentMatch[0]);
    
    // Если "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" идет раньше "ОБОРУДОВАНИЕ ДЛЯ РВД", меняем местами
    if (hosesIndex < equipmentIndex) {
        // Извлекаем блок между началом меню и "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const beforeHoses = content.substring(0, hosesIndex);
        
        // Находим начало nav-dropdown
        const navDropdownStart = beforeHoses.lastIndexOf('<ul class="nav-dropdown">');
        if (navDropdownStart === -1) {
            return null;
        }
        
        // Текст перед меню
        const beforeMenu = content.substring(0, navDropdownStart + '<ul class="nav-dropdown">'.length);
        
        // Текст после "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const afterEquipment = content.substring(equipmentIndex + equipmentMatch[0].length);
        
        // Находим где заканчивается "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const afterHoses = content.substring(hosesIndex + hosesMatch[0].length, equipmentIndex);
        
        // Формируем новый контент: сначала "ОБОРУДОВАНИЕ ДЛЯ РВД", затем "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const indent = '              ';
        const newContent = beforeMenu + '\n' + 
                          indent + equipmentMatch[0] + '\n' +
                          indent + hosesMatch[0] + 
                          afterHoses + 
                          afterEquipment;
        
        return newContent;
    }
    
    return null; // Порядок уже правильный
}

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('pages');
allHtmlFiles.push('index.html');

let updated = 0;
let skipped = 0;
let errors = 0;

allHtmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем, есть ли оба элемента
        if (!content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД') || 
            !content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ')) {
            skipped++;
            return;
        }
        
        const originalContent = content;
        const newContent = swapMenuItems(content);
        
        if (newContent && newContent !== originalContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`✓ Updated: ${filePath}`);
            updated++;
        } else {
            skipped++;
        }
    } catch (error) {
        console.error(`✗ Error: ${filePath} - ${error.message}`);
        errors++;
    }
});

console.log(`\nSummary: Updated ${updated} files, skipped ${skipped} files, errors: ${errors}`);

