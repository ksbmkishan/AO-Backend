const express = require('express');
const router = express.Router();
const rechargeController = require('../controllers/rechargeController')

router.post('/get_metro_operators', rechargeController.getMetroOperators);
router.post('/get_dth_operators', rechargeController.getDTHOperators);
router.post('/get_operators_fields', rechargeController.getOperatorsFields);
router.post('/get_operator_bill_info', rechargeController.getOperatorBillInfo);
router.post('/get_dth_data', rechargeController.getDthData);
router.post('/get_electric_city_operator', rechargeController.getElectriccityOperator);
router.get('/get_gas_operator', rechargeController.getGasOperators);
router.post('/get_fastag_operator', rechargeController.getFastagOperator);
router.post('/cyrus_recharge', rechargeController.cyrusRecharge);
router.post('/get_mobile_plans', rechargeController.getMobilePlans);
router.post('/recharge_call_back', rechargeController.rechargeCallBack);

// New APIS
router.post('/success-recharge',rechargeController.successRecharge);
router.post('/failed-recharge', rechargeController.failedRecharge);
router.post('/refund-success-recharge', rechargeController.refundSuccessRecharge)
router.post('/refund-recharge', rechargeController.refundRecharge);
router.post('/get-user-recharge-history', rechargeController.getUserRechargeHistory);


module.exports = router;