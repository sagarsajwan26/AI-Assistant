import jwt from 'jsonwebtoken'

export const isAuth= async(req,res,next)=>{
    try {
        const token= req.cookies.token || req.headers?.authorization?.split(' ')[1]
        if(!token) return res.status(404).json({message:'access key is missing'})

            const verifyToken= await jwt.verify(token, process.env.JWT_SECRET)
            
            if(!verifyToken)return res.status(400).json({message:"invalid token "})

          req.userId= verifyToken.userId
       
        
          next()

        } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
        
    }
}