const express = require("express");
const app = express();
const customerRoutes = require("./routes/customerRoutes");
const kundliRoutes = require("./routes/kundliRoutes")
const adminRoutes = require("./routes/adminRoutes"); 
const ecommerceRoutes = require("./routes/ecommerceRoute"); 
const astrologerRoutes = require("./routes/astrologerRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const rechargeRoutes = require('./routes/rechargeRoutes');
const motivationalNotification = require('./cron/sendMotivationalNotification')
const path = require('path');
// const paymentRoutes = require("./routes/paymentRoutes")
const db = require("./config/db");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { initializeSocketIO } = require("./socket/service");
const { urlencoded } = require("body-parser");
const { scheduleAartiNotifications } = require("./scheduler/aartiScheduler");
const { aartiEveryNotfification } = require("./scheduler/aartiEveryNotfification");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 5018;

// app.use(helmet());

// Set Referrer-Policy to strict-origin-when-cross-origin
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.static(__dirname + ""));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/gifs', express.static(__dirname + '/public/gifs'));


// // Define the API routes
app.use("/api/customers", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/astrologer", astrologerRoutes);
app.use('/api/kundli', kundliRoutes);
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/recharge', rechargeRoutes);
// app.use("/api/kundli", kundliRoutes)
// app.use('/notification', notificationRoutes);
app.set("io", io);
// app.use('/images', express.static('uploadImage'));



(async () => {
  try {
    await db(); // connect to MongoDB
    console.log("Database connected");
// Schedule all existing Aarti notifications after DB is ready
    scheduleAartiNotifications();
    aartiEveryNotfification();
    

     httpServer.listen(PORT, () => {
      console.log(`🚀 Server & Socket.IO running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
})();

initializeSocketIO(io);


module.exports = app;
