const RechargeServices = require("../services/rechargeServices")
const RechargeHistory = require("../models/rechargeModel/userRecharge");
const { createRazorpayRefund } = require("../services/razorpayService");

function generateRandom12DigitNumber() {
    var min = Math.pow(10, 11); // Minimum 12-digit number
    var max = Math.pow(10, 12) - 1; // Maximum 12-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getMetroOperators = async (req, res) => {
    try {
        const response = await RechargeServices.getAdminRechargeOperators({ type: 'METRO CARD RECHARGE' })
        return res.status(200).json({
            status: true,
            message: "Metro operators fetched successfully",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getDTHOperators = async (req, res) => {
    try {
        const response = await RechargeServices.getAdminRechargeOperators({ type: 'DTH' })
        return res.status(200).json({
            status: true,
            message: "Dth operators fetched successfully",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getElectriccityOperator = async (req, res) => {
    try {
        const response = await RechargeServices.getAdminRechargeOperators({ type: 'Electricity' })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "data  not found",
            })
        }
        const cityWiseData = {};
        response.forEach(item => {
            if (!cityWiseData[item.city]) {
                cityWiseData[item.city] = [];
            }
            cityWiseData[item.city].push(item);
        });

        const sortedCityNames = Object.keys(cityWiseData).sort();

        const sortedCityWiseData = {};
        sortedCityNames.forEach(city => {
            sortedCityWiseData[city] = cityWiseData[city];
        });

        return res.status(200).json({
            status: true,
            message: "Electric operators fetched successfully",
            data: sortedCityWiseData
        })


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getGasOperator = async (req, res) => {
    try {
        const response = await RechargeServices.getAdminRechargeOperators({ type: 'Gas Cylinder' })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "data  not found",
            })
        }


        return res.status(200).json({
            status: true,
            message: "Gas operators fetched successfully",
            data: response
        })


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getFastagOperator = async (req, res) => {
    try {
        const response = await RechargeServices.getAdminRechargeOperators({ type: 'Fastag' })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "data  not found",
            })
        }

        return res.status(200).json({
            status: true,
            message: "Fastag operators fetched successfully",
            data: response
        })


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getOperatorsFields = async (req, res) => {
    try {
        const { operator } = req.body
        const response = await RechargeServices.getOperatorsParameters({ operator })
        return res.status(200).json({
            status: true,
            message: "operators fetched successfully",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getOperatorBillInfo = async (req, res) => {
    try {
        const { RequestData, operator } = req.body
        if (!RequestData || !operator) {
            return res.status(400).json({
                status: false,
                message: "RequestData, operator field is required",
            })
        }
        const response = await RechargeServices.getOperatorBill({ RequestData, operator })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "Data Not found",
            })
        }

        return res.status(200).json({
            status: true,
            message: "operators fetched successfully",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getDthData = async (req, res) => {
    try {
        const { number, operator } = req.body
        if (!number || !operator) {
            return res.status(400).json({
                status: false,
                message: "number, operator field is required",
            })
        }
        const response = await RechargeServices.getDthDetails({ number, operator })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "Data Not found",
            })
        }

        return res.status(200).json({
            status: true,
            message: "operators fetched successfully",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.getMobilePlans = async (req, res) => {
    try {
        const { phoneNumber } = req.body
        if (!phoneNumber) {
            return res.status(400).json({
                status: false,
                message: "phoneNumber field is required",
            })
        }

        const mobileOperator = await RechargeServices.getMobileOperator({ phoneNumber })
        const providerData = await RechargeServices.getAdminRechargeOperatorData({ operatorCode: mobileOperator?.OperatorCode })
        const operatorData = await RechargeServices.getMobileOperatorData({ phoneNumber, circleCode: mobileOperator?.CircleCode, operatorCode: mobileOperator?.OperatorCode })
        console.log('mobileOperator ', mobileOperator);
        if(mobileOperator.Status == 1) {
            return res.status(409).json({ success: false, message: mobileOperator});
        }
        if (!mobileOperator || !providerData) {
            return res.status(200).json({
                status: false,
                message: "Data Not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Transaction Successful",
            data: { operatorData, mobileOperator: { ...mobileOperator, providerData } }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.cyrusRecharge = async (req, res) => {
    try {
        const { number, operatorId, amount, type, userId, circle, razorpayOrderId } = req.body
        if (!number || !operatorId || !amount || !type || !userId || !circle || !razorpayOrderId) {
            return res.status(400).json({
                status: false,
                message: "number, operatorId, amount, type, userId, circle, razorpayOrderId fields is required",
            })
        }

        const response = await RechargeServices.onCyrusRecharge({ number, operatorId, type, amount, userId, circle, razorpayOrderId })
        if (!response) {
            return res.status(200).json({
                status: false,
                message: "Data Not found",
            })
        }

        return res.status(200).json({
            status: true,
            message: "Transaction Successful",
            data: response
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}

exports.rechargeCallBack = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({

        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Failed to fetch Metro operators"
        })
    }
}



exports.getGasOperators = async (req, res) => {
    let operator = []
    try{
      const response = await RechargeServices.getGasOperator()
      if (!response) {
          return res.status(200).json({
              status: false,
              message: "data  not found",
          })
      }
      
      const prepaidOperators = response
      .flatMap(data => data.data) // Flatten the array of service data
      .filter(item => item.ServiceTypeName === "Gas Cylinder"); // Filter for Prepaid-Mobile
  

  if (prepaidOperators) {
      prepaidOperators.map(data => operator.push(data))
  }
      return res.status(200).json({
          status: true,
          message: "Gas operators fetched successfully",
          data: operator
      })
    }

    catch(err){
      console.log(err)
      return res.status(500).json({
          status: false,
          message: "Failed to fetch Metro operators"
      })
    }
  }



exports.successRecharge = async (req, res) => {
    try {
        const { userId, mobile, razorpayOrderId, rechargeOrderId, request_id, message, operator_reference, number, amount, operatorId, billType = 'MOBILE RECHARGE', productName = 'VI' } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "UserId is Required" });
        }

        const usertx = generateRandom12DigitNumber();

        const rechargeData = {
            userId: userId,
            number: number,
            mobile: mobile,
            operator_reference: operator_reference,
            operatorId: operatorId,
            productName: productName,
            amount: amount,
            razorpayOrderId: razorpayOrderId,
            rechargeOrderId: rechargeOrderId,
            request_id: request_id,
            transactionId: usertx,
            status: 'SUCCESS',
            billType: billType,
            refund: 'NONE',
            message: message,
        }

        const newRechargeData = new RechargeHistory(rechargeData);
        await newRechargeData.save();

        return res.status(200).json({ success: true, message: "Recharge Successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message });
    }
}

exports.failedRecharge = async (req, res) => {
    try {
        const { userId, mobile, razorpayOrderId, rechargeOrderId, request_id, message, operator_reference, number, amount, operatorId, billType = 'MOBILE RECHARGE', productName = 'VI', status } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "UserId is Required" });
        }

        const usertx = generateRandom12DigitNumber();
        let msg;
        if (status == 'CANCEL') {
            msg = 'Payment Cancel';
        } else {
            msg = 'Payment Failed';
        }

        const rechargeData = {
            userId: userId,
            number: number,
            mobile: mobile,
            operator_reference: '',
            operatorId: operatorId,
            productName: productName,
            amount: amount,
            razorpayOrderId: razorpayOrderId,
            rechargeOrderId: '',
            request_id: '',
            transactionId: usertx,
            status: status,
            billType: billType,
            refund: 'NONE',
            message: msg,
        }

        const newRechargeData = new RechargeHistory(rechargeData);
        await newRechargeData.save();

        return res.status(200).json({ success: true, message: msg });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e.message });
    }
}

exports.refundSuccessRecharge = async (req, res) => {
    try {
        const { userId, mobile, razorpayOrderId, number, amount, operatorId, billType = 'MOBILE RECHARGE', productName = 'VI', status } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "UserId is Required" });
        }

        const usertx = generateRandom12DigitNumber();

        const rechargeData = {
            userId: userId,
            number: number,
            mobile: mobile,
            operator_reference: '',
            operatorId: operatorId,
            productName: productName,
            amount: amount,
            razorpayOrderId: razorpayOrderId,
            rechargeOrderId: '',
            request_id: '',
            transactionId: usertx,
            status: 'REFUND',
            billType: billType,
            refund: 'NONE',
            message: "Refund SuccessFully",
        }

        const newRechargeData = new RechargeHistory(rechargeData);
        await newRechargeData.save();

        return res.status(200).json({ success: true, message: "Refund SuccessFully" });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
}

exports.refundRecharge = async (req, res) => {
    try {
        const { amount, paymentId } = req.body;

        if (!amount && !paymentId) {
            return res.status(400).json({ success: false, message: "Required" });
        }

        const refundResponse = await createRazorpayRefund({ amount, paymentId });

        return res.status(200).json({ success: true, data: refundResponse });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
}

exports.getUserRechargeHistory =  async (req,res) => {
    try {
        const {customerId} = req.body;

        if(!customerId) {
            return res.status(200).json({ success:false, message:"Customer Id is Required"});
        }

        const history = await RechargeHistory.find({ userId : customerId});

        return res.status(200).json({ success: true, message:"Fetch Recharge History", history});


    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
}