const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

function configureMulter(destinationFolder, fieldsConfig = []) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fileType = file.mimetype.startsWith("audio") ? "audio" : "images";
      cb(null, `${destinationFolder}/${fileType}`);
    },
    filename: function (req, file, cb) {
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Increase the size limit to 100 MB
  }).fields(fieldsConfig);

  return function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error uploading file", error: err });
      }
      next();
    });
  };
}

module.exports = configureMulter;
