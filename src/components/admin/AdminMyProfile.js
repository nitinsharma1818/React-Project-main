import { Button, SnackbarContent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { viewAdminProfile } from '../redux/AdminActions'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import '../../styles/Style.css'


/**Admin can view his profile */
 const AdminMyProfile = () => {
  const adminId = useSelector( state => state.admin._adminId )
  const adminProfile = useSelector( state => state.admin.adminProfile )
  const dispatch = useDispatch()
  const navigate = useNavigate()
    useEffect(() => {
      if(adminId)
      dispatch(viewAdminProfile(adminId))
    },[adminId])
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
            <SnackbarContent message={adminProfile.adminName} action="Admin Name"/>
            <SnackbarContent message={adminProfile.adminEmail} action="Admin Email" />
      </Stack>
        <Button LinkComponent={Link} to='/admin/my-profile/edit-profile' variant='outlined' sx={{ margin: 1, borderRadius: 3, marginLeft: 20, marginTop: 3 }} color='warning'>Edit</Button>
        </Box>
    </>)
 }

 export default AdminMyProfile


