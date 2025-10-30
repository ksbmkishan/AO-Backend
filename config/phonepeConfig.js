const { default: axios } = require("axios");
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
// Testing
// const merchantId = 'PGTESTPAYUAT86';
// const key = '96434309-7796-489d-8924-ab56988a6076';

const merchantId = 'ASTROONEPGONLINE';
const key = 'ffe16e1d-039e-467a-a6dc-5fa13876c41e';

const keyIndex = 1;
//Test
// const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// live
const url = 'https://api.phonepe.com/apis/hermes';

const phonePeConfig = {
    merchantId: merchantId,
    secretKey: keyIndex,
    baseUrl: url, // or the appropriate environment URL
};

// const generateSignature = (payload) => {
//     const hash = crypto.createHmac('SHA256', phonePeConfig.secretKey);
//     hash.update(JSON.stringify(payload));
//     return hash.digest('hex');
//   };

const generatedTranscId = () => 'TXN_' + Date.now(); 


module.exports = {
    createPaymentRequest: async (amount, orderId, callbackUrl,redirectUrl) => {
        console.log('amount', amount, orderId, callbackUrl);
        
        // Ensure amount is in paise (1 INR = 100 paise)
        const amountInPaise = amount * 100;

        const payload = {
            merchantId: phonePeConfig.merchantId,
            merchantTransactionId: orderId,
            merchantUserId: 1234,
            amount: amountInPaise,
            callbackUrl: callbackUrl,
            redirectUrl: redirectUrl,
            mobileNumber: "9654597868",
            deviceContext: {
                deviceOS: "ANDROID"
            },
            paymentInstrument: {
                type: "PAY_PAGE",
                // targetApp: "com.phonepe.app"
            }
        };
        
        // const signature = generateSignature(payload);
        const data = JSON.stringify(payload);
        const payloadMain = Buffer.from(data).toString('base64');

        // Generate the SHA256 signature
        const stringToSign = payloadMain + '/pg/v1/pay' + key;
        const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');;
        const checksum = sha256 + '###' + keyIndex;

        console.log('checkSum ::: ', checksum);
        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        try {
            const response = await axios({
                method:'post',
                url: prod_URL,
                data: {
                    request: payloadMain
                },
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating payment request:', error);
            throw error;
        }
    }
}