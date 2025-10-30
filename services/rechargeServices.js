const operatorServicesType = require("../models/rechargeModel/operatorServicesType")
const { getRequest, postRequest } = require("../utils/apiRequests")
const rechargeOperator = require("../models/rechargeModel/rechargeOperator");
const RechargeHistory = require('../models/rechargeModel/userRecharge')
const RazorpayServices = require('../services/razorpayService')

function generateRandom12DigitNumber() {
    var min = Math.pow(10, 11); // Minimum 12-digit number
    var max = Math.pow(10, 12) - 1; // Maximum 12-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getRechargeOperators = async ({ type }) => {
    try {
        const response = await getRequest({ url: `https://Cyrusrecharge.in/api/GetOperator.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&Method=getoperator` })
        let data = null
        if (!type) {
            data = response[0].data
        } else {
            data = response[0].data.find((item) => item.ServiceTypeName === type)
        }
        return data
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getAdminRechargeOperators = async ({ type }) => {
    try {
        const operatorData = await operatorServicesType.findOne({ name: type })
        if (!operatorData) {
            return null
        }
        const data = await rechargeOperator.aggregate([
            {
                $match: { servicesType: operatorData?._id }
            },
            {
                $lookup: {
                    from: 'operatorservices', // Collection to join
                    localField: 'servicesType', // Field from rechargeOperater schema
                    foreignField: '_id', // Field from operatorService schema
                    as: 'servicesTypeDetails' // Output array field containing joined documents
                }
            },
            {
                $unwind: '$servicesTypeDetails' // Deconstruct the array field
            },
            {
                $project: {
                    _id: 1,
                    city: 1,
                    OperatorCode: 1,
                    OperatorName: 1,
                    operatorImage: 1,
                    operatorImage: 1,
                    servicesType: 1,
                    'servicesTypeDetails.name': 1 // Include the name field from operatorService
                }
            }
        ]);
        return data
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getAdminRechargeOperatorData = async ({ operatorCode }) => {
    try {
        const data = await rechargeOperator.findOne({ OperatorCode: operatorCode })
        return data
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getOperatorsParameters = async ({ operator }) => {
    try {
        const data = {
            memberid: process.env.CYRUS_MEMBER_ID,
            pin: process.env.bitFetch,
            methodname: 'get_billerinfo',
            operator
        }

        const response = await postRequest({
            url: `https://cyrusrecharge.in/api/BillFetch_Cyrus_BA.aspx`,
            header: 'form',
            data,

        })

        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getDthDetails = async ({ operator, number }) => {
    try {
        const response = await getRequest({
            url: `https://cyrusrecharge.in/api/CyrusROfferAPI.aspx?MerchantID=${process.env.CYRUS_MEMBER_ID}&MerchantKey=${process.env.dthinfokey}&MethodName=dthinfo&operator=${operator}&mobile=${number}&offer=roffer`,

        })
        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getOperatorBill = async ({ RequestData, operator }) => {
    try {
        const formData = new FormData()
        formData.append('memberid', process.env.CYRUS_MEMBER_ID)
        formData.append('pin', process.env.bitFetch)
        formData.append('methodname', "get_billfetch")
        formData.append('operator', operator)
        formData.append('RequestData', JSON.stringify(RequestData))
        formData.append('format', 'json')

        const response = await postRequest({
            url: `https://cyrusrecharge.in/api/BillFetch_Cyrus_BA.aspx`,
            header: 'form',
            data: formData,
        })

        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getMobileOperator = async ({ phoneNumber }) => {
    try {
        const response = await getRequest({
            url: `https://cyrusrecharge.in/API/CyrusOperatorFatchAPI.aspx?APIID=${process.env.CYRUS_MEMBER_ID}&PASSWORD=${process.env.OperatorPass}&MOBILENUMBER=${phoneNumber}`
        })

        
        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getMobileCircle = async ({ circleCode }) => {
    try {
        const response = await getRequest({
            url: `https://Cyrusrecharge.in/api/GetOperator.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&Method=getcircle`
        })

        if (response[0]?.Status === '1') {
            const circleData = response[0].data.find((item) => item.circlecode === circleCode)
            return circleData
        }

        return null
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

exports.getMobileOperatorData = async ({ operatorCode, circleCode, phoneNumber }) => {
    try {
        const response = await getRequest({
            url: `https://cyrusrecharge.in/API/CyrusPlanFatchAPI.aspx?APIID=${process.env.CYRUS_MEMBER_ID}&PASSWORD=${process.env.planGetCode}&Operator_Code=${operatorCode}&Circle_Code=${circleCode}&MobileNumber=${phoneNumber}`
        })
        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

// exports.onCyrusRecharge = async ({ number, operatorId, circle = 1, amount, type, razorpayOrderId, userId }) => {
//     try {
//         const operator = await rechargeOperator.findById(operatorId)
//         const usertx = generateRandom12DigitNumber()
//         const url = `https://cyrusrecharge.in/services_cyapi/recharge_cyapi.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&number=${number}&operator=${operator?.OperatorCode}&circle=${circle}&amount=${amount}&usertx=${usertx}&format=json&RechargeMode=1`
//         const response = await getRequest({ url })
//         const rechargeData = {
//             userId,
//             operatorId,
//             amount,
//             razorpayOrderId,
//             rechargeOrderId: '',
//             transactionId: usertx,
//             status: 'SUCCESS',
//             billType: type,
//             refund: 'NONE'
//         }
//         console.log(response, "Responseeeeeeeeeeeeeeeeeeee payment status chcek")
//         if (response?.Status === 'Success') {
//             rechargeData.rechargeOrderId = response.ApiTransID
//             const newRechargeData = new RechargeHistory(rechargeData)
//             await newRechargeData.save()
//             return { newRechargeData, operator }
//         } else if (response?.Status === 'Pending') {
//             rechargeData.rechargeOrderId = response.ApiTransID
//             rechargeData.status = 'PENDING'
//             const newRechargeData = new RechargeHistory(rechargeData)
//             await newRechargeData.save()
//             return { newRechargeData, operator }
//         } else {
//             await RazorpayServices.createRazorpayRefund({ amount: amount, paymentId: razorpayOrderId })
//             rechargeData.status = 'FAILURE'
//             rechargeData.refund = 'REQUESTED'
//             const newRechargeData = new RechargeHistory(rechargeData)
//             await newRechargeData.save()
//             return { newRechargeData, operator }
//         }

//     } catch (e) {
//         console.error(e)
//         throw (e)
//     }
// }


const checkRechargeStatus = async (transactionId) => {
    try {
        // Construct the URL to check the status
        const url = `https://cyrusrecharge.in/api/rechargestatus.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&transid=${transactionId}`;
        const response = await getRequest({ url });

        // Return the response from the status check API
        return response;
    } catch (error) {
        console.error("Error checking recharge status:", error);
        throw error;
    }
};

// This function handles the recharge process
exports.onCyrusRecharge = async ({ number, operatorId, circle = 1, amount, type, razorpayOrderId, userId }) => {
    try {
        // Fetch operator details from the database
        const operator = await rechargeOperator.findById(operatorId);

        // Generate a unique transaction ID for the user
        const usertx = generateRandom12DigitNumber();

        // Construct the recharge request URL
        const url = `https://cyrusrecharge.in/services_cyapi/recharge_cyapi.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&number=${number}&operator=${operator?.OperatorCode}&circle=${circle}&amount=${amount}&usertx=${usertx}&format=json&RechargeMode=1`;

        // Send request to initiate the recharge
        const response = await getRequest({ url });

        // Set up the recharge data structure
        const rechargeData = {
            userId,
            operatorId,
            amount,
            razorpayOrderId,
            rechargeOrderId: '',
            transactionId: usertx,
            status: 'SUCCESS',
            billType: type,
            refund: 'NONE'
        };

        console.log(response, "Response from Cyrus API");

        // Handle the response status
        if (response?.Status === 'Success') {
            // Success - save the data with Success status
            rechargeData.rechargeOrderId = response.ApiTransID;
            const newRechargeData = new RechargeHistory(rechargeData);
            await newRechargeData.save();
            return { newRechargeData, operator };

        } else if (response?.Status === 'Pending') {
            // Pending - Save as Pending and check the status periodically
            rechargeData.status = 'PENDING';
            const newRechargeData = new RechargeHistory(rechargeData);
            await newRechargeData.save();

            // Periodically check the status (e.g., every 30 seconds)
            const intervalId = setInterval(async () => {
                try {
                    const statusResponse = await checkRechargeStatus(usertx);
                    if (statusResponse?.Status === 'Success') {
                        // Update status to Success
                        rechargeData.rechargeOrderId = statusResponse.ApiTransID;
                        rechargeData.status = 'SUCCESS';
                        await newRechargeData.save();
                        clearInterval(intervalId); // Stop further status checks
                    } else if (statusResponse?.Status === 'Failure') {
                        // Update status to Failure and request a refund
                        await RazorpayServices.createRazorpayRefund({ amount, paymentId: razorpayOrderId });
                        rechargeData.status = 'FAILURE';
                        rechargeData.refund = 'REQUESTED';
                        await newRechargeData.save();
                        clearInterval(intervalId); // Stop further status checks
                    }
                    // Continue checking until we get a final status
                } catch (error) {
                    console.error("Error checking recharge status:", error);
                    clearInterval(intervalId); // Stop the interval in case of an error
                }
            }, 30000); // Check status every 30 seconds (30000 ms)

            // Return the pending data while we wait for status update
            return { newRechargeData, operator };
        } else {
            // Failure - initiate refund immediately
            await RazorpayServices.createRazorpayRefund({ amount, paymentId: razorpayOrderId });
            rechargeData.status = 'FAILURE';
            rechargeData.refund = 'REQUESTED';
            const newRechargeData = new RechargeHistory(rechargeData);
            await newRechargeData.save();
            return { newRechargeData, operator };
        }

    } catch (e) {
        console.error("Error during recharge process:", e);
        throw e;
    }
};



exports.getCustomerRechargeHistory = async ({ userId }) => {
    try {
        const history = await RechargeHistory.find({ userId }).populate('operatorId').sort({ _id: -1 })
        return history
    } catch (e) {
        console.error(e)
        throw (e)
    }
}



exports.getGasOperator = async () => {
    try {
        const response = await getRequest({
            url: `http://Cyrusrecharge.in/api/GetOperator.aspx?memberid=${process.env.CYRUS_MEMBER_ID}&pin=${process.env.CYRUS_PIN}&Method=getoperator`
        })
        return response
    } catch (e) {
        console.error(e)
        throw (e)
    }
}