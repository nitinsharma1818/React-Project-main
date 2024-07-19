import React from "react";
import { Routes, Route } from 'react-router-dom';
import Auth from '../user/Auth';
import Home from '../user/Home';
import Movies from '../user/Movies';
import Bookings from '../user/Bookings';
import AdminBookings from '../admin/AdminBookings';
import AdminMovies from '../admin/AdminMovies';
import AdminHome from '../admin/AdminHome';
import AdminLogin from "../admin/AdminLogin";
import MyProfile from "../user/MyProfile";
import AdminMyProfile from "../admin/AdminMyProfile";
import AboutMovie from "../movie/AboutMovie";
import EditProfile from "../user/EditProfile";
import AdminEditProfile from "../admin/AdminEditProfile";
import AboutMovieAdmin from "../movie/AboutMovieAdmin";
import EditMovie from "../movie/EditMovie";
import Shows from "../show/Shows";
import ProtectComponent from "./ProtectComponent";

/**Based on the specified path that specific component gets rendered */
const Router = () => {
    return(<>
    <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/movies' element={<Movies />}></Route>
            <Route path='/movies/:movieId' element={<AboutMovie />}></Route>
            <Route path='/bookings' element={<ProtectComponent role='user'><Bookings /></ProtectComponent>}></Route>
            <Route path='/auth' element={<Auth />}></Route>
            <Route path='/my-profile' element={<ProtectComponent role='user'><MyProfile/></ProtectComponent>}></Route>
            <Route path='/my-profile/edit-profile' element={<ProtectComponent role='user'><EditProfile/></ProtectComponent>}></Route>

            <Route path='/admin' element={<AdminHome/>}></Route>
            <Route path='/admin/home' element={<AdminHome />}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/movies' element={<AdminMovies />}></Route>
            <Route path='/admin/movies/:movieId' element={<AboutMovieAdmin />}></Route>
            <Route path='/admin/movies/:movieId/edit' element={<ProtectComponent role='admin'><EditMovie /></ProtectComponent>}></Route>
            <Route path='/admin/bookings' element={<ProtectComponent role='admin'><AdminBookings /></ProtectComponent>}></Route>
            <Route path='/admin/my-profile' key={document.location.href} element={<ProtectComponent role='admin'><AdminMyProfile /></ProtectComponent>}></Route>
            <Route path='/admin/my-profile/edit-profile' element={<ProtectComponent role='admin'><AdminEditProfile /></ProtectComponent>}></Route>

            <Route path='/movies/shows/:movieId' element={<Shows />}></Route>
            <Route path='*' element={<Home/>}></Route> 
    </Routes>
    </>)
}

export default Router

/**Check for admin home page when url is not matched */