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

// Проверить, какие файлы НЕ имеют скрипт navigation.js
const filesWithoutNavScript = [];

allHtmlFiles.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Проверяем наличие скрипта navigation.js
        const hasNavScript = content.includes('navigation.js');
        
        // Проверяем наличие меню навигации (nav-list)
        const hasNavMenu = content.includes('nav-list');
        
        if (hasNavMenu && !hasNavScript) {
            filesWithoutNavScript.push(filePath);
        }
    } catch (error) {
        console.error(`Ошибка при чтении ${filePath}:`, error.message);
    }
});

console.log(`Всего HTML файлов: ${allHtmlFiles.length}`);
console.log(`Файлов с навигацией, но без navigation.js: ${filesWithoutNavScript.length}`);
if (filesWithoutNavScript.length > 0) {
    console.log('\nФайлы без navigation.js:');
    filesWithoutNavScript.forEach(file => console.log(file));
}

