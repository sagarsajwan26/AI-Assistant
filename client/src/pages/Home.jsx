import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ai from '../assets/ai.gif'
import LCPT from '../assets/LCPT.gif'
import { CgMenu } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGemeniResponse } =
    useContext(userDataContext)
    const [listening , setListenting] = useState(false)

    const [aiText, setAiText]= useState('')
    const [userText, setUserText] = useState('')
    const navigate = useNavigate()
    const isSpeakingRef= useRef(false)
  const recognitionRef= useRef(null)

    const isRecognizing = useRef(false)
    const [showNavItems, setShowNavItems]= useState(true)

const synth= window.speechSynthesis
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      })
      setUserData(null)
      navigate('/signin')
    } catch (error) {
      console.log(error)
      return
    }
  }

const startRecognition= ()=>{
  try {
    recognitionRef.current?.start()
    setListenting(true)
  } catch (error) {
    if(!error.message.includes("start")){
      console.log('Recognition error',error);
      
    }
  }
}

const speak = (text) => {
  if (!text) return;
synth.cancel(); // Stop any current speaking
  const utterance = new SpeechSynthesisUtterance(text);
 const voices= window.speechSynthesis.getVoices()
  utterance.lang='hi-IN'

  const hindiVoice = voices.find(v=> v.lang==='hi-IN')

  if(hindiVoice){
    utterance.voice=hindiVoice
  }
  
  isSpeakingRef.current= true
  startRecognition()
  utterance.onend=()=>{
    setAiText('')
    isSpeakingRef.current= false;
   
  }
  synth.speak(utterance);
};


const handleCommand= (data)=>{
  const {type, userInput, response} = data
  speak(response)
  if(type==='google-search'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`,'_blank')
  }
  if(type==='calculator-open'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=calculator`,'_blank')
  }
  
  if(type==='instagram-open'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.instagram.com`,'_blank')
  }
  
  if(type==='facebook-open'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.facebook.com`,'_blank')
  }
  
  if(type==='weather-show'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=weather`,'_blank')
  }

   if(type==='weather-show'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=weather`,'_blank')
  }
   if(type=='youtube-search' ||  type=='youtube-play'){
    const query= encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/search?q=${query}`,'_blank')
  }

  


}


  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!speechRecognition)
      return alert('Your device does not support mic feature')
    const recognition = new speechRecognition()

    recognition.continuous = true
    recognition.lang = 'en-US'

    recognitionRef.current= recognition

  

    const safeRecognition =()=>{
      if(!isSpeakingRef.current && !isRecognizing.current){
        try {
          recognition.start()
          console.log('Recognition requested to start ');
          
        } catch (error) {
          if(error.name !=="InvalidStateError"){
            console.error('Start error',error);
            
          }
        }
      }
    }

    recognition.onstart=()=>{
      console.log('Recognition started');
      isRecognizing.current = true;
      setListenting(true)
      
    }

    if(!isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition()

      },1000)
    }


    recognition.onerror=(e)=>{
      console.log('recognition error:' ,e.error);
      isRecognizing.current= false 
      setListenting(false)

      if(e.error !=='aborted'  && !isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition()
        },1000)
      }
      
    }


    recognition.onresult = async e => {
      const last = e.results.length - 1
      const transcript = e.results[last][0].transcript.trim()
    
      
      
      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
       setAiText('')
        setUserText(transcript)
        recognition.stop()
        isRecognizing.current= false
        setListenting(false)
        const data = await getGemeniResponse(transcript)
        console.log(data);
setAiText(data.response)
        setUserText('')
         handleCommand(data)
        
      }
    }
  

const fallback= setInterval(()=>{

  if(!isSpeakingRef.current && !isRecognizing.current){
    safeRecognition()

  }
  

},10000)
  safeRecognition()
return ()=>{
  clearInterval(fallback)
  recognition.stop()
  setListenting(false)
  isRecognizing.current= false
}
  }, [])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#06062f] flex items-center justify-center flex-col relative'>
     
      {!showNavItems &&  (

        <CgMenu onClick={()=>{
          setShowNavItems(true)
        }} className='text-white text-3xl absolute top-[20px] right-[20px]' />
      )}
     {
      showNavItems && (
         <div className='z-10 absolute sm:w-[100px] top-[20px] right-[20px] lg:w-[300px] flex flex-col gap-[10px]  items-end transition-transform  '>
            <RxCross2 
            onClick={()=> setShowNavItems(false)}
            className='text-white text-3xl'/>
        <button
          onClick={handleLogout}
          className='  w-full  py-3 px-6 bg-indigo-700 hover:bg-indigo-800 rounded-full text-white font-semibold text-lg transition h-[60] '
        >
          Logout
        </button>
        <button
          onClick={() => navigate('/customize')}
          className='w-full  py-3 px-6 bg-indigo-700 hover:bg-indigo-800 rounded-full text-white font-semibold text-lg transition h-[60] '
        >
          Customize Your Ai
        </button>

        
      </div>
      )
     }
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg shadow-white mb-10'>
        <img
          src={userData?.assistantImage}
          alt=''
          className='h-full object-cover '
        />
      </div>
      <h1 className='text-2xl font-bold animated-gradient-text'>
        i'm {userData?.assistantName}

      </h1>

      {
      !aiText && <img className='w-[100px]' src={LCPT} alt="" />
    }
    {
      aiText && <img className='w-[100px]' src={ai} alt="" />
    }
    
    <h1 className='text-white text-[15px] font-semibold text-wrap '>{userText ? userText : aiText ? aiText:null}</h1>
    
    </div>
  )
}

export default Home
