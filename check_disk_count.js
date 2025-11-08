const fs = require('fs');

// Читаем JS файл
const jsContent = fs.readFileSync('js/components/cutting-disks.js', 'utf-8');

// Извлекаем все ссылки
const linkMatches = jsContent.match(/link:\s*"disks\/([^"]+)\.html"/g);
const diskLinks = linkMatches ? linkMatches.map(match => {
    const linkMatch = match.match(/disks\/([^"]+)\.html/);
    return linkMatch ? linkMatch[1] + '.html' : null;
}).filter(Boolean) : [];

console.log('Всего ссылок в JS:', diskLinks.length);

// Уникальные
const uniqueLinks = [...new Set(diskLinks)];
console.log('Уникальных ссылок в JS:', uniqueLinks.length);
console.log('\nУникальные диски:');
uniqueLinks.sort().forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
});

// Проверяем существующие файлы
const disksDir = 'pages/products/disks';
const existingFiles = fs.readdirSync(disksDir).filter(file => file.endsWith('.html'));
console.log('\nСуществующих HTML файлов:', existingFiles.length);

// Находим различия
const missing = uniqueLinks.filter(link => !existingFiles.includes(link));
const extra = existingFiles.filter(file => !uniqueLinks.includes(file));

console.log('\nОтсутствующие (в JS, но нет файла):', missing.length);
if (missing.length > 0) {
    missing.forEach(f => console.log('  -', f));
}

console.log('\nДополнительные (есть файл, но нет в JS):', extra.length);
if (extra.length > 0) {
    extra.forEach(f => console.log('  +', f));
}

console.log('\nДубликаты в JS:');
const duplicates = diskLinks.filter((item, index) => diskLinks.indexOf(item) !== index);
const uniqueDuplicates = [...new Set(duplicates)];
if (uniqueDuplicates.length > 0) {
    uniqueDuplicates.forEach(d => console.log('  -', d));
} else {
    console.log('  Дубликатов нет');
}

