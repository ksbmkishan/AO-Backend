const mongoose=require('mongoose')

const FlightImageSchema=new mongoose.Schema({
    airlineName:{
        type:String
    },
    airlineCode:{
        type:String
    },
    airlineImage:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('flightImage',FlightImageSchema)