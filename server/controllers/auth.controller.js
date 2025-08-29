import { genToken } from "../config/token.js";
import User from "../models/user.models.js";
import bcrypt from 'bcrypt'


export const signUp= async(req,res)=>{
    try {
        const {name, email, password} = req.body 
        const existEmail= await User.findOne({email})
        if(existEmail) return res.status(400).json({message:"Email already exist"})

        if(password.length<6) {
            return res.status(400).json({
                message:"Password must be atleast 6 char "
            })

        }

        const hashedPassword= await bcrypt.hash(password,10)

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })


const token = await genToken(user._id)

        return res.status(201).cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        }).json(
                user
    )

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message || "Sign up error"
        })
        
    }
}



export const Login= async(req,res)=>{
    try {
        const { email, password} = req.body 
        const user= await User.findOne({email})
        if(!user) return res.status(400).json({message:"Email does not exist"})

        if(password.length<6) {
            return res.status(400).json({
                message:"Password must be atleast 6 char "
            })

        }

     const verifyPassword= await bcrypt.compare(password, user.password)
     if(!verifyPassword) return res.status(401).json({message:"invalid credentials"})

      
const token = await genToken(user._id)

    
let cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  sameSite: 'strict',  
  secure: false
};

return res.status(201).cookie('token', token, cookieOptions).json(

  user);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message || "Sign up error"
        })
        
    }
}


export const logout= async(req,res)=>{
    try {
        res.clearCookie('token').json({message:"user logged out successfully"})
    } catch (error) {
            return res.status(500).json({message:error.message})
    }
}