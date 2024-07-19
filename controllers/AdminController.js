const bcrypt = require('bcrypt')
const Admin = require('../model/Admin')
const { adminLoginValidationSchema, adminValidationSchema } = require('../validation/ValidationSchema')
const { sendAdminToken } = require('../utils/JwtToken')
require('dotenv').config()

/**To login as a admin */
const loginAdmin = async(req, res) => {
    let admin
    const { adminEmail, adminPassword } = req.body
    try{
        let options = { abortEarly : false }
        const loginResult = await adminValidationSchema.validateAsync({
            adminEmail,
            adminPassword
        },options)
        admin = await Admin.findOne({ adminEmail : loginResult.adminEmail })
        if(admin == null) 
           throw "No account exists with this email id"
        if(! (bcrypt.compareSync(loginResult.adminPassword, admin.adminPassword)))
            throw "Password doesn't match"
        const receivedToken = sendAdminToken(admin)
        return res.status(200).cookie("adminToken", receivedToken.token, receivedToken.options).json({ accessToken : receivedToken.token , message : "Succesfully logged in" })
    }
    catch(err){
        return res.status(400).json({ errorMessage : err })
    }
}
/**To deactivate my profile */
const deleteAdminProfile = async(req,res) => {
    let admin
    let adminId = req.params.adminId
        try{
            if(adminId.length == 24)
            admin = await Admin.findByIdAndDelete(adminId)
            else throw `Invalid Object Id`
            if(admin != null)
            return res.status(200).json({ message : "Succesfully deleted" })
        }
        catch(err) {
            return res.status(404).json({ errorMessage : err })
        } 
    return res.status(404).json({error : "Unable to delete this id"}) 
}
/**To view admin profile */
const viewAdminProfile = async(req, res) => {
    let admin
    let adminId = req.params.adminId
        try{
            if(adminId.length !== 24)
            throw "Invalid Object Id"
            admin = await Admin.findById(adminId)
            if(admin === null)
            throw "No admin found with the id mentioned"
            return res.status(200).json({admin})
        }
        catch(err) {
            return res.status(404).json({ errorMessage : err })
        }
}
/**To update admin existing profile details */
const updateAdminProfile = async(req, res) => {
    
    let admin
    let adminId = req.params.adminId
    try{
        if(adminId.length !== 24)
        throw "Invalid Object Id"
        admin = await Admin.findById(adminId)
        if(admin === null)
        throw "Unable to update this profile"
        let options = {abortEarly : false}
        const updateResult = await adminValidationSchema.validateAsync(req.body,options)
        const { adminName, adminEmail, adminPassword } = updateResult
        const hashedPassword = await bcrypt.hash(adminPassword,10) 
        admin = await Admin.findByIdAndUpdate(adminId,{
            adminName,
            adminEmail,
            adminPassword : hashedPassword
        })
        await admin.save()
        return res.status(200).json({message:"Successfully updated"})
    }
    catch(err) {
        return res.status(404).json({errorMessage : err})
    }
}
module.exports = {
    loginAdmin,
    deleteAdminProfile,
    viewAdminProfile,
    updateAdminProfile
}