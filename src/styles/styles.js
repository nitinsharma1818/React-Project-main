import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
    loginForm : {
      maxWidth : '400px',
      display : 'flex', 
      flexDirection : 'column', 
      alignItems : 'center', 
      justifyContent : 'center',
      padding : '50px',
      margin : 'auto', 
      marginTop : '70px',
      boxShadow : '10px 10px 20px #ccc',
      borderRadius : '5px'
    },
    submitForm : {
      maxWidth : '400px',
      display : 'flex', 
      flexDirection : 'column', 
      alignItems : 'center', 
      justifyContent : 'center',
      padding : '50px',
      margin : 'auto', 
      marginTop : '70px',
      boxShadow : '10px 10px 20px #ccc',
      borderRadius : '5px'
    },
    userBookCard : {
      margin : 'auto',
      maxWidth : '350px',
      maxHeight : '500px',
      padding : '15px',
      marginBottom : '20px',
    },
    userAuthTitle : {
      padding : '1px',
      fontVariant : 'h4',
      textAlign : 'center'
    },
    userAuthButton : {
      margin : '5% 0'
    },
    bookingBox : {
      padding : '15px',
      paddingTop : '15px'
    },
    movieToggle : {
      marginLeft : '600px', 
      marginTop : '80px',
    }
  }))

export let appBar = {
    backgroundColor : '#1c1c1c'
}
export let headerMenu = {
  color : 'white'
}
export let headerButtons = {
 
  borderRadius : '3px'
}

