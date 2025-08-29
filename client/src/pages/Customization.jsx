import React, { useContext, useRef, useState } from 'react'
import Card from '../component/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const Customization = () => {
 const { backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage,setSelectedImage } = useContext(userDataContext)

const inputImage= useRef()
const handleImage= (e)=>{
  const file= e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}
const navigate= useNavigate()

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col relative'>
     
     
             <BiArrowBack 
             onClick={()=> navigate('/')}
             className='absolute top-[30px] left-[30px] text-white text-3xl cursor-pointer' />
         
      <h1 className='text-white text-center p-[20px] text-3xl mb-[30px]' >Select your <span className='text-[#0de4ddd6]' >assistant image</span></h1>
       <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-3' >
         <Card image={image1} />
         <Card image={image2} />
         <Card image={image3} />
         <Card image={image4} />
         <Card image={image5} />
         <Card image={image6} />
         <Card image={image7} />
          <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#a1a1cfa9] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 hover:border-4 flex items-center justify-center ${selectedImage ==='input' ? "border-4 border-white inset-shadow-blue-950" :null}`}
          onClick={()=>{
            inputImage.current.click()
            setSelectedImage('input')
          }}
          >
{
  frontendImage ? <img className='h-full object-cover ' src={frontendImage} alt="" /> :<RiImageAddLine 
  className=' text-white w-[25px] h-[25px]' />
}
<input
onChange={handleImage}
type="file" accept='images/*' hidden ref={inputImage} />
    </div>
       </div>
 <button 
 disabled={!selectedImage}
 onClick={()=> navigate('/customize2')
 }
 className='max-w-[150px] w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer' >Next</button>
    </div>
  )
}

export default Customization
