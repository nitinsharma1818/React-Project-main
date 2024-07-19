import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useStyles } from "../../styles/styles"
import { updateProfile, viewProfile } from "../redux/UserActions"
import { useNavigate } from 'react-router-dom'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import '../../styles/Style.css'

/**User's Edit Profile Component*/
const EditProfile = () => {
    const classes = useStyles()
    const userId = useSelector( state => state.user._userId )
    const profile = useSelector( state => state.user.profile )
    const { userName, userEmail, userPassword, userContact } = profile
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userCredentials, setUserCredentials] = useState({
      userName,
      userEmail,
      userPassword,
      userContact
    })
    /**To display the users personal information */
    useEffect(() => {
      dispatch(viewProfile(userId))
    },[dispatch])
    
    useEffect(() => {
        if(profile)
        setUserCredentials({
          userName,
          userEmail,
          userPassword,
          userContact
        })
    },[profile])
    const goBack = () => {
      navigate(-1)
    }
    const changeCredentialHandler = (event) => {
        setUserCredentials((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }
    const updateHandler = (event) => {
        event.preventDefault()
        dispatch(updateProfile(userCredentials, userId))
        navigate('/my-profile') 
    }
    return(<>
    <Button variant="contained" endIcon={<ArrowBackSharpIcon className="back-icon"/>} onClick={goBack} className='back-button'></Button>
    <form onSubmit={ updateHandler }>
        <Box className = {classes.loginForm}>
          <Typography className='user-profile-title' variant='h4'>
          My Details
          </Typography>
          <TextField type={'text'} name='userName' value={userCredentials.userName || ""}  onChange={changeCredentialHandler} placeholder='Username' margin='normal' required/> 
          <TextField type={'email'} name='userEmail' value={userCredentials.userEmail || ""} onChange={changeCredentialHandler} placeholder='EmailID' margin='normal' required/>
          <TextField type={'password'} name='userPassword' value={userCredentials.userPassword || ""} onChange={changeCredentialHandler} placeholder='Password' margin='normal' required/>
          <TextField type={'text'} name='userContact' value={userCredentials.userContact || ""}  onChange={changeCredentialHandler} placeholder='Contact Number' margin='normal' required/>
          <Button type='submit' variant='contained' color='warning' className='user-profile-update-button'>Update</Button>
        </Box>
      </form>
    </>)
}

export default EditProfile