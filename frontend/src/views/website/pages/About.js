import { about_title,about_img } from 'assets/website/img'
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='about-page'>
            <div class="page-title-area page-title-bg2" style={{ backgroundImage: `url(${about_title})` }}>
                <div class="container">
                    <div class="page-title-content text-center">
                        <h2>About Us</h2>
                        <ul>
                            <li>
                                <Link to={'/'} className='link-path'>Home</Link>
                            </li>
                            <li><i class="las la-angle-right"></i></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <section class="about-area pt-4">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-12">
                            <div class="about-content">
                                <h2>How We Were Established</h2>
                                <span>
                                    <strong>Check video presentation to find out more about us.</strong>
                                </span>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                <p>Every month they moved their money the old way – which wasted their time and money. So they invented a beautifully simple workaround that became a billion-dollar business.</p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="about-image">
                                <img src={about_img} alt="image" />
                                <div class="video-btn">
                                    <i class="bx bx-play"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="funfacts-area py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
                            <div class="single-funfacts">
                                <i class="bx bx-bullseye"></i>
                                <p>New Visitors</p>
                                <h3 class="odometer">1,421</h3>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
                            <div class="single-funfacts">
                                <i class="bx bx-group"></i>
                                <p>Happy Customer</p>
                                <h3 class="odometer">9,579</h3>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
                            <div class="single-funfacts">
                                <i class="bx bx-shape-polygon"></i>
                                <p>Listings</p>
                                <h3>1,034</h3>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
                            <div class="single-funfacts">
                                <i class="bx bx-trophy"></i>
                                <p>Awards</p>
                                <h3>52</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About