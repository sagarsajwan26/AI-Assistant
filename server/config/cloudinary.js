import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

 cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME , 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET  
    });
  

   
   export const uploadToCloudinary= async(filePath)=>{
        try {
            const uploadResult= await cloudinary.uploader.upload(filePath)

            fs.unlinkSync(filePath)
            return uploadResult.secure_url
            
        } catch (error) {
            if(fs.unlinkSync(filePath)){
                fs.unlinkSync(filePath)
            }
            throw new Error(error)
        }
   }