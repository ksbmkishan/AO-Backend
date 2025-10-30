

const mongoose = require('mongoose');

// Define possible file types
const validFileTypes = ['image', 'audio', 'pdf']; // Add more types if needed

const fileSchema = new mongoose.Schema({
    filePath: String,
    fileType: {
        type: String,
        enum: validFileTypes,
        required: true
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
