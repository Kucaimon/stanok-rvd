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
    // Паттерны для поиска обоих блоков
    // Блок "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным списком
    const equipmentPattern = /<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>/;
    
    // Блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesPattern = /<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>/;
    
    const equipmentMatch = content.match(equipmentPattern);
    const hosesMatch = content.match(hosesPattern);
    
    if (!equipmentMatch || !hosesMatch) {
        return content; // Если одного из пунктов нет, ничего не меняем
    }
    
    const equipmentBlock = equipmentMatch[0];
    const hosesBlock = hosesMatch[0];
    const equipmentIndex = equipmentMatch.index;
    const hosesIndex = hosesMatch.index;
    
    // Проверяем текущий порядок
    // Если "ОБОРУДОВАНИЕ ДЛЯ РВД" идет перед "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", меняем местами
    if (equipmentIndex < hosesIndex) {
        // Находим начало и конец блока навигации
        const navStart = content.lastIndexOf('<ul class="nav-dropdown">', equipmentIndex);
        if (navStart === -1) return content;
        
        // Находим текст между блоками
        const beforeEquipment = content.substring(0, equipmentIndex);
        const betweenBlocks = content.substring(equipmentIndex + equipmentBlock.length, hosesIndex);
        const afterHoses = content.substring(hosesIndex + hosesBlock.length);
        
        // Создаем новый порядок: сначала "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", потом "ОБОРУДОВАНИЕ ДЛЯ РВД"
        // Убираем лишние пробелы и переносы строк между блоками
        const cleanedBetween = betweenBlocks.trim();
        const newContent = beforeEquipment + 
                          hosesBlock + 
                          (cleanedBetween ? '\n              ' : '') + 
                          equipmentBlock + 
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
        
        // Проверяем, есть ли меню "ПРОДУКЦИЯ"
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

