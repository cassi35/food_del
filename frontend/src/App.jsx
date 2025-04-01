import React, { useState } from 'react'
import NavBar from './components/Navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

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
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App