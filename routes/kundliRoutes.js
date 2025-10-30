const express = require('express');
const router = express.Router();

const kundliController = require('../controllers/kundliController');

router.post('/add_kundli', kundliController.addKundli);
router.post('/get_customer_kundli', kundliController.getCustomerKundli);
router.post('/delete_kundli', kundliController.deleteKundli);
router.get('/get-all-kundli', kundliController.getAllKundli);

// planet api
router.post('/get_kundli_details', kundliController.getKundliDetails);
router.post('/get_kundli_basic_details', kundliController.getKundliBasicDetails);
router.post('/get_astro_details', kundliController.getAstroDetails);
router.post('/get_planets', kundliController.getPlanets);
router.post('/get_kp_planets', kundliController.getKpPlanets);
router.post('/get_current_v_dasha', kundliController.getCurrentVDasha);
router.post('/get_mumero_table', kundliController.getNumeroTable);
router.post('/get_general_ascendant_report', kundliController.getGeneralAscendantReport);
router.post('/get_major_v_dasha', kundliController.getMajorVDasha);
router.post('/get_sub_v_dasha', kundliController.getSubVDasha);
router.post('/match_ashtakoot_points', kundliController.matchAshtakootPoints);
router.post('/get_geo_details', kundliController.getGeoDetails);
router.post('/get_timezone_with_dst', kundliController.getTimezoneWithDst);
router.post('/get_general_house_report', kundliController.getGeneralHouseReport);
router.post('/get_kp_house_cusps', kundliController.getKpHouseCusps);



router.post('/get_horo_chart_image', kundliController.getHoroChartImage);
router.post('/get_horo_chart', kundliController.getHoroChart);
router.post('/get_general_rashi', kundliController.getGeneralRashi);
router.post('/get_ghat_chakra', kundliController.getGhatChakra);

// router.post('/get-all-planet-data', kundliController.getAllPlanetData);
router.post('/get-all-upgraha-data', kundliController.getAllUpgrahaData);
router.post('/get-all-dasham-bhavmadhya-data', kundliController.getDashamBhavMadhyaData);
router.post('/get-all-ashtak-varga-data', kundliController.getAshtakVargaData);
router.post('/get-all-sarvashtak-data', kundliController.getSarvashtakData);
router.post('/get-all-transit-data', kundliController.getTransitData);

// chart api
router.post('/get-lagna-chart', kundliController.getLagnaChart);
router.post('/get-moon-chart', kundliController.getMoonChart);
router.post('/get-sun-chart', kundliController.getSunChart);
router.post('/get-chalit-chart', kundliController.getChalitChart);
router.post('/get-hora-chart', kundliController.getHoraChart);
router.post('/get-dreshkan-chart', kundliController.getDreshkanChart);
router.post('/get-navamansha-chart', kundliController.getNavamanshaChart);
router.post('/get-dashamansha-chart', kundliController.getDashamanshaChart);
router.post('/get-dwadashamansha-chart', kundliController.getDwadashamanshaChart);
router.post('/get-trishamansha-chart', kundliController.getTrishamanshaChart);
router.post('/get-shashtymsha-chart', kundliController.getShashtymshaChart);

// Dasha Api
router.post('/get-kalsharp-dosha-analysis', kundliController.kalsharpDoshaAnalysis);
router.post('/get-pitri-dosha-analysis', kundliController.pitriDoshaAnalysis);
router.post('/get-mangal-dosha-analysis', kundliController.mangalDoshaAnalysis);
router.post('/get-sadhesati-analysis', kundliController.sadhesatiAnalysis);
router.post('/get_match', kundliController.getmatch);


module.exports = router;