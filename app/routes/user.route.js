const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config()


userRouter.get("/", async(req,res)=>{
    try {
        const user = await UserModel.find().populate("notes")
        res.status(200).json({msg : "this is the required data", users : user})
    } catch (error) {
        res.status(500).json({msg : "Internal server error!", error})
    }
})

userRouter.post("/", async(req,res)=>{
    const {name,email,pass} = req.body
    try {
        bcrypt.hash(pass,+process.env.SALT_ROUND, async(err,hash)=>{
            if(err){
                res.json({msg : "There has been an error", err})
            }else{
                const newUser = new UserModel({
                    name,
                    email,
                    pass : hash
                })
                await newUser.save();
                res.json({msg : "You have been Successfully registered!", user : newUser})
            }
        })
    } catch (error) {
        res.json({msg : "There has been an error", error})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body
    try {
        const matchingUser = await UserModel.findOne({email});
        if(matchingUser){
            const isPasswordMatching = await bcrypt.compare(pass,matchingUser.pass)
            if(isPasswordMatching){
                const token = jwt.sign({userId : matchingUser._id, user : matchingUser.name},process.env.SECRET_KEY,{expiresIn : "24h"});
                res.status(200).json({msg : "login successfull!", token})
            }else{
                res.status(400).json({msg : "wrong password!"})
            }
        }
        else{
            res.status(404).json({msg : "User not Found!"})
        }
    } catch (error) {
        res.status(500).json({msg : "There has been an error", error})
    }
})

userRouter.post("/logout", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ msg: "No token provided" });
    }

    try {
        console.log("JWT received for logout:", token); // Log the incoming token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Check if exp exists
        if (!decoded.exp) {
            throw new Error("No expiration time in token");
        }

        const blacklistToken = new BlacklistModel({
            token,
            expiresAt: new Date(decoded.exp * 1000) // Valid expiration time
        });

        await blacklistToken.save();
        return res.status(200).json({ msg: "Logout successful!" });
    } catch (error) {
        console.error(`Error blacklisting token: ${error}`);
        return res.status(500).json({ msg: "Internal server error!", error: error.message });
    }
});







module.exports = {userRouter}