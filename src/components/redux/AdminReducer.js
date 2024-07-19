import jwtdecode from 'jwt-decode'

const adminInitialState = {
    adminToken : sessionStorage.getItem("adminsToken"),
    _adminId : '',
    adminRole : '',
    adminProfile : '',
    adminLoginMessage : '',
    adminLoginSuccess : false,
    adminLogoutMessage : ''
}

const adminReducer = (state = adminInitialState, action) => {
    switch(action.type){
        case 'SET_ADMIN_TOKEN' :
        case 'SET_ADMIN_RETRIEVE_TOKEN' : 
        const admin = jwtdecode(action.token)
        return {
            ...state,
            adminToken : action.token,
            _adminId : admin.id,
            adminRole : admin.role,
            adminLoginMessage : action.payload,
            adminLoginSuccess : true
        }
        case 'SET_ADMIN_LOGIN_ERROR' : return {
            ...state,
            adminLoginMessage : action.payload,
            adminLoginSuccess : false
        }
        case 'DELETE_ADMIN_TOKEN' : sessionStorage.removeItem("adminsToken")
        return {
            adminToken : '',
            _adminId : '',
            adminRole : '',
            adminProfile : '',
            adminLoginMessage : '',
            adminLogoutMessage : ''
        }
        case 'SET_ADMIN_PROFILE' : return {
            ...state,
            adminProfile : action.payload,
            message : 'profile loaded'
        }
        default : return state
    }
}     

export {
    adminReducer
}