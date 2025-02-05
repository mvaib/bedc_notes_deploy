const mongoose = require('mongoose');
require("dotenv").config()

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDB Atlas`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {dbConnection}