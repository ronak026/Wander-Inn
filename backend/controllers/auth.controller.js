    import genToken from "../config/token.js"
    import User from "../model/user.model.js"
    import bcrypt from "bcryptjs"

    export const signup=async(req,res)=>{
        try {
            let {name,email,password} = req.body
            let existUser = await User.findOne({email})
            if(existUser){
                return res.status(400).json({message:"User already Exists"})
            }
            let hashPassword = await bcrypt.hash(password,10)
            let user = await User.create({name,email,password:hashPassword})
            let token = genToken(user._id, user.isAdmin)
            res.cookie("token",token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(201).json(user)
        } catch (error) {
            return res.status(500).json({message:`signUP error ${error}`})
        }
    }

    export const login=async(req,res)=>{
        try {
            let {email,password} = req.body
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message:"User do not Exists"})
            }
            let isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({message:"Incorrect Password"})
            }
            let token = genToken(user._id, user.isAdmin)
            res.cookie("token",token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(201).json(user)
        } catch (error) {
            return res.status(500).json({message:`Login error ${error}`})
        }
    }


    export const logOut = async(req,res)=>{
        try {
            res.clearCookie("token")
            return res.status(200).json({message:"Logout Successsfully"})
        } catch (error) {
            return res.status(200).json({message:`Logout Error ${error}`})
        }
    }