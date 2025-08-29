import React, { useContext, useState } from 'react';
import bg from '../assets/Bg.avif';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { userDataContext } from '../context/UserContext';
import axios from 'axios'
import {PulseLoader} from 'react-spinners'
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigate= useNavigate()
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const {serverUrl,setUserData, userData} = useContext(userDataContext)

 
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [err,setErr] = useState("")
const handleSignin= async(e)=>{
  e.preventDefault()
  setErr('')
  setLoading(true)
try {
  let res= await axios.post(`${serverUrl}/api/auth/login`,{ email,password},{withCredentials:true})
setUserData(res.data)
  navigate('/')
  
} catch (error) {
  setUserData(null)
    setErr(error.response.data.message)
}
finally{
    setLoading(false)
}
}

  return (
    <div 
      className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/40 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl p-8 w-full max-w-md text-white space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center drop-shadow-lg">
          Sign In to <span className="text-indigo-400">Virtual AI Assistant</span>
        </h1>

        <form className="space-y-5" onSubmit={handleSignin}>
        
          <input 
            type="email" 
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-black/60 placeholder-gray-400 text-white focus:outline-none focus:bg-black/70 transition"
              value={email}
            onChange={(e)=>setemail(e.target.value) }
          />

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-black/60 placeholder-gray-400 text-white focus:outline-none focus:bg-black/70 transition pr-12"
                value={password}
            onChange={(e)=>setpassword(e.target.value) }
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>
          {err.length>0 && (
            <p className='text-red-500'> {err}</p>
          )}
          <button  

          disabled={loading}
            type="submit" 
            className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg text-white font-semibold text-lg transition"
          >
          {loading?   <PulseLoader /> :"Sign In"}
          </button>
        </form>

        <p className="text-gray-300 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
