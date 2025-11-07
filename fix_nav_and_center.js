const fs = require('fs');
const path = require('path');

// Read correct navigation from index.html
const indexContent = fs.readFileSync('index.html', 'utf8');
const navMatch = indexContent.match(/<nav class="main-nav">[\s\S]*?<\/nav>/);

if (!navMatch) {
    console.log('Navigation template not found in index.html');
    process.exit(1);
}

const navTemplate = navMatch[0];

// Function to get all HTML files in products directory (levels 3-5)
function getProductsHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getProductsHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Calculate depth from file path
function getDepth(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    
    if (relativePath === 'index.html') {
        return 0;
    }
    
    if (relativePath.startsWith('pages' + path.sep)) {
        const pageParts = relativePath.split(path.sep);
        if (pageParts[1] === 'products') {
            return pageParts.length - 1;
        } else {
            return 1;
        }
    }
    return 0;
}

// Adjust navigation paths based on depth
function adjustNavigation(navHTML, depth) {
    let newNav = navHTML;
    
    let base = '';
    if (depth === 0) {
        base = '';
    } else if (depth === 1) {
        base = '../';
    } else if (depth === 2) {
        base = '../../';
    } else if (depth === 3) {
        base = '../../../';
    } else if (depth === 4) {
        base = '../../../../';
    } else if (depth === 5) {
        base = '../../../../../';
    }
    
    // Replace main page links
    newNav = newNav.replace(/href="index.html"/g, `href="${base}index.html"`);
    
    // Replace pages links
    newNav = newNav.replace(/href="pages\//g, `href="${base}pages/`);
    
    // For depth 2+ (pages/products/...), adjust product links
    if (depth >= 2) {
        if (depth === 2) {
            newNav = newNav.replace(/href="pages\/products\//g, 'href="');
        } else if (depth === 3) {
            newNav = newNav.replace(/href="pages\/products\//g, '../');
        } else if (depth === 4) {
            newNav = newNav.replace(/href="pages\/products\//g, '../../');
        } else if (depth === 5) {
            newNav = newNav.replace(/href="pages\/products\//g, '../../../');
        }
    }
    
    return newNav;
}

// Get all HTML files in products directory
const productsFiles = getProductsHtmlFiles('pages/products');

let count = 0;
let navFixed = 0;
let iconFixed = 0;

productsFiles.forEach(filePath => {
    try {
        const depth = getDepth(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Fix mobile menu icon
        if (content.includes('в°') || content.includes('в™°') || content.includes('&#9776;')) {
            content = content.replace(/в°|в™°|&#9776;|&#8801;/g, '☰');
            iconFixed++;
            updated = true;
        }
        
        // Update navigation if it doesn't have dropdown or has old navigation
        if (content.includes('<nav class="main-nav">')) {
            // Check if navigation needs updating (old navigation without dropdown)
            const hasOldNav = !content.includes('nav-dropdown') || 
                             content.includes('href="../../../pages/certificate.html"') && !content.includes('ПРОДУКЦИЯ');
            
            if (hasOldNav) {
                let newNav = adjustNavigation(navTemplate, depth);
                const oldNavPattern = /<nav class="main-nav">[\s\S]*?<\/nav>/;
                content = content.replace(oldNavPattern, newNav);
                navFixed++;
                updated = true;
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
            
            const relativePath = path.relative(process.cwd(), filePath);
            console.log(`Fixed: ${relativePath} (depth: ${depth})`);
        }
    } catch (error) {
        console.log(`Error: ${filePath} - ${error.message}`);
    }
});

console.log(`\nTotal files processed: ${productsFiles.length}`);
console.log(`Total files updated: ${count}`);
console.log(`Navigation fixed: ${navFixed}`);
console.log(`Icons fixed: ${iconFixed}`);

