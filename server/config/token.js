import jwt from 'jsonwebtoken'


export const genToken = async(userId)=>{
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'4d'})
        return token
    } catch (error) {
        throw error
    }
}