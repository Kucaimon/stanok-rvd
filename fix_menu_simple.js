const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Remove has-nested class from span
const files = getAllHtmlFiles('pages');
files.push('index.html');

let fixedCount = 0;

files.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Remove has-nested class from span
        if (content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД')) {
            const oldPattern = /<span class="nav-dropdown-item has-nested">ОБОРУДОВАНИЕ ДЛЯ РВД<\/span>/g;
            if (oldPattern.test(content)) {
                content = content.replace(
                    oldPattern,
                    '<span class="nav-dropdown-item">ОБОРУДОВАНИЕ ДЛЯ РВД</span>'
                );
                modified = true;
                fixedCount++;
                console.log(`Fixed: ${filePath}`);
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
    }
});

console.log(`\nTotal files fixed: ${fixedCount}`);

