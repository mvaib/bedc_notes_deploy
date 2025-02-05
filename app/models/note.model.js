const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "users" ,required : true},
    user : {type : String, required : true},
    title : {type : String, required : true},
    discription : {type : String, required : true},
},{
    versionKey : false
})

const NoteModel = mongoose.model("notes",noteSchema);

module.exports = {NoteModel}