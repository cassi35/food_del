import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null )
const StoreContextProvider = (props)=>{
    const [cardItem,setcardItems] = useState({})
    const url = 'http://localhost:4000'
    const [token,setToken] = useState("")
    const [food_list,seFoodList] = useState([])
    const addToCard = async (itemId)=>{
        if(!cardItem[itemId]){
            setcardItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setcardItems((prev)=>({...prev,[itemId]:prev[itemId]+1 }))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    }   
    const removeFromCard = async (itemId)=>{
        setcardItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
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
    const fetchFood = async ()=>{
        const response = await axios.get(`${url}/api/food/list`)
        seFoodList(response.data.data)
    }
    const loadCartData = async (token)=>{
        const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setcardItems(response.data.cartData)
    }
    useEffect(()=>{
        async function loadData(){
            await fetchFood()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])
    const contextValue = {
        food_list,
        cardItem,
        setcardItems,
        addToCard,
        removeFromCard,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider