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

// Найти все HTML файлы
const allHtmlFiles = findAllHtmlFiles('pages');

// Проверить, какие файлы НЕ имеют меню "ПРОДУКЦИЯ" с выпадающим списком
const filesWithoutProductMenu = [];

allHtmlFiles.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем наличие полного меню "ПРОДУКЦИЯ" с выпадающим списком
        const hasProductMenu = content.includes('ПРОДУКЦИЯ') && 
                              content.includes('nav-dropdown') && 
                              (content.includes('РУКАВА ВЫСОКОГО ДАВЛЕНИЯ') || 
                               content.includes('high-pressure-hoses.html'));
        
        if (!hasProductMenu && content.includes('nav-list')) {
            filesWithoutProductMenu.push(filePath);
        }
    } catch (error) {
        console.error(`Ошибка при чтении ${filePath}:`, error.message);
    }
});

console.log(`Всего HTML файлов: ${allHtmlFiles.length}`);
console.log(`Файлов без меню "ПРОДУКЦИЯ": ${filesWithoutProductMenu.length}`);
console.log('\nФайлы без меню "ПРОДУКЦИЯ":');
filesWithoutProductMenu.forEach(file => console.log(file));

