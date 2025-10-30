const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const configureMulter = require("../configureMulter");
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const Skills = require("../models/adminModel/Skills");
const SubSkills = require("../models/adminModel/SubSkills");
const RechargePlan = require("../models/adminModel/RechargePlan");
const mongoose = require("mongoose");
const Expertise = require("../models/adminModel/Expertise");
const MainExpertise = require("../models/adminModel/MainExpertise");
const Gift = require("../models/adminModel/Gift");
const Review = require("../models/adminModel/Review");
const Faq = require("../models/adminModel/Faq");
const Day = require("../models/adminModel/Day");
const AstroBlogs = require("../models/adminModel/AstroBlogs");
const BlogsCategory = require("../models/adminModel/BlogsCategory");
const HowToUseScreenshots = require("../models/adminModel/HowToUseScreenshots");
const PoojaItem = require("../models/adminModel/PoojaItem");
const HowToUseVideo = require("../models/adminModel/HowToUseVideo");
const PrivacyPolicy = require("../models/adminModel/PrivacyPolicy");
const TandC = require("../models/adminModel/TandC");
const VivahMuhurat = require("../models/adminModel/VivahMuhurat");
const Annaprashan = require("../models/adminModel/Annaprashan");
const AskAstrologer = require("../models/adminModel/AskAstrologer");
const AskQuestion = require("../models/adminModel/AskQuestion");
const ReligionSpirituality = require("../models/adminModel/ReligionSpirituality");
const AstroMagazine = require("../models/adminModel/AstroMagazine");
const BirhatHoroscope = require("../models/adminModel/BirhatHoroscope");
const MundanMuhurat = require("../models/adminModel/MundanMuhurat");
const DailyPanchang = require("../models/adminModel/DailyPanchang");
const Remedies = require("../models/adminModel/Remedies");
const YellowBook = require("../models/adminModel/YellowBook");
const AuspiciousTime = require("../models/adminModel/AuspiciousTime");
const ListOfQuestion = require("../models/adminModel/ListOfQuestion");
const Astrologer = require("../models/adminModel/Astrologer");
const Numerology = require("../models/adminModel/Numerology");
const Testimonial = require("../models/adminModel/Testimonal");
const Customers = require("../models/customerModel/Customers");
const Users = require("../models/adminModel/Users");
const Announcement = require("../models/adminModel/Announcement");
const Message = require("../models/adminModel/Message");
const BankAccount = require("../models/astrologerModel/BankAccount");
const Banners = require("../models/adminModel/Banners");
const Notification = require("../models/adminModel/Notification");
const Bhagwan = require("../models/adminModel/Bhagwan");
const notificationService = require("../notificationService");
const FirstRechargeOffer = require("../models/adminModel/FirstRechargeOffer");
const RechargeWallet = require("../models/customerModel/RechargeWallet");
const ChatHistory = require("../models/adminModel/ChatHistory");
const CallHistory = require("../models/adminModel/CallHistory");
const AppReview = require("../models/adminModel/AppReview");
const CustomerNotification = require("../models/adminModel/CustomerNotification");
const AstrologerNotification = require("../models/adminModel/AstrologerNotification");
const { ObjectId } = require("mongodb");
const AdminEarning = require("../models/adminModel/AdminEarning");
const Language = require("../models/adminModel/Language");
const Qualifications = require("../models/adminModel/Qualifications");
const LiveStreaming = require("../models/adminModel/LiveStreaming");
const AstrologerRequests = require("../models/adminModel/AstrologerRequests");
const AppTutorials = require("../models/adminModel/AppTutorials");
const { parseYoutubeId } = require("../utils/services");
const AstroCompanion = require("../models/adminModel/AstroCompanion");
const Mudra = require('../models/adminModel/Mudra');
const LiveCalls = require("../models/adminModel/LiveCalls");
const BlogCount = require("../models/adminModel/BlogsCount");
const Admin = require("../models/adminModel/Admin");
const AstrologerWithdrawRequest = require("../models/astrologerModel/AstrologerWithdrawRequest");
const AdminTransaction = require("../models/adminModel/AdminTransactionHistory");
const Setting = require("../models/adminModel/Settings");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const AstrologerFollower = require("../models/astrologerModel/AstrologerFollower");
const About = require('../models/adminModel/About');
const DarshanLink = require('../models/adminModel/LiveDarshan');
const Content = require("../models/adminModel/Darshan");
const sharp = require("sharp");
const ReligiousCategory = require('../models/adminModel/ReligiousCategory');
const ReligiousSubCategory = require('../models/adminModel/ReligiousSubCategory');
const path = require('path');
const Mandir = require("../models/adminModel/Mandir");
const PoojaVRItem = require("../models/adminModel/VRItems"); // adjust path if needed
const RechargeHistory = require("../models/rechargeModel/userRecharge");
const PanchangMonth = require("../models/adminModel/PanchagMonth");
const TempleFoundation = require("../models/adminModel/TempleFoundation");
const TeerthDhamBanners = require("../models/adminModel/TeerthDham");

const { uploadFileToS3 } = require("../utils/amazonS3Service");
const AartiNotification = require("../models/adminModel/Aarti");
const { scheduleAartiNotifications } = require("../scheduler/aartiScheduler");
const TempleVideo = require("../models/adminModel/TempleVideo");
const { s3 } = require("../config/s3Client");
const storage = multer.memoryStorage();



const uploadTutorialImage = multer({ storage }).fields([
  { name: 'image', maxCount: 1 }
]);

const uploadTestimonial = multer({ storage }).fields([
  { name: "images", maxCount: 1 },
]);

const uploadTempleFoundation = multer({ storage }).fields([
  { name: "images", maxCount: 1 },
]);

const uploadBlog = multer({ storage }).fields([
  { name: "image", maxCount: 1 },   // ✅ Single Image
  { name: "images", maxCount: 10 }  // ✅ Multiple Images (10 तक)
]);

const uploadBanners = multer({ storage }).fields([
  { name: 'bannerImage', maxCount: 1 }
]);


const uploadAstrologerImages = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "id_proof_image", maxCount: 1 },
  { name: "bank_proof_image", maxCount: 1 },
]);

const uploadCustomerImage = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
]);

const uploadNotificationImages = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
]);


// add User by Admin
exports.addUser = async function (req, res) {
  try {
    const {
      username,
      email,
      password,
      phoneNumber,
      permissions, // Permissions to be added
    } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new Users({
      username,
      email,
      password,
      phoneNumber,
      permissions, // Assign the permissions array
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add user",
      error: error.message,
    });
  }
};

// get all user
exports.getAllUser = async function (req, res) {
  try {
    // Fetch all skills from the database
    const users = await Users.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching Users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Users",
      error: error.message,
    });
  }
};

// block user
exports.blockUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const { block } = req.body; // block: true or false

    // Find the user by ID
    const user = await Users.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the isBlock field based on the provided value
    user.isBlock = block;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${block ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to block/unblock user",
      error: error.message,
    });
  }
};

// delete user
exports.deleteUser = async function (req, res) {
  try {
    const userId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete User",
      error: error.message,
    });
  }
};


// Admin Signup
exports.adminSignup = async function (req, res) {
  // Validate inputs using express-validator
  await body('username').notEmpty().withMessage('Username is required').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if the username already exists
    let existingUser = await Admin.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new admin
    const newAdmin = new Admin({
      username,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(password, salt);

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin Login
exports.adminLogin = async function (req, res) {
  // Validate inputs using express-validator
  await body('username').notEmpty().withMessage('Username is required').run(req);
  await body('password').notEmpty().withMessage('Password is required').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.skill = async function (req, res) {

  try {
    const { skill } = req.body;

    // Validate required fields
    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Skill.",
      });
    }


    // Create a new file entry in the Customers collection
    const newSkill = new Skills({ skill });
    await newSkill.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully.",
      data: newSkill,
    });
  } catch (error) {
    console.error("Error adding Skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to adding Skill.",
      error: error.message,
    });
  }

};

// get skills
exports.getAllSkills = async function (req, res) {
  try {
    // Fetch all skills from the database
    const skills = await Skills.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};

// update Skill
// exports.updateSkill = function (req, res) {
//   uploadSkill(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ success: false, message: 'Multer error', error: err });
//     } else if (err) {
//       return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
//     }

//     try {
//       const { skillId, skill } = req.body;

//       // Validate required fields
//       if (!skill) {
//         return res.status(400).json({
//           success: false,
//           message: 'Please provide a Skill.'
//         });
//       }

//       const existingSkill = await Skills.findById(skillId);

//       if (!existingSkill) {
//         return res.status(404).json({ success: false, message: 'Skill not found.' });
//       }

//       existingSkill.skill = skill;

//       // Update image path if a new image is uploaded
//       if (req.files['image']) {
//         const imagePath = req.files['image'][0].path.replace(/^.*skillsImage[\\/]/, 'skillsImage/');
//         existingSkill.image = imagePath;
//       }

//       await existingSkill.save();

//       res.status(200).json({ success: true, message: 'Skill updated successfully.', data: existingSkill });
//     } catch (error) {
//       console.error('Error updating Skill:', error);
//       res.status(500).json({ success: false, message: 'Failed to update Skill.', error: error.message });
//     }
//   });
// };

exports.updateSkill = async function (req, res) {
  try {
    const { skillId, skill } = req.body;

    // Validate required fields
    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Skill.",
      });
    }

    const existingSkill = await Skills.findById(skillId);

    if (!existingSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found." });
    }

    existingSkill.skill = skill;



    // Update the skill without checking for uniqueness
    await existingSkill.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: existingSkill,
    });
  } catch (error) {
    console.error("Error updating Skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Skill.",
      error: error.message,
    });
  }
};

//delete skill
// exports.deleteSkill = async function(req, res) {
//     try {
//       const skillId = req.params.id;

//       if (!mongoose.Types.ObjectId.isValid(skillId)) {
//         return res.status(400).json({ success: false, message: 'Invalid Skill ID' });
//       }

//       const deletedSkill = await Skills.findByIdAndDelete(skillId);

//       if (!deletedSkill) {
//         return res.status(404).json({ success: false, message: 'Skill not found.' });
//       }

//       res.status(200).json({ success: true, message: 'Skill deleted successfully', deletedSkill });
//     } catch (error) {
//       console.error('Error deleting skill:', error);
//       res.status(500).json({ success: false, message: 'Failed to delete skill', error: error.message });
//     }
//   };

exports.deleteSkill = async function (req, res) {
  try {
    const skillId = req.body.skillId;

    if (!skillId || !mongoose.Types.ObjectId.isValid(skillId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Skill ID" });
    }

    const deletedSkill = await Skills.findByIdAndDelete(skillId);
    const astrologerData = await Astrologer.find({ skill: { $in: [skillId] } });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { skill: skillId } }
        );
      }
    }

    if (!deletedSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found." });
    }

    console.log(`Skill with ID ${skillId} deleted successfully`);

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      deletedSkill,
    });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

// add sub skills
exports.subSkill = async function (req, res) {
  try {
    const { subskill, skillId } = req.body; // Assuming you receive question and titleId from the request

    const existingSkill = await Skills.findById(skillId);

    if (!existingSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Selected skill not found." });
    }

    const newSubSKill = new SubSkills({ subskill, skill: skillId });
    await newSubSKill.save();

    res
      .status(201)
      .json({ success: true, message: "Sub Skill added successfully" });
  } catch (error) {
    console.error("Error adding sub skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add sub skill",
      error: error.message,
    });
  }
};

exports.getAllSubSkills = async function (req, res) {
  try {
    const allSubSkill = await SubSkills.find().populate("skill", "skill");

    if (!allSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "No subskill found." });
    }

    res.status(200).json({ success: true, subSkill: allSubSkill });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

// update sub skill

exports.updateSubSkill = async function (req, res) {
  try {
    const { subSkillId, subskill, newSkillId } = req.body;

    // Find the sub-skill by ID
    const existingSubSkill = await SubSkills.findById(subSkillId);

    if (!existingSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Sub-skill not found." });
    }

    // Update the sub-skill name
    existingSubSkill.subskill = subskill;

    // Initialize a variable to hold the skill name
    let skillName = "";

    // Check if the provided newSkillId exists in the Skills schema
    const skillExists = await Skills.findById(newSkillId);

    if (newSkillId && !skillExists) {
      return res
        .status(404)
        .json({ success: false, message: "New Skill ID not found." });
    }

    // Update the skill ID if a newSkillId is provided and it exists
    if (newSkillId) {
      existingSubSkill.skill = newSkillId;
      skillName = skillExists.skill; // Fetch the name of the skill from the skillExists object
    }

    // Save the updated sub-skill
    const updatedSubSkill = await existingSubSkill.save();

    // Return success response with the updated sub-skill details and skill name
    res.status(200).json({
      success: true,
      message: "Sub-skill updated successfully",
      updatedSubSkill,
      subSkillId,
      skillName,
    });
  } catch (error) {
    console.error("Error updating sub-skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update sub-skill as Skill id is not correct",
      error: error.message,
    });
  }
};

// delete sub skill
exports.deleteSubSkill = async function (req, res) {
  try {
    const subSkillId = req.body.subSkillId; // Assuming the ID is passed as a parameter

    // Find the sub-skill by ID and delete it
    const deletedSubSkill = await SubSkills.findByIdAndDelete(subSkillId);

    if (!deletedSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Sub-skill not found." });
    }

    // Return success response with the deleted sub-skill
    res.status(200).json({
      success: true,
      message: "Sub-skill deleted successfully",
      deletedSubSkill,
    });
  } catch (error) {
    console.error("Error deleting sub-skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete sub-skill",
      error: error.message,
    });
  }
};

// add recherge plan

exports.createRechargePlan = async function (req, res) {
  try {
    const { amount, percentage, startDate, endDate, status } = req.body;

    const newRechargePlan = new RechargePlan({
      amount,
      percentage,
      startDate,
      endDate,
      status,
    });

    await newRechargePlan.save();

    res.status(201).json({
      success: true,
      message: "Recharge plan added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add recharge plan", details: error });
  }
};

// update recharge update plan
exports.updateRechargePlan = async function (req, res) {
  try {
    const { amount, percentage, startDate, endDate, status } = req.body;

    const rechargePlanId = req.body.rechargePlanId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const rechargePlan = await RechargePlan.findById(rechargePlanId);

    if (!rechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    rechargePlan.amount = amount;
    rechargePlan.percentage = percentage;
    rechargePlan.startDate = startDate;
    rechargePlan.endDate = endDate;
    rechargePlan.status = status;

    const updatedRechargePlan = await rechargePlan.save();

    res.status(200).json({
      success: true,
      message: "Recharge plan updated successfully",
      rechargePlan: updatedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update recharge plan",
      details: error,
    });
  }
};

exports.updateRechargePlanStatus = async function (req, res) {
  try {
    const { rechargePlanId, status } = req.body; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const rechargePlan = await RechargePlan.findById(rechargePlanId);

    if (!rechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    rechargePlan.recharge_status = status;

    await rechargePlan.save();

    res.status(200).json({
      success: true,
      message: `Recharge plan ${status == 'Active' ? 'Activated' : 'Deactivated'} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update recharge plan",
      details: error,
    });
  }
};

exports.getAllRechargePlan = async function (req, res) {
  try {
    const allRechargePlan = await RechargePlan.find().sort({ _id: -1 });

    if (!allRechargePlan) {
      return res
        .status(404)
        .json({ success: false, message: "No subskill found." });
    }

    res.status(200).json({ success: true, allRechargePlan: allRechargePlan });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

// delete recharge plan
exports.deleteRechargePlan = async function (req, res) {
  try {
    const rechargePlanId = req.body.rechargePlanId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID and remove it
    const deletedRechargePlan = await RechargePlan.findByIdAndDelete(
      rechargePlanId
    );

    if (!deletedRechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recharge plan deleted successfully",
      // rechargePlan: deletedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not delete recharge plan",
      details: error,
    });
  }
};

// Remedy


exports.addRemedy = async function (req, res) {


  try {
    const { title, description, description_hi } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Remedy.",
      });
    }

    const remedyIcon = req.files["remedyIcon"]
      ? req.files["remedyIcon"][0].path.replace(
        /^.*remedyImage[\\/]/,
        "remedyImage/"
      )
      : "";

    // Create a new file entry in the Customers collection
    const newRemedy = new Remedies({ title, remedyIcon, description, description_hi });
    await newRemedy.save();

    res.status(201).json({
      success: true,
      message: "Remedy uploaded successfully.",
      data: newRemedy,
    });
  } catch (error) {
    console.error("Error uploading Remedy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload Remedy.",
      error: error.message,
    });
  }
};

exports.viewRemedy = async function (req, res) {
  try {
    // Fetch all skills from the database
    const remedies = await Remedies.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, remedies });
  } catch (error) {
    console.error("Error fetching remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};


exports.updateRemedy = async function (req, res) {


  try {
    const { remedyId, title, description, description_hi } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide a remedy and a description.",
      });
    }

    const existingRemedy = await Remedies.findById(remedyId);
    if (!existingRemedy) {
      return res
        .status(404)
        .json({ success: false, message: "Remedy not found." });
    }

    existingRemedy.title = title;
    existingRemedy.description = description;
    existingRemedy.description_hi = description_hi;

    // Update image path if a new image is uploaded
    if (
      req.files &&
      req.files["remedyIcon"] &&
      req.files["remedyIcon"][0] &&
      req.files["remedyIcon"][0].path
    ) {
      const imagePath = req.files["remedyIcon"][0].path.replace(
        /^.*remedyImage[\\/]/,
        "remedyImage/"
      );
      existingRemedy.remedyIcon = imagePath; // Update 'remedyIcon' with the new image path
    }

    await existingRemedy.save();

    res.status(200).json({
      success: true,
      message: "Remedy updated successfully.",
      data: existingRemedy,
    });
  } catch (error) {
    console.error("Error updating Remedy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Remedy.",
      error: error.message,
    });
  }

};

exports.deleteRemedy = async function (req, res) {
  try {
    const remedyId = req.body.remedyId; // Assuming the ID is passed as a parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(remedyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Remedy ID" });
    }

    // Find the remedy by ID and delete it
    const deletedRemedy = await Remedies.findByIdAndDelete(remedyId);
    const astrologerData = await Astrologer.find({
      remedies: { $in: [remedyId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { remedies: remedyId } }
        );
      }
    }

    if (!deletedRemedy) {
      return res
        .status(404)
        .json({ success: false, message: "Remedy not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Remedy deleted successfully",
      deletedRemedy,
    });
  } catch (error) {
    console.error("Error deleting remedy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete remedy",
      error: error.message,
    });
  }
};

// Expertise

exports.addExpertise = async function (req, res) {
  try {
    const { expertise } = req.body;

    // Check if the skill already exists
    if (!expertise) {
      return res
        .status(400)
        .json({ success: false, message: "expertise is required." });
    }
    const existingExpertise = await Expertise.findOne({ expertise });

    if (existingExpertise) {
      return res
        .status(400)
        .json({ success: false, message: "expertise already exists." });
    }

    // Create a new skill with the image buffer
    const newExpertise = new Expertise({ expertise });
    await newExpertise.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "expertise added successfully",
      expertise: newExpertise,
    });
  } catch (error) {
    console.error("Error adding expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add expertise",
      error: error.message,
    });
  }
};

exports.getExpertise = async function (req, res) {
  try {
    // Fetch all skills from the database
    const expertise = await Expertise.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, expertise });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expertise",
      error: error.message,
    });
  }
};

exports.updateExpertise = async function (req, res) {
  try {
    const { expertiseId, expertise } = req.body;

    // Find the expertise by ID
    const expertiseToUpdate = await Expertise.findById(expertiseId);

    if (!expertiseToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    // Update the expertise if provided
    if (expertise) {
      expertiseToUpdate.expertise = expertise;
    }

    // Save the updated expertise
    await expertiseToUpdate.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Expertise updated successfully",
      expertise: expertiseToUpdate,
    });
  } catch (error) {
    console.error("Error updating expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update expertise",
      error: error.message,
    });
  }
};

exports.deleteExpertise = async function (req, res) {
  try {
    const expertiseId = req.body.expertiseId; // Assuming the ID is passed as a parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(expertiseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Expertise ID" });
    }

    // Find the Expertise by ID and delete it
    const deletedExpertise = await Expertise.findByIdAndDelete(expertiseId);

    const astrologerData = await Astrologer.find({
      expertise: { $in: [expertiseId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { expertise: expertiseId } }
        );
      }
    }

    if (!deletedExpertise) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    res.status(200).json({
      success: true,
      message: "Expertise deleted successfully",
      deletedExpertise,
    });
  } catch (error) {
    console.error("Error deleting Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Expertise",
      error: error.message,
    });
  }
};

exports.addMainExpertise = async function (req, res) {
  try {
    const { mainExpertise } = req.body;

    const existingmainExpertise = await MainExpertise.findOne({
      mainExpertise,
    });

    if (existingmainExpertise) {
      return res
        .status(400)
        .json({ success: false, message: "Main Expertise already exists." });
    }

    const newMainExpertise = new MainExpertise({ mainExpertise });
    await newMainExpertise.save();

    res.status(201).json({
      success: true,
      message: "Main Expertise added successfully",
      mainExpertise: newMainExpertise,
    });
  } catch (error) {
    console.error("Error adding Main Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Main Expertise",
      error: error.message,
    });
  }
};

exports.updateMainExpertise = async function (req, res) {
  try {
    const { mainExpertiseId, mainExpertise } = req.body;

    const mainExpertiseToUpdate = await MainExpertise.findById(mainExpertiseId);

    if (!mainExpertiseToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    if (mainExpertise) {
      mainExpertiseToUpdate.mainExpertise = mainExpertise;
    }

    await mainExpertiseToUpdate.save();

    res.status(200).json({
      success: true,
      message: "main Expertise updated successfully",
      mainExpertise: mainExpertiseToUpdate,
    });
  } catch (error) {
    console.error("Error updating expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update expertise",
      error: error.message,
    });
  }
};

exports.deleteMainExpertise = async function (req, res) {
  try {
    const { mainExpertiseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(mainExpertiseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Main Expertise ID" });
    }

    const deletedMainExpertise = await MainExpertise.findByIdAndDelete(
      mainExpertiseId
    );

    const astrologerData = await Astrologer.find({
      mainExpertise: { $in: [mainExpertiseId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { mainExpertise: mainExpertiseId } }
        );
      }
    }

    if (!deletedMainExpertise) {
      return res
        .status(404)
        .json({ success: false, message: "Main Expertise not found." });
    }

    res.status(200).json({
      success: true,
      message: "Main Expertise deleted successfully",
      deletedMainExpertise,
    });
  } catch (error) {
    console.error("Error deleting main Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete main Expertise",
      error: error.message,
    });
  }
};

exports.getMainExpertise = async function (req, res) {
  try {
    // Fetch all skills from the database
    const mainExpertise = await MainExpertise.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, mainExpertise });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expertise",
      error: error.message,
    });
  }
};

// Gift


exports.addGift = async function (req, res) {

  try {
    const { gift, amount, description } = req.body;
    if (
      !gift ||
      !amount ||
      !description ||
      !req.files ||
      !req.files["image"] ||
      req.files["image"].length === 0
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required to add gift",
      });
    }

    let imagePath = "";

    if (req.files["image"]) {
      imagePath = req.files["image"][0].path.replace(
        /^.*gifts[\\/]/,
        "uploads/gifts/"
      );
    }

    const newGift = new Gift({
      gift,
      giftIcon: imagePath,
      amount,
      description,
    });
    await newGift.save();

    res.status(200).json({
      success: true,
      message: "Gift added successfully",
      gift: newGift,
    });
  } catch (error) {
    console.error("Error updating Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create gifts.",
      error: error.message,
    });
  }
};

exports.viewGift = async function (req, res) {
  try {
    // Fetch all skills from the database
    const gift = await Gift.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, gift });
  } catch (error) {
    console.error("Error fetching Gift:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Gift",
      error: error.message,
    });
  }
};

exports.updateGift = async function (req, res) {

  try {
    const { giftId, gift, amount, description } = req.body;

    const giftToUpdate = await Gift.findById(giftId);

    if (!giftToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Gift not found." });
    }

    let imagePath = "";

    if (req.files["image"]) {
      imagePath = req.files["image"][0].path.replace(
        /^.*gifts[\\/]/,
        "uploads/gifts/"
      );
      giftToUpdate.giftIcon = imagePath;
    }

    if (gift) {
      giftToUpdate.gift = gift;
    }

    if (amount) {
      giftToUpdate.amount = amount;
    }
    if (description) {
      giftToUpdate.description = description;
    }

    await giftToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Gift updated successfully",
      gift: giftToUpdate,
    });
  } catch (error) {
    console.error("Error updating Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update gifts.",
      error: error.message,
    });
  }
};

exports.deleteGift = async function (req, res) {
  try {
    const giftId = req.body.giftId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(giftId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Gift ID" });
    }

    const deletedGift = await Gift.findByIdAndDelete(giftId);

    if (!deletedGift) {
      return res
        .status(404)
        .json({ success: false, message: "Gift not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Gift deleted successfully",
      deletedGift,
    });
  } catch (error) {
    console.error("Error deleting Gift:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Gift",
      error: error.message,
    });
  }
};

// Review

// exports.addReview = async function(req, res) {
//   try {
//     const { customerId, astrologerId, ratings, comments } = req.body;

//     const existingCustomer = await Customers.findById(customerId);
//     if (!existingCustomer) {
//       return res.status(404).json({ success: false, message: 'Selected Customer not found.' });
//     }

//     const existingAstrologer = await Astrologer.findById(astrologerId);
//     if (!existingAstrologer) {
//       return res.status(404).json({ success: false, message: 'Selected Astrologer not found.' });
//     }

//     // Check if the review already exists for the customer and astrologer
//     let existingReview = await Review.findOne({ customer: customerId, astrologer: astrologerId });

//     if (existingReview) {
//       // Update existing review
//       existingReview.ratings = ratings;
//       existingReview.comments = comments;
//       await existingReview.save();
//       res.status(200).json({ success: true, message: 'Review updated successfully', data: existingReview });
//     } else {
//       // Create a new review
//       const newReview = new Review({ customer: customerId, astrologer: astrologerId, ratings, comments });
//       await newReview.save();
//       res.status(201).json({ success: true, message: 'Review added successfully', data: newReview });
//     }
//   } catch (error) {
//     console.error('Error adding/updating Review:', error);
//     res.status(500).json({ success: false, message: 'Failed to add/update Review', error: error.message });
//   }
// };

exports.addReview = async function (req, res) {
  try {
    const { customerId, astrologerId, ratings, comments } = req.body;

    const existingCustomer = await Customers.findById(customerId);
    console.log(existingCustomer)

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const existingAstrologer = await Astrologer.findById(astrologerId);

    if (!existingAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });

    }

    const newReview = new Review({
      customer: customerId,
      astrologer: astrologerId,
      ratings,
      comments,
    });

    await newReview.save();

    const astrologerReviews = await Review.find({
      astrologer: astrologerId,
      is_verified: true,
    }).populate("customer", ["image", "customerName"]);

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);

      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);


    if (!Number.isNaN(averageRating)) {
      existingAstrologer.rating = averageRating
      existingAstrologer.avg_rating = averageRating
      await existingAstrologer.save()
    }

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      Review: Review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

exports.verifyReview = async function (req, res) {
  try {
    const { review_id } = req.body;

    const existingReview = await Review.findOne({ _id: review_id });

    if (!existingReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    if (existingReview.is_verified) {
      existingReview.is_verified = false;
    } else {
      existingReview.is_verified = true;
    }
    await existingReview.save();

    const astrologerId = existingReview?.astrologer;

    const astrologerReviews = await Review.find({
      astrologer: astrologerId,
      is_verified: true,
    });

    if (!astrologerReviews || astrologerReviews.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No reviews found for this astrologer.",
      });
    }

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);
      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);

    const astrologer = await Astrologer.findById(astrologerId);

    astrologer.rating = averageRating;

    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Review verification updated successfully",
      review: existingReview,
    });
  } catch (error) {
    console.error("Error updating review verification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review verification",
      error: error.message,
    });
  }
};

exports.getAllReview = async function (req, res) {
  try {
    const review = await Review.find()
      .populate("astrologer", "astrologerName")
      .populate("customer", "customerName"); // Populate the astrologer field with astrologerName

    res.status(200).json({ success: true, review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

exports.updateReview = async function (req, res) {
  try {
    const { reviewId, ratings, comments } = req.body;

    const reviewToUpdate = await Review.findById(reviewId);

    if (!reviewToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    if (ratings) {
      reviewToUpdate.ratings = ratings;
    }
    if (comments) {
      reviewToUpdate.comments = comments;
    }

    await reviewToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: reviewToUpdate,
    });
  } catch (error) {
    console.error("Error updating Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Review",
      error: error.message,
    });
  }
};

exports.getAstrologersReviews = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologerReviews = await Review.find({ astrologer: astrologerId }).populate('customer', 'customerName').populate('astrologer', 'astrologerName');

    if (!astrologerReviews || astrologerReviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this astrologer.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: astrologerReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};



exports.getCustomersReviews = async (req, res) => {
  try {

    const { customerId } = req.body;

    if (!customerId || customerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerId!'
      })
    }

    const customerReviews = await Review.find({ customer: customerId }).populate('customer', 'customerName').populate('astrologer', 'astrologerName')

    if (!customerReviews || customerReviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this customer.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: customerReviews,
    });

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.astrologersVerifiedReviews = async function (req, res) {
  try {
    const { astrologer_id } = req.body;
    const astrologerReviews = await Review.find({
      astrologer: astrologer_id,
      is_verified: true,
    }).populate("customer", ["image", "customerName"]);


    // if (!astrologerReviews || astrologerReviews.length === 0) {
    //   return res.status(200).json({
    //     success: false,
    //     message: "No reviews found for this astrologer.",
    //   });
    // }

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);
      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const onePercentage = (oneRating / length) * 100;
    const twoPercentage = (twoRating / length) * 100;
    const threePrecentage = (threeRating / length) * 100;
    const fourPercentage = (fourRating / length) * 100;
    const fivePercentage = (fiveRating / length) * 100;

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: astrologerReviews,
      summary: {
        oneRating,
        twoRating,
        threeRating,
        fourRating,
        fiveRating,
        onePercentage,
        twoPercentage,
        threePrecentage,
        fourPercentage,
        fivePercentage,
        totalReview: length,
        totalUsers: users.size,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

exports.deleteReview = async function (req, res) {
  try {
    const reviewId = req.body.reviewId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Review ID" });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: "review not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      deletedReview,
    });
  } catch (error) {
    console.error("Error deleting Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Review",
      error: error.message,
    });
  }
};

// Pages (FAQ's)
exports.addFaq = async function (req, res) {
  try {
    const { question, description } = req.body;

    const newFaq = new Faq({ question, description });
    await newFaq.save();

    res.status(200).json({ success: true, message: "Faq added successfully" });
  } catch (error) {
    console.error("Error adding Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Faq",
      error: error.message,
    });
  }
};

exports.getAllFaq = async function (req, res) {
  try {
    const faq = await Faq.find();

    res.status(200).json({ success: true, faq });
  } catch (error) {
    console.error("Error fetching Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Faq",
      error: error.message,
    });
  }
};

exports.updateFaq = async function (req, res) {
  try {
    const { faqId, question, description } = req.body;

    const faqToUpdate = await Faq.findById(faqId);

    if (!faqToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Faq not found." });
    }

    if (question) {
      faqToUpdate.question = question;
    }
    if (description) {
      faqToUpdate.description = description;
    }

    await faqToUpdate.save();

    res.status(200).json({
      success: true,
      message: "faq updated successfully",
      faq: faqToUpdate,
    });
  } catch (error) {
    console.error("Error updating faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update faq",
      error: error.message,
    });
  }
};

exports.deleteFaq = async function (req, res) {
  try {
    const faqId = req.body.faqId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(faqId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Faq ID" });
    }

    const deletedFaq = await Faq.findByIdAndDelete(faqId);

    if (!deletedFaq) {
      return res
        .status(404)
        .json({ success: false, message: "Faq not found." });
    }

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Faq deleted successfully", deletedFaq });
  } catch (error) {
    console.error("Error deleting Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Faq.",
      error: error.message,
    });
  }
};


exports.addTandC = async (req, res) => {
  const { description, type } = req.body;
  if (!description) {
    return res.status(400).json({
      success: false,
      message: 'Please provide description'
    })
  }

  if (!type) {
    return res.status(400).json({
      success: false,
      message: 'type is requried!'
    })
  }
  try {
    const findTermsData = await TandC.findOne({ type: type })
    if (!findTermsData) {
      if (type == 'Astrologer') {
        const newTermsAndCondition = new TandC({
          description,
          type
        });
        const savedTermsAndCondition = await newTermsAndCondition.save();
        return res.status(201).json({ success: true, message: "Terms and conditions created successfully for Astrologer", results: savedTermsAndCondition });

      }

      if (type == 'Customer') {
        const newTermsAndCondition = new TandC({
          description,
          type
        });
        const savedTermsAndCondition = await newTermsAndCondition.save();
        return res.status(201).json({ success: true, message: "Terms and conditions created successfully for Customer", results: savedTermsAndCondition });

      }



      //return res.status(201).json({ success: true, message: "Terms and conditions created successfully", results: savedTermsAndCondition });

    }

    else {
      const Id = findTermsData._id;
      const updateTermsCondition = await TandC.findByIdAndUpdate({ _id: Id }, { description, type }, { new: true })

      return res.status(200).json({ success: true, message: "Terms and conditions updated successfully", results: updateTermsCondition });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
},

  exports.deleteTandC = async function (req, res) {
    try {
      const TandCId = req.body.TandCId; // Assuming the ID is passed as a parameter

      if (!mongoose.Types.ObjectId.isValid(TandCId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid TandC ID" });
      }

      const deletedTandC = await TandC.findByIdAndDelete(TandCId);

      if (!deletedTandC) {
        return res
          .status(404)
          .json({ success: false, message: "TandC not found." });
      }

      // Return success response
      res.status(200).json({
        success: true,
        message: "Terms and Condition deleted successfully",
        deletedTandC,
      });
    } catch (error) {
      console.error("Error deleting Terms and Condition:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete Terms and Condition.",
        error: error.message,
      });
    }
  };

exports.viewTandC = async function (req, res) {
  try {
    const { type } = req.body;

    if (!type || type == "") {
      return res.status(400).json({
        success: false,
        message: 'type is required!'
      })
    }

    const termsAndCondition = await TandC.findOne({ type: type });

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, termsAndCondition });
  } catch (error) {
    console.error("Error fetching Terms And Condition:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Terms And Condition",
      error: error.message,
    });
  }
};

exports.addPrivacyPolicy = async (req, res) => {
  const { description } = req.body;
  if (!description || description == " ") {
    return res.status(400).json({
      success: false,
      message: 'Please Provide description'
    })
  }

  try {
    const findPrivacyPolicy = await PrivacyPolicy.findOne({});
    if (!findPrivacyPolicy) {
      const newPrivacyPolicy = new PrivacyPolicy({ description });
      const savedPrivacyPolicy = await newPrivacyPolicy.save();

      res.status(201).json({ success: true, message: "Privacy Policy created successfully", results: savedPrivacyPolicy });

    }

    else {
      const Id = findPrivacyPolicy._id;
      const updatePrivacyPolicy = await PrivacyPolicy.findByIdAndUpdate({ _id: Id }, { description }, { new: true });

      return res.status(200).json({
        success: true,
        message: 'Privacy policy updated successfully',
        results: updatePrivacyPolicy
      })
    }

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
},





  exports.addAboutUs = async (req, res) => {
    const { description } = req.body;
    if (!description || description == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please Provide description'
      })
    }

    try {
      const about = await About.findOne({});
      if (!about) {
        const newAbout = new About({ description });
        const savedAbout = await newAbout.save();

        res.status(201).json({ success: true, message: "About created successfully", results: savedAbout });

      }

      else {
        const Id = about._id;
        const updateAbout = await About.findByIdAndUpdate({ _id: Id }, { description }, { new: true });

        return res.status(200).json({
          success: true,
          message: 'About updated successfully',
          results: updateAbout
        })
      }

    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  exports.deletePrivacyPolicy = async function (req, res) {
    try {
      const privacyPolicyId = req.body.privacyPolicyId; // Assuming the ID is passed as a parameter

      if (!mongoose.Types.ObjectId.isValid(privacyPolicyId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Privacy Policy ID" });
      }

      const deletedPrivacyPolicy = await PrivacyPolicy.findByIdAndDelete(
        privacyPolicyId
      );

      if (!deletedPrivacyPolicy) {
        return res
          .status(404)
          .json({ success: false, message: "Privacy Policy not found." });
      }

      // Return success response
      res.status(200).json({
        success: true,
        message: "Privacy Policy deleted successfully",
        deletedPrivacyPolicy,
      });
    } catch (error) {
      console.error("Error deleting Privacy Policy:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete Privacy Policy.",
        error: error.message,
      });
    }
  };

exports.viewPrivacyPolicy = async function (req, res) {
  try {
    // Fetch all skills from the database
    const privacyPolicy = await PrivacyPolicy.findOne();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, privacyPolicy });
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch privacy policy",
      error: error.message,
    });
  }
};


exports.getAboutUs = async function (req, res) {
  try {
    // Fetch all skills from the database
    const about = await About.findOne();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, about });
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch aboutus"
      // error: error.message,
    });
  }
};

exports.addVideoUrl = async function (req, res) {
  try {
    const { videoUrl } = req.body;

    const newHowToUseVideo = new HowToUseVideo({ videoUrl });
    await newHowToUseVideo.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Video Url added successfully",
      videoUrl: newHowToUseVideo,
    });
  } catch (error) {
    console.error("Error adding Video Url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Video Url",
      error: error.message,
    });
  }
};

exports.deleteVideoUrl = async function (req, res) {
  try {
    const videoUrlId = req.body.videoUrlId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(videoUrlId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video url ID" });
    }

    const deletedVideoUrl = await HowToUseVideo.findByIdAndDelete(videoUrlId);

    if (!deletedVideoUrl) {
      return res
        .status(404)
        .json({ success: false, message: "video url not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Video url deleted successfully",
      deletedVideoUrl,
    });
  } catch (error) {
    console.error("Error deleting Video url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Video url.",
      error: error.message,
    });
  }
};

exports.viewVideoUrl = async function (req, res) {
  try {
    // Fetch all skills from the database
    const videoUrl = await HowToUseVideo.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, videoUrl });
  } catch (error) {
    console.error("Error fetching video url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch video url",
      error: error.message,
    });
  }
};


// Ask question 
exports.addAskQuestion = async function (req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(200).json({
        success: false,
        message: "title and description is required",
      });
    }

    const newAskQuestion = new AskQuestion({ title, description });
    await newAskQuestion.save();

    return res.status(200).json({
      success: true,
      message: "title to Ask Question added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getAskQuestion = async function (req, res) {
  try {
    const askQuestion = await AskQuestion.find();

    res.status(200).json({ success: true, askQuestion });
  } catch (error) {
    console.error("Error fetching Title to  Ask Question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Ask Question",
      error: error.message,
    });
  }
};

exports.updateAskQuestion = async function (req, res) {
  try {
    const { askQuestionId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const askQuestion = await AskQuestion.findById(askQuestionId);


    if (!askQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "AskQuestion entry not found." });
    }

    // Update the title field
    askQuestion.title = title;
    askQuestion.description = description;
    await askQuestion.save();

    res.status(200).json({
      success: true,
      message: "Ask Question entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteAskQuestion = async function (req, res) {
  try {
    const questionId = req.body.questionId;

    const deletedAskQuestion = await AskQuestion.findByIdAndDelete(questionId);

    if (!deletedAskQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};
// Ask Question 

// Religion & Sprituality
exports.addReligionSpirituality = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newReligionSpirituality = new ReligionSpirituality({ title, description });
    await newReligionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "title to Religion Spirituality added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getReligionSpirituality = async function (req, res) {
  try {
    const religionSpirituality = await ReligionSpirituality.find();

    res.status(200).json({ success: true, religionSpirituality });
  } catch (error) {
    console.error("Error fetching Title to  Ask Question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Ask Question",
      error: error.message,
    });
  }
};

exports.updateReligionSpirituality = async function (req, res) {
  try {
    const { religionSpiritualityId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const religionSpirituality = await ReligionSpirituality.findById(religionSpiritualityId);


    if (!religionSpirituality) {
      return res
        .status(404)
        .json({ success: false, message: "ReligionSpirituality entry not found." });
    }

    // Update the title field
    religionSpirituality.title = title;
    religionSpirituality.description = description;
    await religionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "Religion Spirituality entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteReligionSpirituality = async function (req, res) {
  try {
    const religionSpiritualityId = req.body.religionSpiritualityId;

    const deletedReligionSpirituality = await ReligionSpirituality.findByIdAndDelete(religionSpiritualityId);

    if (!deletedReligionSpirituality) {
      return res
        .status(404)
        .json({ success: false, message: "Religion Spirituality not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Religion Spirituality deleted successfully" });
  } catch (error) {
    console.error("Error deleting Religion Spirituality:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Religion Spirituality",
      error: error.message,
    });
  }
};
// Religion & Sprituality

// Astro magazine
exports.addAstroMagazine = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newAstroMagazine = new AstroMagazine({ title, description });
    await newAstroMagazine.save();

    res.status(200).json({
      success: true,
      message: "title to AstroMagazine added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getAstroMagazine = async function (req, res) {
  try {
    const astroMagazine = await AstroMagazine.find();

    res.status(200).json({ success: true, astroMagazine });
  } catch (error) {
    console.error("Error fetching Title to  AstroMagazine:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to AstroMagazine",
      error: error.message,
    });
  }
};

exports.updateAstroMagazine = async function (req, res) {
  try {
    const { astroMagazineId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const astroMagazine = await AstroMagazine.findById(astroMagazineId);


    if (!astroMagazine) {
      return res
        .status(404)
        .json({ success: false, message: "AstroMagazine entry not found." });
    }

    // Update the title field
    astroMagazine.title = title;
    astroMagazine.description = description;
    await astroMagazine.save();

    res.status(200).json({
      success: true,
      message: "AstroMagazine entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteAstroMagazine = async function (req, res) {
  try {
    const astroMagazineId = req.body.astroMagazineId;

    const deletedAstroMagazine = await AstroMagazine.findByIdAndDelete(astroMagazineId);

    if (!deletedAstroMagazine) {
      return res
        .status(404)
        .json({ success: false, message: "AstroMagazine not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "AstroMagazine deleted successfully" });
  } catch (error) {
    console.error("Error deleting AstroMagazine:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete AstroMagazine",
      error: error.message,
    });
  }
};
// Astro magazine

//Birhat horoscope

exports.addBirhatHoroscope = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newBirhatHoroscope = new BirhatHoroscope({ title, description });
    await newBirhatHoroscope.save();

    res.status(200).json({
      success: true,
      message: "title and Description to Birhat Horoscope added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getBirhatHoroscope = async function (req, res) {
  try {
    const birhatHoroscope = await BirhatHoroscope.find();

    res.status(200).json({ success: true, birhatHoroscope });
  } catch (error) {
    console.error("Error fetching Title and description of Birhat Horoscope:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Birhat Horoscope",
      error: error.message,
    });
  }
};

exports.updateBirhatHoroscope = async function (req, res) {
  try {
    const { birhatHoroscopeId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const birhatHoroscope = await BirhatHoroscope.findById(birhatHoroscopeId);


    if (!birhatHoroscope) {
      return res
        .status(404)
        .json({ success: false, message: "Birhat Horoscope entry not found." });
    }

    // Update the title field
    birhatHoroscope.title = title;
    birhatHoroscope.description = description;
    await birhatHoroscope.save();

    res.status(200).json({
      success: true,
      message: "Birhat Horoscope updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteBirhatHoroscope = async function (req, res) {
  try {
    const birhatHoroscopeId = req.body.birhatHoroscopeId;

    const deleteBirhatHoroscope = await BirhatHoroscope.findByIdAndDelete(birhatHoroscopeId);

    if (!deleteBirhatHoroscope) {
      return res
        .status(404)
        .json({ success: false, message: "Birhat Horoscope not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Birhat Horoscope deleted successfully" });
  } catch (error) {
    console.error("Error deleting Birhat Horoscope:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Birhat Horoscope",
      error: error.message,
    });
  }
};

// Birhat horoscope

// Daily panchang
exports.addDailyPanchang = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newReligionSpirituality = new DailyPanchang({ title, description });
    await newReligionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "title to Religion Spirituality added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getDailyPanchang = async function (req, res) {
  try {
    const dailyPanchang = await DailyPanchang.find();

    res.status(200).json({ success: true, dailyPanchang });
  } catch (error) {
    console.error("Error fetching Title to Daily Panchang:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Daily Panchang",
      error: error.message,
    });
  }
};

exports.updateDailyPanchang = async function (req, res) {
  try {
    const { dailyPanchangId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const dailyPanchang = await DailyPanchang.findById(dailyPanchangId);


    if (!dailyPanchang) {
      return res
        .status(404)
        .json({ success: false, message: "DailyPanchang entry not found." });
    }

    // Update the title field
    dailyPanchang.title = title;
    dailyPanchang.description = description;
    await dailyPanchang.save();

    res.status(200).json({
      success: true,
      message: "Daily Panchang entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteDailyPanchang = async function (req, res) {
  try {
    const dailyPanchangId = req.body.dailyPanchangId;

    const deletedDailyPanchang = await DailyPanchang.findByIdAndDelete(dailyPanchangId);

    if (!deletedDailyPanchang) {
      return res
        .status(404)
        .json({ success: false, message: "Daily Panchang not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Daily Panchang deleted successfully" });
  } catch (error) {
    console.error("Error deleting Daily Panchang:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Daily Panchang",
      error: error.message,
    });
  }
};

// Daily panchang

// Remedies 
exports.addRemedies = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newRemedies = new Remedies({ title, description });
    await newRemedies.save();

    res.status(200).json({
      success: true,
      message: "title to Remedies added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getRemedies = async function (req, res) {
  try {
    const remedies = await Remedies.find();

    res.status(200).json({ success: true, remedies });
  } catch (error) {
    console.error("Error fetching Title to remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to remedies",
      error: error.message,
    });
  }
};

exports.updateRemedies = async function (req, res) {
  try {
    const { remediesId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const remedies = await Remedies.findById(remediesId);


    if (!remedies) {
      return res
        .status(404)
        .json({ success: false, message: "remedies entry not found." });
    }

    // Update the title field
    remedies.title = title;
    remedies.description = description;
    await remedies.save();

    res.status(200).json({
      success: true,
      message: "remedies entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteRemedies = async function (req, res) {
  try {
    const remediesId = req.body.remediesId;

    const remedies = await Remedies.findByIdAndDelete(remediesId);

    if (!remedies) {
      return res
        .status(404)
        .json({ success: false, message: "remedies not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "remedies deleted successfully" });
  } catch (error) {
    console.error("Error deleting remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete remedies",
      error: error.message,
    });
  }
};

// Remedies 

// yellow book
exports.addYellowBook = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newYellowBook = new YellowBook({ title, description });
    await newYellowBook.save();

    res.status(200).json({
      success: true,
      message: "title to YellowBook added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getYellowBook = async function (req, res) {
  try {
    const yellowBook = await YellowBook.find();

    res.status(200).json({ success: true, yellowBook });
  } catch (error) {
    console.error("Error fetching Title to yellowBook:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to yellowBook",
      error: error.message,
    });
  }
};

exports.updateYellowBook = async function (req, res) {
  try {
    const { yellowBookId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const yellowBook = await YellowBook.findById(yellowBookId);


    if (!yellowBook) {
      return res
        .status(404)
        .json({ success: false, message: "yellowBook entry not found." });
    }

    // Update the title field
    yellowBook.title = title;
    yellowBook.description = description;
    await yellowBook.save();

    res.status(200).json({
      success: true,
      message: "yellowBook entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteYellowBook = async function (req, res) {
  try {
    const yellowBookId = req.body.yellowBookId;

    const deletedYellowBook = await YellowBook.findByIdAndDelete(yellowBookId);

    if (!deletedYellowBook) {
      return res
        .status(404)
        .json({ success: false, message: "YellowBook not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "YellowBook deleted successfully" });
  } catch (error) {
    console.error("Error deleting YellowBook:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete YellowBook",
      error: error.message,
    });
  }
};
// yellow book

// Numerology

const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
  { name: "numerology_image", maxCount: 1 },
]);

exports.addNumerology = async function (req, res) {
  try {
    uploadNumerologyImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const numerology_image = req.files["numerology_image"]
          ? req.files["numerology_image"][0].path.replace(
            /^.*NumerologyImage[\\/]/,
            "NumerologyImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newNumerology = new Numerology({ title, description, numerology_image });
        await newNumerology.save();

        res.status(201).json({
          success: true,
          message: "Numerology uploaded successfully.",
          data: newNumerology,
        });
      } catch (error) {
        console.error("Error uploading Numerology:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload Numerology.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};


exports.getAllNumerology = async function (req, res) {
  try {
    const numerology = await Numerology.find();

    res.status(200).json({ success: true, numerology });
  } catch (error) {
    console.error("Error fetching Numerology:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Numerology",
      error: error.message,
    });
  }
};

exports.updateNumerology = function (req, res) {
  uploadNumerologyImage(req, res, async function (err) {
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
      const { numerologyId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingNumerology = await Numerology.findById(numerologyId);
      if (!existingNumerology) {
        return res
          .status(404)
          .json({ success: false, message: "Numerology not found." });
      }

      existingNumerology.title = title;
      existingNumerology.description = description;

      if (
        req.files &&
        req.files["numerology_image"] &&
        req.files["numerology_image"][0] &&
        req.files["numerology_image"][0].path
      ) {
        const imagePath = req.files["numerology_image"][0].path.replace(
          /^.*NumerologyImage[\\/]/,
          "NumerologyImage/"
        );
        existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingNumerology.save();

      res.status(200).json({
        success: true,
        message: "Numerology updated successfully.",
        data: existingNumerology,
      });
    } catch (error) {
      console.error("Error updating Numerology:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Numerology.",
        error: error.message,
      });
    }
  });
};

exports.deleteNumerology = async function (req, res) {
  try {
    const numerologyId = req.body.numerologyId;

    const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

    if (!deletedNumerology) {
      return res
        .status(404)
        .json({ success: false, message: "Numerology not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Numerology deleted successfully" });
  } catch (error) {
    console.error("Error deleting Numerology:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Numerology",
      error: error.message,
    });
  }
};
// Numerology

// Vivah Muhurat
const uploadVivahMuhuratImage = configureMulter("uploads/VivahMuhuratImage/", [
  { name: "vivahMuhurat_image", maxCount: 1 },
]);

exports.addVivahMuhurat = async function (req, res) {
  try {
    uploadVivahMuhuratImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const vivahMuhurat_image = req.files["vivahMuhurat_image"]
          ? req.files["vivahMuhurat_image"][0].path.replace(
            /^.*VivahMuhuratImage[\\/]/,
            "VivahMuhuratImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newVivahMuhurat = new VivahMuhurat({ title, description, vivahMuhurat_image });
        await newVivahMuhurat.save();

        res.status(201).json({
          success: true,
          message: "VivahMuhurat uploaded successfully.",
          data: newVivahMuhurat,
        });
      } catch (error) {
        console.error("Error uploading VivahMuhurat:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload VivahMuhurat.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};


exports.getAllVivahMuhurat = async function (req, res) {
  try {
    const vivahMuhurat = await VivahMuhurat.find();

    res.status(200).json({ success: true, vivahMuhurat });
  } catch (error) {
    console.error("Error fetching vivahMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vivahMuhurat",
      error: error.message,
    });
  }
};

exports.updateVivahMuhurat = function (req, res) {
  uploadVivahMuhuratImage(req, res, async function (err) {
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
      const { vivahMuhuratId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingVivahMuhurat = await VivahMuhurat.findById(vivahMuhuratId);
      if (!existingVivahMuhurat) {
        return res
          .status(404)
          .json({ success: false, message: "VivahMuhurat not found." });
      }

      existingVivahMuhurat.title = title;
      existingVivahMuhurat.description = description;

      if (
        req.files &&
        req.files["vivahMuhurat_image"] &&
        req.files["vivahMuhurat_image"][0] &&
        req.files["vivahMuhurat_image"][0].path
      ) {
        const imagePath = req.files["vivahMuhurat_image"][0].path.replace(
          /^.*VivahMuhuratImage[\\/]/,
          "VivahMuhuratImage/"
        );
        existingVivahMuhurat.vivahMuhurat_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingVivahMuhurat.save();

      res.status(200).json({
        success: true,
        message: "VivahMuhurat updated successfully.",
        data: existingVivahMuhurat,
      });
    } catch (error) {
      console.error("Error updating VivahMuhurat:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update VivahMuhurat.",
        error: error.message,
      });
    }
  });
};

exports.deleteVivahMuhurat = async function (req, res) {
  try {
    const vivahMuhuratId = req.body.vivahMuhuratId;

    const deletedVivahMuhurat = await VivahMuhurat.findByIdAndDelete(vivahMuhuratId);

    if (!deletedVivahMuhurat) {
      return res
        .status(404)
        .json({ success: false, message: "VivahMuhurat not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "VivahMuhurat deleted successfully" });
  } catch (error) {
    console.error("Error deleting VivahMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete VivahMuhurat",
      error: error.message,
    });
  }
};
// Vivah Muhurat

// Mundan Muhurat
const uploadMundanMuhuratImage = configureMulter("uploads/MundanMuhuratImage/", [
  { name: "mundanMuhurat_image", maxCount: 1 },
]);

exports.addMundanMuhurat = async function (req, res) {
  try {
    uploadMundanMuhuratImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const mundanMuhurat_image = req.files["mundanMuhurat_image"]
          ? req.files["mundanMuhurat_image"][0].path.replace(
            /^.*MundanMuhuratImage[\\/]/,
            "MundanMuhuratImage/"
          )
          : "";

        const newMundanMuhurat = new MundanMuhurat({ title, description, mundanMuhurat_image });
        await newMundanMuhurat.save();

        res.status(201).json({
          success: true,
          message: "MundanMuhurat uploaded successfully.",
          data: newMundanMuhurat,
        });
      } catch (error) {
        console.error("Error uploading MundanMuhurat:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload MundanMuhurat.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};


exports.getAllMundanMuhurat = async function (req, res) {
  try {
    const mundanMuhurat = await MundanMuhurat.find();

    res.status(200).json({ success: true, mundanMuhurat });

  } catch (error) {
    console.error("Error fetching MundanMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch MundanMuhurat",
      error: error.message,
    });
  }
};

exports.updateMundanMuhurat = function (req, res) {
  uploadMundanMuhuratImage(req, res, async function (err) {
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
      const { mundanMuhuratId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingMundanMuhurat = await MundanMuhurat.findById(mundanMuhuratId);
      if (!existingMundanMuhurat) {
        return res
          .status(404)
          .json({ success: false, message: "MundanMuhurat not found." });
      }

      existingMundanMuhurat.title = title;
      existingMundanMuhurat.description = description;

      if (
        req.files &&
        req.files["mundanMuhurat_image"] &&
        req.files["mundanMuhurat_image"][0] &&
        req.files["mundanMuhurat_image"][0].path
      ) {
        const imagePath = req.files["mundanMuhurat_image"][0].path.replace(
          /^.*MundanMuhuratImage[\\/]/,
          "MundanMuhuratImage/"
        );
        existingMundanMuhurat.mundanMuhurat_image = imagePath;
      }

      await existingMundanMuhurat.save();

      res.status(200).json({
        success: true,
        message: "MundanMuhurat updated successfully.",
        data: existingMundanMuhurat,
      });
    } catch (error) {
      console.error("Error updating MundanMuhurat:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update MundanMuhurat.",
        error: error.message,
      });
    }
  });
};

exports.deleteMundanMuhurat = async function (req, res) {
  try {
    const mundanMuhuratId = req.body.mundanMuhuratId;

    const deletedMundanMuhurat = await MundanMuhurat.findByIdAndDelete(mundanMuhuratId);

    if (!deletedMundanMuhurat) {
      return res
        .status(200)
        .json({ success: false, message: "mundanMuhurat not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "mundanMuhurat deleted successfully" });
  } catch (error) {
    console.error("Error deleting mundanMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete mundanMuhurat",
      error: error.message,
    });
  }
};
// // Mundan Muhurat

// // Annaprashan 
const uploadAnnaprashanImage = configureMulter("uploads/AnnaprashanImage/", [
  { name: "annaprashan_image", maxCount: 1 },
]);

exports.addAnnaprashan = async function (req, res) {
  try {
    uploadAnnaprashanImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const annaprashan_image = req.files["annaprashan_image"]
          ? req.files["annaprashan_image"][0].path.replace(
            /^.*AnnaprashanImage[\\/]/,
            "AnnaprashanImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newAnnaprashan = new Annaprashan({ title, description, annaprashan_image });
        await newAnnaprashan.save();

        res.status(201).json({
          success: true,
          message: "Annaprashan uploaded successfully.",
          data: newAnnaprashan,
        });
      } catch (error) {
        console.error("Error uploading Annaprashan:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload Annaprashan.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};


exports.getAllAnnaprashan = async function (req, res) {
  try {
    const annaprashan = await Annaprashan.find();

    res.status(200).json({ success: true, annaprashan });
  } catch (error) {
    console.error("Error fetching Annaprashan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Annaprashan",
      error: error.message,
    });
  }
};

exports.updateAnnaprashan = function (req, res) {
  uploadAnnaprashanImage(req, res, async function (err) {
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
      const { annaprashanId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingAnnaprashan = await Annaprashan.findById(annaprashanId);
      if (!existingAnnaprashan) {
        return res
          .status(404)
          .json({ success: false, message: "Annaprashan not found." });
      }

      existingAnnaprashan.title = title;
      existingAnnaprashan.description = description;

      if (
        req.files &&
        req.files["annaprashan_image"] &&
        req.files["annaprashan_image"][0] &&
        req.files["annaprashan_image"][0].path
      ) {
        const imagePath = req.files["annaprashan_image"][0].path.replace(
          /^.*AnnaprashanImage[\\/]/,
          "AnnaprashanImage/"
        );
        existingAnnaprashan.annaprashan_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingAnnaprashan.save();

      res.status(200).json({
        success: true,
        message: "Annaprashan updated successfully.",
        data: existingAnnaprashan,
      });
    } catch (error) {
      console.error("Error updating Annaprashan:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Annaprashan.",
        error: error.message,
      });
    }
  });
};

exports.deleteAnnaprashan = async function (req, res) {
  try {
    const annaprashanId = req.body.annaprashanId;

    const deletedAnnaprashan = await Annaprashan.findByIdAndDelete(annaprashanId);

    if (!deletedAnnaprashan) {
      return res
        .status(404)
        .json({ success: false, message: "Annaprashan not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Annaprashan deleted successfully" });
  } catch (error) {
    console.error("Error deleting Annaprashan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Annaprashan",
      error: error.message,
    });
  }
};
// // Annaprashan 

// // Vidyarambh Muhurat
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Vidyarambh Muhurat

// // Dev Prathistha Muhurat 
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Dev Prathistha Muhurat 

// // GrihaPravesh Muhurat 
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // GrihaPravesh Muhurat 

// // GrihaRog Nivaran 
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // GrihaRog Nivaran 

// // SolarEclipse
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // SolarEclipse

// // Lunar Eclipse 
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Lunar Eclipse 

// // Rahukaal 
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Rahukaal 

// // Kaalsarp Dosha
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Kaalsarp Dosha

// // Learn Astrologer
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// exports.addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };


// exports.getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// exports.updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// exports.deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Learn Astrologer


// auspicious time
exports.addAuspiciousTime = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newAuspiciousTime = new AuspiciousTime({ title, description });
    await newAuspiciousTime.save();

    res.status(200).json({
      success: true,
      message: "title to Auspicious Time added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getAuspiciousTime = async function (req, res) {
  try {
    const auspiciousTime = await AuspiciousTime.find();

    res.status(200).json({ success: true, auspiciousTime });
  } catch (error) {
    console.error("Error fetching Title to AuspiciousTime:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch AuspiciousTime",
      error: error.message,
    });
  }
};

exports.updateAuspiciousTime = async function (req, res) {
  try {
    const { auspiciousTimeId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const auspiciousTime = await AuspiciousTime.findById(auspiciousTimeId);


    if (!auspiciousTime) {
      return res
        .status(404)
        .json({ success: false, message: "AuspiciousTime entry not found." });
    }

    // Update the title field
    auspiciousTime.title = title;
    auspiciousTime.description = description;
    await auspiciousTime.save();

    res.status(200).json({
      success: true,
      message: "AuspiciousTime entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteAuspiciousTime = async function (req, res) {
  try {
    const auspiciousTimeId = req.body.auspiciousTimeId;

    const deletedAuspiciousTime = await AuspiciousTime.findByIdAndDelete(auspiciousTimeId);

    if (!deletedAuspiciousTime) {
      return res
        .status(404)
        .json({ success: false, message: "AuspiciousTime not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "AuspiciousTime deleted successfully" });
  } catch (error) {
    console.error("Error deleting AuspiciousTime:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete AuspiciousTime",
      error: error.message,
    });
  }
};
// auspicious time

// Ask Astrologer
exports.addAskAstrologer = async function (req, res) {
  try {
    const { title } = req.body;

    const newAskAstrologer = new AskAstrologer({ title });
    await newAskAstrologer.save();

    res.status(200).json({
      success: true,
      message: "title to Ask Astrologer added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

exports.getAskAstrologer = async function (req, res) {
  try {
    const askAstrologer = await AskAstrologer.find();

    res.status(200).json({ success: true, askAstrologer });
  } catch (error) {
    console.error("Error fetching Title to ask astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to ask astrologer",
      error: error.message,
    });
  }
};

exports.updateAskAstrologer = async function (req, res) {
  try {
    const { askAstrologerId, title } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const askAstrologer = await AskAstrologer.findById(askAstrologerId);

    if (!askAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "AskAstrologer entry not found." });
    }

    // Update the title field
    askAstrologer.title = title;
    await askAstrologer.save();

    res.status(200).json({
      success: true,
      message: "AskAstrologer entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

exports.deleteAskAstrologer = async function (req, res) {
  try {
    const askAstrologerId = req.body.askAstrologerId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(askAstrologerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Ask Astrologer ID" });
    }

    const deletedAskAstrologer = await AskAstrologer.findByIdAndDelete(
      askAstrologerId
    );

    if (!deletedAskAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "title not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
      deletedAskAstrologer,
    });
  } catch (error) {
    console.error("Error deleting title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete title.",
      error: error.message,
    });
  }
};

exports.addAskAstrologerQuestion = async function (req, res) {
  try {
    const { question, titleId } = req.body; // Assuming you receive question and titleId from the request

    const existingTitle = await AskAstrologer.findById(titleId);

    if (!existingTitle) {
      return res.status(404).json({
        success: false,
        message: "Selected title not found in AskAstrologer.",
      });
    }

    const newQuestion = new ListOfQuestion({ question, title: titleId });
    await newQuestion.save();

    res
      .status(201)
      .json({ success: true, message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add question",
      error: error.message,
    });
  }
};

exports.getAllQuestions = async function (req, res) {
  try {
    const allQuestions = await ListOfQuestion.find().populate("title", "title");

    if (!allQuestions) {
      return res
        .status(404)
        .json({ success: false, message: "No questions found." });
    }

    res.status(200).json({ success: true, questions: allQuestions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

exports.updateAskAstrologerQuestion = async function (req, res) {
  try {
    const { questionId, titleId, question } = req.body;

    const existingTitle = await AskAstrologer.findById(titleId);

    if (!existingTitle) {
      return res.status(404).json({
        success: false,
        message: "Selected title not found in AskAstrologer.",
      });
    }

    const updatedQuestion = await ListOfQuestion.findByIdAndUpdate(
      questionId,
      { title: titleId, question },
      { new: true }
    );

    if (!updatedQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};

exports.deleteQuestion = async function (req, res) {
  try {
    const questionId = req.body.questionId;

    const deletedQuestion = await ListOfQuestion.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};


exports.addAstrologer = function (req, res) {
  try {
    uploadAstrologerImages(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }

      try {
        const {
          astrologerName,
          phoneNumber,
          alternateNumber,
          gender,
          email,
          chat_price,
          call_price,
          experience,
          about,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          password,
          confirm_password,
          preferredDays,
          language,
          rating,
          youtubeLink,
          free_min,
          account_type,
          short_bio,
          long_bio,
          workingOnOtherApps,
          startTime,
          endTime,
          skill,
          remedies,
          expertise,
          mainExpertise,
          panCard,
          aadharNumber,
          account_holder_name,
          account_number,
          IFSC_code,
          country_phone_code,
          currency,
          commission_remark,
          address,
          account_name,
          consultation_price,
          commission_call_price,
          commission_chat_price,
          video_call_price,
          commission_video_call_price,
          normal_video_call_price,
          commission_normal_video_call_price,
          follower_count
        } = req.body;

        // console.log(password)
        // console.log(confirm_password)

        // Validate required fields
        if (!astrologerName || !phoneNumber /* Add other required fields validation */) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
          });
        }

        // Validate phone number format
        if (!isValidPhoneNumber(phoneNumber)) {
          return res.status(400).json({
            success: false,
            message: "Invalid phone number format. Please provide a valid phone number.",
          });
        }

        // Validate specific fields
        // && IFSC_code.length !== 11
        // if (!IFSC_code) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "IFSC code must be 11 digits long.",
        //   });
        // }

        if (aadharNumber && aadharNumber.length !== 12) {
          return res.status(400).json({
            success: false,
            message: "Aadhar number must be 12 digits long.",
          });
        }

        // if (rating < 1 || rating > 5) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Rating must be between 1 and 5.",
        //   });
        // }

        if (panCard && !validatePanCard(panCard)) {
          return res.status(400).json({
            success: false,
            message: "Invalid PAN card number format.",
          });
        }

        // Check if the email already exists
        const existingEmail = await Astrologer.findOne({ email });
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: "Email already exists. Please use a different email address.",
          });
        }

        // Check if the astrologer already exists
        const existingAstrologer = await Astrologer.findOne({ phoneNumber });
        if (existingAstrologer) {
          return res.status(400).json({
            success: false,
            message: "Astrologer with this phone number already exists.",
          });
        }

        // Check if password and confirm_password match
        if (password != confirm_password) {
          return res.status(400).json({
            success: false,
            message: "Password and confirm password do not match.",
          });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // File upload handling for profile, id proof, and bank proof images
        const profileImage = req.files["profileImage"]
          ? await uploadFileToS3(req.files["profileImage"][0], "assetsImages/profileImage")
          : "";
        const id_proof_image = req.files["id_proof_image"]
          ? await uploadFileToS3(req.files["id_proof_image"][0], "assetsImages/profileImage")
          : "";
        const bank_proof_image = req.files["bank_proof_image"]
          ? await uploadFileToS3(req.files["bank_proof_image"][0], "assetsImages/profileImage")
          : "";

        const skillArray = Array.isArray(skill) ? skill : [];
        const remediesArray = Array.isArray(remedies) ? remedies : [];
        const expertiseArray = Array.isArray(expertise) ? expertise : [];
        const mainExpertiseArray = Array.isArray(mainExpertise)
          ? mainExpertise
          : [];
        const languageArray = Array.isArray(language) ? language : [];
        const preferredDaysArray = Array.isArray(preferredDays)
          ? preferredDays
          : [];

        // Create a new astrologer entry
        const newAstrologer = new Astrologer({
          astrologerName,
          phoneNumber,
          alternateNumber,
          gender,
          email,
          profileImage,
          id_proof_image,
          bank_proof_image,
          chat_price,
          call_price,
          experience,
          about,
          account_name,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          aadharNumber,
          password: password, // Save the hashed password
          remedies: remediesArray,
          preferredDays: preferredDaysArray,
          language: languageArray,
          // rating,
          youtubeLink,
          free_min,
          account_type,
          short_bio,
          long_bio,
          workingOnOtherApps,
          startTime,
          endTime,
          skill: skillArray,
          expertise: expertiseArray,
          mainExpertise: mainExpertiseArray,
          panCard,
          account_holder_name,
          account_number,
          IFSC_code,
          country_phone_code,
          currency,
          commission_remark,
          address,
          consultation_price,
          commission_call_price,
          commission_chat_price,
          video_call_price,
          commission_video_call_price,
          normal_video_call_price,
          commission_normal_video_call_price,
          follower_count,
          enquiry: false,
          isVerified: true,
        });

        await newAstrologer.save();

        res.status(201).json({
          success: true,
          message: "Astrologer added successfully.",
          data: newAstrologer,
        });
      } catch (error) {
        console.error("Error adding Astrologer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add Astrologer.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images.",
      error: error.message,
    });
  }
};


function isValidPhoneNumber(phoneNumber) {
  // Simple validation: check if phoneNumber is not all zeros
  return phoneNumber !== "0000000000";
}

function validatePanCard(pan) {
  // PAN card validation regex
  const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  return panRegex.test(pan);
}


exports.updateAstrologer = function (req, res) {
  try {
    uploadAstrologerImages(req, res, async function (err) {
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
        const astrologerId = req.body.astrologerId; // Assuming astrologerId is in the URL
        const existingAstrologer = await Astrologer.findById(astrologerId);

        if (!existingAstrologer) {
          return res.status(404).json({
            success: false,
            message: "Astrologer not found.",
          });
        }
        // Update astrologer's information
        const {
          astrologerName,
          phoneNumber,
          alternateNumber,
          gender,
          email,
          chat_price,
          call_price,
          experience,
          // about,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          password,
          preferredDays,
          language,
          // rating,
          // youtubeLink,
          free_min,
          account_type,
          // short_bio,
          long_bio,
          // workingOnOtherApps,
          // startTime,
          // endTime,
          skill,
          // subSkill,
          remedies,
          expertise,
          mainExpertise,
          panCard,
          aadharNumber,
          account_holder_name,
          account_number,
          IFSC_code,
          // country_phone_code,
          currency,
          // commission_remark,
          address,
          account_name,
          // consultation_price,
          commission_call_price,
          commission_chat_price,
          video_call_price,
          commission_video_call_price,
          normal_video_call_price,
          commission_normal_video_call_price,
          follower_count

        } = req.body;

        console.log(req.body)

        existingAstrologer.astrologerName = astrologerName;
        existingAstrologer.phoneNumber = phoneNumber;
        existingAstrologer.inquiry_status = 'false';
        existingAstrologer.enquiry = 'false';
        existingAstrologer.alternateNumber = alternateNumber;
        existingAstrologer.gender = gender;
        existingAstrologer.email = email;
        existingAstrologer.chat_price = chat_price;
        existingAstrologer.call_price = call_price;
        existingAstrologer.video_call_price = video_call_price;
        existingAstrologer.commission_video_call_price = commission_video_call_price;
        existingAstrologer.normal_video_call_price = normal_video_call_price;
        existingAstrologer.commission_normal_video_call_price = commission_normal_video_call_price;
        existingAstrologer.follower_count = follower_count;
        existingAstrologer.experience = experience;
        // existingAstrologer.about = about;
        existingAstrologer.city = city;
        existingAstrologer.state = state;
        existingAstrologer.country = country;
        existingAstrologer.zipCode = zipCode;
        existingAstrologer.dateOfBirth = dateOfBirth;
        existingAstrologer.password = password;
        existingAstrologer.language = language;
        existingAstrologer.account_holder_name = account_holder_name;
        (existingAstrologer.free_min = free_min),
          // (existingAstrologer.workingOnOtherApps = workingOnOtherApps);
          // (existingAstrologer.short_bio = short_bio),
          (existingAstrologer.long_bio = long_bio),
          (existingAstrologer.account_type = account_type),
          // (existingAstrologer.startTime = startTime);
          // existingAstrologer.endTime = endTime;
          existingAstrologer.panCard = panCard;
        existingAstrologer.account_number = account_number;
        existingAstrologer.IFSC_code = IFSC_code;
        // existingAstrologer.country_phone_code = country_phone_code;
        existingAstrologer.currency = currency;
        // existingAstrologer.youtubeLink = youtubeLink;
        // existingAstrologer.commission_remark = commission_remark;
        existingAstrologer.address = address;
        // existingAstrologer.consultation_price = consultation_price;
        existingAstrologer.commission_call_price = commission_call_price;
        existingAstrologer.commission_chat_price = commission_chat_price;
        // existingAstrologer.rating = rating;
        existingAstrologer.account_name = account_name;
        existingAstrologer.aadharNumber = aadharNumber;
        // File upload handling for profile, id proof, and bank proof images (similar to your addAstrologer API)
        existingAstrologer.preferredDays = Array.isArray(preferredDays)
          ? preferredDays
          : [preferredDays];
        existingAstrologer.skill = Array.isArray(skill) ? skill : [skill];
        existingAstrologer.remedies = Array.isArray(remedies)
          ? remedies
          : [remedies];
        existingAstrologer.expertise = Array.isArray(expertise)
          ? expertise
          : [expertise];
        existingAstrologer.mainExpertise = Array.isArray(mainExpertise)
          ? mainExpertise
          : [mainExpertise];

        if (req.files) {
          if (req.files["profileImage"]) {
            existingAstrologer.profileImage = await uploadFileToS3(req.files["profileImage"][0], "assetsImages/profileImage");
          }
          if (req.files["id_proof_image"]) {
            existingAstrologer.id_proof_image =
              await uploadFileToS3(req.files["id_proof_image"][0], "assetsImages/profileImage");
          }
          if (req.files["bank_proof_image"]) {
            existingAstrologer.bank_proof_image =
              await uploadFileToS3(req.files["bank_proof_image"][0], "assetsImages/profileImage");
          }
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
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images.",
      error: error.message,
    });
  }
};

// list of all Atrologers
exports.getAllAstrologers = async function (req, res) {
  try {
    const astrologers = await Astrologer.find({ isDeleted: 0, enquiry: false })
      .populate("skill", "skill") // Populate the 'skill' field and include only the 'skill' field from the referenced model
      .populate("expertise", "expertise")
      .populate("remedies", "remedy") // Populate the 'expertise' field and include only the 'expertise' field from the referenced model
      .populate("mainExpertise", "mainExpertise");

    res.status(200).json({ success: true, astrologers });
  } catch (error) {
    console.error("Error fetching Astrologers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologers",
      error: error.message,
    });
  }
};

exports.getAstrologerRequests = async function (req, res) {
  try {
    const requests = await AstrologerRequests.find().populate("astrologerId", ['astrologerName']);

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.updateServiceCharges = async function (req, res) {
  try {
    const { requestId } = req.body;
    const requestsData = await AstrologerRequests.findByIdAndDelete(requestId);

    const astrologer = await Astrologer.findById(requestsData?.astrologerId);

    if (!astrologer && !requestsData) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { chat_price, call_price, startTime, endTime, preferredDays } =
      requestsData;

    if (!!startTime) {
      astrologer.startTime = startTime;
    }
    if (!!endTime) {
      astrologer.endTime = endTime;
    }
    if (!!preferredDays) {
      astrologer.preferredDays = preferredDays;
    }
    if (!!chat_price) {
      astrologer.chat_price = chat_price;
    }
    if (!!call_price) {
      astrologer.call_price = call_price;
    }

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
// delete astrologer

exports.deleteAstrologerAccount = async function (req, res) {
  const astrologerId = req.body.astrologerId; // Assuming the astrologer ID is passed as a route parameter

  try {
    // Check if the astrologer exists
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologerId) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found.",
      });
    }

    // Perform additional cleanup tasks if needed
    // Delete the astrologer from the database
    await Astrologer.findByIdAndDelete(astrologerId);

    res.status(200).json({
      success: true,
      message: "Astrologer deleted successfully.",
      data: astrologer,
    });
  } catch (error) {
    console.error("Error deleting astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete astrologer.",
      error: error.message,
    });
  }
};

//old code
// exports.deleteAstrologerAccount = async function (req, res) {
//   try {
//     const astrologerId = req.body.astrologerId;

//     const deletedAstrologer = await Astrologer.findOne({ _id: astrologerId });

//     if (!deletedAstrologer) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Astrologer account not found." });
//     }

//     deletedAstrologer.isDeleted = 1;
//     await deletedAstrologer.save();

//     res.status(200).json({
//       success: true,
//       message: "Astrologers account deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting question:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Testimonial",
//       error: error.message,
//     });
//   }
// };

// old code

// add Astro blogs

//   exports.addAstroBlog = async function(req, res) {
//     try {
//         const { title, image, blogCategoryId, created_by, description } = req.body;

//         const existingCategory = await BlogsCategory.findById(blogCategoryId);

//         if (!existingCategory) {
//             return res.status(404).json({ success: false, message: 'Blog category not found.' });
//         }

//         const newAstroBlog = new AstroBlogs({
//             title,
//             image,
//             blogCategory: blogCategoryId, // Changed to match schema property name
//             created_by,
//             description,
//         });

//         await newAstroBlog.save();

//         res.status(200).json({ success: true, message: 'Astroblog added successfully', newAstroBlog });
//     } catch (error) {
//         console.error('Error adding astroblog:', error);
//         res.status(500).json({ success: false, message: 'Failed to add astroblog', error: error.message });
//     }
// };

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "blogsImage/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename); // Set unique filename with original extension
  },
});

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 1);
}

exports.addAstroBlog = async function (req, res) {
  try {
    uploadBlog(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { title, blogCategory, created_by, description, description_hi, blogCategoryId } = req.body;

      if (!title || !blogCategory || !created_by || !description) {
        return res
          .status(200)
          .json({ success: false, message: "All field is required" });
      }

      let imageUrl = "";

      if (req.files && req.files["image"]) {
        const file = req.files["image"][0];
        imageUrl = await uploadFileToS3(file, "assetsImages/blogs");
      }

      let imageUrls = [];

      if (req.files && req.files["images"]) {
        const files = req.files["images"];
        for (const file of files) {
          imageUrls.push(await uploadFileToS3(file, "assetsImages/tutorialImages"));
        }
      }

      if (!imageUrl) {
        return res
          .status(200)
          .json({ success: false, message: "image field is required" });
      }


      const newAstroBlog = new AstroBlogs({
        title,
        image: imageUrl,// Assign the image path to the 'image' field
        images: imageUrls,// Assign the image path to the 'image' field
        blogCategoryId: blogCategoryId,
        created_by,
        description,
        description_hi
      });

      await newAstroBlog.save();

      res.status(200).json({
        success: true,
        message: "Astroblog added successfully",
        newAstroBlog,
      });
    });
  } catch (error) {
    console.error("Error adding astroblog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add astroblog",
      error: error.message,
    });
  }
};

exports.updateAstroBlog = async function (req, res) {
  try {
    uploadBlog(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { blogId, title, created_by, description,description_hi, blogCategoryId } = req.body;


      let imageUrl = "";

      if (req.files && req.files["image"]) {
        const file = req.files["image"][0];
        imageUrl = await uploadFileToS3(file, "assetsImages/blogs");
      }

      let imageUrls = [];

      if (req.files && req.files["images"]) {
        const files = req.files["images"];
        for (const file of files) {
          imageUrls.push(await uploadFileToS3(file, "assetsImages/tutorialImages"));
        }
      }


      const blog = await AstroBlogs.findById(blogId)

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "blog not found",
        });
      }

      if (imageUrl) {
        blog.image = imageUrl
      }

      if (imageUrls.length > 0) {
        blog.images = imageUrls
      }

      blog.title = title ?? blog.title,
        blog.blogCategoryId = blogCategoryId ?? blog.blogCategory,
        blog.created_by = created_by ?? blog.created_by,
        blog.description = description ?? blog.description,
        blog.description_hi = description_hi ?? blog.description_hi


        await blog.save();

      res.status(200).json({
        success: true,
        message: "Astroblog updated successfully",
        blog,
      });
    });
  } catch (error) {
    console.error("Error updating astroblog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astroblog",
      error: error.message,
    });
  }
};

exports.getAstroBlogs = async function (req, res) {
  try {

    // Find the astrologer by email
    let blogs = await AstroBlogs.find().populate('blogCategoryId').sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message });
  }
};

exports.deleteAstroBlogs = async function (req, res) {
  try {

    const { blogId } = req.body
    // Find the astrologer by email
    let blog = await AstroBlogs.findByIdAndDelete(blogId)
    if (!blog) {
      return res.status(200).json({
        success: false,
        message: 'Blog not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Deleted',
      blog
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message });
  }
};

// get astrologer id
exports.checkAstrologer = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Find the astrologer by email
    let astrologer = await Astrologer.findOne({ email });

    if (astrologer && astrologer.password === password) {
      // If email and password match, return the astrologer ID
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        astrologerId: astrologer._id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Login failed. Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Error during astrologer login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// add blog category
exports.addBlogCategory = async function (req, res) {
  try {
    const { blog_category } = req.body;

    const newBlogCategory = new BlogsCategory({ blog_category });
    await newBlogCategory.save();

    res
      .status(200)
      .json({ success: true, message: "Blog Category added successfully" });
  } catch (error) {
    console.error("Error adding Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Blog Category",
      error: error.message,
    });
  }
};

exports.categoryBlogList = async function (req, res) {
  try {
    const categoryBlog = await BlogsCategory.find();

    res.status(200).json({ success: true, categoryBlog });
  } catch (error) {
    console.error("Error fetching Category Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Category Blog",
      error: error.message,
    });
  }
};

exports.updateBlogCategory = async function (req, res) {
  try {
    const { blogCategoryId, blogCategoryName } = req.body;
    const categoryBlog = await BlogsCategory.findById(blogCategoryId);

    if (!categoryBlog) {
      return res.status(404).json({ success: false, message: "Category Not Found" });
    }

    categoryBlog.blog_category = blogCategoryName;

    categoryBlog.save();

    res.status(200).json({ success: true, message: "Update SuccessFully" });
  } catch (error) {
    console.error("Error fetching Category Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Category Blog",
      error: error.message,
    });
  }
}

exports.deleteBlogCategory = async function (req, res) {
  try {

    const { categoryId } = req.body;
    const categoryBlog = await BlogsCategory.deleteOne(categoryId);

    res.status(200).json({ success: true, message: "Delete SuccessFully" });
  } catch (error) {
    console.error("Error fetching Category Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Category Blog",
      error: error.message,
    });
  }
}
// Testimonial

exports.addTestimonial = function (req, res) {
  uploadTestimonial(req, res, async function (err) {
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
      const { name, description,description_hi, rating } = req.body;

      // Validate required fields
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields.",
        });
      }

      let ImageUrl = "";

      if (req.files && req.files["images"]) {
        const file = req.files["images"][0];
        ImageUrl = await uploadFileToS3(file, "assetsImages/testimonialImage");
      }

      //     // Get the path of the uploaded image
      // const image = req.files['images'][0] ? `testimonialImage/${req.files['images'][0]?.filename}` : "";
      // console.log("@@@@@@@@@@@@@@@@@@@@@", req.files['images'])

      // Create a new testimonial entry in the Testimonial collection
      const newTestimonial = new Testimonial({
        name,
        image: ImageUrl,
        rating,
        description,
        description_hi,
      });
      await newTestimonial.save();

      res.status(201).json({
        success: true,
        message: "Testimonial created successfully.",
        data: newTestimonial,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};

// update Testimonial

exports.updateTestimonial = function (req, res) {
  uploadTestimonial(req, res, async function (err) {
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
      const { name, description,description_hi, rating, testimonialId } = req.body;

      // Validate required fields
      const requiredFields = [
        "name",
        "testimonialId",
        "description",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields
          .map((field) => `${field} is required`)
          .join(", ");
        return res.status(400).json({
          success: false,
          message: `${missingFieldsMessage}`,
        });
      }

      const existingTestimonial = await Testimonial.findById(testimonialId);

      if (!existingTestimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found." });
      }


      existingTestimonial.name = name;
      existingTestimonial.description = description;
      existingTestimonial.description_hi = description_hi;
      existingTestimonial.rating = rating;


      if (req.files && req.files["images"]) {
        const file = req.files["images"][0];
        const ImageUrl = await uploadFileToS3(file, "assetsImages/testimonialImage");
        existingTestimonial.image = ImageUrl;
      }

      await existingTestimonial.save();

      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully.",
        data: existingTestimonial,
      });
    } catch (error) {
      console.error("Error updating Testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Testimonial.",
        error: error.message,
      });
    }
  });
};

exports.deleteTestimonial = async function (req, res) {
  try {
    const testimonialId = req.body.testimonialId;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      testimonialId
    );

    if (!deletedTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Testimonial",
      error: error.message,
    });
  }
};

// get testimonial
exports.getAllTestimonial = async function (req, res) {
  try {
    // Fetch all Testimonial from the database
    const testimonial = await Testimonial.find();

    // Return the list of Testimonial as a JSON response
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    console.error("Error fetching Testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Testimonial",
      error: error.message,
    });
  }
};

// Temple Foundation
exports.addtemplefoundation = function (req, res) {
  uploadTempleFoundation(req, res, async function (err) {
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
      const { name } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields.",
        });
      }


      let bannerImageUrl = "";

      if (req.files && req.files["images"]) {
        const file = req.files["images"][0];
        bannerImageUrl = await uploadFileToS3(file, "assetsImages/testimonialImage");
      }


      // Create a new testimonial entry in the Testimonial collection
      const newTestimonial = new TempleFoundation({
        name,
        image: bannerImageUrl,
      });
      await newTestimonial.save();

      res.status(201).json({
        success: true,
        message: "Testimonial created successfully.",
        data: newTestimonial,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};

// update Temple Foundation

exports.updatetemplefoundation = function (req, res) {
  uploadTempleFoundation(req, res, async function (err) {
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
      const { name, id } = req.body;

      // Validate required fields
      const requiredFields = [
        "name",
        "id",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields
          .map((field) => `${field} is required`)
          .join(", ");
        return res.status(400).json({
          success: false,
          message: `${missingFieldsMessage}`,
        });
      }

      const existingTestimonial = await TempleFoundation.findById(id);

      if (!existingTestimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found." });
      }


      existingTestimonial.name = name;



      if (req.files && req.files["images"]) {
        const file = req.files["images"][0];
        const imagePath = await uploadFileToS3(file, "assetsImages/testimonialImage");
        existingTestimonial.image = imagePath;
      }

      await existingTestimonial.save();

      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully.",
        data: existingTestimonial,
      });
    } catch (error) {
      console.error("Error updating Testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Testimonial.",
        error: error.message,
      });
    }
  });
};

exports.deletetemplefoundation = async function (req, res) {
  try {
    const id = req.body.id;

    const deletedTestimonial = await TempleFoundation.findByIdAndDelete(
      id
    );

    if (!deletedTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Testimonial",
      error: error.message,
    });
  }
};

// get temple foundation
exports.getAlltemplefoundation = async function (req, res) {
  try {
    // Fetch all Testimonial from the database
    const testimonial = await TempleFoundation.find();

    // Return the list of Testimonial as a JSON response
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    console.error("Error fetching Testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Testimonial",
      error: error.message,
    });
  }
};

// add customer
exports.addCustomer = async function (req, res) {
  try {
    const { customerName, phoneNumber } = req.body;

    // Check if the customer already exists based on customerName and phoneNumber
    const existingCustomer = await Customers.findOne({
      customerName,
      phoneNumber,
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ success: false, message: "Customer already exists." });
    }

    const newCustomer = new Customers({ customerName, phoneNumber });
    await newCustomer.save();

    res
      .status(201)
      .json({ success: true, message: "Customer added successfully" });
  } catch (error) {
    console.error("Error adding Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Customer",
      error: error.message,
    });
  }
};

// show all-customer list
exports.getAllCustomers = async function (req, res) {
  try {
    // Fetch all skills from the database
    const customer = await Customers.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, customer });
  } catch (error) {
    console.error("Error fetching Customers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Customers",
      error: error.message,
    });
  }
};

//delete customer
exports.deleteCustomer = async function (req, res) {
  try {
    const customerId = req.body.customerId;

    const deletedCustomer = await Customers.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Customer",
      error: error.message,
    });
  }
};

//add Announcement
exports.addAnnouncement = async function (req, res) {
  try {
    const { description } = req.body;

    const newAnnouncement = new Announcement({ description });
    await newAnnouncement.save();

    res
      .status(201)
      .json({ success: true, message: "Announcement added successfully" });
  } catch (error) {
    console.error("Error adding Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Announcement",
      error: error.message,
    });
  }
};

exports.getAnnouncement = async function (req, res) {
  try {
    const announcement = await Announcement.find();

    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error("Error fetching Title to Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Announcement",
      error: error.message,
    });
  }
};

// update announcement
exports.updateAnnouncement = async function (req, res) {
  try {
    const { announcementId, description } = req.body;

    const announcementToUpdate = await Announcement.findById(announcementId);

    if (!announcementToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found." });
    }

    if (description) {
      announcementToUpdate.description = description;
    }

    await announcementToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      announcement: announcementToUpdate,
    });
  } catch (error) {
    console.error("Error updating Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Announcement",
      error: error.message,
    });
  }
};

// delete anouncement
exports.deleteAnnouncement = async function (req, res) {

  try {
    const announcementId = req.body.announcementId;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Announcement",
      error: error.message,
    });
  }
};

// add message
exports.addMessage = async function (req, res) {
  try {
    const { astrologerId, description } = req.body;

    const newMessage = new Message({ astrologerId, description });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Message",
      error: error.message,
    });
  }
};

// update message
exports.updateMessage = async function (req, res) {
  try {
    const { messageId, description, astrologerId } = req.body;

    const messageToUpdate = await Message.findById(messageId);

    if (!messageToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    if (description) {
      messageToUpdate.description = description;
    }
    if (astrologerId) {
      messageToUpdate.astrologer = astrologerId;
    }

    await messageToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      remessage: messageToUpdate,
    });
  } catch (error) {
    console.error("Error updating Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Message",
      error: error.message,
    });
  }
};

// delete message
exports.deleteMessage = async function (req, res) {
  try {
    const messageId = req.body.messageId;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Message ID" });
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Message",
      error: error.message,
    });
  }
};

// how to use screen shot

exports.addScreenshot = async function (req, res) {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      // const { skill } = req.body;
      const imagePath = req.file.path.replace(
        /^.*uploadImage[\\/]/,
        "uploadImage/"
      );
      const fileName = req.file.filename;

      const newScreenshot = new HowToUseScreenshots({ image: imagePath }); // Assuming 'image' field in Skills schema stores the image path

      // Save the new skill to the database
      await newScreenshot.save();

      res.status(201).json({
        success: true,
        message: "Screenshot added successfully",
        imagePath,
        fileName,
      });
    });
  } catch (error) {
    console.error("Error adding Screenshot:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Screenshot",
      error: error.message,
    });
  }
};

// chat history
// exports.getChatHistory = async function(req,res) {
//   try {
//     // Fetch all Customer from the database
//     const chatHistory = await ChatHistory.find();

//     // Return the list of Customer as a JSON response
//     res.status(200).json({ success: true, chatHistory });
//   } catch (error) {
//     console.error('Error fetching Chat History:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch Chat History', error: error.message });
//   }
// };

// Banners

exports.addBanners = async (req, res) => {
  uploadBanners(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res.status(500).json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { redirectionUrl, title, redirectTo, priorityPage } = req.body;
      let bannerImageUrl = "";

      if (req.files && req.files["bannerImage"]) {
        const file = req.files["bannerImage"][0];
        bannerImageUrl = await uploadFileToS3(file, "bannersImage");
      }

      const newBanner = new Banners({
        redirectionUrl,
        bannerImage: bannerImageUrl,
        title,
        redirectTo,
        priorityPage,
      });

      await newBanner.save();

      res.status(201).json({
        success: true,
        message: "Banner uploaded successfully to S3.",
        data: newBanner,
      });
    } catch (error) {
      console.error("Error uploading Banner:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Banner.",
        error: error.message,
      });
    }
  });
};

// get Banners
exports.getAllBanners = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find();

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

exports.getAppBanners = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({ bannerFor: "app" });

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

// update Banners
exports.updateBanners = function (req, res) {
  uploadBanners(req, res, async function (err) {
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
      // const { bannersId } = req.body;
      const { bannersId, redirectionUrl, title, redirectTo, priorityPage } = req.body;

      const existingBanners = await Banners.findById(bannersId);

      if (!existingBanners) {
        return res
          .status(404)
          .json({ success: false, message: "Banners not found." });
      }

      existingBanners.redirectionUrl = redirectionUrl;
      existingBanners.title = title;
      existingBanners.redirectTo = redirectTo;
      existingBanners.priorityPage =
        priorityPage !== undefined && priorityPage !== null && priorityPage !== "null"
          ? Number(priorityPage)
          : 0;

      // Update image path if a new image is uploaded
      if (req.files["bannerImage"]) {
        const file = req.files["bannerImage"][0];
        bannerImageUrl = await uploadFileToS3(file, "bannersImage");
        existingBanners.bannerImage = bannerImageUrl;
      }

      await existingBanners.save();

      res.status(200).json({
        success: true,
        message: "Banners updated successfully.",
        data: existingBanners,
      });
    } catch (error) {
      console.error("Error updating Banners:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Banners.",
        error: error.message,
      });
    }
  });
};

//delete skill
exports.deleteBanners = async function (req, res) {
  try {
    const bannersId = req.body.bannersId;

    if (!mongoose.Types.ObjectId.isValid(bannersId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Banners ID" });
    }

    const deletedBanners = await Banners.findByIdAndDelete(bannersId);

    if (!deletedBanners) {
      return res
        .status(404)
        .json({ success: false, message: "Banners not found." });
    }

    res.status(200).json({
      success: true,
      message: "Banners deleted successfully",
      deletedBanners,
    });
  } catch (error) {
    console.error("Error deleting Banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Banners",
      error: error.message,
    });
  }
};



exports.updateBannerStatus = async function (req, res) {
  try {
    const { bannerId } = req.body;
    if (!bannerId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bannerId!'
      })
    }
    // Fetch all Banners from the database
    const banners = await Banners.findById(bannerId);
    if (banners.status == 'active') {
      await Banners.findByIdAndUpdate(bannerId, { status: 'inactive' })
    }

    if (banners.status == 'inactive') {
      await Banners.findByIdAndUpdate(bannerId, { status: 'active' })
    }

    return res.status(200).json({
      success: true,
      message: 'Banner status updated successfully'
    })

  } catch (error) {
    //console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Teerth Dham

exports.addTeerthdham = function (req, res) {
  uploadBanners(req, res, async function (err) {
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
      const { title } = req.body;

      let bannerImageUrl = "";

      if (req.files && req.files["bannerImage"]) {
        const file = req.files["bannerImage"][0];
        bannerImageUrl = await uploadFileToS3(file, "bannersImage");
      }

      // Create a new file entry in the Customers collection
      const newTeerthDham = new TeerthDhamBanners({
        bannerImage: bannerImageUrl,
        title
      });
      await newTeerthDham.save();

      res.status(201).json({
        success: true,
        message: "Banners uploaded successfully.",
        data: newTeerthDham,
      });
    } catch (error) {
      console.error("Error uploading Banner:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Baners.",
        error: error.message,
      });
    }
  });
};

// get Banners
exports.getAllTeerthdham = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const teerthDham = await TeerthDhamBanners.find();

    // Return the list of Banners as a JSON response
    res.status(200).json({ success: true, teerthDham });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Banners",
      error: error.message,
    });
  }
};

exports.getAppTeerthdham = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const teerthDham = await TeerthDhamBanners.find({});

    // Return the list of Banners as a JSON response
    res.status(200).json({ success: true, teerthDham });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Banners",
      error: error.message,
    });
  }
};

// update Banners
exports.updateTeerthdham = function (req, res) {
  uploadBanners(req, res, async function (err) {
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
      // const { bannersId } = req.body;
      const { id, title } = req.body;

      const existingBanners = await TeerthDhamBanners.findById(id);

      if (!existingBanners) {
        return res
          .status(404)
          .json({ success: false, message: "Banners not found." });
      }

      existingBanners.title = title;

      let bannerImageUrl = "";

      if (req.files && req.files["bannerImage"]) {
        const file = req.files["bannerImage"][0];
        bannerImageUrl = await uploadFileToS3(file, "bannersImage");
      }
      existingBanners.bannerImage = bannerImageUrl;


      await existingBanners.save();

      res.status(200).json({
        success: true,
        message: "Banners updated successfully.",
        data: existingBanners,
      });
    } catch (error) {
      console.error("Error updating Banners:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Banners.",
        error: error.message,
      });
    }
  });
};

//delete skill
exports.deleteTeerthdham = async function (req, res) {
  try {
    const id = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Banners ID" });
    }

    const deletedBanners = await TeerthDhamBanners.findByIdAndDelete(id);

    if (!deletedBanners) {
      return res
        .status(404)
        .json({ success: false, message: "Banners not found." });
    }

    res.status(200).json({
      success: true,
      message: "Banners deleted successfully",
      deletedBanners,
    });
  } catch (error) {
    console.error("Error deleting Banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Banners",
      error: error.message,
    });
  }
};



exports.updateTeerthdhamstatus = async function (req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Please provide id!'
      })
    }
    // Fetch all Banners from the database
    const banners = await TeerthDhamBanners.findById(id);
    if (banners.status == 'active') {
      await TeerthDhamBanners.findByIdAndUpdate(id, { status: 'inactive' })
    }

    if (banners.status == 'inactive') {
      await TeerthDhamBanners.findByIdAndUpdate(id, { status: 'active' })
    }

    return res.status(200).json({
      success: true,
      message: 'Banner status updated successfully'
    })

  } catch (error) {
    //console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



// send notification from admin

exports.sendNotificationFromAdmin = async (req, res) => {
  try {
    // Upload images using multer
    uploadNotificationImages(req, res, async function (err) {
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

      // Handle the uploaded image and continue to the notification sending process
      await sendNotification(req, res);
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Error handling file upload",
      error: error.message,
    });
  }
};

// Function to send notifications to astrologers and customers
const sendNotification = async (req, res) => {
  try {
    const { astrologerIds, customerIds, title, description } = req.body;


    let ImageUrl = "";

    if (req.files && req.files["image"]) {
      const file = req.files["image"][0];
      ImageUrl = await uploadFileToS3(file, "assetsImages/notificationImage");
    }

    if (
      (!astrologerIds || astrologerIds.length === 0) &&
      (!customerIds || customerIds.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "No astrologer or customer IDs provided",
      });
    }

    const astrologers = await Astrologer.find({ _id: { $in: astrologerIds } });
    const astroTokens = astrologers
      .map((astrologer) => astrologer.fcmToken)
      .filter(Boolean);

    const customers = await Customers.find({ _id: { $in: customerIds } });
    const customerTokens = customers
      .map((customer) => customer.fcmToken)
      .filter(Boolean);

    const newNotification = new Notification({
      title: title,
      description: description || "New notification from admin",
      image: ImageUrl,
      astrologerIds: astrologerIds,
      customerIds: customerIds,
    });

    await newNotification.save();

    res.status(200).json({
      success: true,
      message: "Notifications sent successfully and stored in the database",
      astroTokens,
      customerTokens,
      data: newNotification,
    });
  } catch (error) {
    console.error("Failed to send notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notifications",
      error: error.message,
    });
  }
};

// get list of notification
exports.getAllNotifications = async function (req, res) {
  try {
    const allNotifications = await Notification.find()
      .populate("astrologerIds", "astrologerName")
      .populate("customerIds", "customerName");

    if (!allNotifications) {
      return res
        .status(404)
        .json({ success: false, message: "No Notifications found." });
    }

    res.status(200).json({ success: true, allNotifications: allNotifications });
  } catch (error) {
    console.error("Error fetching all Notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Notification",
      error: error.message,
    });
  }
};

// first recharge offer
exports.firstRechargeOffer = async function (req, res) {
  try {
    const {
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    } = req.body;

    const newFirstRechargeOffer = new FirstRechargeOffer({
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    });

    const savedFirstRechargeOffer = await newFirstRechargeOffer.save();

    res.status(201).json({
      success: true,
      message: "First Recharge plan added successfully",
      FirstRechargeOffer: savedFirstRechargeOffer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add recharge plan", details: error });
  }
};

// update recharge update plan
exports.updateFirstRechargeOffer = async function (req, res) {
  try {
    const {
      firstRechargeOfferId,
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    } = req.body;

    // const firstRechargeOfferId = req.body.firstRechargeOfferId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const firstRechargeOffer = await FirstRechargeOffer.findById(
      firstRechargeOfferId
    );

    if (!firstRechargeOffer) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    firstRechargeOffer.first_recharge_plan_amount = first_recharge_plan_amount;
    firstRechargeOffer.first_recharge_plan_extra_percent =
      first_recharge_plan_extra_percent;
    firstRechargeOffer.first_recharge_status = first_recharge_status;

    const updatedFirstRechargeOffer = await firstRechargeOffer.save();

    res.status(200).json({
      success: true,
      message: "first Recharge plan updated successfully",
      updatedFirstRechargeOffer: updatedFirstRechargeOffer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update first recharge plan",
      details: error,
    });
  }
};

exports.getAllFirstRechargeOffer = async function (req, res) {
  try {
    const allFirstRechargeOffer = await FirstRechargeOffer.find();

    if (!allFirstRechargeOffer) {
      return res
        .status(404)
        .json({ success: false, message: "No FirstRechargeOffer found." });
    }

    res
      .status(200)
      .json({ success: true, allFirstRechargeOffer: allFirstRechargeOffer });
  } catch (error) {
    console.error("Error fetching all First Recharge Offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all First Recharge Offer",
      error: error.message,
    });
  }
};

exports.deleteFirstRechargeOffer = async function (req, res) {
  try {
    const firstRechargeId = req.body.firstRechargeId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID and remove it
    const deletedItem = await FirstRechargeOffer.findByIdAndDelete(
      firstRechargeId
    );

    if (!deletedItem) {
      return res.status(404).json({ error: " First Recharge plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "First Recharge plan deleted successfully",
      // rechargePlan: deletedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not delete recharge plan",
      details: error,
    });
  }
};

// Get list of all customers
// exports.getAllCustomers = async function (req, res) {
//   try {
//     // Fetch all Banners from the database
//     const customers = await Customers.find();

//     // Return the list of Banners as a JSON response
//     res.status(200).json({ success: true, customers });
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch customers",
//       error: error.message,
//     });
//   }
// };

// ban and unban customer
exports.changeBannedStatus = async function (req, res) {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide customerId.",
      });
    }

    const customers = await Customers.findById(customerId);

    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    customers.banned_status = !customers.banned_status;
    await customers.save();

    const updated_customers = await Customers.findById(customerId);

    const statusText = updated_customers.banned_status ? "Banned" : "Unbanned";
    res.status(200).json({
      success: true,
      message: `Customer banned status updated. Now ${statusText}.`,
      data: updated_customers,
    });
  } catch (error) {
    console.error("Error toggling customers banned status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle customers banned status.",
      error: error.message,
    });
  }
};

// online Offline Customer
exports.setCustomerOnline = async function (req, res) {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    const customers = await Customers.findById(customerId);

    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    customers.isOnline = !customers.isOnline;
    await customers.save();

    const statusText = customers.isOnline ? "online" : "offline";
    res.status(200).json({
      success: true,
      message: `Customer status updated. Now ${statusText}.`,
      data: customers,
    });
  } catch (error) {
    console.error("Error toggling customers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle customers status.",
      error: error.message,
    });
  }
};

// update customer details

exports.updateCustomerdata = async function (req, res) {
  uploadCustomerImage(req, res, async function (err) {
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
      const { customerId, phoneNumber, customerName, dateOfBirth, gender, timeOfBirth } = req.body; // Destructure customerId from req.body

      const existingCustomer = await Customers.findById(customerId);

      if (!existingCustomer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer not found." });
      }

      // Update existingCustomer properties with req.body values

      if (existingCustomer.phoneNumber != phoneNumber) {
        const isExistsByNumber = await Customers.find({
          phoneNumber: phoneNumber,
        });
        if (isExistsByNumber.length != 0) {
          res.status(200).json({
            success: false,
            message: "This phone number already exits.",
            isExistsByNumber,
          });
        } else {
          existingCustomer.phoneNumber =
            phoneNumber || existingCustomer.phoneNumber;
        }
      }



      existingCustomer.customerName = customerName || existingCustomer.customerName;
      existingCustomer.gender = gender || existingCustomer.gender;
      existingCustomer.dateOfBirth = dateOfBirth || existingCustomer.dateOfBirth;
      existingCustomer.timeOfBirth = timeOfBirth || existingCustomer.timeOfBirth;

      // existingCustomer.wallet_balance += parseFloat(wallet)

      if (req.files["image"]) {
        const file = req.files["image"][0];
        const ImageUrl = await uploadFileToS3(file, "assetsImages/customerImage");
        existingCustomer.image = ImageUrl; // Corrected variable name to existingCustomer.image
      }

      await existingCustomer.save();

      res.status(200).json({
        success: true,
        message: "Customer updated successfully.",
        data: existingCustomer,
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

// Recharge wallet of customer

exports.rechargeCustomerWallet = async function (req, res) {
  try {
    const { customerId, amount, payment_method, transactionId, type, transactionType } =
      req.body;

    // Find the customer by ID
    const customer = await Customers.findById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    };

    // if(transactionType === "DEBIT" && customer?.wallet_balance + amount >= 5000) {
    //   return res.status(400).json({ success: false, message:"Wallet maximum 5000 only"});
    // }

    // Create a recharge transaction
    const rechargeTransaction = new RechargeWallet({
      customer: customerId,
      amount,
      payment_method,
      transactionId,
      type, // Include the 'type' in the recharge transaction
    });

    // Save recharge transaction to the RechargeWallet table
    await rechargeTransaction.save();

    // Update customer's wallet balance based on type
    if (transactionType === "CREDIT") {
      customer.wallet_balance += parseFloat(amount); // Add to wallet balance
    } else if (transactionType === "DEBIT") {
      if (parseFloat(amount) > customer.wallet_balance) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance." });
      }

      customer.wallet_balance = customer.wallet_balance - parseFloat(amount); // Deduct from wallet balance
    }

    // Save the updated wallet balance
    await customer.save();

    res.status(200).json({
      success: true,
      message: "Wallet transaction processed successfully.",
      data: rechargeTransaction,
    });
  } catch (error) {
    console.error("Error processing wallet transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process wallet transaction.",
      error: error.message,
    });
  }
};


exports.seeBlogs = async (req, res) => {
  const { blog_id, user_id } = req.body;

  try {
    // Validate the provided IDs
    if (!mongoose.Types.ObjectId.isValid(blog_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid blog_id or user_id' });
    }

    // Check if the user exists
    const user = await Customers.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the BlogCount entry for the provided blog_id
    let blogCount = await BlogCount.findOne({ blog_id });

    if (!blogCount) {
      // Create a new BlogCount entry if not found
      blogCount = new BlogCount({
        blog_id,
        user_ids: [user_id]
      });
    } else {
      // Check if the user_id is already in the user_ids array
      if (blogCount.user_ids.includes(user_id)) {
        return res.status(400).json({ message: 'User already added to this blog' });
      }

      // Add the new user_id to the user_ids array
      blogCount.user_ids.push(user_id);
    }

    // Save the BlogCount document
    await blogCount.save();

    return res.status(200).json({ message: 'User added to blog', blogCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.countSeenBlogs = async (req, res) => {
  const { blog_id } = req.body;

  try {
    // Validate the provided blog_id
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res.status(400).json({ message: 'Invalid blog_id' });
    }

    // Find the BlogCount entry for the provided blog_id
    const blogCount = await BlogCount.findOne({ blog_id });

    if (!blogCount) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Count the number of elements in the user_ids array
    const userCount = blogCount.user_ids.length;

    return res.status(200).json({ blog_id, userCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAstroBlogsByCategory = async (req, res) => {
  const { blogCategory } = req.body;

  try {
    let blogs;
    if (blogCategory) {
      blogs = await AstroBlogs.find({ blogCategory: blogCategory });
    } else {
      blogs = await AstroBlogs.find();
    }

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// get customers payment list
exports.getCustomersPayment = async function (req, res) {
  try {
    const { customerId } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // Fetch payments associated with the provided customerId
    const customersPaymentDetails = await RechargeWallet.find({
      customer: customerId,
    });

    res.status(200).json({
      success: true,
      message: "Customer payment history:",
      data: customersPaymentDetails,
    });
  } catch (error) {
    console.error("Error fetching Payment history of customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment history of customer",
      error: error.message,
    });
  }
};

// delete customer
exports.deleteCustomer = async function (req, res) {
  try {
    const customerId = req.body.customerId; // Assuming the key for skillId in the body is 'skillId'

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Customer ID" });
    }

    const deletedCustomer = await Customers.findByIdAndDelete(customerId);

    if (!customerId) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      deletedCustomer,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

//  order history
// exports.customerOrderHistory = async function(req, res){
//   try {
//     const { customerId } = req.body;

//     // Find chat history associated with the provided customerId
//     const chatHistory = await ChatHistory.find({ customerId });

//     // Find call history associated with the provided customerId
//     const callHistory = await CallHistory.find({ customerId });

//     res.status(200).json({
//       success: true,
//       message: 'Customer history retrieved successfully.',
//       chatHistory,
//       callHistory
//     });
//   } catch (error) {
//     console.error('Error fetching customer history:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch customer history.',
//       error: error.message
//     });
//   }
// };

exports.customerOrderHistory = async function (req, res) {
  try {
    const { customerId } = req.body;

    // Find chat history associated with the provided customerId
    let chatHistory = [];
    try {
      const chatRecords = await ChatHistory.find({ customerId }).populate(
        "astrologerId",
        "astrologerName"
      ); // Set a timeout limit (5 seconds)
      chatHistory = chatRecords.filter(
        (record) => record.durationInSeconds !== ""
      );
    } catch (chatError) {
      console.error("Chat history query timed out:", chatError);
    }

    // Find call history associated with the provided customerId
    let callHistory = [];
    try {
      const callRecords = await CallHistory.find({ customerId }).populate(
        "astrologerId",
        "astrologerName"
      ); // Set a timeout limit (5 seconds)
      callHistory = callRecords.filter(
        (record) => record.durationInSeconds !== ""
      );
    } catch (callError) {
      console.error("Call history query timed out:", callError);
    }

    res.status(200).json({
      success: true,
      message: "Customer history retrieved successfully.",
      chatHistory,
      callHistory,
    });
  } catch (error) {
    console.error("Error fetching customer history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer history.",
      error: error.message,
    });
  }
};

// add app review
exports.addAppReview = async function (req, res) {
  try {
    const { app_ratings, app_comments, customerId } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const newAppReview = new AppReview({
      customer: customerId,
      app_ratings,
      app_comments,
    });
    await newAppReview.save();

    res.status(201).json({
      success: true,
      message: "App review added successfully",
      appReview: newAppReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// verify app review
exports.verifyAppReview = async function (req, res) {
  try {
    const { appReview_id } = req.body;

    const existingAppReview = await AppReview.findOne({ _id: appReview_id });

    if (!existingAppReview) {
      return res
        .status(404)
        .json({ success: false, message: "App review not found." });
    }

    existingAppReview.is_verified = true;
    await existingAppReview.save();

    res.status(200).json({
      success: true,
      message: "Review verification updated successfully",
      appReview: existingAppReview,
    });
  } catch (error) {
    console.error("Error updating review verification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review verification",
      error: error.message,
    });
  }
};

// get all app review
exports.getAllAppReview = async function (req, res) {
  try {
    const appReview = await AppReview.find().populate(
      "customer",
      "customerName"
    ); // Populate the astrologer field with astrologerName

    res.status(200).json({ success: true, appReview });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

// delete app review
exports.deleteAppReview = async function (req, res) {
  try {
    const appReviewId = req.body.appReviewId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(appReviewId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid App Review ID" });
    }

    const deletedAppReview = await AppReview.findByIdAndDelete(appReviewId);

    if (!deletedAppReview) {
      return res
        .status(404)
        .json({ success: false, message: "app review not found." });
    }

    res.status(200).json({
      success: true,
      message: "App Review deleted successfully",
      deletedAppReview,
    });
  } catch (error) {
    console.error("Error deleting app Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete App Review",
      error: error.message,
    });
  }
};

exports.sendCustomerNotification = async function (req, res) {
  uploadNotificationImages(req, res, async function (err) {
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
      const { customerIds, title, description, redirectTo } = req.body;

      console.log(req.body)

      let imagePath = "";
      if (req.files && req.files["image"]) {
        const file = req.files["image"][0];
        imagePath = await uploadFileToS3(file, "assetsImages/notificationImage");
      }

      if (!customerIds || customerIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No astrologer or customer IDs provided",
        });
      }

      // const customerID = JSON.parse(customerIds)

      const customers = await Customers.find({ _id: { $in: customerIds } });
      if (customers) {
        let totalCustomer = customers.length;
        const customerData = customerIds.map((item) => {
          return { customerId: item, notificationRead: false };
        });

        const newNotification = new CustomerNotification({
          title: title,
          description: description || "New notification from admin",
          image: imagePath,
          customerIds: customerData,
        });

        await newNotification.save();

        for (let i = 0; i < totalCustomer; i++) {
          const deviceToken = customers[i]?.fcmToken;
          if (deviceToken) {
            const notification = {
              title: title,
              body: description,
            };
            const data = {
              type: redirectTo,
              title: title,
              body: description,
            };

            await notificationService.sendNotification(
              deviceToken,
              notification,
              data
            );
          }
        }

        res.status(200).json({
          success: true,
          message: "Notifications sent successfully and stored in the database",
        });
      }

      res.status(200).json({
        success: true,
        message: "Customer updated successfully.",
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

exports.getCustomerNotification = async function (req, res) {
  try {
    const notifications = await CustomerNotification.find();

    if (notifications) {
      return res.status(200).json({
        success: true,
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

exports.getChatHistory = async function (req, res) {
  try {
    const history = await ChatHistory.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          chatPrice: item.chatPrice,
          totalChatPrice: item.totalChatPrice,
          status: item?.status,
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

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

exports.sendAstrologerNotification = async function (req, res) {
  uploadNotificationImages(req, res, async function (err) {
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
      const { astrologerIds, title, description, redirectTo } = req.body;
      let imagePath = "";
      if (req.files && req.files["image"]) {
        const file = req.files["image"][0];
        imagePath = await uploadFileToS3(file, "assetsImages/notificationImage");
      }

      if (!astrologerIds || astrologerIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No astrologer or customer IDs provided",
        });
      }

      const astrologers = await Astrologer.find({
        _id: { $in: astrologerIds },
      });
      if (astrologers) {
        let totalAstrologer = astrologers.length;
        const astrologerData = astrologerIds.map((item) => {
          return { astrologerId: item, notificationRead: false };
        });

        const newNotification = new AstrologerNotification({
          title: title,
          description: description || "New notification from admin",
          image: imagePath,
          astrologerIds: astrologerData,
        });

        await newNotification.save();

        for (let i = 0; i < totalAstrologer; i++) {
          const deviceToken = astrologers[i]?.fcmToken;
          if (deviceToken) {
            const notification = {
              title: title,
              body: description,
            };
            const data = {
              type: redirectTo,
              title: title,
              body: description,
            };

            await notificationService.sendNotification(
              deviceToken,
              notification,
              data
            );
          }
        }

        res.status(200).json({
          success: true,
          message: "Notifications sent successfully and stored in the database",
        });
      }
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

exports.getAstrologerNotification = async function (req, res) {
  try {
    const notifications = await AstrologerNotification.find();

    if (notifications) {
      return res.status(200).json({
        success: true,
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

exports.getCallHistory = async function (req, res) {
  try {
    const history = await CallHistory.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          callPrice: item.callPrice,
          totalCallPrice: item.totalCallPrice,
          status: item.status,
          transactionId: item.transactionId,
          callId: item.callId,
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

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

exports.getAdminEarnigHistory = async function (req, res) {
  try {
    const history = await AdminEarning.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          type: item.type,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          duration: item.duration,
          adminPrice: item.adminPrice,
          historyId: item.historyId,
          totalPrice: item.totalPrice,
          partnerPrice: item.partnerPrice,
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

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

exports.getDashboard = async function (req, res) {
  try {
    const totalChat = await ChatHistory.countDocuments();
    const totalCall = await CallHistory.countDocuments();
    const totalLiveCall = await LiveCalls.countDocuments();
    const totalGifting = await AdminEarning.countDocuments({ type: 'gift' })
    const totalCustomer = await Customers.countDocuments();
    const totalAstrologer = await Astrologer.countDocuments();
    const totalEnquiryAstrologer = await Astrologer.countDocuments({ enquiry: true });
    const totalVerifiedAstrologer = await Astrologer.countDocuments({ isVerified: true });

    const totalServices = totalChat + totalCall + totalLiveCall + totalGifting

    return res.status(200).json({
      success: true,
      dashboard: {
        totalChat,
        totalCall,
        totalLiveCall,
        totalGifting,
        totalServices,
        totalCustomer,
        totalAstrologer,
        totalEnquiryAstrologer,
        totalVerifiedAstrologer,
      },
    });

  } catch (error) {
    console.error("Failed to get dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard",
      error: error.message,
    });
  }
};

exports.getEarningChart = async function (req, res) {
  try {
    const earnings = await AdminEarning.find();
    let totalAdminEarnings = 0;

    const earningsByType = {
      gift: 0,
      call: 0,
      chat: 0,
      live_video_call: 0,
    };

    earnings.forEach((earning) => {
      const adminPrice = parseFloat(earning.adminPrice) || 0;
      totalAdminEarnings += adminPrice;

      if (earningsByType.hasOwnProperty(earning.type)) {
        earningsByType[earning.type] += adminPrice;
      }
    });

    return res.status(200).json({
      success: true,
      message: "success",
      totalAdminEarnings,
      earningsByType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to tutorials",
      error: error.message,
    });
  }
}

exports.getAdminEarningGraph = async function (req, res) {
  try {
    const { year } = req.body

    if (isNaN(year)) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const monthlyData = await AdminEarning.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAdminEarnings: { $sum: { $toDouble: "$adminPrice" } },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = Array.from({ length: 12 }, (_, i) => ({
      month: `${year}-${String(i + 1).padStart(2, '0')}`,
      monthName: monthNames[i],
      count: 0,
    }));

    monthlyData.forEach((data) => {
      result[data._id - 1].count = data.totalAdminEarnings;
    });
    const maxCount = Math.max(...result.map(r => r.count));

    return res.status(200).send({ status: true, result, maxCount })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
},

  exports.createLanguage = async function (req, res) {
    try {
      const { languageName } = req.body;
      const languageData = await Language.findOne({ languageName });
      if (!!languageData) {
        res.status(200).json({
          success: false,
          message: "This Language already exits.",
        });
      } else {
        const newLanguage = new Language({ languageName });
        await newLanguage.save();
        res.status(200).json({
          success: true,
          message: "New Language Added!",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to langauge",
        error: error.message,
      });
    }
  };

exports.getLanguage = async function (req, res) {
  try {
    const languageData = await Language.find({});

    if (!languageData) {
      return res.status(200).json({
        success: true,
        message: 'Empty data'
      })
    }

    res.status(200).json({
      success: true,
      languageData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.updateLanguage = async function (req, res) {
  try {
    const { langId, languageName } = req.body;

    const languageData = await Language.findById(langId);

    if (!!languageName) {
      languageData.languageName = languageName;
      await languageData.save();
      res.status(200).json({
        success: true,
        message: "Language Updated!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Please enter your language name",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.deleteLanguage = async function (req, res) {
  try {
    const { langId } = req.body;

    const languageData = await Language.findByIdAndDelete(langId);

    const astrologerData = await Astrologer.find({
      language: { $in: [languageData?.languageName] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { language: languageData?.languageName } }
        );
      }
    }

    if (!!languageData) {
      res.status(200).json({
        success: true,
        message: "Language Deleted!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "This language not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.getWalletPayments = async function (req, res) {
  try {
    const payementData = await RechargeWallet.find().populate(
      "customer",
      "customerName"
    );

    res.status(200).json({
      success: true,
      payementData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.createQualifications = async function (req, res) {

  try {
    const {
      astrologerId,
      higherQualification,
      qualificationType,
      instituteName,
    } = req.body;
    if (
      !astrologerId ||
      !higherQualification ||
      !qualificationType ||
      !instituteName ||
      !req.files ||
      !req.files["documents"] ||
      req.files["documents"].length === 0
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required to create a qualification",
      });
    }

    let imagePath = "";

    if (req.files["documents"]) {
      imagePath = req.files["documents"][0].path.replace(
        /^.*qualificationImage[\\/]/,
        "uploads/qualificationImage/"
      );
    }

    const newQualification = new Qualifications({
      astrologerId,
      higherQualification,
      qualificationType,
      instituteName,
      documents: imagePath,
    });

    await newQualification.save();

    res.status(200).json({
      success: true,
      message: "New qualification added",
    });
  } catch (error) {
    console.error("Error updating Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create qualifications.",
      error: error.message,
    });
  }
};

exports.getQualifications = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(200).json({
        success: false,
        message: "astrologerId fields are required to get a qualification",
      });
    }

    const qualifications = await Qualifications.find({ astrologerId });

    res.status(200).json({
      success: true,
      message: "success",
      qualifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.updateQualifications = async function (req, res) {
  try {


    try {
      const {
        qualificationId,
        higherQualification,
        qualificationType,
        instituteName,
      } = req.body;
      if (
        !qualificationId ||
        !higherQualification ||
        !qualificationType ||
        !instituteName
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required to create a qualification",
        });
      }

      let imagePath = "";
      const documentData = req.files["documents"] ?? null;
      if (!!documentData) {
        imagePath = req.files["documents"][0].path.replace(
          /^.*qualificationImage[\\/]/,
          "uploads/qualificationImage/"
        );
      }

      const qualification = await Qualifications.findById(qualificationId);

      if (!!qualification) {
        (qualification.higherQualification = higherQualification),
          (qualification.qualificationType = qualificationType),
          (qualification.instituteName = instituteName);
        if (!!imagePath) {
          qualification.documents = imagePath;
        }
      }

      await qualification.save();

      res.status(200).json({
        success: true,
        message: "Qualifiction Updated...",
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create qualifications.",
        error: error.message,
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update qualification",
      error: error.message,
    });
  }
};

exports.createLiveStreaming = async function (req, res) {
  try {
    const { astrologerId, voiceCallPrice, vedioCallPrice, sessionTime } =
      req.body;

    if (!astrologerId || !voiceCallPrice || !vedioCallPrice || !sessionTime) {
      return res.status(200).json({
        success: false,
        message: "All filed mendatory",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res.status(200).json({
        success: false,
        message: "Wrong Astrologer",
      });
    }

    const count = await LiveStreaming.countDocuments();

    const liveId = `NAMO${count}`;

    const liveStreaming = new LiveStreaming({
      astrologerId,
      voiceCallPrice,
      vedioCallPrice,
      sessionTime,
      liveId,
      status: "Live",
      startTime: new Date(),
    });

    await liveStreaming.save();

    return res.status(200).json({
      success: true,
      message: "Live Streaming Created",
      liveId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

exports.createAppTutorials = async function (req, res) {
  try {
    uploadTutorialImage(req, res, async function (err) {
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
        const {
          link = '',
          description,
          type,
        } = req.body;
        if (
          !description ||
          !type
        ) {
          return res.status(200).json({
            success: false,
            message: "All fields are required to create a qualification",
          });
        }

        let bannerImageUrl = "";
        if (req.files && req.files["image"]) {
          const file = req.files["image"][0];
          bannerImageUrl = await uploadFileToS3(file, "assetsImages/tutorialImages");
        }

        const tutorials = new AppTutorials({ image: bannerImageUrl, description, type, link: parseYoutubeId(link) })

        await tutorials.save();

        res.status(200).json({
          success: true,
          message: "New Tutorial created...",
        });
      } catch (error) {
        console.error("Error updating Customer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create Tutorial.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Tutorial",
      error: error.message,
    });
  }
};

exports.updateAppTutorials = async function (req, res) {
  try {
    uploadTutorialImage(req, res, async function (err) {
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
        const {
          id,
          link = '',
          description,
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(200).json({
            success: false,
            message: "Wrong tutorials id",
          });
        }

        const tutorial = await AppTutorials.findById(id)

        if (link) {
          tutorial.link = parseYoutubeId(link)
        }
        if (description) {
          tutorial.description = description
        }

        let bannerImageUrl = "";
        if (req.files && req.files["image"]) {
          const file = req.files["image"][0];
          bannerImageUrl = await uploadFileToS3(file, "assetsImages/tutorialImages");
        }

        if (bannerImageUrl) {
          tutorial.image = bannerImageUrl
        }

        await tutorial.save();

        res.status(200).json({
          success: true,
          message: "Tutorial updated...",
        });
      } catch (error) {
        console.error("Error updating Tutorial:", error);
        res.status(500).json({
          success: false,
          message: "Failed to updating Tutorial.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updating Tutorial",
      error: error.message,
    });
  }
};

exports.getAppTutorials = async function (req, res) {
  try {
    const { type } = req.body
    const tutorial = await AppTutorials.find({ type });

    res.status(200).json({
      success: true,
      message: "success",
      tutorial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to tutorials",
      error: error.message,
    });
  }
};

exports.deleteAppTutorials = async function (req, res) {
  try {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({
        success: false,
        message: "Wrong tutorials id",
      });
    }

    const tutorial = await AppTutorials.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "success",
      tutorial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to tutorials",
      error: error.message,
    });
  }
};

exports.createUpdateAstroCompanion = async function (req, res) {
  try {


    try {
      const {
        title,
        description,
        type
      } = req.body;

      let imagePaths = [];

      const imagesData = req.files["images"] ?? null;
      if (!!imagesData) {
        imagePaths = imagesData.map((item, index) => {
          return req.files["images"][index].path.replace(
            /^.*astroCompanion[\\/]/,
            "uploads/astroCompanion/"
          );
        })
      }

      if (!title || !description || !type) {
        return res.status(200).json({
          success: false,
          message: "All filed is required",
        });
      }

      const companion = await AstroCompanion.findOne({ type })

      if (!companion) {
        if (imagePaths.length == 0) {
          return res.status(200).json({
            success: false,
            message: "At least one image is required",
          });
        }


        const newCompanion = new AstroCompanion({
          title,
          description,
          type,
          images: imagePaths
        })

        await newCompanion.save()
        return res.status(200).json({
          success: true,
          message: "Created",
        });

      }

      companion.title = title
      companion.description = description

      if (imagePaths.length > 0) {
        companion.images = imagePaths;
      }

      await companion.save();

      res.status(200).json({
        success: true,
        message: "Updated",
      });
    } catch (error) {
      console.error("Error updating companion:", error);
      res.status(500).json({
        success: false,
        message: "Failed to updating companion.",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updating companion",
      error: error.message,
    });
  }
};

exports.getAstroCompanion = async function (req, res) {
  try {
    const { type } = req.body

    const data = await AstroCompanion.findOne({ type });

    return res.status(200).json({
      success: true,
      message: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to tutorials",
      error: error.message,
    });
  }
};

exports.liveStreaming = async function (req, res) {
  try {
    // Fetch all skills from the database
    const liveStreaming = await LiveStreaming.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, liveStreaming });
  } catch (error) {
    console.error("Error fetching live Streaming:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch live Streaming",
      error: error.message,
    });
  }
};

exports.getWithdrawRequest = async (req, res) => {
  try {
    const withdrawRequest = await AstrologerWithdrawRequest.find({ status: 'pending' }).populate("astrologerId", "astrologerName email phoneNumber wallet_balance account_holder_name account_name account_type account_number IFSC_code");
    if (!withdrawRequest) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: "Getting data successfully",
      data: withdrawRequest
    })


  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


exports.getAllGiftHistroy = async (req, res) => {
  try {

    const getHistory = await AdminEarning.find({ type: 'gift' }).populate('astrologerId', 'astrologerName').populate('customerId', 'customerName')
    return res.status(200).json({
      success: true,
      messsage: "Getting data successfully",
      results: getHistory
    })
  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

exports.getAstrologerGiftHistroy = async (req, res) => {
  try {

    const { astrologerId } = req.body;
    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId!"
      })
    }

    const getHistory = await AdminEarning.find({ astrologerId, type: 'gift' }).populate('astrologerId', 'astrologerName').populate('customerId', 'customerName gender image').populate('giftId', 'gift giftIcon').sort({ _id: -1 })
    return res.status(200).json({
      success: true,
      messsage: "Getting data successfully",
      results: getHistory
    })
  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


exports.astrologerDetailsById = async (req, res) => {
  try {

    const { astrologerId } = req.body;

    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId!"
      })
    }

    const getDetails = await Astrologer.find({ _id: astrologerId }).populate('skill expertise mainExpertise remedies');

    return res.status(200).json({
      success: true,
      message: "Getting details successfully",
      results: getDetails[0]
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}



exports.astrologerChatHistory = async (req, res) => {
  try {
    const { astrologerId, type } = req.body;


    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide astrologerId!'
      })
    }

    if (!type || type == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please Provide type!'
      })
    }

    // if(type !== 'chat' || type !== 'call' || type !== 'live_video_call'){
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid type'
    //   })
    // }

    const Chathistory = await AdminEarning.find({ astrologerId, type }).populate('customerId', 'customerName').populate('astrologerId', 'astrologerName commission_chat_price chat_price commission_call_price call_price commission_normal_video_call_price normal_video_call_price');


    return res.status(200).json({
      success: true,
      message: 'Getting chat histroy successfully',
      data: Chathistory,
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}



exports.all_videocall_history = async (req, res) => {
  try {

    const history = await AdminEarning.find({ type: 'VideoCall' }).populate('astrologerId', 'astrologerName').populate('customerId', 'customerName')

    return res.status(200).json({
      success: true,
      message: 'Getting history successfully',
      results: history
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.all_live_videocall_history = async (req, res) => {
  try {

    const history = await AdminEarning.find({ type: 'live_video_call' }).populate('astrologerId', 'astrologerName').populate('customerId', 'customerName')

    return res.status(200).json({
      success: true,
      message: 'Getting history successfully',
      results: history
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


// exports.deductWalletByAdmin = async (req, res) => {
//   try {
//     const { astrologerId, amount } = req.body;

//     if (!astrologerId || astrologerId === "") {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide astrologerId!',
//       });
//     }

//     if (amount === undefined || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "A valid amount is required!",
//       });
//     }

//     const astrologerData = await Astrologer.findById(astrologerId);
//     if (!astrologerData) {
//       return res.status(404).json({
//         success: false,
//         message: 'Astrologer not found!',
//       });
//     }

//     // Check if the wallet balance is sufficient
//     if (astrologerData.wallet_balance < amount) {
//       return res.status(400).json({
//         success: false,
//         message: 'Insufficient wallet balance!',
//       });
//     }

//     // Deduct amount from wallet_balance
//     astrologerData.wallet_balance -= amount;

//     // Create the transaction history
//     const transactionHistory = new AdminTransaction({
//       transactions: [{
//         astrologerId,
//         amount,
//       }],
//       type: 'deduct',
//     });

//     // Save the updated astrologer data
//     await astrologerData.save();

//     // Save the admin transaction history
//     await transactionHistory.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Amount deducted successfully',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };




exports.deductWalletByAdmin = async (req, res) => {
  try {
    const { transactions } = req.body;
    if (!transactions || transactions == " ") {
      return res.status(400).json({
        success: false,
        message: "transactions is required!"
      })
    }



    const deductAmount = async () => {
      const results = await Promise.all(transactions.map(async (item) => {
        // Find the astrologer by ID and get the current wallet balance
        const astrologer = await Astrologer.findById(item.astrologerId, { wallet_balance: 1 });

        if (!astrologer) {
          console.log(`Astrologer with ID ${item.astrologerId} not found.`);
          return null; // Handle the case where the astrologer is not found
        }

        // Deduct the amount from the wallet balance (assuming item.amount is the amount to deduct)
        const newBalance = astrologer.wallet_balance - item.amount;

        // Update the astrologer's wallet balance in the database
        await Astrologer.findByIdAndUpdate(item.astrologerId, { wallet_balance: newBalance });

        console.log(`Deducted ${item.amount} from astrologer ${item.astrologerId}. New balance: ${newBalance}`);

        return { astrologerId: item.astrologerId, newBalance }; // Return any relevant data if needed
      }));

      return results; // Return the results array if needed
    };

    deductAmount();

    const newTransaction = await AdminTransaction.create({
      transactions: transactions,
      type: 'deduct'
    });

    return res.status(201).json({
      success: true,
      message: "Amount deucted successfully",
      result: newTransaction
    })

  } catch (error) {
    console.error('Error creating transaction:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


exports.astrologerTransactionHistory = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId || astrologerId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: 'astrologerId is required!',
      });
    }

    const withdrawHistory = await AdminTransaction.find({
      'transactions.astrologerId': astrologerId,
    }).populate({
      path: 'transactions.astrologerId',
      select: 'astrologerName email',
    });

    if (!withdrawHistory || withdrawHistory.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No transaction history found',
        results: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Astrologer transaction history fetched successfully',
      results: withdrawHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


exports.addThirdPartyPackages = async (req, res) => {
  try {

    const { name, key } = req.body;

    if (!name || name == " ") {
      return res.status(400).json({
        success: false,
        message: 'name is required!'
      })
    }

    if (!key || key == " ") {
      return res.status(400).json({
        success: false,
        message: 'key is required!'
      })
    }

    const ThirdPartyPackage = await Setting.findOne({});

    ThirdPartyPackage.thirdPartyPackage.push({ name, key });

    await ThirdPartyPackage.save()

    return res.status(201).json({
      success: false,
      message: 'Third party package Added succcessfully'
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.updateThirdPartyPackages = async (req, res) => {
  try {

    const { id, name, key } = req.body;

    if (!id || id == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide id'
      })
    }
    if (!name || name == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide name'
      })
    }

    if (!key || key == " ") {
      return res.status(400).json({
        success: false,
        message: 'please provide key'
      })
    }

    // Find the setting that contains the master image by searching for masterImage._id
    const setting = await Setting.findOne({ 'thirdPartyPackage._id': id });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Third party package not found!',
      });
    }

    // Find the Third party package by _id in the masterImage array
    const ThirdPartyPackage = setting.thirdPartyPackage.id(id);

    if (!ThirdPartyPackage) {
      return res.status(404).json({
        success: false,
        message: 'Third party package not found!',
      });
    }

    // Update the fields
    if (name) ThirdPartyPackage.name = name;
    if (key) ThirdPartyPackage.key = key;

    // Save the updated document
    await setting.save();

    res.status(200).json({
      success: true,
      message: 'Third party package updated successfully.',
      data: ThirdPartyPackage,
    });

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.addMasterImagesByAdmin = async (req, res) => {


  try {
    const { name } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is requried!.",
      });
    }

    const image = req.files["image"]
      ? req.files["image"][0].path.replace(
        /^.*masterImage[\\/]/,
        "masterImage/"
      )
      : "";

    const settingData = await Setting.findOne({})

    // Create a new file entry in the Customers collection
    settingData.masterImage.push({ name, image });
    await settingData.save();

    res.status(201).json({
      success: true,
      message: "Master image uploaded successfully.",
      // data: settingData.masterImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }

}


// Route to update a master image by its _id
exports.updateMasterImageById = async (req, res) => {


  try {
    const { name, imageId } = req.body;

    // Validate required fields
    if (!imageId) {
      return res.status(400).json({ success: false, message: 'imageId is required!' });
    }

    // Optional: Upload new image
    const image = req.files && req.files['image'] ? req.files['image'][0].path.replace(
      /^.*masterImage[\\/]/,
      'masterImage/'
    ) : null;

    // Find the setting that contains the master image by searching for masterImage._id
    const setting = await Setting.findOne({ 'masterImage._id': imageId });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Master image not found!',
      });
    }

    // Find the master image by _id in the masterImage array
    const masterImage = setting.masterImage.id(imageId);

    if (!masterImage) {
      return res.status(404).json({
        success: false,
        message: 'Master image not found!',
      });
    }

    // Update the fields
    if (name) masterImage.name = name;
    if (image) masterImage.image = image;

    // Save the updated document
    await setting.save();

    res.status(200).json({
      success: true,
      message: 'Master image updated successfully.',
      data: masterImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};


exports.addSitesDetailsByAdmin = async (req, res) => {
  try {
    const { mobileNumber, email, address } = req.body;

    if (!mobileNumber || mobileNumber == " ") {
      return res.status(400).json({
        success: false,
        message: 'mobileNumber is required!'
      })
    }

    if (!email || email == " ") {
      return res.status(400).json({
        success: false,
        message: 'email is required!'
      })
    }

    if (!address || address == " ") {
      return res.status(400).json({
        success: false,
        message: 'address is required!'
      })
    }

    const SiteDetails = await Setting.findOne({});

    SiteDetails.siteDetails.mobileNumber = mobileNumber;
    SiteDetails.siteDetails.email = email;
    SiteDetails.siteDetails.address = address;

    await SiteDetails.save()

    return res.status(201).json({
      success: false,
      message: 'SiteDetails Added succcessfully'
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.addSocailLink = async (req, res) => {
  try {

    const { name, link } = req.body;

    if (!name || name == " ") {
      return res.status(400).json({
        success: false,
        message: 'name is required!'
      })
    }

    if (!link || link == " ") {
      return res.status(400).json({
        success: false,
        message: 'link is required!'
      })
    }

    const SocialLink = await Setting.findOne({});

    SocialLink.socailLink.push({ name, link });

    await SocialLink.save()

    return res.status(201).json({
      success: false,
      message: 'SocialLink Added succcessfully'
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.updateSocailLink = async (req, res) => {
  try {

    const { linkId, name, link } = req.body;

    if (!linkId || linkId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide linkId'
      })
    }
    if (!name || name == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide name'
      })
    }

    if (!link || link == " ") {
      return res.status(400).json({
        success: false,
        message: 'please provide link'
      })
    }

    // Find the setting that contains the master image by searching for masterImage._id
    const setting = await Setting.findOne({ 'socailLink._id': linkId });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Link not found!',
      });
    }

    // Find the socailLink by _id in the masterImage array
    const SocialLink = setting.socailLink.id(linkId);

    if (!SocialLink) {
      return res.status(404).json({
        success: false,
        message: 'Social Link not found!',
      });
    }

    // Update the fields
    if (name) SocialLink.name = name;
    if (link) SocialLink.link = link;

    // Save the updated document
    await setting.save();

    res.status(200).json({
      success: true,
      message: 'Link updated successfully.',
      data: SocialLink,
    });

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.getSettingData = async (req, res) => {
  try {

    const setting = await Setting.find({});
    return res.status(200).json({
      success: true,
      message: setting
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.customerDetailsById = async (req, res) => {
  try {

    const { customerId } = req.body;

    if (!customerId || customerId == " ") {
      return res.status(400).json({
        success: false,
        message: "Please provide customerId!"
      })
    }

    const getDetails = await Customers.find({ _id: customerId })

    return res.status(200).json({
      success: true,
      message: "Getting details successfully",
      results: getDetails[0]
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}



exports.customerChatHistory = async (req, res) => {
  try {
    const { customerId, type } = req.body;


    if (!customerId || customerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerId!'
      })
    }

    if (!type || type == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please Provide type!'
      })
    }


    const Chathistory = await AdminEarning.find({ customerId, type }).populate('customerId', 'customerName').populate('astrologerId', 'astrologerName normal_video_call_price commission_normal_video_call_price call_price commission_call_price chat_price commission_chat_price');

    // Add a new key to each object in Chathistory
    const updatedChatHistory = Chathistory.map(item => ({
      ...item.toObject(), // Convert Mongoose document to plain object
      // invoiceId: 'yourValue' // Replace 'yourValue' with the actual value you want to add
    }));

    return res.status(200).json({
      success: true,
      message: 'Getting chat histroy successfully',
      data: updatedChatHistory
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}




exports.changeVideocallStatus = async (req, res) => {
  try {

    const { astrologerId } = req.body;
    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide astrologerId!'
      })
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(400).json({
        success: false,
        message: "Astrologer not found!"
      })
    }

    if (astrologer.video_call_status == 'online') {
      await Astrologer.findByIdAndUpdate(astrologerId, { video_call_status: 'offline' })

    }

    if (astrologer.video_call_status == 'offline') {
      await Astrologer.findByIdAndUpdate(astrologerId, { video_call_status: 'online' })

    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully"
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.addDeductCustomerWallet = async (req, res) => {
  try {
    const { transactions, type } = req.body;

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "transactions is required!"
      });
    }

    if (!type || (type !== 'deduct' && type !== 'credit')) {
      return res.status(400).json({
        success: false,
        message: "type is required and must be either 'deduct' or 'credit'!"
      });
    }

    // Loop through each transaction
    for (const item of transactions) {
      const customer = await Customers.findById(item.customerId, { wallet_balance: 1 });

      if (!customer) {
        //console.log(`Customer with ID ${item.customerId} not found.`);
        return res.status(404).json({
          success: false,
          message: `Customer with ID ${item.customerId} not found.`
        });
      }

      let newBalance;

      if (type === 'deduct') {
        if (customer.wallet_balance < item.amount) {
          return res.status(400).json({
            success: false,
            message: 'Insufficient balance.'
          });
        }
        newBalance = customer.wallet_balance - item.amount;
        await Customers.findByIdAndUpdate(item.customerId, { wallet_balance: newBalance });
        //console.log(`Deducted ${item.amount} from customer ${item.customerId}. New balance: ${newBalance}`);
      }

      if (type === 'credit') {
        if (customer.wallet_balance + item.amount <= 5000) {
          newBalance = customer.wallet_balance + item.amount;
          await Customers.findByIdAndUpdate(item.customerId, { wallet_balance: newBalance });
          //console.log(`Added ${item.amount} to customer ${item.customerId}. New balance: ${newBalance}`);
        } else {
          return res.status(400).json({
            success: false,
            message: 'Amount must not exceed 5,000.',
          });
        }

      }
    }

    const newTransaction = await AdminTransaction.create({
      transactions: transactions,
      type
    });

    return res.status(201).json({
      success: true,
      message: "Transaction success",
      result: newTransaction
    });

  } catch (error) {
    //console.error('Error creating transaction:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};




exports.addDeductAstrologerWallet = async (req, res) => {
  try {
    const { transactions, type } = req.body;

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "transactions is required!"
      });
    }

    if (!type || (type !== 'deduct' && type !== 'credit')) {
      return res.status(400).json({
        success: false,
        message: "type is required and must be either 'deduct' or 'credit'!"
      });
    }

    // Loop through each transaction
    for (const item of transactions) {
      const astrologer = await Astrologer.findById(item.astrologerId, { wallet_balance: 1 });

      if (!astrologer) {
        //console.log(`Customer with ID ${item.customerId} not found.`);
        return res.status(404).json({
          success: false,
          message: `Astrologer with ID ${item.astrologerId} not found.`
        });
      }

      let newBalance;

      if (type === 'deduct') {
        if (astrologer.wallet_balance < item.amount) {
          return res.status(400).json({
            success: false,
            message: 'Insufficient balance.'
          });
        }
        newBalance = astrologer.wallet_balance - item.amount;
        await Astrologer.findByIdAndUpdate(item.astrologerId, { wallet_balance: newBalance });
        //console.log(`Deducted ${item.amount} from customer ${item.customerId}. New balance: ${newBalance}`);
      }

      if (type === 'credit') {
        newBalance = astrologer.wallet_balance + item.amount;
        await Astrologer.findByIdAndUpdate(item.astrologerId, { wallet_balance: newBalance });
        //console.log(`Added ${item.amount} to customer ${item.customerId}. New balance: ${newBalance}`);
      }
    }

    const newTransaction = await AdminTransaction.create({
      transactions: transactions,
      type
    });

    return res.status(201).json({
      success: true,
      message: "Transaction success",
      result: newTransaction
    });

  } catch (error) {
    //console.error('Error creating transaction:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}



exports.customerFollowedList = async (req, res) => {
  try {

    const { customerId } = req.body;
    if (!customerId || customerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerId!'
      })
    }

    const Follower = await AstrologerFollower.find({ followers: customerId }).populate('astrologerId', 'astrologerName gender email phoneNumber')

    return res.status(200).json({
      success: false,
      message: "Getting data successfully",
      message: Follower
    })


  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.approveWithdrawRequest = async (req, res) => {
  try {
    const { astrologerId, amount, transactionId } = req.body;

    if (!astrologerId || astrologerId == " ") {
      return res.status(400).json({
        success: false,
        message: 'astrologerId is required!'
      })
    }

    if (!transactionId || transactionId == " ") {
      return res.status(400).json({
        success: false,
        message: 'transactionId is required!'
      })
    }

    if (!amount || amount == " ") {
      return res.status(400).json({
        success: false,
        message: 'amount is required!'
      })
    }

    const withdrawRequest = await AstrologerWithdrawRequest.findOne({ _id: transactionId })
    if (!withdrawRequest) {
      return res.status(404).json({
        success: false,
        message: 'Data not founddd'
      })
    }
    const astrologer = await Astrologer.findById(astrologerId, { wallet_balance: 1 });
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    astrologer.wallet_balance -= amount;
    withdrawRequest.status = 'approved'
    await astrologer.save()
    await withdrawRequest.save()


    return res.status(200).json({
      success: true,
      message: 'Request approoved successfully',
      results: astrologer
    })

  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }

}


exports.getAllDarshanLinks = async (req, res) => {
  try {
    const darshanLinks = await DarshanLink.find().sort({ priority: 1 });

    if (!darshanLinks || darshanLinks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Darshan records found.",
      });
    }

    const currentDate = new Date();

    // **फिल्टर करें कि कौन से दर्शन भविष्य में हैं**
    // const futureDarshans = darshanLinks.filter(darshan => 
    //   new Date(darshan.toTimeOfArti) > currentDate
    // );

    res.status(200).json({
      success: true,
      message: "Future Darshan records retrieved successfully.",
      data: darshanLinks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving Darshan records.",
      error: error.message,
    });
  }
};



exports.createDarshan = async (req, res) => {
  try {
    const { videoLink, fromTimeOfArti, toTimeOfArti, templeName, description, priority } = req.body;

    const convertToEmbedLink = (link) => {
      if (!link) return "";
      const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const match = link.match(regex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : link;
    };

    const embedLink = convertToEmbedLink(videoLink);

    const mainImage =
      req.files && req.files["image"] && req.files["image"][0]
        ? await uploadFileToS3(req.files["image"][0], "assetsImages/images")
        : "";

    const newDarshan = new DarshanLink({
      VideoLink: embedLink,
      fromTimeOfArti: fromTimeOfArti || null,
      toTimeOfArti: toTimeOfArti || null,
      TempleName: templeName,
      Description: description || "",
      image: mainImage,
      priority: priority,
    });

    await newDarshan.save();

    res.status(201).json({
      success: true,
      message: "Darshan record created successfully.",
      data: newDarshan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Darshan record.",
      error: error.message,
    });
  }
};


exports.updateDarshan = async (req, res) => {
  try {
    const { id } = req.params;
    const { videoLink, fromTimeOfArti, toTimeOfArti, templeName, description, priority } = req.body;

    if (!videoLink && !fromTimeOfArti && !toTimeOfArti && !templeName) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update.",
      });
    }

    const updatedDarshan = await DarshanLink.findByIdAndUpdate(
      id,
      {
        VideoLink: videoLink,
        fromTimeOfArti: fromTimeOfArti || null,
        toTimeOfArti: toTimeOfArti || null,
        TempleName: templeName,
        Description: description || "",
        image: req.files && req.files["image"]
          ? await uploadFileToS3(req.files["image"][0], "assetsImages/images")
          : undefined, // Only update image if provided
        priority: priority || 0, // Default to 0 if not provided
      },
      { new: true }
    );

    if (!updatedDarshan) {
      return res.status(404).json({
        success: false,
        message: "Darshan record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Darshan record updated successfully.",
      data: updatedDarshan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Darshan record.",
      error: error.message,
    });
  }
};


exports.deleteDarshan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDarshan = await DarshanLink.findByIdAndDelete(id);

    if (!deletedDarshan) {
      return res.status(404).json({
        success: false,
        message: "Darshan record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Darshan record deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Darshan record.",
      error: error.message,
    });
  }
};

exports.updateVardaniShivalya = async (req, res) => {
  try {
    const { id, description, description_hi } = req.body;
    if (!id && !description && !description_hi) {
      return res.status(400).json({
        success: false,
        message: 'Please provide id or description'
      })
    }

    const temple = await Mandir.findById(id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      })
    }


    if (description) {
      temple.description = description;
    }

    if (description_hi) {
      temple.description_hi = description_hi;
    }

    await temple.save();
    return res.status(200).json({
      success: true,
      message: 'Temple details updated successfully',
      data: temple
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

exports.getVardaniShivalya = async (req, res) => {
  try {
    const temple = await Mandir.find({});
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Temple details fetched successfully',
      data: temple
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

exports.addMudra = async (req, res) => {
  try {
    const { userId, gifts, credit, debited, amount } = req.body;

    // Log the incoming request
    console.log("Request Body:", req.body);

    if (!userId || !gifts) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const sno = `SNO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newMudra = new Mudra({
      userId, // Ensure userId is included
      gifts,
      credit: isNaN(credit) || credit === "" ? 0 : Number(credit),
      debited: isNaN(debited) || debited === "" ? 0 : Number(debited),
      amount,
      sno,
    });

    await newMudra.save();

    return res.status(201).json({
      success: true,
      message: "Mudra transaction created successfully.",
      mudra: newMudra,
    });
  } catch (error) {
    console.error("Error creating Mudra:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Mudra.",
      error: error.message,
    });
  }
};



exports.getAllMudra = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const mudras = await Mudra.find({ _id });
    return res.status(200).json({ success: true, mudras });
  } catch (error) {
    console.error("Error fetching Mudra transactions:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch Mudra transactions.", error: error.message });
  }
};

exports.getUserBalance = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const transactions = await Mudra.find({ userId });

    let totalCredit = 0;
    let totalDebited = 0;

    transactions.forEach(transaction => {
      totalCredit += isNaN(transaction.credit) ? 0 : transaction.credit;
      totalDebited += isNaN(transaction.debited) ? 0 : transaction.debited;
    });

    const balance = totalCredit - totalDebited;

    return res.status(200).json({ success: true, balance });
  } catch (error) {
    console.error("Error calculating balance:", error);
    return res.status(500).json({ success: false, message: "Failed to calculate balance.", error: error.message });
  }
};



exports.getMudraBySno = async (req, res) => {
  const { sno } = req.params;

  try {
    const mudra = await Mudra.findOne({ sno });

    if (!mudra) {
      return res.status(404).json({ success: false, message: "Mudra transaction not found." });
    }

    res.status(200).json({ success: true, mudra });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred.", error: error.message });
  }
};


exports.updateMudra = async (req, res) => {
  try {
    const { sno } = req.params;
    const { gifts, credit, debited, amount } = req.body;

    if (!gifts || amount == null || credit == null || debited == null) {
      return res.status(400).json({ success: false, message: "All fields are required to update." });
    }

    const updatedMudra = await Mudra.findOneAndUpdate(
      { sno },
      { gifts, credit, debited, amount },
      { new: true }
    );

    if (!updatedMudra) {
      return res.status(404).json({ success: false, message: "Mudra transaction not found." });
    }

    return res.status(200).json({ success: true, message: "Mudra transaction updated successfully.", mudra: updatedMudra });
  } catch (error) {
    console.error("Error updating Mudra transaction:", error);
    return res.status(500).json({ success: false, message: "Failed to update Mudra transaction.", error: error.message });
  }
};

exports.deleteMudra = async (req, res) => {
  try {
    const { sno } = req.params;
    const deletedMudra = await Mudra.findByIdAndDelete(sno);

    if (!deletedMudra) {
      return res.status(404).json({ success: false, message: `Mudra with sno ${sno} not found.` });
    }

    res.status(200).json({
      success: true,
      message: `Mudra with sno ${sno} deleted successfully.`,
      deletedMudra,
    });
  } catch (error) {
    console.error("Error deleting Mudra:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Mudra.",
      error: error.message,
    });
  }
};


exports.addBhagwan = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    // Get the uploaded main image
    const mainImage = req.files["mainImage"]
      ? await uploadFileToS3(req.files["mainImage"][0], "assetsImages/images")
      : "";

    if (!mainImage) {
      return res
        .status(400)
        .json({ success: false, message: "Main image is required" });
    }

    // Create a new Bhagwan entry
    const newBhagwan = new Bhagwan({ name, image: mainImage });
    await newBhagwan.save();

    res.status(201).json({
      success: true,
      message: "Bhagwan added successfully",
      data: newBhagwan,
    });
  } catch (error) {
    console.error("Error adding Bhagwan:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// exports.addSubImages = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const bhagwan = await Bhagwan.findById(id);

//     if (!bhagwan) {
//       return res.status(404).json({ success: false, message: "Bhagwan not found" });
//     }

//     // Get uploaded sub-images
//     const subImages = req.files["subImages"]
//       ? req.files["subImages"].map((file) => file.path.replace(/^.*uploads[\\/]/, "uploads/"))
//       : [];

//     if (subImages.length === 0) {
//       return res.status(400).json({ success: false, message: "No sub-images uploaded" });
//     }

//     // Add sub-images to the Bhagwan's subImages array
//     bhagwan.subImages.push(...subImages);
//     await bhagwan.save();

//     res.status(200).json({
//       success: true,
//       message: "Sub-images added successfully",
//       data: bhagwan,
//     });
//   } catch (error) {
//     console.error("Error adding sub-images:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


exports.addSubImages = async (req, res) => {
  try {
    const { id } = req.params;

    const bhagwan = await Bhagwan.findById(id);
    if (!bhagwan) {
      return res.status(404).json({ success: false, message: "Bhagwan not found" });
    }

    const subImages = req.files["subImages"] || [];
    if (subImages.length === 0) {
      return res.status(400).json({ success: false, message: "No sub-images uploaded" });
    }

    // ✅ Ensure temp directory exists
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // ✅ Resize and upload all images concurrently
    const resizedImages = await Promise.all(
      subImages.map(async (file) => {
        const resizedPath = path.join(tempDir, `resized-${Date.now()}-${file.originalname}`);

        // 1️⃣ Resize and save locally
        await sharp(file.path)
          .resize(400, 600, { fit: "cover" })
          .toFile(resizedPath);

        // 2️⃣ Upload resized image to S3
        const outputFilePath = await uploadFileToS3(
          { path: resizedPath, originalname: file.originalname },
          "assetsImages/images"
        );

        // 3️⃣ Remove local temp file
        fs.unlinkSync(resizedPath);

        return outputFilePath; // return S3 URL
      })
    );

    // ✅ Add resized sub-images to the Bhagwan's subImages array
    bhagwan.subImages.push(...resizedImages);
    await bhagwan.save();

    res.status(200).json({
      success: true,
      message: "Sub-images added successfully",
      data: bhagwan,
    });
  } catch (error) {
    console.error("Error adding sub-images:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};


exports.getBhagwan = async (req, res) => {
  try {
    const { id } = req.params;

    const bhagwan = await Bhagwan.findById(id);

    if (!bhagwan) {
      return res.status(404).json({ success: false, message: "Bhagwan not found" });
    }

    res.status(200).json({ success: true, message: "Bhagwan details retrieved", data: bhagwan });
  } catch (error) {
    console.error("Error fetching Bhagwan details:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


exports.getAllBhagwan = async (req, res) => {
  try {
    // Fetch all Bhagwan entries from the database
    const bhagwans = await Bhagwan.find();

    if (!bhagwans || bhagwans.length === 0) {
      return res.status(404).json({ success: false, message: "No Bhagwan found" });
    }

    res.status(200).json({
      success: true,
      message: "All Bhagwan details retrieved",
      data: bhagwans,
    });
  } catch (error) {
    console.error("Error fetching all Bhagwan details:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


ffmpeg.setFfmpegPath('/usr/local/bin/ffmpeg');

/**
 * Convert a video/audio URL to MP3 and upload to S3
 * @param {string} url - YouTube, HLS, or direct audio/video URL
 * @returns {Promise<string>} - S3 URL of converted MP3
 */
async function convertToMp3(url) {
  try {
    // 1️⃣ Define local temp file
    const projectRoot = path.resolve(__dirname, "..");
    const fileName = `audio_${Date.now()}.mp3`;
    const outputPath = path.join(projectRoot, "uploads", "mp3", fileName);

    // Ensure uploads/mp3 folder exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // 2️⃣ Helper to run FFmpeg
    const ffmpegToMp3 = (input) =>
      new Promise((resolve, reject) => {
        ffmpeg(input)
          .noVideo()
          .audioCodec("libmp3lame")
          .audioBitrate("192k")
          .save(outputPath)
          .on("end", resolve)
          .on("error", reject);
      });

    // 3️⃣ Skip YouTube; only handle HLS or direct URLs
    if (url.includes(".m3u8") || url.includes("cloudflarestream.com") || url.startsWith("http")) {
      await ffmpegToMp3(url);
    } else {
      throw new Error("Unsupported URL format (YouTube URLs are skipped)");
    }

    // 4️⃣ Upload to S3
    const s3Url = await uploadFileToS3(
      {
        path: outputPath,
        mimetype: "audio/mpeg",
        originalname: fileName,
      },
      "assetsImages/mp3"
    );

    // 5️⃣ Clean up local temp file
    fs.unlinkSync(outputPath);

    return s3Url;
  } catch (error) {
    console.error("convertToMp3 error:", error);
    return "";
  }
}





exports.createOrUpdateContent = async (req, res) => {
  try {
    console.log("Files: ", req.files);
    console.log("Body: ", req.body);

    const {
      title,
      description,
      description_hi,
      temple,
      aarti,
      aartilyrics,
      chalisa,
      chalisalyrics,
      mantralink,
      mantralyrics,
      bhajan,
      bhjanlyrics,
      id,
      vr_mode,
      temple_vr_darshan,
    } = req.body;

    const image = req.files["image"]
      ? await uploadFileToS3(req.files["image"][0], "assetsImages/darshan")
      : null;

    if (!title || !temple) {
      return res.status(400).json({
        success: false,
        message: "Title and Temple name are required",
      });
    }

    const bulkAudioUpload = req.files["bulkVideoUpload"]
      ? await Promise.all(
        req.files["bulkVideoUpload"].map(async (file, index) => {
          const fileUrl = await uploadFileToS3(file, "assetsImages/mp3");
          const imageUrl = await uploadFileToS3(file, "assetsImages/mp3/images"); // optional thumbnail

          return {
            id: `${index + 1}`,
            url: fileUrl,
            title: `Audio Title ${index + 1}`,
            artist: `Artist ${index + 1}`,
            artwork: imageUrl,
          };
        })
      )
      : [];




    const bulkImageUpload = req.files["bulkImageUpload"]
      ? await Promise.all(
        req.files["bulkImageUpload"].map(async (file) =>
          await uploadFileToS3(file, "assetsImages/darshan")
        )
      )
      : [];


    // 🔄 Parse vr_mode safely
    let parsedVrMode = [];
    try {
      parsedVrMode = typeof vr_mode === "string" ? JSON.parse(vr_mode) : vr_mode;
    } catch (e) {
      console.warn("Invalid vr_mode format", e);
    }

    console.log('Parsed Vr Mode. ', parsedVrMode);

    let existingContent = await Content.findById(id);

    const processedVrMode = Array.isArray(parsedVrMode)
      ? await Promise.all(
        parsedVrMode.map(async (vr, index) => {
          const vrField = `vr_mode[${index}].vr_image`;
          const file = req.files?.[vrField]?.[0];
          const newImage = file ? await uploadFileToS3(file, "assetsImages/vr") : null;

          return {
            vr_title: vr.vr_title,
            vr_image: newImage || vr.vr_image || existingContent?.vr_mode?.[index]?.vr_image,
            tags: vr.tags
              ? vr.tags.split(',').map(t => t.trim())
              : existingContent?.vr_mode?.[index]?.tags || [],
            vr_type: vr.vr_type || "VR",
            vr_darshan_fake_user: Number(vr.vr_darshan_fake_user) || 0,
            vr_visible_puja: vr.vr_visible_puja === "1" ? "1" : "0",
          };
        })
      )
      : [];


    if (existingContent) {
      existingContent.title = title || existingContent.title;
      existingContent.description = description || existingContent.description;
      existingContent.description_hi = description_hi || existingContent.description_hi;
      existingContent.image = image || existingContent.image;
      existingContent.temple = temple || existingContent.temple;

      if (temple_vr_darshan) {
        try {
          const darshanObj = typeof temple_vr_darshan === 'string'
            ? JSON.parse(temple_vr_darshan)
            : temple_vr_darshan;
          existingContent.temple_vr_darshan = darshanObj;
        } catch (e) {
          console.warn("Invalid temple_vr_darshan format", e);
        }
      }

      existingContent.bulkAudioUpload = [
        ...existingContent.bulkAudioUpload,
        ...bulkAudioUpload,
      ];
      existingContent.bulkImageUpload = [
        ...existingContent.bulkImageUpload,
        ...bulkImageUpload,
      ];
      existingContent.vr_mode = processedVrMode;

      existingContent.aarti = aarti ? convertYouTubeLinkToEmbed(aarti) : '';
      existingContent.aartilyrics = aartilyrics;
      existingContent.aarti_mp3 = aarti ? await convertToMp3(aarti) : '';
      existingContent.chalisa = chalisa ? convertYouTubeLinkToEmbed(chalisa) : '';
      existingContent.chalisalyrics = chalisalyrics;
      existingContent.chalisa_mp3 = chalisa ? await convertToMp3(chalisa) : '';
      existingContent.mantralink = mantralink ? convertYouTubeLinkToEmbed(mantralink) : '';
      existingContent.mantralyrics = mantralyrics;
      existingContent.mantralink_mp3 = mantralink ? await convertToMp3(mantralink) : '';
      existingContent.bhajan = bhajan ? convertYouTubeLinkToEmbed(bhajan) : '';
      existingContent.bhjanlyrics = bhjanlyrics;
      existingContent.bhajan_mp3 = bhajan ? await convertToMp3(bhajan) : '';

      const updatedContent = await existingContent.save();

      return res.status(200).json({
        success: true,
        message: `Content updated successfully for ${temple} temple`,
        data: updatedContent,
      });
    } else {
      let parsedTempleVrDarshan = {};
      if (temple_vr_darshan) {
        try {
          parsedTempleVrDarshan = typeof temple_vr_darshan === 'string'
            ? JSON.parse(temple_vr_darshan)
            : temple_vr_darshan;
        } catch (e) {
          console.warn("Invalid temple_vr_darshan format", e);
        }
      }

      const newContent = new Content({
        title,
        temple,
        description,
        description_hi,
        image,
        bulkAudioUpload,
        bulkImageUpload,
        vr_mode: processedVrMode,
        temple_vr_darshan: parsedTempleVrDarshan,
        aarti: aarti ? convertYouTubeLinkToEmbed(aarti) : '',
        aartilyrics,
        aarti_mp3: aarti ? await convertToMp3(aarti) : '',
        chalisa: chalisa ? convertYouTubeLinkToEmbed(chalisa) : '',
        chalisalyrics,
        chalisa_mp3: chalisa ? await convertToMp3(chalisa) : '',
        mantralink: mantralink ? convertYouTubeLinkToEmbed(mantralink) : '',
        mantralyrics,
        mantralink_mp3: mantralink ? await convertToMp3(mantralink) : '',
        bhajan: bhajan ? convertYouTubeLinkToEmbed(bhajan) : '',
        bhjanlyrics,
        bhajan_mp3: bhajan ? await convertToMp3(bhajan) : '',
      });

      const savedContent = await newContent.save();

      return res.status(201).json({
        success: true,
        message: "Content created successfully",
        data: savedContent,
      });
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};



// Get All Content
exports.getAllContent = async (req, res) => {
  try {
    const contentList = await Content.find().lean();

    const updatedContentList = contentList.map(content => {
      const updatedAudioList = content.bulkAudioUpload ? content.bulkAudioUpload.map(audio => {
        const { _id, url, artwork, ...audioWithoutId } = audio;

        return {
          ...audioWithoutId,
          url: url || '',
          artwork: artwork || ''
        };
      }) : [];

      // Create array of all audio URLs
      const videoUrls = updatedAudioList.map(item => item.url).filter(Boolean); // remove empty strings

      // Merge with existing bulkImageUpload (not nested)
      const updatedBulkImageUpload = [
        ...(content.bulkImageUpload || []),
        ...videoUrls
      ];

      return {
        ...content,
        bulkImageUpload: updatedBulkImageUpload,
        bulkVideoUpload: videoUrls,
        bulkImageOnly: content.bulkImageUpload || [],
      };
    });

    res.status(200).json({ success: true, data: updatedContentList });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching content", error: error.message });
  }
};

// Adjust path if needed


exports.darshanDeleteImage = async (req, res) => {
  try {
    const { image, id } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    if (!Array.isArray(content.bulkImageUpload)) {
      content.bulkImageUpload = [];
    }

    // Extract filename or S3 key from image URL
    // Example image URL: https://your-bucket.s3.amazonaws.com/assetsImages/images/f07923cf.png
    const urlParts = image.split("/");
    const key = urlParts.slice(3).join("/"); // removes domain, leaves path in bucket
    // key => assetsImages/images/f07923cf.png

    // Remove image from DB array
    content.bulkImageUpload = content.bulkImageUpload.filter(
      (img) => !img.includes(key)
    );
    await content.save();

    // Delete image from S3 bucket
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    await s3
      .deleteObject(params)
      .promise()
      .then(() => console.log("✅ Deleted from S3:", key))
      .catch((err) => console.error("❌ S3 delete error:", err));

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: content,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message,
    });
  }
};


exports.darshanUpdateImage = async (req, res) => {
  try {
    const { oldImage, id } = req.body;
    const newImage = req.files?.image?.[0]; // multer file

    if (!oldImage || !id || !newImage) {
      return res.status(400).json({
        success: false,
        message: "Old image, new image & content ID required",
      });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    if (!Array.isArray(content.bulkImageUpload)) {
      content.bulkImageUpload = [];
    }

    // -------- 🧹 Delete old image from S3 ----------
    try {
      const oldKey = oldImage.split(".com/")[1]; // e.g. assetsImages/images/f07923cf.png
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: oldKey,
        })
        .promise();
      console.log("✅ Deleted old image from S3:", oldKey);

      // Remove old image path from DB array
      content.bulkImageUpload = content.bulkImageUpload.filter(
        (img) => !img.includes(oldKey)
      );
    } catch (err) {
      console.error("⚠️ Error deleting old S3 image:", err.message);
    }

    // -------- ⬆️ Upload new image to S3 ----------
    const s3UploadResult = await uploadFileToS3(
      newImage,
      "assetsImages/images"
    );

    const newImageUrl = s3UploadResult?.Location;
    if (!newImageUrl) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload new image to S3",
      });
    }

    // Add new image URL to DB array
    content.bulkImageUpload.push(newImageUrl);
    await content.save();

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      images: content.bulkImageUpload,
    });
  } catch (error) {
    console.error("❌ Error in darshanUpdateImage:", error);
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: error.message,
    });
  }
};

exports.darshanDeleteVideo = async (req, res) => {
  try {
    const { video, id } = req.body;

    if (!video) {
      return res.status(400).json({ success: false, message: "Video is required" });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    if (!Array.isArray(content.bulkAudioUpload)) {
      content.bulkAudioUpload = [];
    }

    // 🔍 Extract S3 key (path after bucket name)
    const key = video.split(".com/")[1]; // e.g. assetsImages/videos/filename.mp4
    if (!key) {
      return res.status(400).json({ success: false, message: "Invalid S3 video URL" });
    }

    // 🧹 Delete video from S3
    try {
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        })
        .promise();
      console.log("✅ Deleted video from S3:", key);
    } catch (err) {
      console.error("⚠️ Error deleting from S3:", err.message);
    }

    // 🧩 Remove video from MongoDB array
    const fileName = path.basename(key);
    content.bulkAudioUpload = content.bulkAudioUpload.filter((audio) => {
      const audioFileName = audio.url?.split("/").pop();
      return audioFileName !== fileName;
    });

    await content.save();

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: content,
    });
  } catch (error) {
    console.error("❌ Error deleting video:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting video",
      error: error.message,
    });
  }
};



// Get Content By ID
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    // Process bulkAudioUpload
    const updatedAudioList = content.bulkAudioUpload ? content.bulkAudioUpload.map(audio => {
      const { _id, url, artwork, ...audioWithoutId } = audio;

      const updatedAudioData = {
        ...audioWithoutId,
        url: url || '',
        artwork: artwork || ''
      };

      return updatedAudioData;
    }) : [];

    const lastVideoUrl = updatedAudioList.length > 0
      ? updatedAudioList[updatedAudioList.length - 1].url
      : null;

    const updatedBulkImageUpload = content.bulkImageUpload ? [...content.bulkImageUpload] : [];
    if (lastVideoUrl) {
      updatedBulkImageUpload.push(lastVideoUrl);
    }

    const updatedContent = {
      ...content.toObject(),
      bulkImageUpload: updatedBulkImageUpload,
      bulkVideoUpload: lastVideoUrl,
      bulkImageOnly: content.bulkImageUpload,
    };

    return res.status(200).json({
      success: true,
      message: "Get Data Fetching",
      data: updatedContent
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching content by ID",
      error: error.message
    });
  }
};


exports.deleteContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    // ✅ Helper to delete file from S3
    const deleteFromS3 = async (fileUrl) => {
      if (!fileUrl) return;

      try {
        // Extract only the key part (path inside bucket)
        const url = new URL(fileUrl);
        const key = decodeURIComponent(url.pathname.substring(1)); // remove leading '/'

        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
        }).promise();

        console.log(`🗑️ Deleted from S3: ${key}`);
      } catch (err) {
        console.error("Error deleting from S3:", err.message);
      }
    };

    // ✅ Delete single main image
    await deleteFromS3(deletedContent.image);

    // ✅ Delete bulk audio files
    if (Array.isArray(deletedContent.bulkAudioUpload)) {
      for (const item of deletedContent.bulkAudioUpload) {
        const url = typeof item === 'string' ? item : item.url;
        await deleteFromS3(url);
      }
    }

    // ✅ Delete bulk image files
    if (Array.isArray(deletedContent.bulkImageUpload)) {
      for (const item of deletedContent.bulkImageUpload) {
        const url = typeof item === 'string' ? item : item.url;
        await deleteFromS3(url);
      }
    }

    res.status(200).json({
      success: true,
      message: "Content and all associated S3 files deleted successfully",
      data: deletedContent,
    });

  } catch (error) {
    console.error("❌ Error deleting content:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting content",
      error: error.message,
    });
  }
};



// Create Pooja Title
exports.createPoojaTitle = async (req, res) => {
  try {
    const { title } = req.body;

    // Check if the title already exists
    const existingTitle = await PoojaItem.findOne({ title });
    if (existingTitle) {
      return res.status(400).json({
        success: false,
        message: "Title already exists. Please choose a different title.",
      });
    }

    // Create new title without items
    const poojaItem = new PoojaItem({ title, items: [] });
    await poojaItem.save();

    return res.status(200).json({
      success: true,
      message: "Pooja title created successfully.",
      data: poojaItem,
    });
  } catch (error) {
    console.error("Error creating Pooja Title:", error);
    res.status(500).json({
      success: false,
      message: "Error creating Pooja Title",
      error: error.message || error,
    });
  }
};


// VR Assets Itemssssss
exports.addVRPoojaItems = async (req, res) => {
  try {
    const { _id, itemName, itemPrice, duration, payment, keywords, animationType } = req.body;

      const itemImagePath = req.files?.itemImage?.[0]
      const audioPath = req.files?.audio?.[0];

      let itemImageUrl = "";
      let audioUrl = "";

      // Upload each file (if present)
      if (itemImagePath) {
        itemImageUrl = await uploadFileToS3(
          itemImagePath ,
          "assetsImages/images"
        );
      }

      if (audioPath) {
        audioUrl = await uploadFileToS3(
           audioPath,
          "assetsImages/audio"
        );
      }

    // Validation
    if (!itemName || !payment || !animationType) {
      return res.status(400).json({
        success: false,
        message: "itemName and payment are required.",
      });
    }

    // ==========================
    // 🔄 Update Case
    // ==========================
    if (_id) {
      const existingItem = await PoojaVRItem.findById(_id);
      if (!existingItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found for update.",
        });
      }

      existingItem.itemName = itemName;
      existingItem.itemPrice = Number(itemPrice) || 0;
      existingItem.duration = Number(duration) || 0;
      existingItem.payment = payment;
      existingItem.keywords = keywords ? keywords.split(",").map(k => k.trim()) : [];
      existingItem.animationType = animationType;

      if (itemImageUrl) existingItem.itemImage = itemImageUrl;
      if (audioUrl) existingItem.audio = audioUrl;

      const updatedItem = await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "VR Pooja item updated successfully.",
        data: updatedItem,
      });
    }

    // ==========================
    // ➕ Create Case
    // ==========================
    if (!itemImage) {
      return res.status(400).json({
        success: false,
        message: "itemImage is required for new item.",
      });
    }

    const newItem = new PoojaVRItem({
      itemName,
      itemImage,
      itemPrice: Number(itemPrice) || 0,
      duration: Number(duration) || 0,
      payment,
      keywords: keywords ? keywords.split(",").map(k => k.trim()) : [],
      audio: audio || "",
      animationType,
    });

    const savedItem = await newItem.save();

    return res.status(201).json({
      success: true,
      message: "VR Pooja item added successfully.",
      data: savedItem,
    });

  } catch (error) {
    console.error("Error adding/updating VR Pooja item:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while processing item.",
      error: error.message || error,
    });
  }
};


exports.deleteVRPoojaItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required.",
      });
    }

    const deletedItem = await PoojaVRItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "VR Pooja item deleted successfully.",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting VR Pooja item:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting VR Pooja item.",
      error: error.message || error,
    });
  }
};




exports.getVRPoojaItems = async (req, res) => {
  try {
    const items = await PoojaVRItem.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "VR Pooja items fetched successfully.",
      data: items,
    });
  } catch (error) {
    console.error("Error fetching VR Pooja items:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching VR Pooja items.",
      error: error.message || error,
    });
  }
};


// VR Assets Itemssssss


// Add Items to Pooja Title by ID
exports.addItemsToPoojaTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const parsedItems = JSON.parse(items);

    // Check if files were uploaded
    if (!req.files || !req.files.itemImages) {
      return res.status(400).json({
        success: false,
        message: "Item images are required.",
      });
    }

    // Get uploaded image paths and replace '\\' with '/'
    const uploadedImages = await Promise.all(
      req.files.itemImages.map((file) => uploadFileToS3(file, "assetsImages/images"))
    );


    // Ensure images match items count
    if (parsedItems.length !== uploadedImages.length) {
      return res.status(400).json({
        success: false,
        message: "The number of item images must match the number of items.",
      });
    }

    // Find the Pooja Item by ID
    const poojaItem = await PoojaItem.findById(id);

    if (!poojaItem) {
      return res.status(404).json({
        success: false,
        message: "Pooja Title not found",
      });
    }

    // Create new items with images, payment, and title
    const newItems = parsedItems.map((item, index) => ({
      itemName: item.itemName,
      itemImage: uploadedImages[index],
      itemPrice: item.itemPrice,
      duration: item.duration,
      payment: item.payment || "add",
      title: poojaItem.title, // Add title here for each item
    }));

    // Append new items to the existing list
    poojaItem.items = [...poojaItem.items, ...newItems];

    // Save to database
    await poojaItem.save();

    // Clean response to return only required fields
    const cleanResponse = {
      _id: poojaItem._id,
      title: poojaItem.title,
      items: poojaItem.items.map((item) => ({
        itemName: item.itemName,
        itemImage: item.itemImage,
        itemPrice: item.itemPrice,
        payment: item.payment,
        _id: item._id,
        title: poojaItem.title,
      })),
      createdAt: poojaItem.createdAt,
      updatedAt: poojaItem.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Items added to Pooja Title successfully.",
      data: cleanResponse,
    });
  } catch (error) {
    console.error("Error adding items to Pooja Title:", error);
    res.status(500).json({
      success: false,
      message: "Error adding items to Pooja Title",
      error: error.message || error,
    });
  }
};

exports.updateItemsToPoojaTitle = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    // Parse items from body if it's stringified
    let items = req.body.items;
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid items format. Expected a JSON array.",
        });
      }
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is missing or empty.",
      });
    }

    const { itemName, itemPrice, duration, payment } = items[0]; // only handling one item for update
    console.log('Parsed Items:', items);

    // Find the Pooja Item by ID
    const poojaItem = await PoojaItem.findById(id);
    if (!poojaItem) {
      return res.status(404).json({
        success: false,
        message: "Pooja Title not found",
      });
    }

    // Find the specific item by itemId
    const itemIndex = poojaItem.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in Pooja Title",
      });
    }

    // Update fields
    if (itemName) poojaItem.items[itemIndex].itemName = itemName;
    if (itemPrice) poojaItem.items[itemIndex].itemPrice = itemPrice;
    if (duration) poojaItem.items[itemIndex].duration = duration;
    if (payment) poojaItem.items[itemIndex].payment = payment;

    // Handle uploaded image
    console.log('item image ', req.files);
    if (req.files && req.files.itemImages && req.files.itemImages[0]) {
      const file = req.files.itemImages[0]; // ✅ access correct field

      poojaItem.items[itemIndex].itemImage = await uploadFileToS3(
        file,
        "assetsImages/images"
      );
    }


    await poojaItem.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: poojaItem,
    });

  } catch (error) {
    console.error("Error updating item in Pooja Title:", error);
    res.status(500).json({
      success: false,
      message: "Error updating item in Pooja Title",
      error: error.message || error,
    });
  }
};




// Get All Pooja Items
exports.getAllPoojaItems = async (req, res) => {
  try {

    // const poojaItems = await PoojaItem.find().sort({ 'items.itemPrice': 1 });

    const sortOrder = {
      "676cfd1b9517315bddfa5c97": 1,
      "6780da409bd88cfb6ae1ba48": 2,
      "677bad2d0a161b54f87c4b29": 3,
      "676fa0cec1a3b21c5defd076": 4,
    };

    // Aggregation pipeline
    const poojaItems = await PoojaItem.aggregate([
      { $unwind: "$items" },
      {
        $addFields: {
          sortIndex: {
            $ifNull: [
              {
                $getField: {
                  input: sortOrder,
                  field: { $toString: "$_id" }
                }
              },
              99 // Default value
            ]
          }
        },
      },
      { $sort: { sortIndex: 1, "items.itemPrice": 1 } },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          items: { $push: "$items" },
        },
      },
      { $sort: { sortIndex: 1 } },
      { $unset: "sortIndex" },
    ]);


    // const poojaItems = await PoojaItem.aggregate([
    //   { $unwind: "$items" },  // items को flatten करें
    //   { $sort: { "items.itemPrice": 1 } },  // sorting करें
    //   { 
    //     $group: {  
    //       _id: "$_id",
    //       title: { $first: "$title" },
    //       items: { $push: "$items" }
    //     }
    //   }
    // ]);

    res.status(200).json({
      success: true,
      data: poojaItems,
    });
  } catch (error) {
    console.error("Error fetching Pooja Items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Pooja Items",
      error,
    });
  }
};


exports.getAllPoojaItemsRaw = async (req, res) => {
  try {
    const poojaItems = await PoojaItem.find(); // Fetch all data

    res.status(200).json({
      success: true,
      data: poojaItems,
    });
  } catch (error) {
    console.error("Error fetching Pooja Items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Pooja Items",
      error: error.message || error,
    });
  }
};




// Get Pooja Item by ID
exports.getPoojaItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const poojaItem = await PoojaItem.findById(id);

    if (!poojaItem) {
      return res.status(404).json({
        success: false,
        message: "Pooja Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: poojaItem,
    });
  } catch (error) {
    console.error("Error fetching Pooja Item:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Pooja Item",
      error,
    });
  }
};

exports.deletePoojaTitleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the title
    const poojaItem = await PoojaItem.findByIdAndDelete(id);

    if (!poojaItem) {
      return res.status(404).json({
        success: false,
        message: "Pooja Title not found",
      });
    }

    // Optional: Delete all item images from the server
    const fs = require("fs");
    poojaItem.items.forEach((item) => {
      if (fs.existsSync(item.itemImage)) {
        fs.unlinkSync(item.itemImage);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Pooja Title and all associated items deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Pooja Title:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting Pooja Title",
      error,
    });
  }
};


// Delete a specific item from a title by title ID and item ID
exports.deleteItemFromPoojaTitle = async (req, res) => {
  try {
    const { titleId, itemId } = req.params;

    // Find the title by ID
    const poojaItem = await PoojaItem.findById(titleId);

    if (!poojaItem) {
      return res.status(404).json({
        success: false,
        message: "Pooja Title not found",
      });
    }

    // Find the item within the title's items and remove it
    const itemIndex = poojaItem.items.findIndex((item) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found within the specified Pooja Title",
      });
    }

    // Remove the item from the list
    const removedItem = poojaItem.items.splice(itemIndex, 1)[0];

    // Optional: Delete the item's image from the server
    const fs = require("fs");
    if (fs.existsSync(removedItem.itemImage)) {
      fs.unlinkSync(removedItem.itemImage);
    }

    // Save the updated title
    await poojaItem.save();

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully from the Pooja Title",
      data: poojaItem,
    });
  } catch (error) {
    console.error("Error deleting item from Pooja Title:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting item from Pooja Title",
      error,
    });
  }
};



/************* Religious Module Controller Start *****************/

// controllers/religiousCategoryController.js

//  // Ensure the directory exists

const uploadReligiousSubCategoryImg = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
]);


const uploadReligiousCategoryImg = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
]);

// Create a new Religious Category
exports.createReligiousCategory = async (req, res) => {
  // Handle file upload
  uploadReligiousCategoryImg(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
    }

    try {
      const categories = [
        "Aarti",
        "Chalisa",
        "Beej Mantra",
        "Kavacha",
        "Vart Katha",
        "Puja Vidhi",
        "Devotional Songs",
        "Test"
      ];

      // Extract the category name from the request body
      const { categoryName } = req.body;

      // Check if the provided category name is in the allowed list
      if (!categories.includes(categoryName)) {
        return res.status(400).json({
          success: false,
          message: `Invalid category name. Valid options are: ${categories.join(", ")}`
        });
      }

      // Check if category name already exists
      const existingCategory = await ReligiousCategory.findOne({ categoryName });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: 'Category name must be unique!' });
      }

      const imagePath = req.files["image"]
        ? await uploadFileToS3(req.files["image"][0], "assetsImages/religiousCategoryImg")
        : "";

      // Create a new ReligiousCategory
      const newReligiousCategory = new ReligiousCategory({
        categoryName,
        image: imagePath,  // Save the path of the uploaded image
      });

      // Save the new category to the database
      await newReligiousCategory.save();

      res.status(201).json({
        success: true,
        message: 'Religious Category created successfully!',
        data: newReligiousCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });
};


// Get all Religious Categories
exports.getAllReligiousCategories = async (req, res) => {
  try {
    const categories = await ReligiousCategory.find();
    res.status(200).json({ success: true, message: 'Getting data successfully', data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal Server error' });
  }
};

// Get a single Religious Category by ID
exports.getReligiousCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId || categoryId == " ") {
      return res.status(400).json({
        success: false,
        message: 'categoryId is required!'
      })
    }
    const category = await ReligiousCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.status(200).json({ success: true, message: "getting data successfully", data: category });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a Religious Category
exports.updateReligiousCategory = async (req, res) => {
  // Handle file upload first
  uploadReligiousCategoryImg(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
    }

    try {
      const { categoryName, categoryId } = req.body;

      // Validate that the categoryId and categoryName are provided
      if (!categoryId || !categoryName) {
        return res.status(400).json({
          success: false,
          message: 'categoryId and categoryName are required!',
        });
      }

      // Prepare the new image path if a new image is uploaded
      const imagePath = req.files["image"]
        ? await uploadFileToS3(req.files["image"][0], "assetsImages/religiousCategoryImg")
        : undefined;

      // Find and update the category by categoryId
      const updatedCategory = await ReligiousCategory.findByIdAndUpdate(
        categoryId,
        {
          categoryName,
          image: imagePath, // Update the image path if a new image was uploaded
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Category updated successfully!',
        category: updatedCategory,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
};


// Delete a Religious Category
exports.deleteRelegiousCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId || categoryId == " ") {
      return res.status(400).json({
        success: false,
        message: 'categoryId is required!'
      })
    }
    const deletedCategory = await ReligiousCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal Server error' });
  }
};



// Subcategory api

// Helper function to convert YouTube link to embed format
function convertYouTubeLinkToEmbed(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url; // Return the original URL if it's not a YouTube link
}

// Create a new Religious Category
exports.createReligiousSubCategory = async (req, res) => {
  // Handle file upload
  uploadReligiousSubCategoryImg(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
    }

    try {
      const { categoryId, subCategoryName, link, description } = req.body;

      // Validate required fields
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: 'categoryId is required!',
        });
      }

      // Check if category name already exists
      const existingCategory = await ReligiousSubCategory.findOne({ subCategoryName });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: 'SubCategory name must be unique!' });
      }

      const imagePath = req.files["image"]
        ? await uploadFileToS3(req.files["image"][0], "assetsImages/religiousSubCategoryImg")
        : "";

      // Convert YouTube link to embed format if the link is a YouTube URL
      const convertedLink = link ? convertYouTubeLinkToEmbed(link) : '';

      // Create a new ReligiousCategory
      const newReligiousSubCategory = new ReligiousSubCategory({
        subCategoryName,
        image: imagePath,  // Save the path of the uploaded image
        link: convertedLink,
        description,
        categoryId
      });

      // Save the new category to the database
      await newReligiousSubCategory.save();

      res.status(201).json({
        success: true,
        message: 'Religious SubCategory created successfully!',
        data: newReligiousSubCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  });
};

// Get all Religious Categories
exports.getAllReligiousSubCategories = async (req, res) => {
  try {
    const Subcategories = await ReligiousSubCategory.find().populate('categoryId', 'categoryName');
    res.status(200).json({ success: true, message: 'Getting data successfully', data: Subcategories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal Server error' });
  }
};

// Get Religious SubCategory by Category ID
exports.getReligiousSubCategoryByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.body; // Use `params` for URL params instead of `body`

    // Validate categoryId
    if (!categoryId || categoryId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: 'categoryId is required and cannot be empty!',
      });
    }

    // Find subcategories by categoryId and populate categoryName
    const subcategories = await ReligiousSubCategory.find({ categoryId }).populate('categoryId', 'categoryName');

    // Check if any subcategories were found
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No subcategories found for the given category ID!',
      });
    }

    // Extract categoryName from the populated categoryId of the first subcategory
    const categoryName = subcategories[0].categoryId.categoryName;

    // Map the subcategories and remove categoryName (as it is redundant)
    const cleanedSubcategories = subcategories.map(subcategory => {
      const { categoryId, ...rest } = subcategory.toObject();  // Remove categoryId and keep other fields
      return rest;
    });

    // Send successful response with data
    res.status(200).json({
      success: true,
      message: 'Subcategories retrieved successfully!',
      categoryName,  // Include categoryName only once
      data: cleanedSubcategories,  // Send the cleaned subcategory data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: err.message,
    });
  }
};


// Update a Religious Category
exports.updateReligiousSubCategory = async (req, res) => {
  // Handle file upload first
  uploadReligiousSubCategoryImg(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ success: false, message: 'Multer error', error: err });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
    }

    try {
      const { subCategoryName, link, description, subCategoryId, categoryId } = req.body;

      console.log("req.body::::", req.body);

      // Validate that the categoryId and categoryName are provided
      if (!subCategoryId) {
        return res.status(400).json({
          success: false,
          message: 'subCategoryId are required!',
        });
      }

      // Prepare the new image path if a new image is uploaded
      const imagePath = req.files["image"]
        ? await uploadFileToS3(req.files["image"][0], "assetsImages/religiousSubCategoryImg")
        : undefined;

      // Convert YouTube link to embed format if the link is a YouTube URL
      const convertedLink = link ? convertYouTubeLinkToEmbed(link) : '';

      // Find and update the category by categoryId
      const updatedSubCategory = await ReligiousSubCategory.findByIdAndUpdate(
        subCategoryId,
        {
          subCategoryName,
          image: imagePath, // Update the image path if a new image was uploaded
          link: convertedLink,
          description,
          categoryId
        },
        { new: true }
      );

      if (!updatedSubCategory) {
        return res.status(404).json({ success: false, message: 'SubCategory not found' });
      }

      res.status(200).json({
        success: true,
        message: 'SubCategory updated successfully!',
        category: updatedSubCategory,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
};


// Delete a Religious Category
exports.deleteRelegiousSubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.body;

    if (!subcategoryId || subcategoryId == " ") {
      return res.status(400).json({
        success: false,
        message: 'subcategoryId is required!'
      })
    }
    const deletedSubCategory = await ReligiousSubCategory.findByIdAndDelete(subcategoryId);
    if (!deletedSubCategory) {
      return res.status(404).json({ success: false, error: 'SubCategory not found' });
    }
    res.status(200).json({ success: true, message: 'SubCategory deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal Server error' });
  }
};






/************* Religious Module Controller End *****************/


exports.getRechargeHistory = async (req, res) => {
  try {
    const history = await RechargeHistory.find({}).populate('userId', 'customerName phoneNumber email').sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Fetch Successfully", history });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}


exports.addPanchang = async (req, res) => {
  try {
    const { description, year, lang } = req.body;

    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    let existingpanchang = await PanchangMonth.findOne({ name: 'panchang-monthly', year: year, lang: lang });

    if (existingpanchang) {
      existingpanchang.description = description;
      existingpanchang.year = year;
      existingpanchang.lang = lang;

      await existingpanchang.save();
    } else {
      const newPanchang = new PanchangMonth({ name: "panchang-monthly", description, year, lang });
      await newPanchang.save();
    }

    return res.status(200).json({ success: true, message: "Panchang updated successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};


exports.getAllPanchang = async (req, res) => {
  try {
    const { lang } = req.query;
    const panchang = await PanchangMonth.findOne({ name: 'panchang-monthly', lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(404).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getPanchangData = async (req, res) => {
  try {
    const { year, lang } = req.body;
    const language = lang || 'en';
    const panchang = await PanchangMonth.findOne({ name: 'panchang-monthly', year: year, lang: language });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.addMuhuratVivah = async (req, res) => {
  try {
    const { description, year, lang } = req.body;

    const langauge = lang || 'en';

    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    let existingpanchang = await PanchangMonth.findOne({ name: 'muhurat-vivah', year: year, lang: langauge });

    if (existingpanchang) {
      existingpanchang.description = description;
      existingpanchang.year = year;

      await existingpanchang.save();
    } else {
      const newPanchang = new PanchangMonth({ name: "muhurat-vivah", description, year, lang });
      await newPanchang.save();
    }

    return res.status(200).json({ success: true, message: "Panchang updated successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getAllMuhuratVivah = async (req, res) => {
  try {
    const { lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-vivah', lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(404).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getMuhuratVivahData = async (req, res) => {
  try {
    const { year, lang } = req.body;
    const language = lang || 'en';
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-vivah', year: year, lang: language });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.addMuhuratGrahPravesh = async (req, res) => {
  try {
    const { description, year, lang } = req.body;
    const language = lang || 'en';

    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required", });
    }

    let existingpanchang = await PanchangMonth.findOne({ name: 'muhurat-grahpravesh', year: year, lang: language });

    if (existingpanchang) {
      existingpanchang.description = description;
      existingpanchang.year = year;
      existingpanchang.lang = language;

      await existingpanchang.save();
    } else {
      const newPanchang = new PanchangMonth({ name: "muhurat-grahpravesh", description, year, lang });
      await newPanchang.save();
    }

    return res.status(200).json({ success: true, message: "Panchang updated successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.getAllMuhuratGrahPravesh = async (req, res) => {
  try {
    const { lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-grahpravesh', lang: lang });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getMuhuratGrahPraveshData = async (req, res) => {
  try {
    const { year, lang } = req.body;
    const language = lang || 'en';
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-grahpravesh', year: year, lang: language });
    if (!panchang || panchang.length === 0) {
      return res.status(404).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.addMuhuratVaahan = async (req, res) => {
  try {
    const { description, year, lang } = req.body;

    const language = lang || 'en';

    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    let existingpanchang = await PanchangMonth.findOne({ name: 'muhurat-vaahan', year: year, lang: language });

    if (existingpanchang) {
      existingpanchang.description = description;
      existingpanchang.year = year;
      existingpanchang.lang = language;

      await existingpanchang.save();
    } else {
      const newPanchang = new PanchangMonth({ name: "muhurat-vaahan", description, year, lang: language });
      await newPanchang.save();
    }

    return res.status(200).json({ success: true, message: "Panchang updated successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.getAllMuhuratVaahan = async (req, res) => {
  try {
    const { lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-vaahan', lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.getMuhuratVaahanData = async (req, res) => {
  try {
    const { year, lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-vaahan', year: year, lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.addMuhuratSampatti = async (req, res) => {
  try {
    const { description, year, lang } = req.body;

    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    let existingpanchang = await PanchangMonth.findOne({ name: 'muhurat-sampatti', year: year, lang: lang || 'en' });

    if (existingpanchang) {
      existingpanchang.description = description;
      existingpanchang.year = year;
      existingpanchang.lang = lang || 'en';

      await existingpanchang.save();
    } else {
      const newPanchang = new PanchangMonth({ name: "muhurat-sampatti", description, year, lang });
      await newPanchang.save();
    }

    return res.status(200).json({ success: true, message: "Panchang updated successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.getAllMuhuratSampatti = async (req, res) => {
  try {
    const { lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-sampatti', lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(404).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.getMuhuratSampattiData = async (req, res) => {
  try {
    const { year, lang } = req.body;
    const panchang = await PanchangMonth.findOne({ name: 'muhurat-sampatti', year: year, lang: lang || 'en' });
    if (!panchang || panchang.length === 0) {
      return res.status(200).json({ success: false, message: "No Panchang data found" });
    }
    return res.status(200).json({ success: true, message: "Panchang data fetched successfully", data: panchang });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

exports.updateHindi = async (req, res) => {

  const docId = '67a5aa2b3398f2cd10d08609';
  const newTitleHi = 'नया शीर्षक';
  const newDescriptionHi = 'नई विवरण';

  Content.findByIdAndUpdate(
    docId,
    { $set: { title_hi: newTitleHi, description_hi: newDescriptionHi } },
    { new: true } // return the updated document
  )
    .then(updatedDoc => {
      console.log('Updated Document:', updatedDoc);
    })
    .catch(err => {
      console.error('Error updating:', err);
    });
}


exports.addUpdateAartiNotification = async (req, res) => {
  try {
    const { title, time, id } = req.body;
    console.log('Request body :: ', req.body);
    console.log('req.files:', req.files);
    // 1️⃣ Validation (for creation)
    if (!id && (!title || !time)) {
      return res.status(400).json({
        success: false,
        message: "Title and time are required for new Aarti.",
      });
    }

    // 2️⃣ Upload video if provided
    let videoFile = null;
    if (req.files?.video && req.files.video.length > 0) {
      try {
        videoFile = await uploadFileToS3(
          req.files.video[0], // or filename based on your implementation
          "assetsImages/video"
        );
      } catch (uploadError) {
        console.error("Video upload failed:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload video file.",
          error: uploadError.message,
        });
      }
    }

    // 3️⃣ If ID is provided → Update
    if (id) {
      const existing = await AartiNotification.findById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Aarti not found" });
      }

      existing.title = title || existing.title;
      existing.time = time || existing.time;
      if (videoFile) existing.video = videoFile;

      await existing.save();
      await scheduleAartiNotifications();

      return res.json({
        success: true,
        message: "Aarti updated successfully",
        data: existing,
      });
    }

    // 4️⃣ Add new Aarti
    const data = new AartiNotification({
      title,
      time,
      video: videoFile || "",
    });

    await data.save();
    await scheduleAartiNotifications();

    return res.json({
      success: true,
      message: "Aarti added successfully",
      data,
    });
  } catch (e) {
    console.error("Error in addUpdateAartiNotification:", e);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
  }
};


exports.getAartiNotification = async (req, res) => {
  try {
    const data = await AartiNotification.find();

    return res.status(200).json({ success: true, message: "Get Fetch SuccessFully", data });
  } catch (e) {
    console.error("Error in addUpdateAartiNotification:", e);
    return res.status(500).json({ success: false, message: e.message });
  }
}

//!Temple Video
exports.addTempleVideo = async (req, res) => {
  try {
    const { title } = req.body;
    let videoFile = null; // ✅ Declare variable BEFORE using it

    // ✅ Check if video file is available in request
    if (req.files?.video && req.files.video.length > 0) {
      const file = req.files.video[0];
      videoFile = await uploadFileToS3(file, "assetsImages/video");
    }

    // ✅ Validation after declaration
    if (!title || !videoFile) {
      return res
        .status(400)
        .json({ success: false, message: "Title and video file are required" });
    }

    console.log("VideoUrl :::", videoFile);

    const data = new TempleVideo({
      title,
      video: videoFile,
    });

    await data.save();

    return res.json({ success: true, message: "Temple Video added", data });
  } catch (e) {
    console.error("Error in addTempleVideo:", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};


exports.getTempleVideos = async (req, res) => {
  try {
    const data = await TempleVideo.find().sort({ createdAt: -1 });
    return res.json({ success: true, message: "Temple Video fetched successfully", data });
  } catch (e) {
    console.error("Error in getTempleVideos:", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteTempleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TempleVideo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Temple Video not found" });
    }
    return res.json({ success: true, message: "Temple Video deleted successfully", data: deleted });
  } catch (e) {
    console.error("Error in deleteTempleVideo:", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};