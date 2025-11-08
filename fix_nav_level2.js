const fs = require('fs');
const path = require('path');

// Читаем эталонную навигацию из index.html
const indexHtml = fs.readFileSync('index.html', 'utf-8');
const navMatch = indexHtml.match(/<ul class="nav-list">([\s\S]*?)<\/ul>\s*<\/div>\s*<\/nav>/);
if (!navMatch) {
  console.error('Не найдено меню в index.html');
  process.exit(1);
}

const baseNav = navMatch[0];

// Функция для замены путей в навигации для уровня depth
function adjustNavPaths(navHtml, depth) {
  // Заменяем пути для страниц уровня 2 (pages/products/*.html)
  // Все ссылки на другие продукты должны быть ../../pages/products/...
  // Ссылка на equipment должна быть equipment.html
  // Ссылка на главную должна быть ../../index.html
  // Ссылки на certificate, spravka, contact, order должны быть ../../pages/...
  
  let adjusted = navHtml;
  
  // Заменяем пути к продуктам
  adjusted = adjusted.replace(/href="pages\/products\/([^"]+)"/g, 'href="../../pages/products/$1"');
  adjusted = adjusted.replace(/href="equipment\.html"/g, 'href="equipment.html"');
  adjusted = adjusted.replace(/href="index\.html"/g, 'href="../../index.html"');
  adjusted = adjusted.replace(/href="pages\/(certificate|spravka|contact|order)\.html"/g, 'href="../../pages/$1.html"');
  
  return adjusted;
}

// Список файлов для обновления (уровень 2)
const filesToUpdate = [
  'pages/products/high-pressure-hoses.html',
  'pages/products/industrial-hoses.html',
  'pages/products/teflon-hoses.html',
  'pages/products/thermoplastic-hoses.html',
  'pages/products/parker-hoses.html',
  'pages/products/kanalopromyvochnye-hoses.html',
  'pages/products/quick-connections.html',
  'pages/products/pipe-connections.html',
  'pages/products/cutting-disks.html',
  'pages/products/uniflex.html',
  'pages/products/termozashita.html'
];

filesToUpdate.forEach(filePath => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`Пропуск: ${filePath} не существует`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Проверяем, есть ли уже меню "ПРОДУКЦИЯ"
    if (content.includes('ПРОДУКЦИЯ')) {
      console.log(`Пропуск: ${filePath} уже имеет меню ПРОДУКЦИЯ`);
      return;
    }
    
    // Находим старое меню
    const oldNavMatch = content.match(/<ul class="nav-list">([\s\S]*?)<\/ul>\s*<\/div>\s*<\/nav>/);
    if (!oldNavMatch) {
      console.log(`Пропуск: ${filePath} не содержит меню`);
      return;
    }
    
    // Получаем новую навигацию с правильными путями
    const newNav = adjustNavPaths(baseNav, 2);
    
    // Заменяем старое меню на новое
    content = content.replace(oldNavMatch[0], newNav);
    
    // Сохраняем файл
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Обновлено: ${filePath}`);
  } catch (error) {
    console.error(`Ошибка при обработке ${filePath}:`, error.message);
  }
});

console.log('Готово!');

