const mongoose=require('mongoose')

const FlightSchema=new mongoose.Schema({
    TokenId:{
        type:String
    },
    Member:Object
},{timestamps:true})

module.exports=mongoose.model('flight',FlightSchema)