const { BlacklistModel } = require("../models/blacklist.model")

const checkBlacklist = async (req,res,next)=>{
    const token = req.headers["authorization"]?.split(" ")[1] // Extract token from Bearer

    if(!token) return res.sendStatus(403)// No token provided

    const blacklistToken = await BlacklistModel.findOne({token})
    if(blacklistToken){
        return res.status(401).json({msg : "Token is blacklisted!"})
    }

    next();
};

module.exports = {checkBlacklist}