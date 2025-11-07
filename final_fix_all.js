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

// Get all HTML files
const files = getAllHtmlFiles('pages/products');

let count = 0;
let navFixed = 0;
let iconFixed = 0;

files.forEach(filePath => {
    try {
        const depth = getDepth(filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix mobile menu icon - replace mojibake
        if (content.includes('в°') || content.includes('в™°')) {
            // Try to match the exact pattern
            content = content.replace(/<button[^>]*class="mobile-menu-btn"[^>]*>в[°™]/g, 
                (match) => match.replace(/в[°™]/, '☰'));
            iconFixed++;
        }
        
        // Update navigation - check if old navigation (direct links without dropdown)
        if (content.includes('<nav class="main-nav">')) {
            const navMatch = content.match(/<nav class="main-nav">[\s\S]*?<\/nav>/);
            if (navMatch) {
                const navSection = navMatch[0];
                // Check if it's old navigation (has direct certificate/spravka links without ПРОДУКЦИЯ dropdown)
                const isOldNav = navSection.includes('href="../../../../pages/certificate.html"') ||
                                (navSection.includes('СЕРТИФИКАТЫ') && !navSection.includes('ПРОДУКЦИЯ')) ||
                                (!navSection.includes('nav-dropdown'));
                
                if (isOldNav) {
                    let newNav = adjustNavigation(navTemplate, depth);
                    content = content.replace(/<nav class="main-nav">[\s\S]*?<\/nav>/, newNav);
                    navFixed++;
                }
            }
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
            const relativePath = path.relative(process.cwd(), filePath);
            console.log(`Fixed: ${relativePath}`);
        }
    } catch (error) {
        // Skip errors
    }
});

console.log(`\nTotal files processed: ${files.length}`);
console.log(`Total files updated: ${count}`);
console.log(`Navigation fixed: ${navFixed}`);
console.log(`Icons fixed: ${iconFixed}`);

