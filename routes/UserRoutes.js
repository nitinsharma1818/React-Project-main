const express = require('express')
const { registerUser, loginUser, viewProfile, updateProfile, deleteProfile } = require('../controllers/UserController')
const { isAuthenticatedUser } = require('../middlewares/Auth')

const userRouter = express.Router()
userRouter.post('/signup', registerUser) /**To register user*/
userRouter.post('/login', loginUser) /**To login with email and password */
userRouter.get('/my-profile/:userId', isAuthenticatedUser,  viewProfile) /**To view user profile */
userRouter.put('/:userId', isAuthenticatedUser, updateProfile) /**To update details in existing profile */
userRouter.delete('/:userId', isAuthenticatedUser, deleteProfile) /**To delete a particular profile */

module.exports = userRouter