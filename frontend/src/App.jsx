import React, { useState } from 'react'
import NavBar from './components/Navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'

function App() {
  const [showLogin,setSetShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setSetShowLogin={setSetShowLogin} />:<></>}
     <div className='app'>
      <NavBar setSetShowLogin={setSetShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Card/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App