const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of damaged files that need to be restored
const damagedFiles = [
  // Level 3 - hoses
  'pages/products/hoses/en853-1sn.html',
  'pages/products/hoses/en853-2sn.html',
  'pages/products/hoses/en856-4sh.html',
  'pages/products/hoses/en856-4sp.html',
  'pages/products/hoses/en856-r13.html',
  'pages/products/hoses/en856-r15.html',
  // Level 3 - industrial hoses
  'pages/products/industrial-hoses/abradant.html',
  'pages/products/industrial-hoses/fuel.html',
  'pages/products/industrial-hoses/oil.html',
  'pages/products/industrial-hoses/steam.html',
  // Level 3 - teflon hoses
  'pages/products/teflon-hoses/rvd_gwm1.html',
  'pages/products/teflon-hoses/rvd_ptfe1.html',
  'pages/products/teflon-hoses/rvd_ptfe2.html',
  // Level 3 - thermoplastic hoses
  'pages/products/thermoplastic-hoses/mt_1.html',
  'pages/products/thermoplastic-hoses/mt_2.html',
  'pages/products/thermoplastic-hoses/mt_2_twin.html',
  'pages/products/thermoplastic-hoses/sae_100_r7.html',
  'pages/products/thermoplastic-hoses/sae_100_r7_twin.html',
  'pages/products/thermoplastic-hoses/sae_100_r8.html',
  // Level 3 - parker hoses
  'pages/products/parker-hoses/371lt.html',
  'pages/products/parker-hoses/461lt.html',
  // Level 3 - pipe connections
  'pages/products/pipe-connections/pryamoye.html',
  'pages/products/pipe-connections/troynik.html',
  'pages/products/pipe-connections/uglovoe.html',
  // Level 3 - quick connections (brs)
  'pages/products/brs/brs_jsb.html',
  'pages/products/brs/firg.html',
  'pages/products/brs/hpa.html',
  'pages/products/brs/iso_a.html',
  // Level 3 - valves
  'pages/products/valves/2x_hodovoy_din2353.html',
  'pages/products/valves/2x_xodovoy.html',
  'pages/products/valves/3x_xodovoy.html',
  // Level 3 - disks
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
  // Level 4 - finnpower
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
  // Level 4 - d-hydro
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
  // Level 4 - op
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
  // Level 4 - samway
  'pages/products/samway/c401_samway/index.html',
  'pages/products/samway/p16hp_samway/index.html',
  'pages/products/samway/p20hp_samway/index.html',
  'pages/products/samway/p20q_samway/index.html',
  'pages/products/samway/p32q_samway/index.html',
  'pages/products/samway/s51_samway/index.html',
  'pages/products/samway/skiver_51esc/index.html',
  // Level 4 - barboflex
  'pages/products/barboflex/cut125/index.html',
  'pages/products/barboflex/cut225/index.html',
  'pages/products/barboflex/cut325/index.html',
  'pages/products/barboflex/skm100/index.html',
  // Level 4 - uniflex
  'pages/products/uniflex/uniflex-hm325ib_hm375i_hm380i/index.html',
  'pages/products/uniflex/uniflex-s6_ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS2a/index.html',
  'pages/products/uniflex/UNIFLEXS2M/index.html',
  'pages/products/uniflex/UNIFLEXS2P/index.html',
  'pages/products/uniflex/UNIFLEXS3Ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS4/index.html',
  'pages/products/uniflex/UNIFLEXS4Ecoline/index.html',
  'pages/products/uniflex/UNIFLEXS6/index.html',
  // Level 4 - fittings
  'pages/products/fittings/bsp_male/index.html',
];

const commitHash = 'e35cd20'; // Commit before navigation fixes

let restored = 0;
let failed = 0;

damagedFiles.forEach(file => {
    try {
        // Check if file exists in git history
        try {
            const content = execSync(`git show ${commitHash}:${file}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
            
            // Write file
            const dir = path.dirname(file);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✓ Restored: ${file}`);
            restored++;
        } catch (error) {
            console.log(`✗ Not found in git: ${file}`);
            failed++;
        }
    } catch (error) {
        console.log(`✗ Error restoring ${file}: ${error.message}`);
        failed++;
    }
});

console.log(`\nTotal restored: ${restored}`);
console.log(`Total failed: ${failed}`);

