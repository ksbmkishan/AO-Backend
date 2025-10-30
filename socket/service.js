const { database } = require("../config/firebase");
const AdminEarning = require("../models/adminModel/AdminEarning");
const Astrologer = require("../models/adminModel/Astrologer");
const ChatHistory = require("../models/adminModel/ChatHistory");
const AstrologerWallet = require("../models/astrologerModel/AstrologerWallet");
const Customers = require("../models/customerModel/Customers");
const RechargeWallet = require("../models/customerModel/RechargeWallet");
const notificationService = require("../notificationService");

const chatRooms = {};
const userSockets = {};

function initializeSocketIO(io) {
  io.on("connection", (socket) => {
    console.log("socket established..");

    socket.on("customer_login", (data) => {
      socket.broadcast.emit("new_customer_login", data);
    });

    socket.on("astrologer_login", (data) => {
      socket.broadcast.emit("new_astrologer_login", data);
    });

    socket.on("createChatRoom", (roomData) => {
      createChatRoom(roomData);
    });

    socket.on("joinChatRoom", (roomID) => {
      joinChatRoom(socket, roomID);
    });

    io.of("/").adapter.on("create-room", (room) => {
      // console.log(`room ${room} was created`);
      // const rooms = io.of("/").adapter.rooms;
      // console.log(rooms)
    });

    // When app connects, register the customer
    socket.on("registerCustomer", (customerId) => {
      userSockets[customerId] = socket.id;
      console.log("Customer registered:", customerId, socket.id);
    });
    

    socket.on("declinedChat", (data) => {
      onDeclinedChat(data, io);
    });

    socket.on("onAstroAccept", (roomID) => {

      onAstroAcceptChat(roomID, io);
      console.log("room_id", roomID);
    });

    socket.on("startChatTimer", (roomID) => {
      startChatTimer(roomID, io);
    });

    socket.on("updateChatDuration", (data) => {
      updateChatDuration(data);
    });

    socket.on("endChat", (data) => {
      console.log('data :::: ',data);
      stopTimer(io, data.roomID);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("disconnecting", () => {
      handleDisconnecting(socket, io);
    });

    socket.on("reconnect", () => {
      console.log(socket.id)
      // handleReconnect(socket);
    });

  });
}


function handleDisconnecting(socket, io) {
  const rooms = Array.from(socket.rooms);
  rooms.forEach((roomID) => {
    if (chatRooms[roomID]) {
      const room = chatRooms[roomID];
      room.disconnectTimeouts[socket.id] = setTimeout(() => {
        if (room.users.includes(socket.id)) {
          // End chat if user doesn't reconnect within 30 seconds
          stopTimer(io, roomID)
          // endChat(io, roomID);
        }
      }, 1000); // 30 seconds timeout
    }
  });
}

function handleReconnect(socket) {
  const rooms = Array.from(socket.rooms);
  rooms.forEach((roomID) => {
    if (chatRooms[roomID]) {
      const room = chatRooms[roomID];
      if (room.disconnectTimeouts[socket.id]) {
        clearTimeout(room.disconnectTimeouts[socket.id]);
        stopTimer(io, roomID)
        // delete room.disconnectTimeouts[socket.id];
        // console.log(`User ${socket.id} reconnected to room ${roomID}`);
      }
    }
  });
}

function createChatRoom(roomData) {
  chatRooms[roomData?.roomID] = {
    users: [],
    timerDuration: roomData?.duration,
    timerInterval: null,
    startTimerCommandReceived: true,
    chatPrice: roomData?.chatPrice,
    astroID: roomData?.astroID,
    customerID: roomData?.customerID,
    totalTime: 0,
    balanceDeucted: [],
    firstDeduction: true,
    newUser: roomData?.newUser,
    startTime: new Date().getTime().toString(),
    disconnectTimeouts: {},
  };
}

function joinChatRoom(socket, roomID) {
  socket.join(roomID);
  const room = chatRooms[roomID];
  room.users.push(socket.id);
}

async function onDeclinedChat(data, io) {
  try {
    const { roomID, actionBy } = data
    const room = chatRooms[roomID];
    const chatData = await ChatHistory.findById(roomID)
    const astrologer = await Astrologer.findById(room?.astroID)
    astrologer.call_status = 'online'
    astrologer.chat_status = 'online'
     astrologer.video_call_status = 'online'
    chatData.status = 'Not Connected'
    await astrologer.save()
    await chatData.save()
    io.to(roomID).emit("onChatReject");
    delete chatRooms[roomID];

  } catch (e) {
    console.log(e)
  }
}

// async function onAstroAcceptChat(roomID, io) {
//   try {
//     const room = chatRooms[roomID];
//     const customer = await Customers.findById(room?.customerID)
//     const astrologer = await Astrologer.findById(room?.astroID)
//     const deviceToken = customer?.fcmToken;
//     // const deviceWebToken = customer?.webFcmToken;

//     console.log({"chat_id":roomID, "deviceWeb":deviceWebToken})
//     const title = `Chat request from ${astrologer?.astrologerName || "a astrologer"
//       }`;

//     const notification = {
//       title,
//       body: "Astrologer is Requesting for chat",
//     };
//     const data = {
//       user_id: room?.customerID,
//       type: "chat_request",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     };

//     await notificationService.sendNotification(
//       deviceToken,
//       deviceWebToken,
//       notification,
//       data
//     );

//   } catch (e) {
//     console.log(e)
//   }
// }

// async function onAstroAcceptChat(roomID, io) {
//   try {
//     const room = chatRooms[roomID];
//     console.log("room",room)
//     const customer = await Customers.findById(room?.customerID);
//     const astrologer = await Astrologer.findById(room?.astroID);
//     const deviceToken = customer?.fcmToken;
//     const webFcmToken = customer?.webFcmToken;

//     console.log({ "chat_id": roomID, "webFcmToken": webFcmToken });
//     console.log(customer);

//     const title = `Chat request from ${astrologer?.astrologerName || "an astrologer"}`;
//     const notification = {
//       title,
//       body: "Astrologer is Requesting for chat",
//     };
//     const data = {
//       user_id: room?.customerID,
//       type: "chat_request",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     };

//     // Send notification to mobile device
//     if (deviceToken) {
//       await notificationService.sendNotification(
//         deviceToken,
//         // null,
//         webFcmToken,
//         notification,
//         data
//       );
//     }

//     // Send notification to web device
//     if (webFcmToken) {
//       await notificationService.sendNotification(
//         // null,
//         deviceToken,
//         webFcmToken,
//         notification,
//         data
//       );
//     }

//   } catch (e) {
//     console.log(e);
//   }
// }

// async function onAstroAcceptChat(roomID, io) {
//   try {
//     const room = chatRooms[roomID];
//     const customer = await Customers.findById(room?.customerID);
//     const astrologer = await Astrologer.findById(room?.astroID);
//     const deviceToken = customer?.fcmToken;
//     const webFcmToken = customer?.webFcmToken;

//     console.log("room",room)
//     console.log("cus",customer)
//     console.log({ "room_id": roomID, "deviceWeb": webFcmToken });

//     const title = `Chat request from ${astrologer?.astrologerName || "an astrologer"}`;
//     const notification = {
//       title,
//       body: "Astrologer is requesting for chat",
//     };
//     const data = {
//       user_id: room?.customerID,
//       type: "chat_request",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     };

//     // Ensure the notification object is properly formatted
//     const formattedNotification = (notification);
//     const formattedData = (data);

//     // Send notification to mobile device
//     if (deviceToken) {
//       await notificationService.sendNotification(
//         deviceToken,
//         // null,
//         formattedNotification,
//         formattedData
//       );
//     }

//     // Send notification to web device
//     if (webFcmToken) {
//       await notificationService.sendNotification(
//         // null,
//         webFcmToken,
//         formattedNotification,
//         formattedData
//       );
//     }

//     // Send notification to customer when astrologer accepts the chat
//     const acceptTitle = `Chat accepted by ${astrologer?.astrologerName || "an astrologer"}`;
//     const acceptNotification = {
//       title: acceptTitle,
//       body: "Astrologer has accepted your chat request",
//     };
//     const acceptData = {
//       user_id: room?.customerID,
//       type: "chat_accepted",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     };

//     const formattedAcceptNotification = JSON.stringify(acceptNotification);
//     const formattedAcceptData = JSON.stringify(acceptData);

//     if (deviceToken) {
//       await notificationService.sendNotification(
//         deviceToken,
//         // null,
//         formattedAcceptNotification,
//         formattedAcceptData
//       );
//     }

//     if (webFcmToken) {
//       await notificationService.sendNotification(
//         // null,
//         webFcmToken,
//         formattedAcceptNotification,
//         formattedAcceptData
//       );
//     }

//   } catch (e) {
//     console.log(e);
//   }
// }


// async function onAstroAcceptChat(roomID, io) {
//   try {
//     const room = chatRooms[roomID];
//     const customer = await Customers.findById(room?.customerID);
//     const astrologer = await Astrologer.findById(room?.astroID);
//     const deviceToken = customer?.fcmToken;
//     const webFcmToken = customer?.webFcmToken;

//     console.log("room", room);
//     console.log("cus", customer);
//     console.log({ "room_id": roomID, "deviceWeb": webFcmToken });

//     const title = `Chat request from ${astrologer?.astrologerName || "an astrologer"}`;
//     const notification = {
//       title,
//       body: "Astrologer accepted your chat",
//     };
//     const data = {
//       user_id: room?.customerID,
//       type: "chat_request",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     };

//     // Send notification to mobile device
//     if (deviceToken) {
//       await notificationService.sendNotification(
//         deviceToken,
//         notification,
//         data
//       );
//     }

//     // Send notification to web device
//     if (webFcmToken) {
//       await notificationService.sendNotification(
//         webFcmToken,
//         notification,
//         data
//       );
//     }

//     // Send notification to customer when astrologer accepts the chat
//     const acceptTitle = `Chat accepted by ${astrologer?.astrologerName || "an astrologer"}`;
//     const acceptNotification = {
//       title: acceptTitle,
//       body: "Astrologer has accepted your chat request",
//     };
//     const acceptData = [{
//       user_id: room?.customerID,
//       type: "chat_accepted",
//       priority: "High",
//       astroID: room?.astroID,
//       chatId: roomID,
//       chatPrice: room?.chatPrice,
//       astrologerName: astrologer?.astrologerName,
//       profileImage: astrologer?.profileImage
//     }];

//     if (deviceToken) {
//       await notificationService.sendNotification(
//         deviceToken,
//         acceptNotification,
//         acceptData
//       );
//     }

//     if (webFcmToken) {
//       await notificationService.sendNotification(
//         webFcmToken,
//         acceptNotification,
//         acceptData
//       );
//     }

//   } catch (e) {
//     console.log(e);
//   }
// }


async function onAstroAcceptChat(roomID, io) {
  try {
    const room = chatRooms[roomID];
    if (!room) throw new Error(`Room not found for ID: ${roomID}`);

    const customer = await Customers.findById(room.customerID);
    if (!customer) throw new Error(`Customer not found for ID: ${room.customerID}`);

    const astrologer = await Astrologer.findById(room.astroID);
    if (!astrologer) throw new Error(`Astrologer not found for ID: ${room.astroID}`);

    const deviceToken = customer.fcmToken;
    const webFcmToken = customer.webFcmToken;

    const title = `Chat request from ${astrologer.astrologerName || "an astrologer"}`;
    const notification = {
      title,
      body: "Astrologer accepted your chat",
    };
    const data = {
      title,
      body: "Astrologer accepted your chat",
      user_id: room.customerID,
      type: "chat_request",
      sent_to: "customer",
      priority: "High",
      astroID: room.astroID,
      chatId: roomID,
      chatPrice: room.chatPrice.toString(),
      astrologerName: astrologer.astrologerName,
      profileImage: astrologer.profileImage
    };

    const acceptTitle = `Chat accepted by ${astrologer.astrologerName || "an astrologer"}`;
    const acceptNotification = {
      title: acceptTitle,
      body: "Astrologer has accepted your chat request",
    };
    const acceptData = {
      title: acceptTitle,
      body: "Astrologer has accepted your chat request",
      user_id: room.customerID,
      type: "chat_accepted",
      priority: "High",
      astroID: room.astroID,
      chatId: roomID,
      chatPrice: room.chatPrice.toString(),
      astrologerName: astrologer.astrologerName,
      profileImage: astrologer.profileImage,
      send_to: 'customer'
    };

    const notifications = [
      // { token: deviceToken, notification, data },
      // { token: webFcmToken, notification, data },
      { token: deviceToken, notification: acceptNotification, data: acceptData },
      { token: webFcmToken, notification: acceptNotification, data: acceptData },
    ];

    await Promise.all(notifications.map(({ token, notification, data }) =>
      token && notificationService.sendNotification(token, notification, data)
    ));

  } catch (e) {
    console.error(e);
  }
}

async function startChatTimer(roomID, io) {
  const room = chatRooms[roomID];
  console.log("timer_run_room", room)

  if (room) {
    room.startTimerCommandReceived = true;
    room.startTime = new Date().getTime().toString();
    // Emit an event to start the timer for the specific room
    startTimer(roomID, io);
    // io.to(data.roomID).emit("startTimer");
  }
}

async function startTimer(roomId, io) {

  console.log("enter startTimer")

  const room = chatRooms[roomId];

  console.log("enter_room_tartTimer", room)

  if (
    room &&
    room.users.length === 2 &&
    room.startTimerCommandReceived &&
    !room.timerInterval

  ) {
    const existingChatHistory = await ChatHistory.findById(roomId);
    existingChatHistory.status = "Ongoing";
    existingChatHistory.startTime = new Date();
    await existingChatHistory.save();
    room.timerInterval = setInterval(async () => {
      room.timerDuration--;
      room.totalTime++;
      io.to(roomId).emit("updateChatTimer", room.timerDuration);

      if (room.firstDeduction) {
        if (room.newUser) {
          if (room.totalTime > 300) {
            deductChatAmount(roomId);
            room.balanceDeucted.push(room.chatPrice);
            room.firstDeduction = false;
          }
        } else {
          deductChatAmount(roomId);
          room.balanceDeucted.push(room.chatPrice);
          room.firstDeduction = false;
        }
      }

      if (
        room.timerDuration % 60 == 0 &&
        !room.firstDeduction &&
        room.timerDuration != 0 &&
        !room.newUser
      ) {
        room.balanceDeucted.push(room.chatPrice);
        deductChatAmount(roomId);

        console.log("deductChatAmount", deductChatAmount)


      } else {
        if (
          room.timerDuration % 60 == 0 &&
          !room.firstDeduction &&
          room.timerDuration != 0 &&
          room.totalTime >= 300
        ) {
          room.balanceDeucted.push(room.chatPrice);
          deductChatAmount(roomId);
        }
      }

      if (room.timerDuration == 180) {
        io.to(roomId).emit("walletAlert", true);
        sendWalletAlertNotification(room.astroID, room.customerID);
      }

      if (room.timerDuration <= 0) {
        clearInterval(room.timerInterval);
        // io.to(roomId).emit("chatEnded", true);
        updateChatHistoryAndBalances(io, roomId);
      }
    }, 1000);
  }
}

function updateChatDuration(data) {
  const room = chatRooms[data.roomID];
  if (room) {
    room.timerDuration = room.timerDuration + data.duration;
  }
}

function stopTimer(io, roomId) {
  const room = chatRooms[roomId];
  if (room) {
    if (room.timerInterval) {
      clearInterval(room.timerInterval);
      updateChatHistoryAndBalances(io, roomId);
    }
    else {
      delete chatRooms[roomId];
      io.to(roomId).emit("timerStopped", { roomId: roomId });

    }
  }
}

async function deductChatAmount(roomId) {
  try {
    const room = chatRooms[roomId];

    const { customerID, chatPrice } = room;
    const customer = await Customers.findById(customerID);
    // const astrologer = await Astrologer.findById(astrologerId);

    if (!customer) {
      console.log("customer not found");
    }

    customer.wallet_balance -= parseFloat(chatPrice);

    await customer.save();
    // await astrologer.save();

    console.log("success :::::::::::");
  } catch (error) {
    console.error(error);
  }
}

async function updateChatHistoryAndBalances(io, chatID) {
  try {
    const room = chatRooms[chatID];
    const { astroID, customerID, startTime, totalTime } = room;
    const existingChatHistory = await ChatHistory.findById(chatID);
    const customer = await Customers.findById(customerID);
    const astrologer = await Astrologer.findById(astroID);

    if (!existingChatHistory) {
      console.log("something went wrong.");
      return;
    }
    const totalPrice = room.balanceDeucted.reduce(
      (acc, currentAmount) => acc + currentAmount,
      0
    );


    // console.log(totalPrice, "Total Priceeeeeeeeee")
    // - existingChatHistory?.commissionPrice
    const chatAstroPrice = existingChatHistory?.chatPrice;
    const chatAdminPrice = existingChatHistory?.commissionPrice;
    const actualDuration = totalPrice / existingChatHistory?.chatPrice;
    const astrologerPrice = actualDuration * chatAstroPrice;
    const commissionPrice = actualDuration * chatAdminPrice;
    
    const totalMinutes = room.totalTime / 60;

    const totalCharge = actualDuration * chatAstroPrice;
    const astroPrice = actualDuration * astrologer.chat_price;
    const adminCommission = actualDuration * chatAdminPrice;
    // console.log(actualDuration, "actualDuration")
    // console.log(astrologerPrice, "astrologerPrice")
    // console.log(commissionPrice, "commissionPrice")

    const adminEarnings = new AdminEarning({
      type: "chat",
      astrologerId: astroID,
      customerId: customerID,
      transactionId: chatID,
      totalPrice: totalCharge,
      adminPrice: adminCommission,
      partnerPrice: astroPrice,
      historyId: chatID,
      duration: totalTime,
      chargePerMinutePrice: chatAstroPrice,
      startTime: startTime,
      endTime: new Date().getTime().toString(),     
    });

    console.log(adminEarnings, "Admin EARNINGSSSSSSSS")


    // console.log(adminEarnings, "adminEarningssssssss")

    const totalWalletRecharge = (await RechargeWallet.find()).length;
    const totalAstrologerWallet = (await AstrologerWallet.find()).length;

    const customerInvoiceId = `#ASTROONE${totalWalletRecharge}`;
    const astrologerInvoiceId = `#ASTROONE${totalAstrologerWallet}`;

    let rechargeAmount = parseFloat(totalPrice);
    const customerWalletHistory = {
      customer: customerID,
      referenceId: chatID,
      referenceModel: 'ChatHistory',
      invoiceId: customerInvoiceId,
      gst: 18,
      recieptNumber: totalWalletRecharge + 1,
      discount: "",
      offer: "",
      totalAmount: "",
      amount: rechargeAmount,
      paymentMethod: "Online",
      transactionType: 'DEBIT',
      type: 'CHAT'
    };

    const astrolgoerWalletHistory = {
      astrologerId: astroID,
      referenceId: chatID,
      referenceModel: 'ChatHistory',
      invoiceId: astrologerInvoiceId,
      gst: 0,
      recieptNumber: totalAstrologerWallet + 1,
      totalAmount: 0,
      amount: astroPrice,
      paymentMethod: "Online",
      transactionType: 'CREDIT',
      type: 'CHAT'
    };

    const newCustomerWallet = new RechargeWallet(customerWalletHistory)
    const newAstrologerWallet = new AstrologerWallet(astrolgoerWalletHistory)

    const date1 = new Date(astrologer?.today_earnings?.date);
    const date2 = new Date();

    const sameDay = date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate();

    if (sameDay) {
      astrologer.today_earnings = {
        date: new Date(),
        earnings: astrologer.today_earnings?.earnings + astroPrice
      }
    } else {
      astrologer.today_earnings = {
        date: new Date(),
        earnings: astroPrice
      }
    }

    existingChatHistory.endTime = new Date();
    existingChatHistory.durationInSeconds = totalTime;
    existingChatHistory.totalChatPrice = totalCharge;
    existingChatHistory.commissionPrice = adminCommission;
    // existingChatHistory.totalChatPrice = astroPrice;
    existingChatHistory.status = "Complete";
    astrologer.wallet_balance += astroPrice;
    astrologer.total_minutes += totalMinutes;
    astrologer.chat_status = 'online'
    astrologer.call_status = 'online'
    astrologer.video_call_status = 'online'
    customer.new_user = false;

    //console.log(existingChatHistory, "Check Existing chat Historyyyyyyyy")

    await existingChatHistory.save();
    await customer.save();
    await adminEarnings.save();
    await astrologer.save();
    await newCustomerWallet.save();
    await newAstrologerWallet.save();
    const dateNodeRef = database.ref(`/CurrentRequest/${astroID}`);
    const customerNode = database.ref(`/CustomerCurrentRequest/${customerID}`);

    const updatedData = {
      date: "",
      msg: "",
      name: "",
      pic: "",
      rid: "",
      sid: "",
      status: "end",
      wallet: "",
      timestamp: "",
      minutes: "",
    };

    customerNode.update(updatedData);
    dateNodeRef.update(updatedData);

    database.ref(`OnGoingChat/${astroID}`).remove();
    sendChatEndNotification(astroID, customerID);
    io.to(chatID).emit("timerStopped");

    delete chatRooms[chatID];

    console.log("success");
  } catch (error) {
    console.log(error);
  }
}

async function sendWalletAlertNotification(astroID, customerID) {
  try {
    const astrologer = await Astrologer.findById(astroID);
    const customer = await Customers.findById(customerID);

    const notification = {
      title: "Wallet Balance Alert",
      body: "Only 3 miuntes is left.",
    };
    const data = {
      title: "Wallet Balance Alert",
      body: "Only 3 miuntes is left.",
    };

    await notificationService.sendNotification(
      astrologer?.fcmToken,
      notification,
      data
    );
    await notificationService.sendNotification(
      customer?.fcmToken,
      notification,
      data
    );
  } catch (e) {
    console.log(e);
  }
}

async function sendChatEndNotification(astroID, customerID) {
  const astrologer = await Astrologer.findById(astroID);
  const customer = await Customers.findById(customerID);

  const notification = {
    title: "Chat Close",
    body: "Chat ended.",
  };
  const data = {
    title: "Chat Close",
    body: "Chat ended.",
  };

  await notificationService.sendNotification(
    astrologer?.fcmToken,
    notification,
    data
  );
  await notificationService.sendNotification(
    customer?.fcmToken,
    notification,
    data
  );
}

module.exports = {
  initializeSocketIO,
  userSockets
};
