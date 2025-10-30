const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const labController = require('../controllers/labController');
const validateCustomer = require('../validation/customerValidation')
const validate = require('../validation/validate');

router.post('/customer-signup', customerController.customerSignup);
router.get("/top-referrers", customerController.getTopReferrals);
router.post("/track-referrers", customerController.getReferralDetails);
// router.put('/update-customer-profile/:id', customerController.customerProfileUpdate);
router.post('/customer-login', customerController.customerLogin);
router.post('/referral_code', customerController.referralCode);
router.post('/verify-customer', customerController.verifyCustomer);
router.post('/verify_web_customer', customerController.verifyWebCustomer);
router.post('/customer_google_login', customerController.customerGoogleLogin);
router.post('/get-customer-detail', customerController.getCustomersDetail);
router.get('/get-all-customers', customerController.getAllCustomers);

router.post('/get-customers-review', customerController.getCustomersReview);
router.post('/store-file', customerController.storeFile);
router.post('/deduct-wallet', customerController.calculateAndDeductChatPrice);
router.post('/create_razorpay_order', customerController.createRazorpayOrder);
router.post('/createRazorpayOrderByWebsite',customerController.createRazorpayOrderByWebsite);
router.post('/razorpayCallback', customerController.razorpayCallback);
router.post('/create_phonepay_order', customerController.createPhonePayOrder);
router.get('/status/:txnId', customerController.checkPaymentStatus);
router.post('/add-profile', customerController.linkedProfile);
router.post('/getCustomerOrder', customerController.getCustomerOrder);
router.post('/orderDetailsByid', customerController.orderDetailsById);

router.post('/update-customer-details', customerController.updateCustomerDetails);
// router.put('/update-customer-profile-image/:customerId', customerController.updateCustomerProfileImage);

router.post('/recharge-customer-wallet', customerController.rechargeCustomerWallet);
router.post('/customer-wallet-balance', customerController.customersWalletBalance);
router.post('/customers_wallet_history', customerController.customersWalletHistory);
router.get('/get_customer_all_first_recharge_offfer', customerController.getCustomerAllFirstRechargeOffer);
router.get('/get_customer_all_recharge_plan', customerController.getCustomerAllRechargePlan);

router.post('/get-linked-profile', customerController.getallLinkedProfile);
router.post('/delete_linked_profile', customerController.deleteLinkedProfile);
router.post('/get_linked_profile', customerController.getLinkedProfile);
router.post('/customers-chat-history', customerController.chatHistoryOfCustomer);
router.post('/get_chat_details', customerController.getChatDetails);

// Notification to Customer
router.post('/send-notification-to-customer', customerController.sendNotificationToCustomer);
router.post('/get_custmer_notification', customerController.getCustmerNotification);
router.post('/update_customer_notification', customerController.updateCustomerNotification);

//Zegocloude call api
router.post('/deduct-call-price', customerController.calculateAndDeductCallPrice);
router.post('/customers-call-history', customerController.CallHistoryOfCustomer);
router.post('/initiate-call', customerController.initiateCall);
router.post('/initiate-chat', customerController.initiateChat);
router.post('/accept_chat', customerController.acceptChat);
router.post('/reject_chat', customerController.rejectChat);
router.post('/create-call', customerController.createCall);
router.post('/timeout-call', customerController.timeoutCall);
router.post('/cancel-call', customerController.cancelCall);
router.post('/accept-call', customerController.acceptCall);
router.post('/reject-call', customerController.rejectCall);
router.post('/end-call', customerController.endCall)
router.post('/get-call-data', customerController.getCallData)
router.post('/disconect-call', customerController.disconectCall)
router.post('/deduct-balance', customerController.updateChatHistoryAndBalances);
router.get('/customer-home-banner', customerController.customerHomeBanner)
router.get('/astrologer-detailes-banner', customerController.astrologerDetailesBanner)
router.post('/initate_live_streaming', customerController.initateLiveStreaming);
router.post('/create_live_room', customerController.createLiveRoom);
router.post('/end_live_streaming', customerController.endLiveStreaming);
router.post('/stop_live_streaming', customerController.stopLiveStreaming);
router.get('/get_live_streaming', customerController.getLiveStreaming);
router.get('/get_recent_live_streaming', customerController.getRecentLiveStreaming);
router.post('/send_gift_in_live_streaming', customerController.sendGiftInLiveStreaming);
router.post('/create_live_calls', customerController.createLiveCalls);
router.post('/exits_from_live', customerController.exitsFromLive);
router.post('/end_live_calls', customerController.endLiveCalls);
router.post('/get_customer_live_calls', customerController.getCustomerLiveCalls);

//exotel call api
router.post('/initiate_call_with_exotel', customerController.initiateCallWithExotel)
router.post('/call_status_response', customerController.callStatusResponse)

router.post('/check_customer_following', customerController.checkCustomerFollowing)
router.post('/follow_astrolgoer', customerController.followAstrolgoer)
router.post('/get_customer_following', customerController.getCustomerFollowing)
router.post('/match_making', customerController.matchMaking);
router.post('/get_match', customerController.getMatch);
router.get('/get_all_match', customerController.getAllMatch);
router.post('/user_numerology', customerController.userNumerology);
router.post('/get_numerology', customerController.getNumerology);
router.post('/delete_numero_data', customerController.deleteNumeroLogyById);
router.get('/get_all_numerology', customerController.getAllNumerology);
router.post('/VideoCallIDGenerator',customerController.videocallidgenerator);
router.post('/endvideocall',customerController.endvideoCalls);
router.post('/get_videocall_history', customerController.getVideoCallHistory);
router.post('/delete_account', customerController.deleteAccount);

//Phonepe Payment Gateway
router.post('/phonepe_payment',customerController.phonepePayment);
router.post('/callbackPhonepe',customerController.callbackPhonepe);
router.get('/redirectPhonepeWallet',customerController.redirectPhonepeWallet);


// rahul
router.get('/gifs' , customerController.gif);
router.get("/get_AllDarshans", customerController.getAllDarshans);
router.get("/get_Darshan/:id", customerController.getDarshanById);

// send gift
router.post('/gift-wallet-balance' , customerController.giftWalletBalance);
router.post('/request-gift-wallet-balance',customerController.requestGiftWalletBalance);
router.post('/gift-wallet-history/:customerId' , customerController.getWalletTransactionHistory);
router.get('/search-customer' , customerController.searchCustomers);
router.post('/send-wallet-request' , customerController.sendWalletRequest);
router.post('/respond-wallet-request' , customerController.respondToWalletRequest);
router.get('/get-wallet-request/:userId' , customerController.getWalletRequests);
router.get('/get-All-wallet-history' , customerController.getAllWalletTransactionHistory);
router.get('/get-All-request-history' , customerController.getWalletRequestHistory);
router.post('/get-All-wallet-history-customer' , customerController.getWalletTransactionHistoryByCustomer);

// Temple 
router.post('/temple-wallet-add-deduct', customerController.templeWalletAddDeduct);

router.post('/vardan_shivalya_deduct',customerController.vardanShivalyadeduct);
router.post('/vardanDayReset',customerController.vardanDayReset);
router.post('/shivalya_deduct',customerController.shivalyadeduct);
router.post('/shivalyaDayReset',customerController.shivalyaDayReset);
router.post('/updateRealVrCount', customerController.updateRealVrCount);

router.post('/getDivyaRashiWalletHistory',customerController.getDivyaRashiWalletHistory);
router.get('/getDivyaRashiHistory',customerController.getDivyaRashiHistory);
router.post('/getPurusharthaWalletHistory',customerController.getPurusharthaWalletHistory);

router.post('/deduct_wallet_balance', customerController.deductWalletBalance);
router.post('/refund_wallet_balance', customerController.refundWalletBalance);
router.post('/deductAndAddVrMode', customerController.deductAndAddVrMode);


// kundli matching
router.post('/match_save',customerController.matchsave)
router.post('/match_delete',customerController.matchdelete)
router.post('/match_data',customerController.matchData);

router.post('/update-set-pin',customerController.updateSetPin);
router.post('/forget-pin-otp',customerController.forgetPinOtp);

router.post('/kundliVoiceResponse', labController.kundliVoiceResponse);

// Join Temple. Notifiction
router.post('/join_temple', customerController.joinTemple);
module.exports = router;

