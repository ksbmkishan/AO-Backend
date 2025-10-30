const cron = require("node-cron");
const Notification = require("../models/adminModel/Aarti");
const { sendAartiNotification } = require("../services/notificationService");

let jobs = new Map(); // store active cron jobs by Aarti ID

// Function to (re)load all schedules
const scheduleAartiNotifications = async () => {
  try {
    cron.schedule("* * * * *", async () => {
      try {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");

        // Format time like "HH:MM"
        const currentTime = `${hour}:${minute}`;

        console.log('Current Time :: ', currentTime)

        // Get all aartis scheduled for this time
        const notifications = await Notification.find({ time: currentTime });

        notifications.forEach(notif => {
          console.log(`🔔 Triggering Aarti: ${notif.title} at ${notif.time}`);
          sendAartiNotification(notif);
        });
      } catch (err) {
        console.error("❌ Error running Aarti cron:", err);
      }
    });

    console.log("✅ Aarti cron started (checks every minute)");

  } catch (err) {
    console.error("❌ Error scheduling Aarti notifications:", err);
  }
};

module.exports = { scheduleAartiNotifications };
