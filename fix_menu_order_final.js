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

// Функция для замены порядка пунктов меню
function fixMenuOrder(content) {
    // Ищем паттерн, где "ОБОРУДОВАНИЕ ДЛЯ РВД" идет перед "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    // Паттерн для блока "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным списком (может быть многострочным)
    const equipmentBlockRegex = /<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>/;
    
    // Паттерн для блока "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesBlockRegex = /<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>/;
    
    const equipmentMatch = content.match(equipmentBlockRegex);
    const hosesMatch = content.match(hosesBlockRegex);
    
    if (!equipmentMatch || !hosesMatch) {
        return content; // Если одного из пунктов нет, ничего не меняем
    }
    
    const equipmentBlock = equipmentMatch[0];
    const hosesBlock = hosesMatch[0];
    const equipmentIndex = equipmentMatch.index;
    const hosesIndex = hosesMatch.index;
    
    // Проверяем текущий порядок - если "ОБОРУДОВАНИЕ ДЛЯ РВД" идет перед "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    if (equipmentIndex < hosesIndex) {
        // Находим текст до "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const beforeEquipment = content.substring(0, equipmentIndex);
        
        // Находим текст между блоками
        const betweenBlocks = content.substring(equipmentIndex + equipmentBlock.length, hosesIndex);
        
        // Находим текст после "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const afterHoses = content.substring(hosesIndex + hosesBlock.length);
        
        // Определяем отступы - смотрим, какие пробелы/переносы строк есть перед equipment блоком
        const indentMatch = beforeEquipment.match(/(\n\s*)<li>\s*<a[^>]*equipment/);
        const indent = indentMatch ? indentMatch[1] : '\n              ';
        
        // Создаем новый порядок: сначала "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", потом "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const newContent = beforeEquipment + 
                          hosesBlock + 
                          indent +
                          equipmentBlock + 
                          betweenBlocks.trim() +
                          afterHoses;
        
        return newContent;
    }
    
    return content;
}

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('.');

let updated = 0;
let checked = 0;

allHtmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        checked++;
        
        // Проверяем, есть ли меню "ПРОДУКЦИЯ" и оба пункта
        if (!content.includes('ПРОДУКЦИЯ') || !content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД') || !content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ')) {
            return; // Пропускаем файлы без этого меню
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

