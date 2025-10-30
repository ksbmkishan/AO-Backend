const mongoose = require('mongoose');

const operatorServiceSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    { timestamps: true } 
)

module.exports = mongoose.model('operatorService', operatorServiceSchema)