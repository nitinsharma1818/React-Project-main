import { Button, SnackbarContent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { viewProfile } from '../redux/UserActions'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import '../../styles/Style.css'
import { useStyles } from '../../styles/styles'

/**Users My Profile component */
 const MyProfile = () => {
  const userId = useSelector( state => state.user._userId )
  const profile = useSelector( state => state.user.profile )
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()
  /**To view my profile if there is a signed in user id*/
    useEffect(() => {
      if(userId)
      dispatch(viewProfile(userId))
    },[userId])
    /**To go previous page */
    const goBack = () => {
      navigate(-1)
    }
    return(<>
    <Button variant="contained" endIcon={<ArrowBackSharpIcon className="back-icon"/>}  onClick={goBack} className='back-button'></Button>
      <Box sx={{
            width: 400,
            height: 370,
            margin: 'auto',
            marginTop:'90px'
        }}>
      <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent message={profile.userName} action="User Name" />
            <SnackbarContent message={profile.userEmail} action="User Email"/>
            <SnackbarContent message={profile.userContact} action="User Contact" />
        </Stack>
        <Button LinkComponent={Link} to='/my-profile/edit-profile' variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3 }} color='warning'>Edit</Button>
        </Box>
    </>)
 }

 export default MyProfile