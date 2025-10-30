const Razorpay = require('razorpay');

exports.createRazorpayOrder = async ({ amount }) => {
    try {
        var instance = new Razorpay({
            key_id: 'rzp_live_fycM10IO0gAtF9',
            key_secret: 'MjuXvZiu60d6BXwqgr2SDXNW',
        });

        const response = await instance.orders.create({
            "amount": amount * 100,
            "currency": "INR",
        })

        if (response?.status == 'created') {
            return response
        }

        return null


    } catch (e) {
        console.log(e)
        return res.status(500).send({ status: false, data: 'Server Error' })
    }
}


function generateReceipt() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // 6-digit random number
    return `RFD-${dateStr}-${randomPart}`; // e.g., RFD-20250805-483920
}

exports.createRazorpayRefund = async ({ amount, paymentId }) => {
    try {
        var instance = new Razorpay({
             key_id: 'rzp_live_fycM10IO0gAtF9',
            key_secret: 'MjuXvZiu60d6BXwqgr2SDXNW',
        });

        console.log('Payment ID:', paymentId);
        console.log('Amount:', amount);

         const receiptNumber = generateReceipt();
        console.log('Generated Receipt:', receiptNumber);



        const response = await instance.payments.refund(paymentId, {
            amount: amount*100,
            speed: 'normal',
            notes: {
                "notes_key_1": "Beam me up Scotty.",
                "notes_key_2": "Engage"
            },
            receipt: receiptNumber
        })

        if (response?.status == 'processed') {
            return response
        }



    } catch (e) {
        console.log(e)
        return null
    }
}



