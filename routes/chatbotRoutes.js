const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/admin/update_welcome_message', chatbotController.updateWelcomeMessage);
router.get('/user/get_welcome_message', chatbotController.getWelcomeMessage);
router.post('/admin/create_category', chatbotController.createCategory);
router.get('/user/get_all_category', chatbotController.getAllCategories);
router.post('/admin/category/:categoryId/status', chatbotController.changeCategoryStatus);
router.delete('/admin/categories/:categoryId/delete', chatbotController.deleteCategory);
router.put('/admin/udpate_category/:categoryId', chatbotController.updateCategory)
// QA ROUTES
router.post("/admin/create_qa", chatbotController.createQA);
router.get('/admin/get_all_qa', chatbotController.getAllQAs);
router.get('/admin/get_all_ai_qa', chatbotController.getQAsWithoutCategory);
router.get("/admin/get_qa/:qaId", chatbotController.getQAById);
router.put("/admin/update_qa/:qaId", chatbotController.updateQA);
router.delete("/admin/delete_qa/:qaId", chatbotController.deleteQA);
router.get("/user/get_qa/search", chatbotController.searchQAByKeyword);
router.get("/user/qa/related-questions", chatbotController.getRelatedQuestions);    
router.get("/user/qa/answer/:questionId", chatbotController.getAnswerForSelectedQuestion);
router.post('/user/save_user_message', chatbotController.saveUserMessage);
router.post("/user/get_chatgpt_response", chatbotController.getChatGPTResponse1);
router.post('/user/save_user_ai_chat_histoy', chatbotController.saveUserMessage1);
router.get('/admin/get_all_plan', chatbotController.getAllPlans);
router.post('/admin/create_plan', chatbotController.createPlan);
router.put('/admin/update_plan/:id', chatbotController.updatePlan);
router.delete('/admin/delete_plan/:id', chatbotController.deletePlan);
router.get('/admin/get_all_purchase_history', chatbotController.getAllPurchases);
router.post('/user/purchase_plan', chatbotController.purchasePlan);
router.get('/user/purchase_history/:chatBotUserId', chatbotController.getPurchaseHistory);


// new api
// router.post('/user/create_chatbot_user', chatbotController.createUser);
router.post('/user/create_chatbot_user', chatbotController.createUser2);
router.get('/user/by-creator/:creatorId', chatbotController.getUsersByCreator);
router.post('/user/ask_question', chatbotController.getChatGPTResponse39);
router.post('/user/ask_question1', chatbotController.getChatGPTResponse39);
// router.post('/user/get_chat_history', chatbotController.getUserChatHistory);
router.post('/user/get_chat_history', chatbotController.getUserChatHistory);
router.post('/user/get_user_category', chatbotController.getCategory);
router.post('/user/handleAstrologyQuestion', chatbotController.handleAstrologyQuestion);

router.post('/admin/update_prompt', chatbotController.updatePrompt);
router.get('/admin/get_prompt', chatbotController.getPrompt);

module.exports = router;