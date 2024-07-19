import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../../styles/styles'
import { useSelector ,useDispatch } from 'react-redux'
import { storeAdminToken } from '../redux/AdminActions'
import { useForm } from 'react-hook-form'
import '../../styles/Style.css'
import ReactJsAlert from 'reactjs-alert'

/**Login authentication page for an admin */
const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const { register, handleSubmit, formState : {errors}, watch , reset} = useForm({
      mode : 'onChange'
    })
    const [status, setStatus] = useState(false)
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const { adminLoginMessage, adminLoginSuccess } = useSelector( state => state.admin )
    
    useEffect( () => {
      if(adminLoginSuccess)
      {
        setStatus(true)
        setType('success')
        setTitle(adminLoginMessage)
      }
    },[adminLoginSuccess, adminLoginMessage])
    const submitHandler = (adminData) => {
      dispatch(storeAdminToken(adminData))
    }
    return(<>
      <form  onSubmit={ handleSubmit(submitHandler) }>
        <Box className = {classes.loginForm}>
          <Typography padding={1} variant='h4' textAlign="center">
           Admin Login
          </Typography>
          <TextField {...register('adminEmail',{ required : 'Email required',
           pattern : {
             value : /^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/,
             message : 'Invalid email format'
           }
          })} type={'email'} className='input-credential' placeholder='EmailID' margin='normal' required/>
          { errors.adminEmail && <small className='credential-error'>{errors.adminEmail.message}</small>}
          <TextField {...register('adminPassword',{ required : 'Password required',
           pattern : {
            value : /^[a-zA-Z0-9]{8,20}$/,
            message : 'Password should contain atleast 8 characters'
           }
          })} type={'password'} className='input-credential' placeholder='Password' margin='normal' required/>
          { errors.adminPassword && <small className='credential-error'>{errors.adminPassword.message}</small>}
          {!adminLoginSuccess && <small>{adminLoginMessage}</small>}
          <Button type='submit' variant='contained' color='warning' style={{margin : '5% 0'}}>Login</Button>
        </Box>
      </form>
      <ReactJsAlert
      status = {status}
      type = {type}
      title = {title}
      Close = {(status) => {
        if(adminLoginMessage)
        {
          setStatus(false)
          navigate('/admin/home',{replace:true})
        }
      }}
      />
    </>)
 }

 export default AdminLogin