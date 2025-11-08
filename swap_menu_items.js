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
function swapMenuItems(content) {
    // Паттерн для поиска блока "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным списком
    // Этот блок идет первым, а после него идет "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    
    // Ищем блок с "ОБОРУДОВАНИЕ ДЛЯ РВД" и его вложенным списком
    const equipmentPattern = /(<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>)/;
    
    // Ищем блок с "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesPattern = /(<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>)/;
    
    const equipmentMatch = content.match(equipmentPattern);
    const hosesMatch = content.match(hosesPattern);
    
    if (equipmentMatch && hosesMatch) {
        // Меняем местами: сначала "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", потом "ОБОРУДОВАНИЕ ДЛЯ РВД"
        const equipmentBlock = equipmentMatch[1];
        const hosesBlock = hosesMatch[1];
        
        // Заменяем порядок в меню
        // Находим, где заканчивается блок "ОБОРУДОВАНИЕ ДЛЯ РВД" и начинается "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const beforeEquipment = content.substring(0, equipmentMatch.index);
        const afterEquipment = content.substring(equipmentMatch.index + equipmentMatch[0].length);
        
        // Проверяем, идет ли сразу после оборудования "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const hosesIndexInAfter = afterEquipment.indexOf(hosesMatch[0]);
        if (hosesIndexInAfter !== -1) {
            // Находим позицию после "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
            const afterHoses = afterEquipment.substring(hosesIndexInAfter + hosesMatch[0].length);
            
            // Собираем новый порядок: сначала "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ", потом "ОБОРУДОВАНИЕ ДЛЯ РВД"
            const newContent = beforeEquipment + 
                              hosesBlock + '\n              ' + 
                              equipmentBlock + 
                              afterEquipment.substring(0, hosesIndexInAfter) + 
                              afterHoses;
            
            return newContent;
        }
    }
    
    // Альтернативный подход: используем регулярное выражение для замены всего блока
    // Ищем последовательность: equipment block, затем hoses block
    const fullPattern = /(<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>)\s*(<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>)/;
    
    const fullMatch = content.match(fullPattern);
    if (fullMatch) {
        // Меняем местами
        return content.replace(fullPattern, '$2\n              $1');
    }
    
    return content;
}

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('.');

let updated = 0;

allHtmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем, есть ли меню "ПРОДУКЦИЯ"
        if (!content.includes('ПРОДУКЦИЯ') || !content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД') || !content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ')) {
            return; // Пропускаем файлы без этого меню
        }
        
        const originalContent = content;
        content = swapMenuItems(content);
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✓ Обновлено: ${filePath}`);
            updated++;
        }
    } catch (error) {
        console.error(`✗ Ошибка при обработке ${filePath}:`, error.message);
    }
});

console.log(`\nИтого обновлено файлов: ${updated}`);
