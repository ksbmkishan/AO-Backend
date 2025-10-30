const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');


const configureMulter = require("../configureMulter");
const multer = require('multer');
const storage = multer.memoryStorage();

// Define multer configuration for Bhagwan-related uploads
const uploadBhagwanImage = multer({ storage }).fields([
  { name: "mainImage", maxCount: 1 }, 
  { name: "subImages", maxCount: 10 },
]);

const uploadVideo = multer({ storage }).fields([
  { name: "video", maxCount: 1 },
]);

const vrFields = Array.from({ length: 10 }, (_, i) => ({
  name: `vr_mode[${i}].vr_image`,
  maxCount: 1,
}));
const uploadContent = multer({ storage }).fields([
  { name: "image", maxCount: 1 },         
  { name: "bulkVideoUpload", maxCount: 10 }, 
  { name: "bulkImageUpload", maxCount: 10 }, 
  ...vrFields,
]);

const upload = multer({ storage }).fields([
  { name: "itemImages", maxCount: 10 },
]);

const uploadLiveLink = multer({ storage }).fields([
  { name: "image", maxCount: 1 }, 
]);


const uploadVRItems = multer({ storage }).fields([
  { name: "itemImage", maxCount: 1 },
  { name: "audio", maxCount: 1 }, // Optional
]);


// Routes
router.post("/create-darshan", uploadContent, adminController.createOrUpdateContent);
router.get("/get-darshan", adminController.getAllContent);                  
router.get("/getById/:id", adminController.getContentById);
router.post('/delete-darshan/:id', adminController.deleteContentById);

router.post('/updateLanguage', adminController.updateHindi);

router.post('/update-vardani-shivalya',adminController.updateVardaniShivalya);
router.get('/get-vardani-shivalya',adminController.getVardaniShivalya);

//pooja items
router.post("/create-pooja-title", upload, adminController.createPoojaTitle);
router.post("/add-items-to-pooja-title/:id", upload, adminController.addItemsToPoojaTitle);
router.post("/update-items-to-pooja-title/:id/:itemId", upload, adminController.updateItemsToPoojaTitle)
router.get("/get-pooja-items", adminController.getAllPoojaItems);
router.get("/get-pooja-item/:id", adminController.getPoojaItemById);
router.post("/delete-pooja-item/:id", adminController.deletePoojaTitleById);
router.post("/delete-item-from-pooja-title/:titleId/:itemId", adminController.deleteItemFromPoojaTitle);
router.get('/getAllPoojaItemsRaw', adminController.getAllPoojaItemsRaw)

router.post('/skill', adminController.skill);
router.get('/get-skill', adminController.getAllSkills);
router.post('/update-skill', adminController.updateSkill);
router.post('/delete-skill', adminController.deleteSkill);

router.post('/sub-skill', adminController.subSkill);
router.get('/get-sub-skill', adminController.getAllSubSkills);
router.post('/update-sub-skill', adminController.updateSubSkill);
router.post('/delete-sub-skill', adminController.deleteSubSkill);

router.post('/create_recharge_plan', adminController.createRechargePlan);
router.post('/update-recharge-plan', adminController.updateRechargePlan);
router.post('/delete-recharge-plan', adminController.deleteRechargePlan);
router.post('/update-recharge-plan-status', adminController.updateRechargePlanStatus)

router.post('/add-remedy', adminController.addRemedy);
router.get('/view-remedy', adminController.viewRemedy);
router.post('/update-remedy', adminController.updateRemedy);
router.post('/delete-remedy', adminController.deleteRemedy);

router.post('/add-expertise', adminController.addExpertise);
router.get('/get-all-expertise', adminController.getExpertise);
router.post('/update-expertise', adminController.updateExpertise);
router.post('/delete-expertise', adminController.deleteExpertise);

router.post('/add-main-expertise', adminController.addMainExpertise);
router.get('/get-all-main-expertise', adminController.getMainExpertise);
router.post('/update-main-expertise', adminController.updateMainExpertise);
router.post('/delete-main-expertise', adminController.deleteMainExpertise);

// router.post('/update-main-expertise', adminController.updateMainExpertise);
// router.post('/delete-main-expertise', adminController.deleteMainExpertise);

router.post('/add-gift', adminController.addGift);
router.get('/get-all-gift', adminController.viewGift);
router.post('/update-gift', adminController.updateGift);
router.post('/delete-gift', adminController.deleteGift);

router.post('/add-review', adminController.addReview);
router.post('/verify-review', adminController.verifyReview);
router.get('/get-all-review', adminController.getAllReview);
router.post('/update-review', adminController.updateReview);
router.post('/get-astrologer-review', adminController.getAstrologersReviews);
router.post('/get-customer-review', adminController.getCustomersReviews);
router.post('/get-verified-astrologer-review', adminController.astrologersVerifiedReviews);
router.post('/delete-review', adminController.deleteReview);

router.post('/add-faq', adminController.addFaq);
router.get('/get-all-faq', adminController.getAllFaq);
router.post('/update-faq', adminController.updateFaq);
router.post('/delete-faq', adminController.deleteFaq);

router.post('/add-terms-condition', adminController.addTandC);
router.post('/delete-terms-condition', adminController.deleteTandC);
router.post('/get-terms-condition', adminController.viewTandC);

router.post('/add-privacy-policy', adminController.addPrivacyPolicy);
router.get('/get-privacy-policy', adminController.viewPrivacyPolicy);
router.post('/delete-privacy-policy', adminController.deletePrivacyPolicy);

router.post('/add-about-us', adminController.addAboutUs);
router.get('/get-about-us', adminController.getAboutUs);

router.post('/add-video-url', adminController.addVideoUrl);
router.get('/get-video-url', adminController.viewVideoUrl);
router.post('/delete-video-url/:id', adminController.deleteVideoUrl);

router.post('/add-title', adminController.addAskAstrologer);
router.get('/get-all-title', adminController.getAskAstrologer);
router.post('/update-title', adminController.updateAskAstrologer);
router.post('/delete-title', adminController.deleteAskAstrologer);

router.post('/add-ask-question', adminController.addAskQuestion);
router.get('/get-all-ask-question', adminController.getAskQuestion);
router.post('/update-ask-question', adminController.updateAskQuestion);
router.post('/delete-ask-question', adminController.deleteAskQuestion);

router.post('/add-religion-spirituality', adminController.addReligionSpirituality);
router.get('/get-all-religion-spirituality', adminController.getReligionSpirituality);
router.post('/update-religion-spirituality', adminController.updateReligionSpirituality);
router.post('/delete-religion-spirituality', adminController.deleteReligionSpirituality);

router.post('/add-astro-magazine', adminController.addAstroMagazine);
router.get('/get-all-astro-magazine', adminController.getAstroMagazine);
router.post('/update-astro-magazine', adminController.updateAstroMagazine);
router.post('/delete-astro-magazine', adminController.deleteAstroMagazine);

router.post('/add-remedies', adminController.addRemedies);
router.get('/get-all-remedies', adminController.getRemedies);
router.post('/update-remedies', adminController.updateRemedies);
router.post('/delete-remedies', adminController.deleteRemedies);

router.post('/add-birhat-horoscope', adminController.addBirhatHoroscope);
router.get('/get-all-birhat-horoscope', adminController.getBirhatHoroscope);
router.post('/update-birhat-horoscope', adminController.updateBirhatHoroscope);
router.post('/delete-birhat-horoscope', adminController.deleteBirhatHoroscope);

router.post('/add-auspicious-time', adminController.addAuspiciousTime);
router.get('/get-all-auspicious-time', adminController.getAuspiciousTime);
router.post('/update-auspicious-time', adminController.updateAuspiciousTime);
router.post('/delete-auspicious-time', adminController.deleteAuspiciousTime);

router.post('/add-daily-panchang', adminController.addDailyPanchang);
router.get('/get-all-daily-panchang', adminController.getDailyPanchang);
router.post('/update-daily-panchang', adminController.updateDailyPanchang);
router.post('/delete-daily-panchang', adminController.deleteDailyPanchang);

router.post('/add-yellow-book', adminController.addYellowBook);
router.get('/get-all-yellow-book', adminController.getYellowBook);
router.post('/update-yellow-book', adminController.updateYellowBook);
router.post('/delete-yellow-book', adminController.deleteYellowBook);

router.post('/add-numerology', adminController.addNumerology);
router.get('/get-all-numerology', adminController.getAllNumerology);
router.post('/update-numerology', adminController.updateNumerology);
router.post('/delete-numerology', adminController.deleteNumerology);

router.post('/add-vivahMuhurat', adminController.addVivahMuhurat);
router.get('/get-all-vivahMuhurat', adminController.getAllVivahMuhurat);
router.post('/update-vivahMuhurat', adminController.updateVivahMuhurat);
router.post('/delete-vivahMuhurat', adminController.deleteVivahMuhurat);

router.post('/add_mudra', adminController.addMudra);
router.get('/get_allMudra', adminController.getAllMudra);
router.post('/balance', adminController.getUserBalance);


router.get('/get_Mudra/:sno', adminController.getMudraBySno);
router.put('/update_Mudra/:sno', adminController.updateMudra);
router.delete('/delete_Mudra/:sno', adminController.deleteMudra);

router.post('/add-mundanMuhurat', adminController.addMundanMuhurat);
router.get('/get-all-mundanMuhurat', adminController.getAllMundanMuhurat);
router.post('/update-mundanMuhurat', adminController.updateMundanMuhurat);
router.post('/delete-mundanMuhurat', adminController.deleteMundanMuhurat);

router.post('/add-annaprashan', adminController.addAnnaprashan);
router.get('/get-all-annaprashan', adminController.getAllAnnaprashan);
router.post('/update-annaprashan', adminController.updateAnnaprashan);
router.post('/delete-annaprashan', adminController.deleteAnnaprashan);

router.post('/add-question', adminController.addAskAstrologerQuestion);
router.get('/get-all-question', adminController.getAllQuestions);
router.post('/update-question', adminController.updateAskAstrologerQuestion);
router.post('/delete-question/:id', adminController.deleteQuestion);

router.post('/add-astrologer', adminController.addAstrologer);
router.post('/update-astrologer', adminController.updateAstrologer);
router.get('/get-all-astrologers', adminController.getAllAstrologers);
router.get('/get_astrologer_requests', adminController.getAstrologerRequests);
router.post('/update_service_charges', adminController.updateServiceCharges)
router.post('/delete-astrologer-account', adminController.deleteAstrologerAccount);

router.post('/add-astro-blog', adminController.addAstroBlog);
router.post('/update_astro_blog', adminController.updateAstroBlog);
router.post('/delete_astro_blogs', adminController.deleteAstroBlogs);
router.get('/get_astro_blogs', adminController.getAstroBlogs);
// router.post('/get_astro_blogs_by_search', adminController.getAstroBlogsBySearch);
router.post('/get-astrologer-id', adminController.checkAstrologer);

router.post('/add-blog-category', adminController.addBlogCategory);
router.get('/blog-category-list', adminController.categoryBlogList);
router.post('/update_blog_category', adminController.updateBlogCategory);
router.post('delete_blog_category',adminController.deleteBlogCategory);


router.post('/add-testimonial', adminController.addTestimonial);
router.post('/update-testimonial', adminController.updateTestimonial);
router.get('/get-all-testimonial', adminController.getAllTestimonial);
router.post('/delete-testimonial', adminController.deleteTestimonial);

router.post('/add-temple-foundation', adminController.addtemplefoundation);
router.post('/update-temple-foundation', adminController.updatetemplefoundation);
router.get('/get-all-temple-foundation', adminController.getAlltemplefoundation);
router.post('/delete-temple-foundation', adminController.deletetemplefoundation);

router.post('/add-customer', adminController.addCustomer);
router.get('/get-all-customer', adminController.getAllCustomers);
router.post('/delete-customer', adminController.deleteCustomer);

router.post('/add-user', adminController.addUser);
router.get('/get-all-user', adminController.getAllUser);
router.post('/delete-user', adminController.deleteUser);
router.post('/block-user/:userId', adminController.blockUser);


router.post('/adminSignup', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);

router.post('/add-announcement', adminController.addAnnouncement);
router.get('/get-all-anouncement', adminController.getAnnouncement);
router.post('/update-announcement', adminController.updateAnnouncement);
router.post('/delete-announcement', adminController.deleteAnnouncement);

router.post('/add-screenshot', adminController.addScreenshot);

// router.get('/get-chat-history', adminController.getChatHistory);

router.post('/add-banners', adminController.addBanners);
router.get('/get-banners', adminController.getAllBanners);
router.get('/get-app-banners', adminController.getAppBanners);
router.post('/update_banner_status', adminController.updateBannerStatus);


router.post('/update-banners', adminController.updateBanners);
router.post('/delete-banners', adminController.deleteBanners);

router.post('/add-Teerth-dham', adminController.addTeerthdham);
router.get('/get-Teerth-dham', adminController.getAllTeerthdham);
router.get('/get-app-Teerth-dham', adminController.getAppTeerthdham);
router.post('/update_teerth_dham_status', adminController.updateTeerthdhamstatus);


router.post('/update-Teerth-dham', adminController.updateTeerthdham);
router.post('/delete-Teerth-dham', adminController.deleteTeerthdham);

router.post('/notification-from-admin', adminController.sendNotificationFromAdmin);
router.get('/get-admin-notifications', adminController.getAllNotifications);
router.get('/get-all-recharge-plans', adminController.getAllRechargePlan);

router.post('/add-first-recharge', adminController.firstRechargeOffer);
router.post('/update-first-recharge-offer', adminController.updateFirstRechargeOffer);
router.get('/get-first-recharge', adminController.getAllFirstRechargeOffer);
router.post('/delete-first-recharge-offer', adminController.deleteFirstRechargeOffer)

router.get('/get-all-customers', adminController.getAllCustomers);
router.post('/change-banned-status', adminController.changeBannedStatus);
router.post('/set-customer-online', adminController.setCustomerOnline);

router.post('/update-customer-data', adminController.updateCustomerdata);
router.post('/recharge-customer-wallet', adminController.rechargeCustomerWallet);
router.post('/customers-payment-list', adminController.getCustomersPayment);
router.post('/get-astro-blogs-by-category', adminController.getAstroBlogsByCategory);
router.post('/see-astro-blogs', adminController.seeBlogs);
router.post('/count-seen-blogs', adminController.countSeenBlogs);

router.post('/delete-customer', adminController.deleteCustomer);
router.post('/customers-order-history', adminController.customerOrderHistory);

router.post('/add-app-review', adminController.addAppReview);
router.post('/verify-app-review', adminController.verifyAppReview);
router.get('/get-all-app-review', adminController.getAllAppReview);
router.post('/delete-app-review', adminController.deleteAppReview);

router.post('/send_customer_notification', adminController.sendCustomerNotification);
router.get('/get-customer-notification', adminController.getCustomerNotification);
router.post('/send_astrologer_notification', adminController.sendAstrologerNotification);
router.get('/get-astrologer-notification', adminController.getAstrologerNotification);

router.get('/get_dashboard', adminController.getDashboard);
router.get('/get_earning_chart', adminController.getEarningChart);
router.post('/get_admin_earning_graph', adminController.getAdminEarningGraph);

router.get('/get_chat_history', adminController.getChatHistory);
router.get('/get_admin_earnig_history', adminController.getAdminEarnigHistory);
router.get('/get_call_history', adminController.getCallHistory);
router.post('/create_language', adminController.createLanguage);
router.get('/get_language', adminController.getLanguage);
router.post('/update_language', adminController.updateLanguage);
router.post('/delete_language', adminController.deleteLanguage);

router.get('/get_wallet_payments', adminController.getWalletPayments);

router.post('/create_qualifications', adminController.createQualifications);
router.post('/get_qualifications', adminController.getQualifications);
router.post('/update_qualifications', adminController.updateQualifications);
router.post('/create_live_streaming', adminController.createLiveStreaming);

router.post('/create_app_tutorials', adminController.createAppTutorials);
router.post('/update_app_tutorials', adminController.updateAppTutorials);
router.post('/get_app_tutorials', adminController.getAppTutorials);
router.post('/delete_app_tutorials', adminController.deleteAppTutorials);

router.post('/create_update_astro_companion', adminController.createUpdateAstroCompanion);
router.post('/get_astro_companion', adminController.getAstroCompanion);
router.get('/live_streaming', adminController.liveStreaming);
router.get('/get_withdraw_request', adminController.getWithdrawRequest);
router.get('/get_all_gift_history', adminController.getAllGiftHistroy);
router.post('/get_astrologer_gift_history', adminController.getAstrologerGiftHistroy);
router.post('/astrologer_details_by_id', adminController.astrologerDetailsById);
router.post('/astrologer_chat_history', adminController.astrologerChatHistory);
router.post('/customer_details_by_id', adminController.customerDetailsById);
router.post('/customer_chat_history', adminController.customerChatHistory);
router.get('/all_videocall_history', adminController.all_videocall_history);
router.get('/all_live_videocall_history', adminController.all_live_videocall_history);
router.post('/deduct_wallet_by_admin', adminController.deductWalletByAdmin);
router.post('/astrologer_transaction_histroy', adminController.astrologerTransactionHistory);
router.post('/add_third_party_package', adminController.addThirdPartyPackages);
router.post('/update_third_party_package', adminController.updateThirdPartyPackages);
router.post('/add_master_images_by_admin', adminController.addMasterImagesByAdmin);
router.post('/update_master_images_by_admin', adminController.updateMasterImageById);
router.post('/add_sites_details', adminController.addSitesDetailsByAdmin);
router.post('/add_social_link', adminController.addSocailLink);
router.post('/update_social_link', adminController.updateSocailLink);
router.get('/get_setting_data', adminController.getSettingData);
router.post('/change_videocall_status', adminController.changeVideocallStatus);
router.post('/add_deduct_customer_wallet', adminController.addDeductCustomerWallet);
router.post('/add_deduct_astrologer_wallet', adminController.addDeductAstrologerWallet);
router.post('/customer_followed_list', adminController.customerFollowedList);
router.post('/approve_withdraw_request', adminController.approveWithdrawRequest);


// Routes for Bhagwan operations
router.post("/add-bhagwan", uploadBhagwanImage, adminController.addBhagwan);
router.post(
  "/add-bhagwan/:id/subimages",
  uploadBhagwanImage,
  adminController.addSubImages
);
router.get("/get-bhagwan/:id", adminController.getBhagwan);
router.get("/get-bhagwan", adminController.getAllBhagwan);



router.post("/add_Darshan" ,uploadLiveLink, adminController.createDarshan);
router.post("/update_Darshan/:id",uploadLiveLink, adminController.updateDarshan);
router.post("/delete_Darshan/:id", adminController.deleteDarshan);
router.get("/get_Darshan", adminController.getAllDarshanLinks);
router.post('/darshanDeleteImage', adminController.darshanDeleteImage);
router.post('/darshanDeleteVideo', adminController.darshanDeleteVideo);
router.post('/darshanUpdateImage', uploadContent, adminController.darshanUpdateImage);


/**************** Religious Category API Routes Start ***************/

// router.post('/create_religious_category', adminController.createReligiousCategory);
router.post('/create_religious_category', adminController.createReligiousCategory);
router.get('/get_all_religious_categories', adminController.getAllReligiousCategories);
router.post('/get_all_religious_category_by_id', adminController.getReligiousCategoryById);
router.post('/update_religious_category', adminController.updateReligiousCategory);
router.post('/delete_religious_category', adminController.deleteRelegiousCategory);

router.post('/create_religious_subcategory', adminController.createReligiousSubCategory);
router.get('/get_all_religious_subcategories', adminController.getAllReligiousSubCategories);
router.post('/get_all_religious_subcategory_by_categoryid', adminController.getReligiousSubCategoryByCategoryId);
router.post('/update_religious_subcategory', adminController.updateReligiousSubCategory);
router.post('/delete_religious_subcategory', adminController.deleteRelegiousSubCategory);

/**************** Religious Category API Routes End ***************/

router.post('/add_vr_items',uploadVRItems, adminController.addVRPoojaItems);
router.get('/get_vr_items', adminController.getVRPoojaItems);
router.delete("/delete_vr_item/:id", adminController.deleteVRPoojaItem);


router.get('/getRechargeHistory', adminController.getRechargeHistory);

// New Pachang
router.post('/add_panchang', adminController.addPanchang);
router.get('/get_all_pachang', adminController.getAllPanchang);
router.post('/get_pachang_by_year',adminController.getPanchangData);
router.post('/add_muhurat_vivah',adminController.addMuhuratVivah);
router.get('/get_all_muhurat_vivah',adminController.getAllMuhuratVivah);
router.post('/get_muhurat_by_year', adminController.getMuhuratVivahData);
router.post('/add_muhurat_grahpravesh', adminController.addMuhuratGrahPravesh);
router.get('/get_all_muhurat_grahpravesh', adminController.getAllMuhuratGrahPravesh);
router.post('/get_muhurat_grahpravesh', adminController.getMuhuratGrahPraveshData);
router.post('/add_muhurat_vaahan',adminController.addMuhuratVaahan);
router.get('/get_all_muhurat_vaahan',adminController.getAllMuhuratVaahan);
router.post('/get_muhurat_vaahan', adminController.getMuhuratVaahanData);
router.post('/add_muhurat_sampatti', adminController.addMuhuratSampatti);
router.get('/get_all_muhurat_sampatti', adminController.getAllMuhuratSampatti);
router.post('/get_muhurat_sampatti', adminController.getMuhuratSampattiData);

router.post('/add_update_aarti_notification',uploadVideo, adminController.addUpdateAartiNotification);
router.get('/get_aarti_notification', adminController.getAartiNotification);

//! Temple Video
router.post('/add_temple_video', multer({ storage }).fields([
  { name: 'video', maxCount: 1 }
]), adminController.addTempleVideo);
router.get('/get_temple_videos', adminController.getTempleVideos);
router.delete('/delete_temple_video/:id', adminController.deleteTempleVideo);

module.exports = router;