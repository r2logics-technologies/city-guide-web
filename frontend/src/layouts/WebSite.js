import React from 'react'
import "../assets/website/css/stylesheet.css";
import "../assets/website/css/style.css";
import "../assets/website/css/responsive.css";

import Home from 'components/website/Home'
import Footer from 'components/website/layouts/Footer'
import Header from 'components/website/layouts/Header'
import { Route, Routes } from 'react-router-dom'

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