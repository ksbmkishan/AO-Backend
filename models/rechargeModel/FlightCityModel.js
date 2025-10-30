const mongoose = require('mongoose')

const FlightCitySchema = new mongoose.Schema({
    CITYNAME: {
        type: String
    },
    CITYCODE: {
        type: String
    },
    COUNTRYCODE: {
        type: String
    },
    COUNTRYNAME: {
        type: String
    },
    AIRPORTNAME: {
        type: String
    },
    AIRPORTCODE: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('FlightCity', FlightCitySchema)