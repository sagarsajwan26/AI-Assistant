import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'


const Card = ({image}) => {
 const { backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage,setSelectedImage } = useContext(userDataContext)
  return (
    <div 
    onClick={()=>{
       setSelectedImage(image)
       setBackendImage(null)
       setFrontendImage(null)
    }}
    className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#a1a1cfa9] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 hover:border-4 ${selectedImage=== image ? "border-4 border-white inset-shadow-blue-950" :null }`} >
    <img src={image} className='h-full object-cover' />

    </div>
  )
}

export default Card