import React, { useState,useEffect } from 'react'
import { AppBar, Button, Box, Toolbar, Typography, Tabs, Tab, } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { appBar, headerMenu, } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdminToken } from '../redux/AdminActions'

/**Admins Header Component */
const AdminHeader = () => {
    const location = useLocation()
    const admin = useSelector( state => state.admin )
    const dispatch = useDispatch()
    const [selectTab, setSelectTab] = useState(0)
    const logoutHandler = () => {
        dispatch(deleteAdminToken())
    }
    useEffect( () => {
        if(location.pathname === "/admin" || location.pathname === '/admin/home')
        {
            setSelectTab(0)
        }
        else if(location.pathname === "/admin/movies")
        {
            setSelectTab(1)
        }
        else if(location.pathname === "/admin/bookings")
        {
            setSelectTab(2)
        }
        else if(location.pathname === "/admin/my-profile")
        {
            setSelectTab(3)
        }
    },[selectTab,location.pathname])
    return (<>
        <AppBar position='sticky' style={appBar}>
            <Toolbar>
                <Typography variant='h4' margin="0 5%">TicketNew</Typography>
                <Tabs value={selectTab} onChange={ (event, value) => setSelectTab(value) } >

                    <Tab LinkComponent={Link} to='/admin/home' label="Home" style={headerMenu} />
                    {
                        admin._adminId  && <Tab LinkComponent={Link} to='/admin/movies' label="Add Movies" style={headerMenu} />
                    }
                    <Tab LinkComponent={Link} to='/admin/bookings' label="Bookings" style={headerMenu} />
                    {
                        admin._adminId  && <Tab LinkComponent={Link} to='/admin/my-profile' label="My Profile" style={headerMenu} />
                    }

                </Tabs>

                <Box display="flex" marginLeft="auto">
                    {
                        !admin._adminId && <Button LinkComponent={Link} to='/admin/login' variant='outlined' sx={{ margin: 1, borderRadius: 3 }} color='primary'>Login</Button>
                    }
                    {
                        admin._adminId && <Button onClick={logoutHandler} LinkComponent={Link} to='/admin/home' variant='outlined' sx={{ margin: 1, borderRadius: 3 }} color='warning'>Logout</Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </>)
}

export default AdminHeader