import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
function LoginPopup({setSetShowLogin}) {
  const {url,setToken} = useContext(StoreContext)
  const [currState,setCurrSatete] = useState("sign up")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler = (event)=>{
    const name = event.target.name 
     const value = event.target.value 
     setData(data => ({...data,[name]:value}))
  }
 const onLogin = async (event)=>{
  event.preventDefault()
  let newUrl = url
  if(currState== "login"){
    newUrl+="/api/user/login"
  }else{
    newUrl+="/api/user/register"
  }
  const response = await axios.post(newUrl,data)
  if(response.data.success){
    setToken(response.data.token)
    localStorage.setItem("token",response.data.token)
    setSetShowLogin(false)
  }else{
    alert(response.data.message)
  }
 }
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin}  className='login-popup-container'>
    <div className="login-popup-title">
      <h2>{currState}</h2>
      <img onClick={()=>setSetShowLogin(false)} src={assets.cross_icon} alt="" />
    </div>
    <div className="login-popup-inputs">
      {currState == "login"?<></>: <input type="text" name="name" onChange={onChangeHandler} value={data.name} id="" placeholder='your name' required/>}
            <input type="email" name="email" onChange={onChangeHandler} value={data.email} id="" placeholder='your email' required/>
            <input type="password" name="password" onChange={onChangeHandler} value={data.password} id=""  placeholder='password' required/>
        </div>
        <button type='submit' >{currState == "sign up"?"create account":"login"}</button>
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