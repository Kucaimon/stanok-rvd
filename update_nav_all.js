const fs = require('fs');
const path = require('path');

// Read correct navigation from index.html
const indexContent = fs.readFileSync('index.html', 'utf8');
const navPattern = /<nav class="main-nav">[\s\S]*?<\/nav>/;
const navMatch = indexContent.match(navPattern);

if (!navMatch) {
    console.log('Navigation template not found in index.html');
    process.exit(1);
}

const navTemplate = navMatch[0];

// Function to get all HTML files
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

// Calculate depth from file path
function getDepth(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    const parts = relativePath.split(path.sep);
    
    if (relativePath === 'index.html') {
        return 0;
    }
    
    if (relativePath.startsWith('pages' + path.sep)) {
        const pageParts = relativePath.split(path.sep);
        if (pageParts[1] === 'products') {
            // pages/products/file.html (depth 2)
            // pages/products/category/file.html (depth 3)
            // pages/products/category/subcategory/file.html (depth 4)
            return pageParts.length - 1; // Adjust based on 'pages' base
        } else {
            // pages/file.html (depth 1)
            return 1;
        }
    }
    return 0;
}

// Adjust navigation paths based on depth
function adjustNavigation(navHTML, depth, filePath) {
    let newNav = navHTML;
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Calculate base path
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
    }
    
    // Replace main page links
    newNav = newNav.replace(/href="index.html"/g, `href="${base}index.html"`);
    
    // Replace pages links
    newNav = newNav.replace(/href="pages\//g, `href="${base}pages/`);
    
    // For depth 2+ (pages/products/...), adjust product links
    if (depth >= 2) {
        // Replace products links
        if (depth === 2) {
            // pages/products/file.html
            newNav = newNav.replace(/href="pages\/products\//g, 'href="');
        } else if (depth === 3) {
            // pages/products/category/file.html
            newNav = newNav.replace(/href="pages\/products\//g, '../');
        } else if (depth === 4) {
            // pages/products/category/subcategory/file.html
            newNav = newNav.replace(/href="pages\/products\//g, '../../');
        }
    }
    
    return newNav;
}

// Get all HTML files
const files = getAllHtmlFiles('.');

let count = 0;

files.forEach(filePath => {
    try {
        const depth = getDepth(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file has navigation
        if (content.includes('<nav class="main-nav">')) {
            // Create new navigation from template
            let newNav = adjustNavigation(navTemplate, depth, filePath);
            
            // Replace old navigation pattern (including old structure)
            const oldNavPattern = /<nav class="main-nav">[\s\S]*?<\/nav>/;
            const updatedContent = content.replace(oldNavPattern, newNav);
            
            // Only write if content changed
            if (updatedContent !== content) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                count++;
                
                const relativePath = path.relative(process.cwd(), filePath);
                console.log(`Updated: ${relativePath} (depth: ${depth})`);
            }
        }
    } catch (error) {
        console.log(`Error: ${filePath} - ${error.message}`);
    }
});

console.log(`\nTotal files processed: ${files.length}`);
console.log(`Total files updated: ${count}`);

