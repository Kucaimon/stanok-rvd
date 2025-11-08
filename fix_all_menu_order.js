const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска всех HTML файлов
function findAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            findAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Функция для исправления порядка пунктов меню
function fixMenuOrder(content) {
    // Проверяем наличие обоих пунктов меню
    if (!content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД') || !content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ')) {
        return content;
    }
    
    // Паттерн для поиска всего выпадающего меню
    const navDropdownMatch = content.match(/<ul class="nav-dropdown">([\s\S]*?)<\/ul>\s*<\/li>\s*<\/ul>\s*<\/div>\s*<\/nav>/);
    if (!navDropdownMatch) {
        return content;
    }
    
    const navDropdownContent = navDropdownMatch[1];
    
    // Ищем блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesPattern = /<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>/;
    
    // Ищем блок "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным списком
    const equipmentPattern = /<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>/;
    
    const hosesMatch = navDropdownContent.match(hosesPattern);
    const equipmentMatch = navDropdownContent.match(equipmentPattern);
    
    if (!hosesMatch || !equipmentMatch) {
        return content; // Если одного из пунктов нет в меню, ничего не меняем
    }
    
    const hosesBlock = hosesMatch[0];
    const equipmentBlock = equipmentMatch[0];
    const hosesIndex = hosesMatch.index;
    const equipmentIndex = equipmentMatch.index;
    
    // Если "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" уже идет перед "ОБОРУДОВАНИЕ ДЛЯ РВД", проверяем, что между ними нет других пунктов
    if (hosesIndex < equipmentIndex) {
        // Проверяем, что между ними нет других основных пунктов меню
        const between = navDropdownContent.substring(hosesIndex + hosesBlock.length, equipmentIndex).trim();
        // Если между ними только пробелы и переносы строк, порядок правильный
        if (!between || /^\s*$/.test(between)) {
            return content; // Порядок уже правильный
        }
    }
    
    // Удаляем оба блока из меню
    let newNavContent = navDropdownContent;
    newNavContent = newNavContent.replace(hosesPattern, '');
    newNavContent = newNavContent.replace(equipmentPattern, '');
    
    // Добавляем их в начало меню в правильном порядке
    // Определяем отступ для новых элементов
    const indentMatch = newNavContent.match(/(\n\s*)<li>/);
    const indent = indentMatch ? indentMatch[1] : '\n              ';
    
    // Вставляем в начало: сначала "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", потом "ОБОРУДОВАНИЕ ДЛЯ РВД"
    newNavContent = indent.trim() + hosesBlock + indent + equipmentBlock + newNavContent;
    
    // Заменяем в исходном контенте
    return content.replace(navDropdownMatch[0], '<ul class="nav-dropdown">' + newNavContent + '</ul></li></ul></div></nav>');
}

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('.');

let updated = 0;
let checked = 0;

allHtmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        checked++;
        
        // Проверяем, есть ли меню "ПРОДУКЦИЯ"
        if (!content.includes('ПРОДУКЦИЯ')) {
            return;
        }
        
        const originalContent = content;
        content = fixMenuOrder(content);
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✓ Обновлено: ${filePath}`);
            updated++;
        }
    } catch (error) {
        console.error(`✗ Ошибка при обработке ${filePath}:`, error.message);
    }
});

console.log(`\nПроверено файлов: ${checked}`);
console.log(`Обновлено файлов: ${updated}`);
