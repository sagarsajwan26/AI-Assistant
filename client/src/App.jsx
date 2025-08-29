import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customization from './pages/Customization'
import Home from './pages/Home'
import { userDataContext } from './context/UserContext'
import Customize2 from './pages/Customize2'

const App = () => {

const {userData,setUserData} = useContext(userDataContext)
console.log(userData);


return (
    <Routes>
      <Route  path='/' element={ userData?.assistantName  && userData?.assistantImage ? <Home/> : <Navigate  to='/customize' /> } />

      <Route  path='/signup' element={!userData  ? <SignUp/> :<Navigate to="/" />} />
      <Route  path='/signin' element={!userData ? <SignIn/> :<Navigate to="/"/> } />
      <Route  path='/customize' element={userData ? <Customization/>: <Navigate to="/signup" />} />
      <Route  path='/customize2' element={userData ? <Customize2/>: <Navigate to="/signup" />} />

    </Routes>
  )
}

export default App