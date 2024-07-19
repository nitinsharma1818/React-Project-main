import React, { useEffect, useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useStyles } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies, clearMovieError } from '../redux/MovieActions'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ReactJsAlert from "reactjs-alert"
import '../../styles/Style.css'

/**Admin can add new movies to the page */
 const AdminMovies = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState : {errors}, watch , reset} = useForm({
    mode : 'onChange'
  })
  const [status, setStatus] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const { movieMessage, movieSuccess } = useSelector( state => state.movie )
  useEffect(() => {
    if(movieSuccess && movieMessage)
    {
      setStatus(true)
      setType('success')
      setTitle(movieMessage)
    }
    else if((!movieSuccess) && (movieMessage !== ''))
    {
      setStatus(true)
      setType('error')
      setTitle(movieMessage)
    }
  },[movieSuccess, movieMessage])
  const submitHandler = async(movieData) => {
    dispatch(addMovies(movieData))
  }
    return(<>
      <form onSubmit={ handleSubmit(submitHandler) }>
        <Box className = {classes.loginForm}>
          <Typography padding={1} variant='h4' textAlign="center">
           Add Movie
          </Typography>
          <TextField className='input-credential' {...register('movieImageUrl',{ required : 'Image url required',
            pattern : {
              value : /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
              message : 'Invalid image url'
            }
          })} type={'text'}  placeholder='Image Url' margin='normal'/>
          { errors.movieImageUrl && <small className='credential-error'>{errors.movieImageUrl.message}</small>}
          <TextField className='input-credential' {...register('movieVideoUrl',{ required : 'Video url required',
            pattern : {
              value : /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
              message : 'Invalid video url'
            }
          })} type={'text'} placeholder='Video Url' margin='normal'/>
          { errors.movieVideoUrl && <small className='credential-error'>{errors.movieVideoUrl.message}</small>}
          <TextField className='input-credential' {...register('movieName',{ required : 'Movie name required',
            pattern : {
              value : /^[a-zA-Z0-9 ]+$/,
              message : 'Movie name should contain only alphabets and digits if any sequel'
            }
          })} type={'text'} placeholder='Movie Name' margin='normal'/>
          { errors.movieName && <small className='credential-error'>{errors.movieName.message}</small>}
          <TextField className='input-credential' {...register('ticketCost',{ required : 'Ticket cost required',
            min : {
              value : 190,
              message : 'Ticket price should be atleast 190rs'
            },
            max : {
              value : 500,
              message : 'Ticket price should not exceed 500rs'
            }
          })} type={'number'} placeholder='Ticket Cost' margin='normal'/>
          { errors.ticketCost && <small className='credential-error'>{errors.ticketCost.message}</small>}
          <TextField className='input-credential' {...register('description',{ required : 'Movie description required' })} 
            type={'text'} placeholder='Description' margin='normal'/>
            { errors.description && <small className='credential-error'>{errors.description.message}</small>}
          <TextField className='input-credential' {...register('actorName',{ required : 'Actor name required',
            pattern : {
              value : /^[a-zA-Z ]+$/,
              message : 'Actor name should contain only alphabets'
            }
          })} type={'text'} placeholder='Actor Name' margin='normal'/>
          { errors.actorName && <small className='credential-error'>{errors.actorName.message}</small>}
          <TextField className='input-credential' {...register('directorName',{ required : 'Director name required',
            pattern : {
              value : /^[a-zA-Z ]+$/,
              message : 'Director name should contain only alphabets'
            }
          })} type={'text'} placeholder='Director Name' margin='normal'/>
          { errors.directorName && <small className='credential-error'>{errors.directorName.message}</small>}
          <TextField className='input-credential' {...register('startBookingDate',{ required : 'Release date required'
          })} type={'date'} margin='normal'/>
          { errors.startBookingDate && <small className='credential-error'>{errors.startBookingDate.message}</small>}
          <TextField className='input-credential' {...register('endBookingDate',{ required : 'Out date required'
          })} type={'date'} margin='normal'/>
          { errors.endBookingDate && <small className='credential-error'>{errors.endBookingDate.message}</small>}
          <Button type='submit' variant='contained' color='warning' style={{margin : '5% 0'}}>Add</Button>
        </Box>
      </form>
      <ReactJsAlert
      status = {status}
      type = {type}
      title = {title}
      Close = {(status) => {
        if(movieSuccess && movieMessage)
        {
          setStatus(false)
          dispatch(clearMovieError())
          navigate('/admin/home')
        }
        else if((!movieSuccess) && (movieMessage !== ''))
        {
          setStatus(false)
        }
      }}
      />
    </>)
 }

 export default AdminMovies