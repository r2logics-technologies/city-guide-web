import React from 'react'
import "../assets/website/css/stylesheet.css";
import "../assets/website/css/style.css";
import "../assets/website/css/responsive.css";

import { Route, Routes } from 'react-router-dom';
import Home from 'views/website/Home';
import Header from 'views/website/layouts/Header';
import Footer from 'views/website/layouts/Footer';

const WebSite = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
      </Routes>
      <Footer />
    </div>
  )
}

export default WebSite