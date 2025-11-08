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
    
    // Ищем блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesRegex = /<li><a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a><\/li>/;
    
    // Ищем блок "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным списком (многострочный)
    const equipmentRegex = /<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>/;
    
    const hosesMatch = content.match(hosesRegex);
    const equipmentMatch = content.match(equipmentRegex);
    
    if (!hosesMatch || !equipmentMatch) {
        return content;
    }
    
    const hosesBlock = hosesMatch[0];
    const equipmentBlock = equipmentMatch[0];
    const hosesIndex = hosesMatch.index;
    const equipmentIndex = equipmentMatch.index;
    
    // Если "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" идет перед "ОБОРУДОВАНИЕ ДЛЯ РВД" и между ними нет других пунктов (только пробелы), порядок правильный
    if (hosesIndex < equipmentIndex) {
        const between = content.substring(hosesIndex + hosesBlock.length, equipmentIndex);
        // Проверяем, есть ли между ними другие элементы <li>
        if (!between.match(/<li>/)) {
            return content; // Порядок правильный
        }
    }
    
    // Удаляем оба блока
    let newContent = content;
    newContent = newContent.substring(0, hosesMatch.index) + 
                 newContent.substring(hosesMatch.index + hosesBlock.length);
    
    // Пересчитываем индекс equipment после удаления hoses
    const newEquipmentIndex = equipmentIndex > hosesIndex ? 
        equipmentIndex - hosesBlock.length : equipmentIndex;
    
    newContent = newContent.substring(0, newEquipmentIndex) + 
                 newContent.substring(newEquipmentIndex + equipmentBlock.length);
    
    // Находим место для вставки - сразу после открытия <ul class="nav-dropdown">
    const navDropdownStart = newContent.indexOf('<ul class="nav-dropdown">');
    if (navDropdownStart === -1) {
        return content; // Не нашли меню
    }
    
    // Находим конец открывающего тега и начало содержимого
    const insertIndex = newContent.indexOf('>', navDropdownStart) + 1;
    
    // Определяем отступ для новых элементов
    const afterInsert = newContent.substring(insertIndex);
    const indentMatch = afterInsert.match(/^(\s*)/);
    const baseIndent = indentMatch ? indentMatch[1] : '';
    const itemIndent = baseIndent + '              ';
    
    // Вставляем оба блока в правильном порядке
    const beforeInsert = newContent.substring(0, insertIndex);
    const afterInsertContent = newContent.substring(insertIndex);
    
    newContent = beforeInsert + 
                 itemIndent + hosesBlock + '\n' + 
                 itemIndent + equipmentBlock + '\n' + 
                 afterInsertContent;
    
    return newContent;
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

