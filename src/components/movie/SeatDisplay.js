import { Box, Button, Card, CardContent, Checkbox, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import { CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bookShow, clearSeatError } from '../redux/ShowActions';
import ReactJsAlert from "reactjs-alert"
import { clearBookingError } from '../redux/BookActions';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const useStyles = makeStyles({
  root: {
    margin: 'auto',
    padding: 15,
    marginBottom: 20,
  },
  card: {
        margin : 'auto',
        maxWidth : 350,
        maxHeight : 500,
        padding : 15
    }
})
/**Seat Display Component */
const SeatDisplay = ({data}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const userId = useSelector( state => state.user._userId )
  const navigate = useNavigate()
  const [status, setStatus] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [seats, setSeats] = useState([])
  const { showMessage, showSuccess } = useSelector( state => state.show )
  /**To display success and error pop up's on each time it renders respect to dependent array*/
  useEffect(() => {
    if(showSuccess)
    {
      setStatus(true)
      setType('success')
      setTitle(showMessage)
    }
    else if((!showSuccess) && (showMessage !== ''))
    {
      setStatus(true)
      setType('error')
      setTitle(showMessage)
    }
  },[showSuccess, showMessage])
  /**To select and unselect seats */
  const selectSeats = (event) => {
    if (!seats.includes(event.target.value))
      setSeats(prev => [...prev, event.target.value])
    else 
    {
      let filteredSeats = seats.filter(seat => seat !== event.target.value)
      setSeats(filteredSeats)
    }
  }
  /**To book the show after the seats are selected by an user */
  const bookHandler = () => {
    dispatch(bookShow({ movieId : data.selectedMovieId, showDate : data.selectedDate, userId, seats }))
  }

  return (<div className='row'>
    <div className='col-md-8'>
    <Box ml={41} >
      <div>
         <Checkbox {...label} value={1} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={2} onClick={selectSeats} className={classes.root} />
         <Checkbox {...label} value={3} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={4} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={5} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={6} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={7} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={8} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={9} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={10} onClick={selectSeats} className={classes.root}/>
         </div>
         <div>
         <Checkbox {...label} value={11} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={12} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={13} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={14} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={15} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={16} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={17} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={18} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={19} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={20} onClick={selectSeats} className={classes.root}/>
         </div>
         <div>
         <Checkbox {...label} value={21} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={22} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={23} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={24} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={25} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={26} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={27} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={28} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={29} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={30} onClick={selectSeats} className={classes.root}/>
         </div>
         <div>
         <Checkbox {...label} value={31} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={32} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={33} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={34} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={35} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={36} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={37} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={38} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={39} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={40} onClick={selectSeats} className={classes.root}/>
         </div>
         <div> 
         <Checkbox {...label} value={41} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={42} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={43} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={44} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={45} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={46} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={47} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={48} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={49} onClick={selectSeats} className={classes.root}/>
         <Checkbox {...label} value={50} onClick={selectSeats} className={classes.root}/>
         </div>
    </Box>
    <Button onClick={bookHandler} variant='contained' color='warning' style={{marginTop:20, marginLeft : 550}}>Book</Button>
    </div>
    <div className='col-md-4' style={{position : 'relative', bottom : 60}}>
      {seats && (<><Card className={classes.card}>
                <CardMedia height={250}
                    component="img"
                    alt="No image found"
                    image={data.movie.movieImageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <span>Movie Name : </span>{data.movie.movieName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Booked Seats : </span>{seats.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Ticket Cost : </span>{data.movie.ticketCost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Total Price : </span>{seats.length * data.movie.ticketCost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Show Date : </span>{data.selectedDate}
                    </Typography>
                </CardContent>
            </Card>
            </>) }
    </div>
    {/* <Checkbox {...label} disabled checked /> */}
    <ReactJsAlert
        status={status} type={type} title={title} Close = {(status) => {
        if(showSuccess && showMessage)
        {
          setStatus(false)
          dispatch(clearSeatError())
          dispatch(clearBookingError())
          navigate('/home')
        }
        else if((!showSuccess) && (showMessage !== ''))
        {
          setStatus(false)
          dispatch(clearSeatError())
        }
        }}/>
  </div>
  
  )
}

export default SeatDisplay