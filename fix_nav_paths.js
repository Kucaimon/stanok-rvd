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
        if (depth === 2) {
            // pages/products/file.html -> href="high-pressure-hoses.html"
            newNav = newNav.replace(/href="pages\/products\/([^"]+)"/g, 'href="$1"');
        } else if (depth === 3) {
            // pages/products/category/file.html -> href="../high-pressure-hoses.html"
            newNav = newNav.replace(/href="pages\/products\/([^"]+)"/g, '../$1');
        } else if (depth === 4) {
            // pages/products/category/subcategory/file.html -> href="../../high-pressure-hoses.html"
            newNav = newNav.replace(/href="pages\/products\/([^"]+)"/g, '../../$1');
        }
    }
    
    return newNav;
}

// List of restored files
const restoredFiles = [
  'pages/products/hoses/en853-1sn.html',
  'pages/products/hoses/en853-2sn.html',
  'pages/products/hoses/en856-4sh.html',
  'pages/products/hoses/en856-4sp.html',
  'pages/products/hoses/en856-r13.html',
  'pages/products/hoses/en856-r15.html',
  'pages/products/industrial-hoses/abradant.html',
  'pages/products/industrial-hoses/fuel.html',
  'pages/products/industrial-hoses/oil.html',
  'pages/products/industrial-hoses/steam.html',
  'pages/products/teflon-hoses/rvd_gwm1.html',
  'pages/products/teflon-hoses/rvd_ptfe1.html',
  'pages/products/teflon-hoses/rvd_ptfe2.html',
  'pages/products/thermoplastic-hoses/mt_1.html',
  'pages/products/thermoplastic-hoses/mt_2.html',
  'pages/products/thermoplastic-hoses/mt_2_twin.html',
  'pages/products/thermoplastic-hoses/sae_100_r7.html',
  'pages/products/thermoplastic-hoses/sae_100_r7_twin.html',
  'pages/products/thermoplastic-hoses/sae_100_r8.html',
  'pages/products/parker-hoses/371lt.html',
  'pages/products/parker-hoses/461lt.html',
  'pages/products/pipe-connections/pryamoye.html',
  'pages/products/pipe-connections/troynik.html',
  'pages/products/pipe-connections/uglovoe.html',
  'pages/products/brs/brs_jsb.html',
  'pages/products/brs/firg.html',
  'pages/products/brs/hpa.html',
  'pages/products/brs/iso_a.html',
  'pages/products/valves/2x_hodovoy_din2353.html',
  'pages/products/valves/2x_xodovoy.html',
  'pages/products/valves/3x_xodovoy.html',
  'pages/products/disks/cut_225_250_40_3.html',
  'pages/products/disks/d_hydro_250_32_2_5.html',
  'pages/products/disks/op_250_40_3.html',
  'pages/products/disks/op_tf1_ecut.html',
  'pages/products/disks/samway_250_40_3.html',
  'pages/products/disks/techmaflex_cut_22.html',
  'pages/products/disks/uniflex_em1_160_20_2.html',
  'pages/products/disks/uniflex_em1_190_15_2.html',
  'pages/products/disks/uniflex_em1_190_30_3.html',
  'pages/products/disks/uniflex_em3_2_200_25_1_6.html',
  'pages/products/disks/uniflex_em3_2_200_25_3.html',
  'pages/products/disks/uniflex_em6_275_25_3.html',
  'pages/products/finnpower/20ms_32ms/index.html',
  'pages/products/finnpower/51uc/index.html',
  'pages/products/finnpower/fp120/index.html',
  'pages/products/finnpower/fp20_fp120/index.html',
  'pages/products/finnpower/p16hp_p20hp/index.html',
  'pages/products/finnpower/p20nms/index.html',
  'pages/products/finnpower/p21ms_p32x/index.html',
  'pages/products/finnpower/p32nms/index.html',
  'pages/products/finnpower/p60uc/index.html',
  'pages/products/finnpower/press_p20hp/index.html',
  'pages/products/finnpower/press_p32ms/index.html',
  'pages/products/finnpower/press_p32x/index.html',
  'pages/products/d-hydro/cm_70/index.html',
  'pages/products/d-hydro/hs_50/index.html',
  'pages/products/d-hydro/hs_50m/index.html',
  'pages/products/d-hydro/sm_32cm/index.html',
  'pages/products/d-hydro/sm_38ec/index.html',
  'pages/products/d-hydro/sm_38sc/index.html',
  'pages/products/d-hydro/sm_625e/index.html',
  'pages/products/d-hydro/yl_20/index.html',
  'pages/products/d-hydro/yl_20s/index.html',
  'pages/products/d-hydro/yl_32/index.html',
  'pages/products/d-hydro/yl_65/index.html',
  'pages/products/d-hydro/yl_80/index.html',
  'pages/products/op/tubomatic_h47e/index.html',
  'pages/products/op/tubomatic_h47el/index.html',
  'pages/products/op/tubomatic_h47pi/index.html',
  'pages/products/op/tubomatic_h47pm/index.html',
  'pages/products/op/tubomatic_h54el/index.html',
  'pages/products/op/tubomatic_h54es/index.html',
  'pages/products/op/tubomatic_h54pi/index.html',
  'pages/products/op/tubomatic_h54pm/index.html',
  'pages/products/op/tubomatic_h83eel/index.html',
  'pages/products/op/tubomatic_h88el/index.html',
  'pages/products/op/tubomatic_h88es/index.html',
  'pages/products/samway/c401_samway/index.html',
  'pages/products/samway/p16hp_samway/index.html',
  'pages/products/samway/p20hp_samway/index.html',
  'pages/products/samway/p20q_samway/index.html',
  'pages/products/samway/p32q_samway/index.html',
  'pages/products/samway/s51_samway/index.html',
  'pages/products/samway/skiver_51esc/index.html',
  'pages/products/barboflex/cut125/index.html',
  'pages/products/barboflex/cut225/index.html',
  'pages/products/barboflex/cut325/index.html',
  'pages/products/barboflex/skm100/index.html',
  'pages/products/uniflex/uniflex-hm325ib_hm375i_hm380i/index.html',
  'pages/products/uniflex/uniflex-s6_ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS2a/index.html',
  'pages/products/uniflex/UNIFLEXS2M/index.html',
  'pages/products/uniflex/UNIFLEXS2P/index.html',
  'pages/products/uniflex/UNIFLEXS3Ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS4/index.html',
  'pages/products/uniflex/UNIFLEXS4Ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS6/index.html',
  'pages/products/fittings/bsp_male/index.html',
];

let updated = 0;

restoredFiles.forEach(file => {
    try {
        const depth = getDepth(file);
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if file has navigation with broken paths
        if (content.includes('<nav class="main-nav">')) {
            // Create new navigation from template
            let newNav = adjustNavigation(navTemplate, depth);
            
            // Replace old navigation (any version)
            const oldNavPattern = /<nav class="main-nav">[\s\S]*?<\/nav>/;
            content = content.replace(oldNavPattern, newNav);
            
            fs.writeFileSync(file, content, 'utf8');
            updated++;
            
            console.log(`✓ Updated: ${file} (depth: ${depth})`);
        }
    } catch (error) {
        console.log(`✗ Error: ${file} - ${error.message}`);
    }
});

console.log(`\nTotal updated: ${updated}`);

