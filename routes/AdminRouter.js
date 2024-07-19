const express = require('express')
const { loginAdmin, deleteAdminProfile, viewAdminProfile, updateAdminProfile } = require('../controllers/AdminController')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin) /**To login with email and password */
adminRouter.get('/my-profile/:adminId', isAuthenticatedAdmin,  viewAdminProfile) /**To view user profile */
adminRouter.put('/:adminId', isAuthenticatedAdmin, updateAdminProfile) /**To update details in existing profile */
adminRouter.delete('/:adminId', isAuthenticatedAdmin, deleteAdminProfile) /**To delete a particular profile */

module.exports = adminRouter