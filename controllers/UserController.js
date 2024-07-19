const bcrypt = require('bcrypt')
const User = require('../model/User')
const { sendUserToken } = require('../utils/JwtToken')
const { userValidationSchema, loginValidationSchema } = require('../validation/ValidationSchema')

require('dotenv').config()

/**To register an user */
const registerUser = async(req, res) => {
    let user
    try{
        let options = { abortEarly : false }
        const registerResult = await userValidationSchema.validateAsync(req.body, options)
        const { userName, userEmail, userPassword, userContact } = registerResult
        user = await User.findOne({ userEmail : registerResult.userEmail })
        if(user) 
            throw "This mail id has already been registered"
        const hashedPassword = await bcrypt.hash(userPassword, 10)  
        user = new User({
            userName,
            userEmail,
            userPassword : hashedPassword,
            userContact
        })
        await user.save()
        return res.status(201).json({message : "Succesfully you have been registered",user})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            errors.push(error)
        })
        return res.status(400).json({errorMessage : errors})
        }
        return res.status(400).json({ errorMessage : err })
    } 
}
/**To login as a user */
const loginUser = async(req, res) => {
    let user
    const { userEmail, userPassword } = req.body
    try{
        let options = { abortEarly : false }
        const loginResult = await loginValidationSchema.validateAsync({
            userEmail,
            userPassword
        },options)
        user = await User.findOne({ userEmail : loginResult.userEmail })
        if(user === null) 
           throw "No account exists with this email id"
        if(! (bcrypt.compareSync(loginResult.userPassword, user.userPassword)))
            throw "Password doesn't match"
        const receivedToken = sendUserToken(user)
        return res.status(200).cookie("userToken", receivedToken.token, receivedToken.options).json({ accessToken : receivedToken.token , message : "Succesfully logged in" });  
    }
    catch(err){
        return res.status(400).json({ errorMessage : err })
    }
}
/**To view my profile */
const viewProfile = async(req, res) => {
    let user
    let userId = req.params.userId
        try{
            if(userId.length !== 24)
            throw "Invalid Object Id"
            user = await User.findById(userId).populate({ path: 'myBookings' })
            if(user === null)
            throw "No user found with the id mentioned"
            return res.status(200).json({user})
        }
        catch(err) {
            return res.status(404).json({ errorMessage : err })
        }
}
/**To update my existing profile details */
const updateProfile = async(req, res) => {
    let user
    let userId = req.params.userId
    try{
        if(userId.length !== 24)
        throw "Invalid Object Id"
        user = await User.findById(userId)
        if(user === null)
        throw "Unable to update this profile"
        let options = {abortEarly : false}
        const updateResult = await userValidationSchema.validateAsync(req.body,options)
        const { userName, userEmail, userPassword, userContact } = updateResult
        const hashedPassword = await bcrypt.hash(userPassword,10) 
        user = await User.findByIdAndUpdate(userId,{
            userName,
            userEmail,
            userPassword : hashedPassword,
            userContact
        })
        user = await user.save()
        return res.status(200).json({message:"Successfully updated"})
    }
    catch(err) {
        return res.status(400).json({errorMessage : err})
    }
}
/**To deactivate my profile */
const deleteProfile = async(req,res) => {
    let user
    let userId = req.params.userId
        try{
            if(userId.length !== 24)
            throw "Invalid Object Id"
            user = await User.findByIdAndDelete(userId)
            if(user === null)
            throw "Unable to delete this id"
            return res.status(200).json({ message : "Succesfully deleted" })
        }
        catch(err) {
            return res.status(400).json({ errorMessage : err })
        } 
}
module.exports = {
    registerUser,
    loginUser,
    viewProfile,
    updateProfile,
    deleteProfile
}
