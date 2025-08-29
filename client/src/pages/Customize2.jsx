import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
 import {PulseLoader} from 'react-spinners'
import axios from 'axios'
import { BiArrowBack } from "react-icons/bi";

import { useNavigate } from 'react-router-dom'
const Customize2 = () => {
    const {userData,setUserData,  backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage,setSelectedImage ,serverUrl } = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
    const [loading,setLoading]= useState(false)
    const navigate= useNavigate()


    const handleUpdateAssitant = async()=>{
      setLoading(true)
      try {
        const formData= new FormData()
        formData.append("assistantName",assistantName)
        if(backendImage){
          formData.append('assistantImage',backendImage)

        }else{
          formData.append("imageUrl",selectedImage)
        }
        const res= await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})

    

        setUserData(res.data)
        navigate('/')
        
      } catch (error) {
        console.log(error);
        return
        
      } 
      finally{
        setLoading(false)
      }
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col relative' >
     
        <BiArrowBack 
        onClick={()=> navigate('/customize')}
        className='absolute top-[30px] left-[30px] text-white text-3xl cursor-pointer' />
    

      <h1 className='text-white text-center p-[20px] text-3xl mb-[30px]' >Enter Your <span className='text-[#0de4ddd6]' >Assistant Name</span></h1>

      <input 
            type="text" 
            placeholder="Eg:Shifra"
            className="w-full px-4 py-3 rounded-full max-w-[600px] bg-black/60 placeholder-gray-400 text-white focus:outline-none focus:bg-black/70 transition border-2 border-white mb-6 text-xl px-5"
            value={assistantName}
            onChange={(e)=> setAssistantName(e.target.value)}
          />

          {
            assistantName && (
                <button 
                onClick={()=>handleUpdateAssitant()} 
                disabled={loading}
                className='w-full max-w-[600px] py-3 bg-black-700  hover:bg-zinc-800 rounded-full text-white font-semibold text-lg transition border-2 border-white'>
           {loading  ? <PulseLoader color="#ffffff" /> :" Create Youe Assistant"}
          </button>
            )
          }

    </div>
  )
}

export default Customize2