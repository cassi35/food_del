import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null )
const StoreContextProvider = (props)=>{
    const [cardItem,setcardItems] = useState({})
    const addToCard = (itemId)=>{
        if(!cardItem[itemId]){
            setcardItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setcardItems((prev)=>({...prev,[itemId]:prev[itemId]+1 }))
        }
    }   
    const removeFromCard = (itemId)=>{
        setcardItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = ()=>{
        let toalAmount = 0
        for(const item in cardItem){
            if(cardItem[item]> 0){
                let itemInfo = food_list.find((product)=> product._id == item)
                toalAmount+=itemInfo.price* cardItem[item]
            }
           
        }
        return toalAmount
    }
    const contextValue = {
        food_list,
        cardItem,
        setcardItems,
        addToCard,
        removeFromCard,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider