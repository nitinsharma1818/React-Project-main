import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAdminProfile, viewAdminProfile } from "../redux/AdminActions"
import { useNavigate } from 'react-router-dom'
import { useStyles } from "../../styles/styles"
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import '../../styles/Style.css'

/**Admin can edit their profile */
const AdminEditProfile = () => {
    const classes = useStyles()
    const adminId = useSelector( state => state.admin._adminId )
    const adminProfile = useSelector( state => state.admin.adminProfile )
    const { adminName, adminEmail, adminPassword } = adminProfile
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [adminCredentials, setAdminCredentials] = useState({
      adminEmail,
      adminPassword
    })

    useEffect(() => {
      dispatch(viewAdminProfile(adminId))
    },[dispatch])
    
    useEffect(() => {
        if(adminProfile)
        setAdminCredentials({
          adminName,
          adminEmail,
          adminPassword
        })
    },[adminProfile])
    
    const changeCredentialHandler = (event) => {
        setAdminCredentials((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }
    const updateHandler = (event) => {
        event.preventDefault()
        dispatch(updateAdminProfile(adminCredentials, adminId))
        navigate('/admin/my-profile') 
    }
    const goBack = () => {
      navigate(-1)
    }
    return(<>
    <Button variant="contained" endIcon={<ArrowBackSharpIcon className="back-icon"/>}  onClick={goBack} className='back-button'></Button>
    <form onSubmit={ updateHandler }>
        <Box className = {classes.loginForm}>
          <Typography padding={1} variant='h4' textAlign="center">
          Admin Details
          </Typography>
          <TextField type={'text'} name='adminName' value={adminCredentials.adminName || ""}  onChange={changeCredentialHandler} placeholder='Admin Name' margin='normal' required/> 
          <TextField type={'text'} name='adminEmail' value={adminCredentials.adminEmail || ""}  onChange={changeCredentialHandler} placeholder='EmailID' margin='normal' required/> 
          <TextField type={'password'} name='adminPassword' value={adminCredentials.adminPassword || ""} onChange={changeCredentialHandler} placeholder='Password' margin='normal' required/>
          <Button type='submit' variant='contained' color='warning' style={{margin : '5% 0'}}>Update</Button>
        </Box>
      </form>
    </>)
}

export default AdminEditProfile