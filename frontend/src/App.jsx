import React from 'react'
import NavBar from './components/Navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

function App() {
  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/card' element={<Card/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
  )
}

export default App