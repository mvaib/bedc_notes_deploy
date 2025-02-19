const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token : {type : String, required : true, unique : true},
    expiresAt : {type : Date, required : true}
},
{
    versionKey : false
})

const BlacklistModel = mongoose.model("blacklists",blacklistSchema);

module.exports = {BlacklistModel}