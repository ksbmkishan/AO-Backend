const cron = require("node-cron");
const Notification = require("../models/adminModel/Aarti");
const { sendAartiNotificationEvery5Minutes } = require("../services/notificationService");

let jobs = new Map(); // store active cron jobs by Aarti ID

// Function to (re)load all schedules
const scheduleAartiNotifications = async () => {
  try {
    cron.schedule("0 */4 * * *", async () => {
      try {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");

        // Format time like "HH:MM"
        const currentTime = `${hour}:${minute}`;

        console.log('Current Time 5 Minutes :: ', currentTime)

        // Trigger notifications for every 5 minutes
        sendAartiNotificationEvery5Minutes({ title: "Reminder", body:"Arti yaad dilana — Live arti me join karein abhi!" });
      } catch (err) {
        console.error("❌ Error running Aarti cron:", err);
      }
    });

    console.log("✅ Aarti cron started (checks every minute)");

  } catch (err) {
    console.error("❌ Error scheduling Aarti notifications:", err);
  }
};

module.exports = { aartiEveryNotfification: scheduleAartiNotifications };
