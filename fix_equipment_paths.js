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

// Fix equipment.html paths based on file depth
const files = getAllHtmlFiles('pages');
files.push('index.html');

let fixedCount = 0;

files.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Find equipment menu item with wrong path
        if (content.includes('ОБОРУДОВАНИЕ ДЛЯ РВД')) {
            const normalizedPath = filePath.replace(/\\/g, '/');
            let correctPath = '';
            
            if (normalizedPath === 'index.html') {
                correctPath = 'pages/products/equipment.html';
            } else if (normalizedPath.startsWith('pages/')) {
                // Calculate depth: pages = 1, pages/products = 2, etc.
                const parts = normalizedPath.split('/');
                const depth = parts.length - 1; // -1 for filename
                
                if (parts[1] === 'products' && parts.length === 3) {
                    // pages/products/file.html -> equipment.html
                    correctPath = 'equipment.html';
                } else if (parts[1] === 'products' && parts.length === 4) {
                    // pages/products/category/file.html -> ../equipment.html
                    correctPath = '../equipment.html';
                } else if (parts[1] === 'products' && parts.length === 5) {
                    // pages/products/category/subcategory/index.html -> ../../equipment.html
                    correctPath = '../../equipment.html';
                } else if (parts.length === 2) {
                    // pages/file.html -> products/equipment.html
                    correctPath = 'products/equipment.html';
                } else if (parts.length === 3 && parts[1] !== 'products') {
                    // pages/spravka/file.html -> ../products/equipment.html
                    correctPath = '../products/equipment.html';
                }
            }
            
            // Replace wrong equipment.html paths
            const wrongPatterns = [
                /href="equipment\.html"/g,
                /href="\.\.\/equipment\.html"/g,
                /href="\.\.\/\.\.\/equipment\.html"/g,
                /href="products\/equipment\.html"/g,
                /href="\.\.\/products\/equipment\.html"/g,
                /href="pages\/products\/equipment\.html"/g
            ];
            
            const currentPattern = new RegExp(`href="[^"]*equipment\\.html"[^>]*>ОБОРУДОВАНИЕ ДЛЯ РВД</a>`, 'g');
            if (currentPattern.test(content)) {
                content = content.replace(
                    currentPattern,
                    `href="${correctPath}" class="nav-dropdown-item">ОБОРУДОВАНИЕ ДЛЯ РВД</a>`
                );
                modified = true;
                fixedCount++;
                console.log(`Fixed: ${filePath} -> ${correctPath}`);
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

