const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://atulsen:Y_53h64LyPLHPC6@cluster0.0flk3.mongodb.net/astro_one';

// const dbURII = 'mongodb+srv://Atull:LG5qwrMWK_WscjJ@cluster0.0flk3.mongodb.net/astro_one';


module.exports = async function dbConnection() {
    await mongoose.connect(dbURI, {bufferCommands: true})
    console.log("connected to database")
}