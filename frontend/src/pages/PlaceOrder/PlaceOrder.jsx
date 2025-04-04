import React, { useContext, useReducer, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
function PlaceOrder() {
  const {getTotalCartAmount,token,food_list,cardItem,url} = useContext(StoreContext)
 const frontend_url = 'http://localhost:5173'
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangleHandler = (event)=>{
    const name = event.target.name 
    const value = event.target.value 
    setData(data => ({...data,[name]:value}))
  }
  const placeOrder = async (event)=>{
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cardItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cardItem[item._id];
        orderItems.push(itemInfo);
      }
    });
   let orderData = {
  address: data,
  items: orderItems,
  amount:getTotalCartAmount()+2 

   }
   let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
   if(response.data.success){
   const {session_url} = response.data
   window.location.replace(session_url)

   }else{
      alert("something went wrong")
  }
  }
 
  return (
    <form onSubmit={placeOrder} action="" className='place-order'>
      <div className="place-order-left">
        <p className='title'>delivery information</p>
        <div className="multi-fields">
          <input type="text" name='firstName' onChange={onChangleHandler} value={data.firstName} placeholder='first name' />
          <input type="text" name='lastName' onChange={onChangleHandler} value={data.lastName} placeholder='last name' />
        </div>
        <input name='email' onChange={onChangleHandler} value={data.email}  type="email" placeholder='email address ' />
        <input name='street' onChange={onChangleHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input name='city' onChange={onChangleHandler} value={data.city} type="text" placeholder='city' />
          <input name='state' onChange={onChangleHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangleHandler} value={data.zipcode} type="text" placeholder='zip code' />
          <input name='country' onChange={onChangleHandler} value={data.country} type="text" placeholder='country' />
        </div>
        <input name='phone' onChange={onChangleHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>cart totals</h2>
          <div>
          <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>delivery fee</p>
            <p>${getTotalCartAmount()== 0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <b>total</b>
            <b>${getTotalCartAmount() == 0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button type='submit' >proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder