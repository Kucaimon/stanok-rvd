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

// Функция для замены меню
function swapMenuItems(content) {
    // Ищем весь блок выпадающего меню ПРОДУКЦИЯ
    // Паттерн ищет от <ul class="nav-dropdown"> до закрывающего </ul> этого меню
    const menuRegex = /(<ul class="nav-dropdown">)([\s\S]*?)(<\/ul>\s*<\/li>)/;
    const menuMatch = content.match(menuRegex);
    
    if (!menuMatch) {
        return null; // Меню не найдено
    }
    
    const menuStart = menuMatch[1];
    const menuContent = menuMatch[2];
    const menuEnd = menuMatch[3];
    
    // Извлекаем блок "ОБОРУДОВАНИЕ ДЛЯ РВД" с вложенным меню
    // Ищем от <li> до </li>, включая вложенный <ul>
    const equipmentRegex = /(<li>\s*<a[^>]*equipment\.html[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД<\/a>\s*<ul class="nav-dropdown-nested">[\s\S]*?<\/ul>\s*<\/li>)/;
    const equipmentMatch = menuContent.match(equipmentRegex);
    
    // Извлекаем блок "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
    const hosesRegex = /(<li>\s*<a[^>]*high-pressure-hoses\.html[^>]*>РУКАВА ВЫСОКОГО ДАВЛЕНИЯ<\/a>\s*<\/li>)/;
    const hosesMatch = menuContent.match(hosesRegex);
    
    if (!equipmentMatch || !hosesMatch) {
        return null; // Один из элементов не найден
    }
    
    // Проверяем текущий порядок
    const equipmentIndex = menuContent.indexOf(equipmentMatch[0]);
    const hosesIndex = menuContent.indexOf(hosesMatch[0]);
    
    // Если "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ" идет раньше "ОБОРУДОВАНИЕ ДЛЯ РВД"
    if (hosesIndex < equipmentIndex) {
        // Удаляем оба блока из меню
        let newMenuContent = menuContent.replace(equipmentMatch[0], '');
        newMenuContent = newMenuContent.replace(hosesMatch[0], '');
        
        // Очищаем лишние пробелы и переносы строк
        newMenuContent = newMenuContent.replace(/^\s+|\s+$/gm, '');
        newMenuContent = newMenuContent.replace(/\n\s*\n/g, '\n');
        
        // Формируем новое меню: сначала "ОБОРУДОВАНИЕ ДЛЯ РВД", затем "РУКАВА ВЫСОКОГО ДАВЛЕНИЯ"
        const indent = '              '; // Отступ для элементов меню
        const newMenu = menuStart + '\n' + 
                       indent + equipmentMatch[0] + '\n' +
                       indent + hosesMatch[0] + '\n' +
                       newMenuContent.trim() + '\n' +
                       menuEnd;
        
        // Заменяем в исходном контенте
        return content.replace(menuRegex, newMenu);
    }
    
    return null; // Порядок уже правильный
}

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('pages');
allHtmlFiles.push('index.html'); // Добавляем главную страницу

let updated = 0;
let skipped = 0;

allHtmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем, есть ли меню ПРОДУКЦИЯ с обоими элементами
        if (!content.includes('ПРОДУКЦИЯ') || 
            !content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД') || 
            !content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ')) {
            skipped++;
            return; // Пропускаем файлы без этого меню
        }
        
        // Сохраняем исходный контент для сравнения
        const originalContent = content;
        
        // Пытаемся поменять местами
        const newContent = swapMenuItems(content);
        
        // Если контент изменился, сохраняем
        if (newContent && newContent !== originalContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`✓ Updated: ${filePath}`);
            updated++;
        } else {
            skipped++;
        }
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
});

console.log(`\nSummary: Updated ${updated} files, skipped ${skipped} files`);

