const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = mongoose.Types;
const multer = require("multer");
const configureMulter = require("../configureMulter"); // Path to your multer configuration
const AstrologerInquiry = require("../models/astrologerModel/AstrologerInquiry");
const Skills = require("../models/adminModel/Skills");
const Expertise = require("../models/adminModel/Expertise");
const MainExpertise = require("../models/adminModel/MainExpertise");
const Astrologer = require("../models/adminModel/Astrologer");
const Review = require("../models/adminModel/Review");
const CustomerWallet = require("../models/customerModel/CustomerWallet");
const AstrologerWallet = require("../models/astrologerModel/AstrologerWallet");
const Banners = require("../models/adminModel/Banners");
const ChatHistory = require("../models/adminModel/ChatHistory");
const Customers = require("../models/customerModel/Customers");
const BankAccount = require("../models/astrologerModel/BankAccount");
const OngoingList = require("../models/astrologerModel/OngoingList");
const WaitingList = require("../models/astrologerModel/WaitingList");
// const Transcations = require('../models/astrologerModel/Transcations');
const notificationService = require("../notificationService");
// const WebSocket = require('ws');

const CallHistory = require("../models/adminModel/CallHistory");
const LinkedProfile = require("../models/customerModel/LinkedProfile");
const AstrologerRequests = require("../models/adminModel/AstrologerRequests");
const LiveCalls = require("../models/adminModel/LiveCalls");
const AstrologerFollower = require("../models/astrologerModel/AstrologerFollower");
const Announcement = require("../models/adminModel/Announcement");
const AstrologerWithdrawRequest = require("../models/astrologerModel/AstrologerWithdrawRequest");
const VideoCalls = require("../models/customerModel/VideoCall");
const AdminEarning = require("../models/adminModel/AdminEarning");
const moment = require('moment')
const AstrologerNotification = require('../models/adminModel/AstrologerNotification');


exports.getSplash = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Astrologer Id" });
    }

    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );
    const chatCount = await ChatHistory.countDocuments({ astrologerId });
    const callCount = await CallHistory.countDocuments({ astrologerId });
    const liveCalls = await LiveCalls.find().populate({
      path: 'roomId',
      match: { astrologerId }, // Filter by astrologerId within the LiveStreaming documents
    });

    const filteredLiveCalls = liveCalls.filter(liveCall => liveCall.roomId !== null).length;


    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Astrologer Id" });
    }

    const date1 = new Date(astrologer.today_earnings?.date);
    const date2 = new Date();

    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth(); // Months are zero-based
    const day1 = date1.getUTCDate();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDate();

    if (
      (year1 !== year2 || month1 !== month2 || day1 !== day2)) {
      astrologer.today_earnings = {
        date: new Date(),
        earnings: 0
      };
    }

    await astrologer.save()

    res.status(200).json({ success: true, astrologer, chatCount, callCount, liveCallCount: filteredLiveCalls });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.addAstrologerInquiry = async (req, res) => {
  try {
    const {
      astrologerName,
      email,
      phoneNumber,
      address,
      gender,
      experience,
      city,
      state,
      country,
      pincode,
      dateOfBirth
      // language,
      // skill,
      // expertise,
      // mainExpertise,
    } = req.body;

    const astrologer = await Astrologer.findOne({
      $or: [
        { phoneNumber },
        { email }
      ]
    });
    if (astrologer) {
      return res.status(200).json({
        success: false,
        message: "This Number or email is already taken",
      });
    }

    const newInquiry = new Astrologer({
      astrologerName,
      email,
      phoneNumber,
      address,
      gender,
      experience,
      city,
      state,
      country,
      pincode,
      dateOfBirth,
      enquiry: true,
      inquiry_status: true
      // language,
      // skill,
      // expertise,
      // mainExpertise,
    });

    await newInquiry.save();

    res.status(201).json({
      success: true,
      message: "Astrologer inquiry added successfully",
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error("Error adding Astrologer inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Astrologer inquiry",
      error: error.message,
    });
  }
};

exports.getAllAstrologerInquiry = async function (req, res) {
  try {
    const astrologerInquiry = await Astrologer.find({ inquiry_status: true }).populate('skill subSkill expertise mainExpertise remedies');

    res.status(200).json({ success: true, astrologerInquiry });
  } catch (error) {
    console.error("Error fetching Astrologer Inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer Inquiry",
      error: error.message,
    });
  }
};

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.astrologerLogin = async function (req, res) {
  try {
    const { email, password, fcmToken } = req.body;

    const astrologer = await Astrologer.findOne({ email, password }).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res.status(200).json({
        success: true,
        status: 0,
        message: 'Wrong email or password',
        type: "wrong",
      });
    }

    if (!!astrologer) {
      if (astrologer?.isDeleted == 1) {
        return res.status(200).json({
          success: true,
          status: 0,
          message:
            "Your account has been deactivated, please contact admin support.",
          type: "Deactiveted!",
        });
      }
    }

    astrologer.fcmToken = fcmToken;
    const chatCount = await ChatHistory.countDocuments({ astrologerId: astrologer?._id });
    const callCount = await CallHistory.countDocuments({ astrologerId: astrologer?._id });
    const liveCalls = await LiveCalls.find().populate({
      path: 'roomId',
      match: { astrologerId: astrologer?._id }, // Filter by astrologerId within the LiveStreaming documents
    });

    const filteredLiveCalls = liveCalls.filter(liveCall => liveCall.roomId !== null).length;

    const date1 = new Date(astrologer.today_earnings?.date);
    const date2 = new Date();

    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth(); // Months are zero-based
    const day1 = date1.getUTCDate();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDate();

    if (
      (year1 !== year2 || month1 !== month2 || day1 !== day2)) {
      astrologer.today_earnings = {
        date: new Date(),
        earnings: 0
      };
    }

    await astrologer.save()

    await astrologer.save()

    return res.status(200).json({
      success: true,
      status: 1,
      astrologer,
      chatCount,
      callCount,
      liveCallCount: filteredLiveCalls,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

exports.astrologerWebLogin = async function (req, res) {
  try {
    const { email, password, webFcmToken } = req.body;

    const astrologer = await Astrologer.findOne({ email, password }).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res.status(200).json({
        success: false,
        status: 0,
        message: 'Wrong email or password',
        type: "wrong",
      });
    }

    if (!!astrologer) {
      if (astrologer?.isDeleted == 1) {
        return res.status(200).json({
          success: true,
          status: 0,
          message:
            "Your account has been deactivated, please contact admin support.",
          type: "Deactiveted!",
        });
      }
    }

    astrologer.webFcmToken = webFcmToken;
    const chatCount = await ChatHistory.countDocuments({ astrologerId: astrologer?._id });
    const callCount = await CallHistory.countDocuments({ astrologerId: astrologer?._id });
    const liveCalls = await LiveCalls.find().populate({
      path: 'roomId',
      match: { astrologerId: astrologer?._id }, // Filter by astrologerId within the LiveStreaming documents
    });

    const filteredLiveCalls = liveCalls.filter(liveCall => liveCall.roomId !== null).length;

    const date1 = new Date(astrologer.today_earnings?.date);
    const date2 = new Date();

    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth(); // Months are zero-based
    const day1 = date1.getUTCDate();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDate();

    if (
      (year1 !== year2 || month1 !== month2 || day1 !== day2)) {
      astrologer.today_earnings = {
        date: new Date(),
        earnings: 0
      };
    }

    await astrologer.save()

    await astrologer.save()

    return res.status(200).json({
      success: true,
      status: 1,
      astrologer,
      chatCount,
      callCount,
      liveCallCount: filteredLiveCalls,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

exports.verifyAstrologer = async function (req, res) {
  try {
    const { phoneNumber, fcmToken, otp, device_id } = req.body;

    // Find the astrologer by phone number
    // let astrologer = await Astrologer.findOne({ phoneNumber, otp });
    let astrologer = await Astrologer.findOne({ phoneNumber });

    if (astrologer) {
      const deviceToken = astrologer?.fcmToken;
      if (deviceToken) {
        const notification = {
          title: "Namo Astro",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await notificationService.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      astrologer.fcmToken = fcmToken;
      astrologer.device_id = device_id;

      astrologer.save();

      return res.status(200).json({
        success: true,
        message: "FCM token updated successfully.",
        astrologerId: astrologer._id,
      });
    }

    astrologer = new Astrologer({
      phoneNumber,
      fcmToken,
      device_id,
      otp: otp,
      status: 1,
      enquiry: true,
      profileImage: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/customerImage/user.png",
    });
    await astrologer.save();

    return res.status(200).json({
      success: true,
      message: "FCM token updated successfully.",
      astrologerId: astrologer._id,
    });
  } catch (error) {
    console.error("Error updating FCM token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update FCM token",
      error: error.message,
    });
  }
};

exports.astrologerGoogleLogin = async function (req, res) {
  try {
    const { email, fcmToken, device_id, astrologerName } = req.body;

    if (!email)
      return res.status(200).json({
        success: false,
        status: 0,
        message: "email address is required",
      });

    let astrologer = await Astrologer.findOne({ email }).populate(
      "skill expertise mainExpertise remedies"
    );

    if (astrologer) {
      if (astrologer?.isDeleted == 1) {
        return res.status(200).json({
          success: true,
          status: 0,
          message:
            "Your account has been deactivated, please contact admin support.",
          type: "Deactiveted!",
        });
      }

      const deviceToken = astrologer?.fcmToken;
      if (deviceToken) {
        const notification = {
          title: "Namo Astro",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await notificationService.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      astrologer.fcmToken = fcmToken;
      astrologer.device_id = device_id;
      astrologer.astrologerName = astrologerName;

      const date1 = new Date(astrologer.today_earnings?.date);
      const date2 = new Date();

      const year1 = date1.getUTCFullYear();
      const month1 = date1.getUTCMonth(); // Months are zero-based
      const day1 = date1.getUTCDate();

      const year2 = date2.getUTCFullYear();
      const month2 = date2.getUTCMonth();
      const day2 = date2.getUTCDate();

      if (
        (year1 !== year2 || month1 !== month2 || day1 !== day2)) {
        astrologer.today_earnings = {
          date: new Date(),
          earnings: 0
        };
      }

      await astrologer.save()

      await astrologer.save();

      return res.status(200).json({
        success: true,
        status: 1,
        fcmToken,
        astrologer,
        message: "You logged successfully",
      });
    }

    astrologer = new Astrologer({
      email,
      fcmToken,
      device_id,
      astrologerName,
      status: 1,
      enquiry: true,
      profileImage: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/customerImage/user.png",
    });

    await astrologer.save();

    res.status(200).json({
      success: true,
      status: 1,
      fcmToken,
      astrologer,
      message: "You logged successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

exports.getAstrologerDetail = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    res.status(200).json({
      success: true,
      message: "Astrologer details:",
      astrologer,
    });
  } catch (error) {
    console.error("Error fetching Astrologer details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer details",
      error: error.message,
    });
  }
};

exports.getAllAstrologer = async function (req, res) {
  try {
    // Fetch all skills from the database
    const astrologer = await Astrologer.find({ enquiry: false });

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.getCallAstrologer = async function (req, res) {
  try {
    const { page = 1, limit = 5, search = '', expertise = '' } = req.body
    const statusMapping = {
      'online': 0,
      'busy': 1,
      'offline': 2
    };

    const searchCriteria = search ? { astrologerName: { $regex: search, $options: 'i' } } : {};
    let expertiseId = '';

    const expertiseMapping = {
      'Lalkitab': '6728bc38453ba38a97c63c05',
      'Prashna': '67ea791d698edf475359779c',
      'Vastu': '67ea7910698edf4753597798'
    };

    // अगर expertise मैपिंग में है, तो expertiseId सेट करें
    if (expertiseMapping[expertise]) {
      expertiseId = expertiseMapping[expertise];
    }

    // MongoDB क्वेरी बनाएं
    let query = { enquiry: false, isDeleted: 0, isVerified: true, ...searchCriteria };

    // केवल तब `mainExpertise` जोड़ें जब `expertiseId` वैध हो
    if (expertiseId) {
      query.mainExpertise = expertiseId;
    }
    let allAstrologers = await Astrologer.find(query).populate().sort({ _id: -1 });

    allAstrologers.sort((a, b) => statusMapping[a.call_status] - statusMapping[b.call_status]);

    allAstrologers = await Promise.all(allAstrologers.map(async (item) => {
      const totalRating = await Review.countDocuments({ astrologer: item?._id, is_verified: true });
      return {
        ...item.toObject(),
        totalRating,
        rating: parseFloat(item?.rating).toFixed(1)
      };
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAstrologers = allAstrologers.slice(startIndex, endIndex);

    const totalAstrologers = allAstrologers.length;

    res.status(200).json({
      success: true, astrologer: paginatedAstrologers, pagination: {
        total: totalAstrologers,
        page: parseInt(page),
        pages: Math.ceil(totalAstrologers / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.getVideoCallAstrologer = async function (req, res) {
  try {
    const { page = 1, limit = 5, search = '' } = req.body
    const statusMapping = {
      'online': 0,
      'busy': 0,
      'offline': 2
    };

    const searchCriteria = search ? { astrologerName: { $regex: search, $options: 'i' } } : {};

    let allAstrologers = await Astrologer.find({ enquiry: false, isDeleted: 0, isVerified: true, ...searchCriteria }).populate().sort({ _id: -1 });

    allAstrologers.sort((a, b) => statusMapping[a.video_call_status] - statusMapping[b.video_call_status]);

    allAstrologers = await Promise.all(allAstrologers.map(async (item) => {
      const totalRating = await Review.countDocuments({ astrologer: item?._id, is_verified: true });
      return {
        ...item.toObject(),
        totalRating,
        rating: parseFloat(item?.rating).toFixed(1)
      };
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAstrologers = allAstrologers.slice(startIndex, endIndex);

    const totalAstrologers = allAstrologers.length;

    res.status(200).json({
      success: true, astrologer: paginatedAstrologers, pagination: {
        total: totalAstrologers,
        page: parseInt(page),
        pages: Math.ceil(totalAstrologers / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};


exports.getChatAstrologer = async function (req, res) {
  try {
    const { page = 1, limit = 5, search = '' } = req.body
    const statusMapping = {
      'online': 0,
      'busy': 1,
      'offline': 2
    };

    const searchCriteria = search ? { astrologerName: { $regex: search, $options: 'i' } } : {};

    let allAstrologers = await Astrologer.find({ enquiry: false, isDeleted: 0, isVerified: true, ...searchCriteria }).populate().sort({ _id: -1 });

    allAstrologers.sort((a, b) => statusMapping[a.chat_status] - statusMapping[b.chat_status]);

    allAstrologers = await Promise.all(allAstrologers.map(async (item) => {
      const totalRating = await Review.countDocuments({ astrologer: item?._id, is_verified: true });
      return {
        ...item.toObject(),
        totalRating,
        rating: parseFloat(item?.rating).toFixed(1)
      };
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAstrologers = allAstrologers.slice(startIndex, endIndex);

    const totalAstrologers = allAstrologers.length;


    res.status(200).json({
      success: true, astrologer: paginatedAstrologers, pagination: {
        total: totalAstrologers,
        page: parseInt(page),
        pages: Math.ceil(totalAstrologers / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.getActiveAstrologer = async function (req, res) {
  try {
    const {
      search,
      type,
      index
    } = req.body;

    let astrologer;
    let filterObject = { enquiry: false, isVerified: true, isDeleted: 0 };
    let query = {};

    if (!!search) {
      const regex = new RegExp(search, "i");
      query = {
        ...filterObject,
        astrologerName: { $regex: regex },
      };
    } else {
      query = filterObject;
    }

    const options = {
      page: index,
      limit: 10
    };

    astrologer = await Astrologer.paginate(query, options);

    if (type == 'chat') {
      astrologer.docs.sort((a, b) => {
        // Prioritize online astrologers first
        if (a.chat_status === 'Online' && (b.chat_status === 'Busy' || b.chat_status === 'Offline')) return -1;
        if (b.chat_status === 'Online' && (a.chat_status === 'Busy' || a.chat_status === 'Offline')) return 1;
        // If both have the same chat_status or both are not online, maintain their order
        return 0;
      });
    } else {
      astrologer.docs.sort((a, b) => {
        // Prioritize online astrologers first
        if (a.call_status === 'Online' && (b.call_status === 'Busy' || b.call_status === 'Offline')) return -1;
        if (b.call_status === 'Online' && (a.call_status === 'Busy' || a.call_status === 'Offline')) return 1;
        // If both have the same chat_status or both are not online, maintain their order
        return 0;
      });
    }



    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.getEnquiredAstrologer = async function (req, res) {
  try {
    const enquiredAstrologer = await Astrologer.find({ enquiry: true, isDeleted: 0 });
    res.status(200).json({ success: true, enquiredAstrologer });
  } catch (error) {
    console.error("Error fetching ongoing chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chats",
      error: error.message,
    });
  }
};

exports.getAverageRating = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Get astrologerId from query parameters

    const averageRating = await Review.aggregate([
      {
        $match: {
          astrologer: mongoose.Types.ObjectId.createFromHexString(astrologerId),
        }, // Match reviews for the provided astrologerId
      },
      {
        $group: {
          _id: "$astrologer", // Group by astrologerId
          averageRating: { $avg: "$ratings" }, // Calculate average rating
        },
      },
    ]);

    // Return the average rating as a JSON response
    if (averageRating.length > 0) {
      res
        .status(200)
        .json({ success: true, averageRating: averageRating[0].averageRating });
    } else {
      res.status(200).json({ success: true, averageRating: 0 });
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate average rating",
      error: error.message,
    });
  }
};

exports.countCustomersWithReviews = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Get astrologerId from the request

    const objectId = new mongoose.Types.ObjectId(astrologerId); // Create an ObjectId instance

    const reviewsCount = await Review.aggregate([
      {
        $match: {
          astrologer: objectId, // Match reviews for the provided astrologerId as an ObjectId instance
        },
      },
      {
        $group: {
          _id: "$astrologer", // Group by astrologerId
          reviewCount: { $sum: 1 }, // Count the occurrences of the provided astrologerId
        },
      },
    ]);

    // Return the count of occurrences of the provided astrologerId in the Review collection
    const count = reviewsCount.length > 0 ? reviewsCount[0].reviewCount : 0;
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error counting reviews for astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to count reviews for astrologer",
      error: error.message,
    });
  }
};

exports.getOnlineAstrologers = async function (req, res) {
  try {
    // Fetch astrologers based on their online status
    const onlineAstrologers = await Astrologer.find({ isOnline: true });
    // const offlineAstrologers = await Astrologer.find({ isOnline: false });

    res.status(200).json({
      success: true,
      onlineAstrologers,
      // offlineAstrologers
    });
  } catch (error) {
    console.error("Error fetching astrologers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers status.",
      error: error.message,
    });
  }
};


exports.setAstrologerOnline = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    astrologer.isOnline = !astrologer.isOnline;
    await astrologer.save();

    const statusText = astrologer.isOnline ? "online" : "offline";
    res.status(200).json({
      success: true,
      message: `Astrologer status updated. Now ${statusText}.`,
      data: astrologer,
    });
  } catch (error) {
    console.error("Error toggling astrologer status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle astrologer status.",
      error: error.message,
    });
  }
};


exports.getLiveAstrologers = async function (req, res) {
  try {
    // Fetch astrologers based on their online status
    const liveAstrologers = await Astrologer.find({ isLive: true });
    // const offlineAstrologers = await Astrologer.find({ isOnline: false });

    res.status(200).json({
      success: true,
      liveAstrologers,
      // offlineAstrologers
    });
  } catch (error) {
    console.error("Error fetching astrologers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers status.",
      error: error.message,
    });
  }
};

exports.updateAstrologerDetails = async function (req, res) {
  try {
    const astrologerId = req.body.astrologerId; // Assuming astrologerId is provided in the request body
    const existingAstrologer = await Astrologer.findById(astrologerId);

    if (!existingAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const {
      astrologerName,
      chat_price,
      call_price,
      preferredDays,
      startTime,
      endTime,
      experience,
      about,
      skill,
      expertise,
      workingOnOtherApps,
    } = req.body;

    existingAstrologer.astrologerName =
      astrologerName || existingAstrologer.astrologerName;
    existingAstrologer.chat_price = chat_price || existingAstrologer.chat_price;
    existingAstrologer.call_price = call_price || existingAstrologer.call_price;
    existingAstrologer.startTime = startTime || existingAstrologer.startTime;
    existingAstrologer.endTime = endTime || existingAstrologer.endTime;
    existingAstrologer.experience = experience || existingAstrologer.experience;
    existingAstrologer.about = about || existingAstrologer.about;
    existingAstrologer.workingOnOtherApps =
      workingOnOtherApps || existingAstrologer.workingOnOtherApps;

    if (preferredDays && Array.isArray(preferredDays)) {
      existingAstrologer.preferredDays = preferredDays;
    }

    if (skill && Array.isArray(skill)) {
      existingAstrologer.skill = skill;
    }

    if (expertise && Array.isArray(expertise)) {
      existingAstrologer.expertise = expertise;
    }

    await existingAstrologer.save();

    res.status(200).json({
      success: true,
      message: "Astrologer updated successfully.",
      data: existingAstrologer,
    });
  } catch (error) {
    console.error("Error updating Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Astrologer.",
      error: error.message,
    });
  }
};

// let updateIntervals = {}; 
// exports.updateNextOnline = async function (req, res) {
//   try {
//     const { astrologerId, date, time } = req.body;
//     // Find the astrologer by ID
//     let astrologer = await Astrologer.findById(astrologerId);

//     if (!astrologer) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Astrologer not found." });
//     }

//     astrologer.nextOnline = { date, time }
//     astrologer.chat_status = 'offline'
//     astrologer.call_status = 'offline'
//     astrologer.video_call_status = 'offline'


//     await astrologer.save()


//     // Clear any existing interval for this astrologer
//     if (updateIntervals[astrologerId]) {
//       clearInterval(updateIntervals[astrologerId]);
//     }

//     // Set up a periodic check
//     updateIntervals[astrologerId] = setInterval(async () => {
//       const now = moment(); // Get current date and time
//       const nextOnlineTime = moment(astrologer.nextOnline); // Get the astrologer's next online time

//       if (now.isSame(nextOnlineTime, 'minute')) { // Check if they match
//         // Update astrologer status
//         astrologer.chat_status = 'online';
//         astrologer.call_status = 'online';
//         astrologer.video_call_status = 'online';
//         astrologer.nextOnline = null; // Reset nextOnline

//         await astrologer.save();
//         console.log(`Astrologer ${astrologerId} is now online.`);

//         // Clear the interval after updating status
//         clearInterval(updateIntervals[astrologerId]);
//         delete updateIntervals[astrologerId];
//       }
//     }, 60000); // Check every minute (60000 ms)

    
//     return res
//       .status(200)
//       .json({ success: true, message: "Next online scheduled.", astrologer });
//   } catch (error) {
//     console.error("Error updating chat price:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update chat price.",
//       error: error.message,
//     });
//   }
// };


let updateIntervals = {}; // Store intervals for each astrologer to manage them

exports.updateNextOnline = async function (req, res) {
  try {
    const { astrologerId, date, time } = req.body;

    // Find the astrologer by ID
    let astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Store the date and time in the nextOnline object
    astrologer.nextOnline = {
      date: new Date(date).toISOString(), // Store date in ISO format
      time: new Date(time).toISOString(), // Store time in ISO format
    };

    astrologer.chat_status = 'offline';
    astrologer.call_status = 'offline';
    astrologer.video_call_status = 'offline';

    await astrologer.save();

    // Clear any existing interval for this astrologer
    if (updateIntervals[astrologerId]) {
      clearInterval(updateIntervals[astrologerId]);
    }

    // Set up a periodic check
    updateIntervals[astrologerId] = setInterval(async () => {
      const now = moment(); // Get current date and time
      const nextOnlineDateTime = moment(astrologer.nextOnline.date).set({
        hour: moment(astrologer.nextOnline.time).hour(),
        minute: moment(astrologer.nextOnline.time).minute(),
      }); // Combine date and time for comparison

      if (now.isSame(nextOnlineDateTime, 'minute')) { // Check if they match
        // Update astrologer status
        astrologer.chat_status = 'online';
        astrologer.call_status = 'online';
        astrologer.video_call_status = 'online';
        astrologer.nextOnline = null; // Reset nextOnline

        await astrologer.save();
        console.log(`Astrologer ${astrologerId} is now online.`);

        // Clear the interval after updating status
        clearInterval(updateIntervals[astrologerId]);
        delete updateIntervals[astrologerId];
      }
    }, 60000); // Check every minute (60000 ms)

    return res
      .status(200)
      .json({ success: true, message: "Next online scheduled.", astrologer });
  } catch (error) {
    console.error("Error updating next online:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update next online.",
      error: error.message,
    });
  }
};


exports.updateChatPrice = async function (req, res) {
  try {
    const { astrologerId, chatPrice } = req.body;

    // Find the astrologer by ID
    let astrologer = await Astrologer.findById(astrologerId);

    if (astrologer) {
      // Update the chat price field
      astrologer.chat_price = chatPrice;
      await astrologer.save();

      return res.status(200).json({
        success: true,
        message: "Chat price updated successfully.",
        astrologerId: astrologer._id,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Astrologer not found." });
    }
  } catch (error) {
    console.error("Error updating chat price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chat price.",
      error: error.message,
    });
  }
};

exports.updateCallPrice = async function (req, res) {
  try {
    const { astrologerId, callPrice } = req.body;

    // Find the astrologer by ID
    let astrologer = await Astrologer.findByIdAndUpdate(
      astrologerId,
      { call_price: callPrice },
      { new: true }
    );

    if (astrologer) {
      return res.status(200).json({
        success: true,
        message: "Call price updated successfully.",
        astrologerId: astrologer._id,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Astrologer not found." });
    }
  } catch (error) {
    console.error("Error updating call price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update call price.",
      error: error.message,
    });
  }
};

const uploadAstrologerImage = configureMulter("profileImage/", [
  { name: "profileImage", maxCount: 1 },
]);

exports.updateAstrologerProfileImage = function (req, res) {
  uploadAstrologerImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { astrologerId } = req.body;

      // Validate required fields
      if (!astrologerId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a astrologerId.",
        });
      }

      const existingAstrologer = await Astrologer.findById(astrologerId);

      if (!existingAstrologer) {
        return res
          .status(404)
          .json({ success: false, message: "Astrologer not found." });
      }

      // Update image path if a new image is uploaded
      if (req.files["profileImage"]) {
        const imagePath = req.files["profileImage"][0].path.replace(
          /^.*profileImage[\\/]/,
          "profileImage/"
        );
        existingAstrologer.profileImage = imagePath;
      }

      await existingAstrologer.save();

      res.status(200).json({
        success: true,
        message: "astrloger profile image updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }
  });
};

// Tranaction details

// exports.getAmountTransactionDetails = async function(req, res) {
//   try {
//     const { astrologerId } = req.body;

//     // Find transactions related to the provided astrologerId
//     const astrologerTransactions = await Transactions.find({ astrologerId }).populate('bank_account');;

//     if (!astrologerTransactions || astrologerTransactions.length === 0) {
//       return res.status(404).json({ success: false, message: 'No transactions found for this astrologer.' });
//     }

//     res.status(200).json({ success: true, message: 'Astrologer\'s transaction details:', data: { astrologerTransactions, Transactions } });
//   } catch (error) {
//     console.error('Error fetching transactions for Astrologer:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch transactions for Astrologer', error: error.message });
//   }
// };

// add bank account

exports.addBankAccount = async function (req, res) {
  try {
    const { astrologerId, accountNumber, accountHolderName, IFSCCode } =
      req.body;

    // Find the astrologer based on the provided ID
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Create a new bank account and associate it with the astrologer
    const newBankAccount = new BankAccount({
      astrologer: astrologerId,
      accountNumber,
      accountHolderName,
      IFSCCode,
    });

    await newBankAccount.save();

    // Ensure that astrologer.bankAccounts is initialized as an array
    astrologer.bankAccounts = astrologer.bankAccounts || [];

    // Add the new bank account to the astrologer's bankAccounts array
    astrologer.bankAccounts.push(newBankAccount._id);
    await astrologer.save();

    res
      .status(201)
      .json({ success: true, message: "Bank Account added successfully" });
  } catch (error) {
    console.error("Error adding Bank Account:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Bank Account",
      error: error.message,
    });
  }
};

// logout Astrologer
exports.logoutAstrologer = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    // Find the astrologer by ID
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found.",
      });
    }

    // Set isOnline status to false (logging out)
    astrologer.chat_status = 'offline';
    astrologer.call_status = 'offline';
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Astrologer logged out successfully.",
    });
  } catch (error) {
    console.error("Error logging out astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log out astrologer.",
      error: error.message,
    });
  }
};

// add ongoing chat

exports.addOngoingChat = async function (req, res) {
  try {
    const { astrologer, customer, timeInSeconds } = req.body;

    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + timeInSeconds * 1000);

    if (!futureTime || isNaN(futureTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid time provided.",
      });
    }

    const ongoingSession = new OngoingList({
      astrologer,
      customer,
      endTime: futureTime,
    });

    await ongoingSession.save();

    res.status(200).json({
      success: true,
      message: "Ongoing session created successfully.",
      ongoingSession,
    });
  } catch (error) {
    console.error("Error creating ongoing session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ongoing session",
      error: error.message,
    });
  }
};

// Get All Ongoing Chat Sessions
exports.getAllOngoingChats = async function (req, res) {
  try {
    const ongoingChats = await OngoingList.find();

    res.status(200).json({ success: true, ongoingChats });
  } catch (error) {
    console.error("Error fetching ongoing chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chats",
      error: error.message,
    });
  }
};

exports.getOngoingChatById = async function (req, res) {
  try {
    const { id } = req.body;

    const ongoingChat = await OngoingList.find({ astrologer: id });

    if (!ongoingChat) {
      return res.status(404).json({
        success: false,
        message: "Ongoing chat session not found.",
      });
    }

    res.status(200).json({ success: true, ongoingChat });
  } catch (error) {
    console.error("Error fetching ongoing chat by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chat",
      error: error.message,
    });
  }
};

// Delete Ongoing Chat Session by ID
exports.deleteOngoingChatById = async function (req, res) {
  try {
    const { chatId } = req.params;

    const deletedChat = await OngoingList.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({
        success: false,
        message: "Ongoing chat session not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ongoing chat session deleted successfully.",
      deletedChat,
    });
  } catch (error) {
    console.error("Error deleting ongoing chat by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete ongoing chat",
      error: error.message,
    });
  }
};

exports.addToWaitingList = async function (req, res) {
  try {
    const { astrologer, customer } = req.body;

    const waitingEntry = new WaitingList({
      astrologer,
      customer,
    });

    await waitingEntry.save();

    res.status(200).json({
      success: true,
      message: "Added to waiting list successfully.",
      waitingEntry,
    });
  } catch (error) {
    console.error("Error adding to waiting list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add to waiting list",
      error: error.message,
    });
  }
};

exports.getAllWaitingListEntries = async function (req, res) {
  try {
    const waitingList = await WaitingList.find();

    res.status(200).json({ success: true, waitingList });
  } catch (error) {
    console.error("Error fetching waiting list entries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch waiting list entries",
      error: error.message,
    });
  }
};

exports.deleteFromWaitingList = async function (req, res) {
  try {
    const { waitingListId } = req.params;

    const waititngEntryToDelete = await WaitingList.findById(waitingListId);
    if (!waititngEntryToDelete) {
      return res.status(404).json({
        success: false,
        message: "Entry not found in the waiting list.",
      });
    }

    await WaitingList.findByIdAndDelete(waitingListId);

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully from the waiting list.",
    });
  } catch (error) {
    console.error("Error deleting entry from waiting list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete entry from the waiting list.",
      error: error.message,
    });
  }
};

exports.getWaitingListByIdFromBody = async function (req, res) {
  try {
    const astrologerId = req.body.astrologerId;

    const waitingEntry = await WaitingList.find({ astrologer: astrologerId });

    if (!waitingEntry) {
      return res.status(404).json({
        success: false,
        message: "Waiting list entry not found.",
      });
    }

    res.status(200).json({ success: true, waitingEntry });
  } catch (error) {
    console.error("Error fetching waiting list entry by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch waiting list entry",
      error: error.message,
    });
  }
};

// verified astrologers
exports.getAllVerifiedAstrologers = async function (req, res) {
  try {
    // Fetch all astrologers where 'is_verified' is true
    const verifiedAstrologers = await Astrologer.find({ isVerified: true });

    res.status(200).json({ success: true, astrologers: verifiedAstrologers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch verified astrologers",
      error: error.message,
    });
  }
};

exports.verifyAstrologerProfile = async function (req, res) {
  const { astrologerId, isVerified } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { chat_price, call_price } = astrologer

    if (!chat_price && !call_price && chat_price == 0 && call_price == 0) {
      return res
        .status(200)
        .json({ success: true, message: "Please update astrologer profile", unverified: true });
    }


    astrologer.isVerified = isVerified; // Set isVerified based on the provided value

    await astrologer.save();

    let verificationMessage =
      isVerified === "true"
        ? "Astrologer is set to verified."
        : "This astrologer is not verified.";

    res.status(200).json({
      success: true,
      message: verificationMessage,
      data: astrologer,
    });
  } catch (error) {
    console.error("Error setting verification status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set verification status.",
      error: error.message,
    });
  }
};

exports.changeAstrologerStatus = async function (req, res) {
  const { astrologerId, astrologers_status } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Update the astrologer_status field
    astrologer.astrologers_status = astrologers_status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer status.",
      error: error.message,
    });
  }
};

exports.changeChatStatus = async function (req, res) {
  const { astrologerId, chat_status } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      // Update the astrologer_status field
      astrologer.chat_status = chat_status;
      astrologer.nextOnline = { date: null, time: null }

      // Save the updated astrologer data
      await astrologer.save();

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        astrologer: astrologer,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer chat status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer chat status.",
      error: error.message,
    });
  }
};

exports.changeCallStatus = async function (req, res) {
  const { astrologerId, call_status } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      astrologer.call_status = call_status;
      astrologer.nextOnline = { date: null, time: null }

      // Save the updated astrologer data
      await astrologer.save();

      const updateAstro = await Astrologer.findById(astrologerId);

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        astrologer: updateAstro,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer call_status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer call_status.",
      error: error.message,
    });
  }
};

exports.changeVideoCallStatus = async function (req, res) {
  const { astrologerId, video_call_status } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      astrologer.video_call_status = video_call_status;
      astrologer.nextOnline = { date: null, time: null }

      // Save the updated astrologer data
      await astrologer.save();

      const updateAstro = await Astrologer.findById(astrologerId);

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        astrologer: updateAstro,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer call_status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer call_status.",
      error: error.message,
    });
  }
};


exports.changeVideoAudioAndChatStatus = async function (req, res) {
  const { astrologerId, call_status, chat_status, video_call_status } = req.body;

  if(!astrologerId || astrologerId == " "){
    return res.status(400).json({
      success: false,
      message: 'Please provide astrologerId!'
    })
  }

  if(!call_status || call_status == " "){
    return res.status(400).json({
      success: false,
      message: 'Please provide call_status!'
    })
  }

  if(!chat_status || chat_status == " "){
    return res.status(400).json({
      success: false,
      message: 'Please provide chat_status!'
    })
  }

  if(!video_call_status || video_call_status == " "){
    return res.status(400).json({
      success: false,
      message: 'Please provide video_call_status!'
    })
  }

  try {
    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise remedies"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      astrologer.video_call_status = video_call_status;
      astrologer.chat_status = chat_status;
      astrologer.call_status = call_status;
      astrologer.nextOnline = { date: null, time: null }

      // Save the updated astrologer data
      await astrologer.save();

      const updateAstro = await Astrologer.findById(astrologerId);

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        astrologer: updateAstro,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer call_status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer call_status.",
      error: error.message,
    });
  }
};

exports.changePrefferDays = async function (req, res) {
  const { astrologerId, prefferedDays } = req.body;
  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.preferredDays = prefferedDays;
    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer preffered days:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer preffered days.",
      error: error.message,
    });
  }
};

exports.changePrefferTime = async function (req, res) {
  const { astrologerId, startTime, endTime } = req.body;
  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.startTime = startTime;
    astrologer.endTime = endTime;
    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer preffered days:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer preffered days.",
      error: error.message,
    });
  }
};

exports.changeEnquiryStatus = async function (req, res) {
  const { astrologerId } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Update the astrologer_status field
    astrologer.enquiry = false;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

exports.checkChatStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const status = {
      chat_status: astrologer.chat_status,
    };

    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error("Error checking astrologer chat status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer chat status.",
      error: error.message,
    });
  }
};

// check call status
exports.checkCallStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const status = {
      call_status: astrologer.call_status,
    };

    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error("Error checking astrologer call status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer call status.",
      error: error.message,
    });
  }
};

// send notification to astrologer
exports.sendNotificationToAstrologer = async (req, res) => {
  try {
    const { astrologerId, customerId, type } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);
    const astrologerFCMToken = astrologer?.fcmToken;
    const customer = await Customers.findById(customerId);

    const customerData = {
      notificationBody: "Customer is Requesting for chat",
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type: type,
      priority: "High",
    };

    let inoiceId = "12345678";

    const deviceToken = astrologerFCMToken;

    const title = `Chat request from ${customerData.customerName || "a customer"
      }`;
    const notification = {
      title,
      body: "Customer is Requesting for chat",
    };
    const data = {
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type,
      priority: "High",
      invoiceId: inoiceId,
    };

    // console.log(customerData);

    await notificationService.sendNotification(deviceToken, notification, data);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully to the astrologer",
    });
  } catch (error) {
    console.error("Failed to send notification to the astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification to the astrologer",
      error: error.message,
    });
  }
};

// recommended astrologers

exports.getRecommededAstrologers = async function (req, res) {
  try {
    const astrologers = await Astrologer.find()
      .select("astrologerName avg_rating")
      .sort({ avg_rating: -1 });

    if (!astrologers || astrologers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No astrologers found." });
    }

    res.status(200).json({ success: true, data: astrologers });
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers.",
      error: error.message,
    });
  }
};

// astrologer chat history
exports.chatHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const chatHistory = await ChatHistory.find({
      astrologerId,
      // durationInSeconds: { $exists: true, $ne: "" },
    })
      .populate({
        path: "customerId", // Assuming 'formId' is the field referencing LinkedProfile
        select: "_id customerName image gender", // Exclude fields like id and _v from LinkedProfile
      }).sort({ _id: -1 });


    res.status(200).json({
      success: true,
      message: "Chat history found",
      chatHistory,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
};

// call niotification to astrologer
exports.callNotificationToAstrologer = async (req, res) => {
  try {
    const { astrologerId, customerId } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);
    const astrologerFCMToken = astrologer?.fcmToken;
    const customer = await Customers.findById(customerId);

    const customerData = {
      notificationBody: "Customer is Requesting for call",
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type: "Call Request",
      priority: "High",
    };

    const deviceToken = astrologerFCMToken;

    const title = `Call request from ${customerData.customerName || "a customer"
      }`;
    const notification = {
      title,
      body: customerData,
    };

    // console.log(customerData);

    await notificationService.sendNotification(deviceToken, notification);

    res.status(200).json({
      success: true,
      message: "Call Notification sent successfully to the astrologer",
    });
  } catch (error) {
    console.error("Failed to send call notification to the astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send call notification to the astrologer",
      error: error.message,
    });
  }
};

// web socket Api

exports.checkCallChatStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Extract astrologer ID from request params

    // Fetch the astrologer from the database by ID
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // Assuming a WebSocket logic for handling chat/call here
    // const wss = req.app.get('wss'); // Retrieve WebSocket server instance from Express app

    // // Use the fetched astrologer details to handle chat/call statuses
    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     // Send a message or perform specific actions based on astrologer status
    //     const message = `Checking status for ${astrologer.name}: Call - ${astrologer.callStatus}, Chat - ${astrologer.chatStatus}`;
    //     client.send(message);
    //   }
    // });

    // Return the astrologer details as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

exports.CallHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const callHistory = await CallHistory.find({
      astrologerId,
      // status: "Complete",
    })
      .sort({ _id: -1 })

    const enhancedHistory = await Promise.all(
      callHistory.map(async (item) => {
        const { customerId, astrologerId, formId } = item;
        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "customerName image gender"
        );
        const intakeDetailes = await LinkedProfile.findById(formId);

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          intakeDetailes,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          commissionPrice: item?.commissionPrice,
          callPrice: item.callPrice,
          totalCallPrice: item.totalCallPrice,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          transactionId: item?.transactionId,
          status: item?.status,
          __v: item.__v,
        };
      })
    );

    if (enhancedHistory) {
      return res.status(200).json({
        success: true,
        history: enhancedHistory,
      });
    }
  } catch (error) {
    console.error("Error fetching Call history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Call history",
      error: error.message,
    });
  }
};

exports.AllCallHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const callHistory = await CallHistory.find({
      astrologerId,
      // status: "Complete",
    }).sort({ _id: -1 });

    const enhancedHistory = await Promise.all(
      callHistory.map(async (item) => {
        const { customerId, astrologerId, formId } = item;
        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "customerName image gender"
        );
        const intakeDetailes = await LinkedProfile.findById(formId);

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          intakeDetailes,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          chatPrice: item.chatPrice,
          totalChatPrice: item.totalChatPrice,
          transactionId: item.transactionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        };
      })
    );

    if (enhancedHistory) {
      return res.status(200).json({
        success: true,
        history: enhancedHistory,
      });
    }
  } catch (error) {
    console.error("Error fetching Call history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Call history",
      error: error.message,
    });
  }
};

// check wallet balance of astrologer
exports.checkAstrologerWallet = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    res
      .status(200)
      .json({ success: true, wallet_balance: astrologer.wallet_balance });
  } catch (error) {
    console.error("Error checking astrologer wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer wallet Balance.",
      error: error.message,
    });
  }
};

exports.getastrologerCallChatCount = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    var currentDate = new Date();

    // Set the start of the current date
    currentDate.setHours(0, 0, 0, 0);

    // Set the end of the current date
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    const callData = await CallHistory.find({
      astrologerId,
      createdAt: {
        $gte: currentDate,
        $lt: nextDate,
      },
    });

    const chatData = await ChatHistory.find({
      astrologerId,
      createdAt: {
        $gte: currentDate,
        $lt: nextDate,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        chatCount: chatData.length,
        callCount: callData.length,
      },
    });
  } catch (error) {
    console.error("Error checking astrologer wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer wallet Balance.",
      error: error.message,
    });
  }
};

exports.astrologerHomeBanner = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({
      bannerFor: "app",
      redirectTo: "astrologer_home",
    });

    // Return the list of Banners as a JSON response
    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Banners",
      error: error.message,
    });
  }
};

exports.requestUpdateServiceCharges = async function (req, res) {
  try {
    const {
      astrologerId,
      callPrice,
      chatPrice,
      preferredDays,
      startTime,
      endTime,
    } = req.body;

    const isAlready = await AstrologerRequests.findOne({ astrologerId });

    if (isAlready) {
      return res.status(200).json({
        success: true,
        message: `You already requested.`,
      });
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const newAstroRequests = new AstrologerRequests({
      astrologerId,
      chat_price: chatPrice,
      call_price: callPrice,
      startTime,
      endTime,
      preferredDays,
    });

    await newAstroRequests.save();

    res.status(200).json({
      success: true,
      message: `Your request has been sent.`,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

exports.updateBasicProfile = async function (req, res) {
  try {
    const {
      astrologerId,
      astrologerName,
      experience,
      language,
      skill,
      expertise,
      long_bio,
    } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!astrologerName) astrologer.astrologerName = astrologerName;
    if (!!experience) astrologer.experience = experience;
    if (!!language) astrologer.language = language;
    if (!!skill) astrologer.skill = skill;
    if (!!expertise) astrologer.expertise = expertise;
    if (!!long_bio) astrologer.long_bio = long_bio;

    uploadAstrologerImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        if (req?.files) {
          if (req.files["profileImage"]) {
            const imagePath = req.files["profileImage"][0].path.replace(
              /^.*profileImage[\\/]/,
              "profileImage/"
            );
            astrologer.profileImage = imagePath;
          }
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update astrologer profile image.",
          error: error.message,
        });
      }
    });

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

const uploadAstrologerImages = configureMulter("profileImage/", [
  { name: "profileImage", maxCount: 1 },
  { name: "id_proof_image", maxCount: 1 },
  { name: "bank_proof_image", maxCount: 1 },
  { name: "pan_proof_image", maxCount: 1 },
]);

exports.updateBankProfile = function (req, res) {
  uploadAstrologerImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    const {
      astrologerId,
      account_holder_name,
      account_name,
      account_type,
      account_number,
      IFSC_code,
    } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!account_holder_name)
      astrologer.account_holder_name = account_holder_name;
    if (!!account_name) astrologer.account_name = account_name;
    if (!!account_type) astrologer.account_type = account_type;
    if (!!account_number) astrologer.account_number = account_number;
    if (!!IFSC_code) astrologer.IFSC_code = IFSC_code;

    try {
      if (req.files) {
        if (req.files["bank_proof_image"]) {
          astrologer.bank_proof_image = req.files["bank_proof_image"][0].path;
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }

    await astrologer.save();
    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  });
};

exports.updateChatNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.chat_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer chat status updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

exports.updateCallNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.call_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer call status updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

exports.updateLiveNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.live_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer live status updated successfully.`,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

exports.updateKycDetailes = function (req, res) {
  uploadAstrologerImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    const { astrologerId, address, zipCode, state, panCard, aadharNumber } =
      req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!address) astrologer.address = address;
    if (!!zipCode) astrologer.zipCode = zipCode;
    if (!!state) astrologer.state = state;
    if (!!panCard) astrologer.panCard = panCard;
    if (!!aadharNumber) astrologer.aadharNumber = aadharNumber;

    try {
      if (req.files) {
        if (req.files["id_proof_image"]) {
          astrologer.id_proof_image = req.files["id_proof_image"][0].path;
        }
        if (req.files["pan_proof_image"]) {
          astrologer.pan_proof_image = req.files["pan_proof_image"][0].path;
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }

    await astrologer.save();
    res.status(200).json({
      success: true,
      message: `Astrologer kyc updated successfully.`,
    });
  });
};

exports.astrologerWalletHistory = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    // Fetch only the 'wallet_balance' field based on the query
    const walletHistory = await AstrologerWallet.find({ astrologerId }).sort({ _id: -1 });

    res.status(200).json({ success: true, walletHistory });

  } catch (error) {
    console.error("Error fetching Wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Wallet Balance",
      error: error.message,
    });
  }
};

exports.getAstrolgoerLiveCalls = async (req, res) => {
  try {
    const { astrologerId } = req.body
    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid astrologerId" });
    }

    const history = await LiveCalls.find().populate({
      path: 'roomId',
      match: { astrologerId }, // Filter by astrologerId within the LiveStreaming documents
    }).populate('customerId', '_id customerName gender image').sort({ _id: -1 })

    const filteredLiveCalls = history.filter(liveCall => liveCall.roomId !== null);

    return res
      .status(200)
      .json({ success: true, history: filteredLiveCalls });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};



exports.getAstrolgoerVideoCalls = async (req, res) => {
  try {
    const { astrologerId } = req.body
    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid astrologerId" });
    }

    const history = await AdminEarning.find({astrologerId}).populate('customerId', '_id customerName gender image').sort({ _id: -1 }).populate("astrologerId", "normal_video_call_price")

    const filteredCompletedCalls = history.filter(Call => Call.status == 'completed');
    // console.log(filteredCompletedCalls, "ckldjslkfjdsalkjfkldsajfkldsja")

    return res
      .status(200)
      .json({ success: true, history: history });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

exports.getAstrolgoerFollowers = async (req, res) => {
  try {
    const { astrologerId } = req.body
    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid astrologerId" });
    }

    const astrologerFollowers = await AstrologerFollower.findOne({ astrologerId }).populate('followers');
    

    if (!astrologerFollowers) {
      return res.status(200).json({ 
        success: true,
        message: 'no followers available'
       });
    }

    const followers = astrologerFollowers.followers.map(follower => {
      const { customerName, image, gender } = follower;
      return { customerName, image, gender }
    });

    return res
      .status(200)
      .json({ success: true, followers });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

exports.getAstrologerAnnouncement = async function (req, res) {
  try {

    const { astrologerId } = req.body

    const announcements = await Announcement.find({ astrologerId: { $ne: astrologerId } }).sort({_id: -1})

    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("Error fetching Title to Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Announcement",
      error: error.message,
    });
  }
};

exports.onReadAnnouncement = async function (req, res) {
  try {

    const { astrologerId, id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }


    if (announcement.astrologerId.includes(astrologerId)) {
      return res.status(400).json({ error: 'Astrologer already added to this announcement' });
    }

    announcement.astrologerId.push(astrologerId);
    await announcement.save();


    res.status(200).json({ success: true, message: 'success' });
  } catch (error) {
    console.error("Error fetching Title to Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Announcement",
      error: error.message,
    });
  }
};



exports.withdrawRequest = async (req, res)=>{

  try{

    const {astrologerId, amount} = req.body;
    const isWalletCheck = await Astrologer.findById({_id:astrologerId}, {wallet_balance:1});
   
    if(!astrologerId || astrologerId == " "){
      return res.status(400).json({
        success: false,
        message: "astrologerId is required!"
      })
    }

    if(!amount || amount == " "){
      return res.status(400).json({
        success: false,
        message: "amount is required!",
      })
    }

    if(amount > isWalletCheck.wallet_balance){
      return res.status(400).json({
        success: false,
        message: "Insufficient balance"
      })
    }
     
    const newWithdrawRequest = new AstrologerWithdrawRequest({
      astrologerId,
      amount
    })

    await newWithdrawRequest.save();

    return res.status(201).json({
      success: true,
      message: "Withdraw request sended",
      data: newWithdrawRequest
    })


  }

  catch(error){
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}



exports.getAstrologerNotificationById = async function (req, res) {
  try {
    const {astrologerId} = req.body;

    if(!astrologerId || astrologerId == " "){
      return res.status(400).json({
        success: false,
        message: 'Please provide astrologerId!'
      })
    }

    const notifications = await AstrologerNotification.find({'astrologerIds.astrologerId': astrologerId}, {title:1, description:1, image:1, createdAt: 1, updatedAt:1});

    if (notifications) {
      return res.status(200).json({
        success: true,
        message: 'Notification getting successfully',
        notifications,
      });
    }

    return res.status(200).json({
      success: true,
      notifications: [],
    });
  } catch (error) {
    console.error("Failed to get notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get notifications",
      error: error.message,
    });
  }
};




exports.deleteAccount = async (req, res)=>{
  try{

    const {astrologerId} = req.body;
    
    if(!astrologerId || astrologerId == " "){
      return res.status(400).json({
        success: false,
        message: 'Please provide astrologerId!'
      })
    }

    const astrologer = await Astrologer.findById({_id: astrologerId})

    if(astrologer){
      astrologer.isDeleted = 1
      await astrologer.save()
      return res.status(200).json({
        success: true,
        message: 'Astrologer Account delted successfully',
        results: astrologer
      })
    }

    return res.status(200).json({
      success: true,
      message: 'customer not found',
      results: astrologer
    })

  }

  catch(error){
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

exports.getAstrologerEarning = async (req, res) => {
  try {
    const { astrologerId, month, filterType } = req.body;

    // Validate astrologerId
    if (!astrologerId || astrologerId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: 'Invalid astrologerId',
      });
    }

    // Validate the month format (YYYY-MM) if the filterType is 'month'
    if (filterType === 'month' && (!month || !moment(month, 'YYYY-MM', true).isValid())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month format. Please use YYYY-MM.',
      });
    }

    // Get all earnings related to the astrologer with customer details
    const earningsData = await AdminEarning.find({ astrologerId })
      .populate('customerId', 'customerName image gender dateOfBirth timeOfBirth')  // Populating customer name
      .sort({ createdAt: -1 });

    if (earningsData.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No earnings found for the astrologer.',
        results: {
          totalEarning: 0,
          totalAstrologerEarning : 0,
          tdsCommission : 0,
          totalPayableAmount: 0,
          adminCommission: 0,
          chatEarning: 0,
          callEarning: 0,
          videoCallEarning: 0,
          liveSessionEarning: 0,
          giftEarning: 0,
          pujaEarning: 0,
          customerEarnings: [],
        },
      });
    }

    let totalEarning = 0;
    let totalPayableAmount = 0;
    let totalAstrologerEarning = 0;
    let tdsCommission = 0;
    let adminCommission = 0;
    let chatEarning = 0;
    let callEarning = 0;
    let videoCallEarning = 0;
    let liveSessionEarning = 0;
    let giftEarning = 0;
    let pujaEarning = 0;
    const customerEarnings = [];

    const todayDate = moment().startOf('day'); // Get start of today

    // Process each earning data
    earningsData.forEach(earning => {
      const { totalPrice, adminPrice, partnerPrice, type, duration,  createdAt } = earning;
      const earningMonth = moment(createdAt).format('YYYY-MM'); // Extract the month (YYYY-MM format)
      const earningDate = moment(createdAt).startOf('day'); // Normalize the createdAt date to compare with today

      // If the user is requesting "today" filter
      if (filterType === 'today' && earningDate.isSame(todayDate, 'day')) {
        // Add to total earnings for today
        totalEarning += parseFloat(totalPrice);
        totalAstrologerEarning += parseFloat(partnerPrice);
        totalPayableAmount +=  parseFloat(partnerPrice) - parseFloat(partnerPrice) / 10;
        tdsCommission += parseFloat(partnerPrice) / 10;
        adminCommission += parseFloat(adminPrice);

        // Accumulate earnings for each type (today)
        switch (type) {
          case 'chat':
            chatEarning += parseFloat(totalPrice);
            break;
          case 'call':
            callEarning += parseFloat(totalPrice);
            break;
          case 'VideoCall':
            videoCallEarning += parseFloat(totalPrice);
            break;
          case 'live_video_call':
            liveSessionEarning += parseFloat(totalPrice);
            break;
          case 'gift':
            giftEarning += parseFloat(totalPrice);
            break;
          case 'puja':
            pujaEarning += parseFloat(totalPrice);
            break;
          default:
            break;
        }

        // Add customer earnings for today
        customerEarnings.push({
          customerId: earning.customerId?._id,  
          customerName: earning.customerId?.customerName,
          gender: earning.customerId?.gender,  
          dateOfBirth: earning.customerId?.dateOfBirth,
          timeOfBirth: earning.customerId?.timeOfBirth,
          image: earning.customerId?.image,  
          type: type,
          amount: parseFloat(totalPrice),
          transactionId: earning.transactionId,
          duration: duration,
          createdAt,
        });

      } else if (filterType === 'month' && earningMonth === month) {
        // If the user is requesting "month" filter
        totalEarning += parseFloat(totalPrice);
        totalAstrologerEarning += parseFloat(partnerPrice);
        totalPayableAmount += parseFloat(partnerPrice) - parseFloat(partnerPrice) / 10;
        tdsCommission += parseFloat(partnerPrice) / 10;
        adminCommission += parseFloat(adminPrice);

        // Accumulate earnings for each type (for the month)
        switch (type) {
          case 'chat':
            chatEarning += parseFloat(totalPrice);
            break;
          case 'call':
            callEarning += parseFloat(totalPrice);
            break;
          case 'VideoCall':
            videoCallEarning += parseFloat(totalPrice);
            break;
          case 'live_video_call':
            liveSessionEarning += parseFloat(totalPrice);
            break;
          case 'gift':
            giftEarning += parseFloat(totalPrice);
            break;
          case 'puja':
            pujaEarning += parseFloat(totalPrice);
            break;
          default:
            break;
        }

        // Add customer earnings for the month
        customerEarnings.push({
          customerId: earning.customerId?._id,  
          customerName: earning.customerId?.customerName,
          gender: earning.customerId?.gender,  
          dateOfBirth: earning.customerId?.dateOfBirth,
          timeOfBirth: earning.customerId?.timeOfBirth,  
          image: earning.customerId?.image,  
          type: type,
          amount: parseFloat(totalPrice),
          transactionId: earning.transactionId,
          duration: duration,
          createdAt,
        });
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Astrologer earnings retrieved successfully',
      results: {
        totalEarning,
        totalPayableAmount,
        totalAstrologerEarning,
        tdsCommission,
        adminCommission,
        chatEarning,
        callEarning,
        videoCallEarning,
        liveSessionEarning,
        giftEarning,
        pujaEarning,
        customerEarnings, // List of earnings with customerName, type, and amount
      },
    });
  } catch (error) {
    console.log('Error', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.astrologerPerformance = async (req, res) => {

  // Function to categorize the rating on a scale of 1 to 5
  function categorizeRating(rating) {
    if (rating >= 4.0) {
      return "Good";
    } else if (rating >= 2.5) {
      return "Average";
    } else {
      return "Poor";
    }
  }

  // Function to categorize satisfaction rate
  function categorizeSatisfactionRate(satisfactionRate) {
    if (satisfactionRate >= 80) {
      return "Excellent";
    } else if (satisfactionRate >= 50) {
      return "Good";
    } else {
      return "Needs Improvement";
    }
  }

  // Function to categorize retention rate
  function categorizeRetentionRate(retentionRate) {
    if (retentionRate >= 60) {
      return "Excellent";
    } else if (retentionRate >= 30) {
      return "Good";
    } else {
      return "Needs Improvement";
    }
  }

  try {
    const { astrologerId } = req.body;
    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide astrologerId!'
      });
    }

    const ratings = await Review.aggregate([
      { $match: { astrologer: new mongoose.Types.ObjectId(astrologerId) } },
      {
        $facet: {
          overallRating: [
            { $group: { _id: null, averageRating: { $avg: "$ratings" } } }
          ],
          chatRating: [
            { $match: { type: "CHAT" } },
            { $group: { _id: null, averageRating: { $avg: "$ratings" } } }
          ],
          callRating: [
            { $match: { type: "CALL" } },
            { $group: { _id: null, averageRating: { $avg: "$ratings" } } }
          ],
          totalRatings: [
            { $count: "total" }
          ],
          goodRatings: [
            { $match: { ratings: { $gte: 4.0 } } },
            { $count: "good" }
          ],
          customerCount: [
            { $group: { _id: "$customer" } },
            { $count: "uniqueCustomers" }
          ],
          returningCustomerCount: [
            { $group: { _id: "$customer", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } },
            { $count: "returningCustomers" }
          ],
          dateRange: [
            { $project: { createdAt: 1 } },
            { $group: { _id: null, minDate: { $min: "$createdAt" }, maxDate: { $max: "$createdAt" } } }
          ]
        }
      }
    ]);

    // Extract average ratings
    const overallAvgRating = ratings[0].overallRating[0]?.averageRating || 0;
    const chatAvgRating = ratings[0].chatRating[0]?.averageRating || 0;
    const callAvgRating = ratings[0].callRating[0]?.averageRating || 0;

    // Categorize the ratings
    const overallRatingCategory = categorizeRating(overallAvgRating);
    const chatRatingCategory = categorizeRating(chatAvgRating);
    const callRatingCategory = categorizeRating(callAvgRating);

    // Extract the total number of ratings and "Good" ratings
    const totalRatings = ratings[0].totalRatings[0]?.total || 0;
    const goodRatings = ratings[0].goodRatings[0]?.good || 0;

    // Extract unique customer and returning customer counts
    const uniqueCustomers = ratings[0].customerCount[0]?.uniqueCustomers || 0;
    const returningCustomers = ratings[0].returningCustomerCount[0]?.returningCustomers || 0;

    // Calculate Retention Rate
    const retentionRate = uniqueCustomers > 0 ? ((returningCustomers / uniqueCustomers) * 100).toFixed(2) : 0;

    // Calculate Satisfaction Rate
    const satisfactionRate = totalRatings > 0 ? ((goodRatings / totalRatings) * 100).toFixed(2) : 0;

    // Categorize Satisfaction and Retention Rates
    const satisfactionRatingCategory = categorizeSatisfactionRate(satisfactionRate);
    const retentionRatingCategory = categorizeRetentionRate(retentionRate);

    // Extract the date range (if available)
    const dateRange = ratings[0].dateRange[0] || {};
    const dateRangeFormatted = {
      from: dateRange.minDate ? new Date(dateRange.minDate).toISOString() : null,
      to: dateRange.maxDate ? new Date(dateRange.maxDate).toISOString() : null
    };

    // Respond with the ratings, categories, satisfaction rate, retention rate, and date range
    res.json({
      success: true,
      message: 'Astrologer performance retrieved successfully.',
      overallRating: overallAvgRating,
      overallRatingCategory: overallRatingCategory,
      chatRating: chatAvgRating,
      chatRatingCategory: chatRatingCategory,
      callRating: callAvgRating,
      callRatingCategory: callRatingCategory,
      satisfactionRate: satisfactionRate,
      satisfactionRatingCategory: satisfactionRatingCategory,  // Adding Satisfaction Rating Category
      retentionRate: retentionRate,
      retentionRatingCategory: retentionRatingCategory,  // Adding Retention Rating Category
      dateRange: dateRangeFormatted
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};