import React from 'react'
import "../assets/website/css/stylesheet.css";
import "../assets/website/css/fontawesome.css";
import "../assets/website/css/style.css";
import "../assets/website/css/responsive.css";

import { Route, Routes } from 'react-router-dom';
import Home from 'views/website/Home';
import Header from 'views/website/layouts/Header';
import Footer from 'views/website/layouts/Footer';
import About from 'views/website/pages/About';
import Contact from 'views/website/pages/Contact';
import Login from 'views/auth/Login';
import CityDetails from 'views/website/pages/CityDetails';
import PlaceDetails from 'views/website/pages/PlaceDetails';
import PlaceSearch from 'views/website/pages/PlaceSearch';
import AllPlaces from 'views/website/pages/AllPlaces';

const WebSite = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/places' element={<AllPlaces />} />
        <Route path='/search' element={<PlaceSearch />} />
        <Route path='/city-details/:id' element={<CityDetails />} />
        <Route path='/place-details/:id' element={<PlaceDetails />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default WebSite