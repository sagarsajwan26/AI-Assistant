import mongoose from 'mongoose'


const userSchema= new mongoose.Schema({

    name:{
        type:String,
        requried:true,
    

    },

    email:{
        type:String,
        requried:true,
        unique:true

    },
    password:{
        type:String,
        requried:true,

    },
    assistantName:{
        type:String,
        default:''

    },
    assistantImage:{
        type:String,
        default:''
        

    },
    history:[
        { type:String}
    ]
},{timestamps:true})


const User= mongoose.model("User", userSchema)

export default User