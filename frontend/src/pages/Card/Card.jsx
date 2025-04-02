import React, { useContext } from 'react'
import './Card.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
function Card() {
  /* 
  food_list,
        cardItem,
        setcardItems,
        addToCard,
        removeFromCard
  */
  const {cardItem,food_list,removeFromCard,getTotalCartAmount,url} = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cardItem[item._id]> 0)
          { 
            return (
              <div>
 <div className='cart-items-title cart-items-item'>
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cardItem[item._id]}</p>
                <p>{item.price*cardItem[item._id]}</p>
                <p onClick={()=>removeFromCard(item._id)} className='cross'>x</p>
              </div>
                <hr />
              </div>
             
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
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
            <button onClick={()=>navigate('/order')}>proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>fi you have promo code , enter it here</p>
            <div className='cart-promocode-input'>
                <input type="text" name="" id="" placeholder='promocode'/>
                <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card