import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStyles } from '../../styles/styles'
import { useSelector ,useDispatch } from 'react-redux'
import { setSignOut, toggleSignup } from '../redux/SignupActions'
import { loginUser, signUpUser } from '../redux/UserActions'
import { useForm } from 'react-hook-form'
import ReactJsAlert from "reactjs-alert"
import '../../styles/Style.css'
 
/**User's Login & Register component*/
const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState : {errors}, watch , reset} = useForm({
      mode : 'onChange'
    })
    const signup = useSelector( state => state.signUp.signup )
    const classes = useStyles()
    const signupHandler = () => {
      dispatch(toggleSignup())
    }
    const [status, setStatus] = useState(false)
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const { loginMessage, signupMessage, loginSuccess, signupSuccess } = useSelector( state => state.user )
    
    /**To display success message on successfull registeration and login, alert message for bad request */
    useEffect( () => {
      if(signupSuccess)
      {
        setStatus(true)
        setType('success')
        setTitle(signupMessage)
      }
      else if(loginSuccess)
      {
        setStatus(true)
        setType('success')
        setTitle(loginMessage)
      }
    },[loginSuccess, signupSuccess, loginMessage, signupMessage])
    
    /**To submit all the details entered by the user to the server by dispatching an action */
    const submitHandler = (userData) => {
      if(signup)
      {
        dispatch(signUpUser(userData))  
      }
      else{
        dispatch(loginUser(userData))
      }
      // reset()
    }
    const password = watch('userPassword')

    return(<>
      <form onSubmit={ handleSubmit(submitHandler) }>
        <Box className = {classes.loginForm}>
          <Typography className={classes.userAuthTitle} variant='h4'>
            { signup ? "Signup" : "Login" }
          </Typography>
          { signup && <TextField {...register('userName',{ required : 'Username required', 
            pattern : {
              value : /^[a-zA-Z ]+$/,
              message : 'Username should contain only alphabets'
            },
            minLength : {
            value : 3,
            message : 'Username should contain atleast 3 letters'
          }})} type={'text'}  className='input-credential' placeholder='Username' margin='normal' />  }
          { errors.userName && <small className='credential-error'>{errors.userName.message}</small>}
          <TextField type={'text'} {...register('userEmail',{ required : 'Email required',
           pattern : {
             value : /^([a-z]+[\.-\d]*)@([a-z-]+)\.([a-z\-]{2,8})(\.[a-z]{2,8})?$/,
             message : 'Invalid email format'
           }
          })} className='input-credential' placeholder='EmailID' margin='normal' />
          { errors.userEmail && <small className='credential-error'>{errors.userEmail.message}</small>}
          <TextField type={'password'} {...register('userPassword',{ required : 'Password required',
           pattern : {
            value : /^[a-zA-Z0-9]{8,20}$/,
            message : 'Password should contain atleast 8 characters'
           }
          })} className='input-credential' placeholder='Password' margin='normal' />
          { errors.userPassword && <small className='credential-error'>{errors.userPassword.message}</small>}
          {
            signup && <><TextField type={'password'} {...register('userConfirmPassword',{ required : 'Confirm Password required',
            validate : confirm => confirm === password || 'Password mismatch'
          })}  className='input-credential' placeholder='Confirm Password' margin='normal' />
           { errors.userConfirmPassword && <small className='credential-error'>{errors.userConfirmPassword.message}</small>}
            <TextField type={'text'} {...register('userContact',{ required : 'Contact required',
            pattern : {
              value : /^[6-9]{1}[0-9]{9}$/,
              message : 'Invalid number'
            }
          })} className='input-credential' placeholder='Contact Number' margin='normal' />
            { errors.userContact && <small className='credential-error'>{errors.userContact.message}</small>}
            </>
          }
          {!loginSuccess && <small>{loginMessage}</small>}
          {!signupSuccess && <small>{signupMessage}</small>}
          <Button type='submit' variant='contained' color='warning' className={classes.userAuthButton}>{ signup ? "Signup" : "Login" }</Button>
          { !signup && <Typography>Dont't have an account ?</Typography> }
          <Link onClick={signupHandler} to='/auth'>{ !signup && "Signup"}</Link>
        </Box>
      </form>
      <ReactJsAlert
      status = {status}
      type = {type}
      title = {title}
      Close = {(status) => {
        if(signupMessage)
        {
          setStatus(false)
          dispatch(setSignOut())
          navigate('/auth')
        }
        else if(loginMessage)
        {
          setStatus(false)
          navigate('/home',{replace:true})
        }
      }}
      />
    </>)
 }

 export default Auth