const { sendNotification } = require("../notificationService");
const Customers = require("../models/customerModel/Customers");

const sendAartiNotification = async (notif) => {
  try {
    console.log("📢 Sending Aarti notification:", notif);

    // Payload for notification
    const message = {
      notification: {
        title: "Aarti Reminder",
        body: notif.title,
      },
      data: {
        audio: notif.audio || "",
        video: notif.video || "",
      },
    };

    const data = {
      type: "puja",
      title: "Aarti Reminder",
      body: notif.title,
      audio: notif.audio || "",
       video: notif.video || "",
    };

    // Fetch all customers with a valid FCM token
    const customers = await Customers.find({ fcmToken: { $ne: "" }, isJoin: true });

    if (!customers.length) {
      console.log("⚠️ No customers with FCM tokens found.");
      return;
    }

    // Loop through each customer and send
    for (const customer of customers) {
      if (customer.fcmToken) {
        try {
          const response = await sendNotification(customer.fcmToken, message, data);
          console.log(`✅ Notification sent to ${customer.name || customer._id}:`, response);
        } catch (err) {
          console.error(`❌ Failed to send notification to ${customer._id}:`, err.message);
        }
      }
    }

    // const response = await sendNotification(fcmToken, message, data);
    console.log(`✅ Notification sent to :`, response);
  } catch (err) {
    console.error("❌ Error sending Aarti notifications:", err);
  }
};

const sendAartiNotificationEvery5Minutes = async (notif) => {
  try {
    console.log("📢 Sending Aarti notification:", notif);

    // Payload for notification
    const message = {
      notification: {
        title: "Reminder",
        body: notif.body,
      },
      
    };

    const data = {
      type: "every5minutes",
      title: "Reminder",
      body: notif.body,
    };

    // Fetch all customers with a valid FCM token
    const customers = await Customers.find({ fcmToken: { $ne: "" }, isJoin: false });

    if (!customers.length) {
      console.log("⚠️ No customers with FCM tokens found.");
      return;
    }

    // Loop through each customer and send
    for (const customer of customers) {
      if (customer.fcmToken) {
        try {
          const response = await sendNotification(customer.fcmToken, message, data);
          console.log(`✅ Notification sent to ${customer.name || customer._id}:`, response);
        } catch (err) {
          console.error(`❌ Failed to send notification to ${customer._id}:`, err.message);
        }
      }
    }

    // const response = await sendNotification(fcmToken, message, data);
    console.log(`✅ Notification sent to :`, response);
  } catch (err) {
    console.error("❌ Error sending Aarti notifications:", err);
  }
};

module.exports = { sendAartiNotification , sendAartiNotificationEvery5Minutes };
