const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')
const User = require ('../model/User')
require('dotenv').config()

const isAuthenticatedUser = async (req, res, next) => {
    const userToken = req.headers.authorization
    try{
        if(!req.headers.authorization)
        throw "You dont have auth headers to access this page , please login"
        if (userToken === null) 
        throw "You dont have token to access this page , please login"
        const decodedData = jwt.verify(userToken, process.env.SECRET_KEY)
        if(req.params.userId && decodedData.id !== req.params.userId)
        throw "You dont have access to this user's account"
        req.user = await User.findById(decodedData.id)
        next()
    }
    catch(err){
      return res.status(401).json({errorMessage : err}) /**UnAuthorized */
    }
}
const isAuthenticatedAdmin = async (req, res, next) => {
  const adminToken = req.headers.authorization
  try{
      if(!req.headers.authorization)
      throw "You dont have auth headers to access this page , please login"
      if (adminToken === null) 
      throw "You dont have token to access this page , please login"
      const decodedData = jwt.verify(adminToken, process.env.SECRET_KEY)
      if(req.params.userId && decodedData.id !== req.params.userId)
      throw "You dont have access to this user's account"
      req.user = await Admin.findById(decodedData.id)
      next()
  }
    catch(err){
      return res.status(401).json({errorMessage : err}) /**UnAuthorized */
    }
}


module.exports = {
  isAuthenticatedUser,
  isAuthenticatedAdmin
}


