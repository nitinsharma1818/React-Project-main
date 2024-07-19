import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'

/**This component will receive components,role as props and authorize and return it */
const ProtectComponent = ({role, children}) => {
    let user,admin
    const userToken = sessionStorage.getItem('usersToken')
    const adminToken = sessionStorage.getItem('adminsToken')

    if(userToken)
    {
        user = jwtDecode(userToken)
        if(user.id && user.role === role)
        return children
    }
    if(adminToken)
    {
        admin = jwtDecode(adminToken)
        if(admin.id && admin.role === role)
        return children
    }

    if(role === 'admin')
    return <Navigate to='/admin/login' replace/>
    
    else if(role === 'user')
    return <Navigate to='/auth' replace/>
    
}

export default ProtectComponent