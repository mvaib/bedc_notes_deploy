const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({msg : "Please login first!"})
        }
        const decoded = jwt.verify(token, process.env?.SECRET_KEY);
        req.body.userId = decoded.userId;
        req.body.user = decoded.user;
        next()
    } catch (error) {
        res.status(500).json({msg : "Internal server error!", error})
    }
}


module.exports = {auth}