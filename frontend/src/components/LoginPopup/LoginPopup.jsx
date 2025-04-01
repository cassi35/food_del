import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
function LoginPopup({setSetShowLogin}) {
  const [currState,setCurrSatete] = useState("sign up")
  return (
    <div className='login-popup'>
        <form  className='login-popup-container'>
    <div className="login-popup-title">
      <h2>{currState}</h2>
      <img onClick={()=>setSetShowLogin(false)} src={assets.cross_icon} alt="" />
    </div>
    <div className="login-popup-inputs">
      {currState == "login"?<></>: <input type="text" name="" id="" placeholder='your name' required/>}
            <input type="email" name="" id="" placeholder='your email' required/>
            <input type="password" name="" id=""  placeholder='password' required/>
        </div>
        <button >{currState == "sign up"?"create account":"login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required/>
          <p>
            by continuing , i agree to the terms of use & privicy polity
          </p>
        </div>
        {currState == "login"?
        <p>create new accont?<span onClick={()=>setCurrSatete("sign up")} >click here</span></p>:
        <p>already have an accont?<span onClick={()=>setCurrSatete("login")}>login here</span></p>
        }
        </form>
    
    </div>
  )
}

export default LoginPopup