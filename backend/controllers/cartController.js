import UserModel from '../models/UserModel.js' 
import jwt from 'jsonwebtoken'

// Helper function to get user ID from token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.log("Token verification error:", error);
    return null;
  }
};

//add items to user cart
export const addToCart = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({success: false, message: "No token provided"});
    }
    
    // Remove 'Bearer ' if present
    const tokenToVerify = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Get user ID from token
    const userId = getUserIdFromToken(tokenToVerify);
    if (!userId) {
      return res.status(401).json({success: false, message: "Invalid token"});
    }
    
    // Find user and update cart
    const user_data = await UserModel.findById(userId);
    if (!user_data) {
      return res.status(404).json({success: false, message: "User not found"});
    }
    
    let cartData = user_data.cartData || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    
    await UserModel.findByIdAndUpdate(userId, {cartData});
    console.log(cartData);
    res.json({success: true, message: "Added to cart"});
  } catch(err) {
    console.log(err);
    res.status(500).json({success: false, message: "Server error"});
  }
};

//remove items from user cart 
export const removeFromCart = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({success: false, message: "No token provided"});
    }
    
    // Remove 'Bearer ' if present
    const tokenToVerify = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Get user ID from token
    const userId = getUserIdFromToken(tokenToVerify);
    if (!userId) {
      return res.status(401).json({success: false, message: "Invalid token"});
    }
    
    // Find user and update cart
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({success: false, message: "User not found"});
    }
    
    let cartData = userData.cartData || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    
    await UserModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true, message: "Removed from cart"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

//fetch user cart data
export const getCart = async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({success: false, message: "No token provided"});
    }
    
    // Remove 'Bearer ' if present
    const tokenToVerify = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Get user ID from token
    const userId = getUserIdFromToken(tokenToVerify);
    if (!userId) {
      return res.status(401).json({success: false, message: "Invalid token"});
    }
    
    // Find user and get cart
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({success: false, message: "User not found"});
    }
    
    const cartData = userData.cartData || {};
    res.json({success: true, cartData});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Server error"});
  }
};