import { uploadToCloudinary } from '../config/cloudinary.js';
import { geminiResponse } from '../gemini.js';
import User from '../models/user.models.js';
import moment from 'moment';
export const getCurrentUser= async(req,res)=>{

    try {
        const userId= req.userId 
        const user= await User.findById(userId).select('-password')

      
        
        if(!user) return res.status(404).json({message:"User not found"})


            return res.status(200).json(user)





    } catch (error) {
        return res.status(500).json({
            message:error.message ||"error fetching current user"
        })
    }
}


export const updateAssistant=async(req,res)=>{
    try {

        const {assistantName, imageUrl}= req.body
        let assistantImage;

        if(req.file){
            assistantImage= await uploadToCloudinary(req.file.path)
        }else{
            assistantImage = imageUrl
        }

        const user= await User.findByIdAndUpdate(req.userId,{
            assistantName,
            assistantImage
        },{new:true}).select('-password')

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:error.message || "Error in update assistantupdate"})
    }
}


export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;
        
       
        
        const user = await User.findById(req.userId);
         user.history.push(command)
        await user.save()
        const userName = user.name;
        const assistantName = user.assistantName;

        const geminiRes = await geminiResponse(command, assistantName, userName);
        
        const jsonMatch = geminiRes.match(/{[\s\S]*}/);

        if (!jsonMatch) {
            return res.status(400).json({ response: "Sorry i can't understand" });
        }
        
        const genResult = JSON.parse(jsonMatch[0]);
        const type = genResult.type;

        switch (type) {
            case 'get_date':
                return res.json({
                    type,
                    userInput: genResult.userInput,
                    response: `current date is ${moment().format('YYYY-MM-DD')}`
                });
            case 'get-time':
                return res.json({
                    type,
                    userInput: genResult.userInput,
                    response: `current time is ${moment().format('hh:mm:A')}`
                });
            case 'get-day':
                return res.json({
                    type,
                    userInput: genResult.userInput,
                    response: `Today is ${moment().format('dddd')}`
                });
            case 'get-month':
                return res.json({
                    type,
                    userInput: genResult.userInput,
                    response: `Current Month is ${moment().format('MMMM')}`
                });
            case 'google-search':
            case 'youtube-play':
            case 'general':
            case 'youtube-search':
            case 'calculator-open':
            case 'instagram-open':
            case 'weather-show':
            case 'facebook-open':
                return res.json({
                    type,
                    userInput: genResult.userInput,
                    response: genResult.response
                });
            default:
                return res.status(400).json({ response: "Sorry I didn't understand that command" });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'error while response from AI'
        });
    }
}