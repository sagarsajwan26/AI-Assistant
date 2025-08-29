import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const userDataContext= createContext()

const UserContext = ({children}) => {

  const serverUrl= 'http://localhost:3000'
const [userData, setUserData] = useState(null)
 const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [selectedImage,setSelectedImage]= useState(null)

const handleCurrentUser= async()=>{
  try {
    const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
    setUserData(result.data)
   
    
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  handleCurrentUser()
},[])


const getGemeniResponse= async(command)=>{
  try {
    const result = await axios.post(`${serverUrl}/api/user/askToAssistant`,{command},{withCredentials:true})
  
    return result.data
  
  } catch (error) {
    console.log(error);
    
  }
}

const value={
    serverUrl,
    userData,setUserData,
    backendImage, setBackendImage,
    frontendImage, setFrontendImage,
    selectedImage,setSelectedImage,
    getGemeniResponse

}
  return (
    <userDataContext.Provider value={value} >
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext