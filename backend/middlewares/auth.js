import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies; // accept token from req.cookies;

    if (!token) { // if token not found then show err massage 
      return res.status(400).json({
        success: false,
        message: "Login to Access this resource",
      });
    }
// now decoded the token by using --> jwt.verify . then passed token , next pass the same JWT_SECRET key 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// after decoded the token find the id and using this i crate new user  
    const user = await User.findById(decoded._id);
// hear match new user which come from decoded token . it === to req.user which come from database or req.body
    req.user = user;
//  if all ok then you continue your work
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
