import { logo } from 'assets/website/img'
import React from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <header id="header" className="site-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-5">
                        <div className="site">
                            <div className="site__menu">
                                <a title="Menu Icon" href="#" className="site__menu__icon">
                                    <i className="las la-bars la-24-black"></i>
                                </a>
                                <div className="popup-background"></div>
                                <div className="popup popup--left">
                                    <a title="Close" href="#" className="popup__close">
                                        <i className="las la-times la-24-black"></i>
                                    </a>
                                    <div className="popup__content">
                                        <div className="popup__user popup__box open-form">
                                            <a title="Login" href="#" className="open-login">Login</a>
                                            <a title="Sign Up" href="#" className="open-signup">Sign Up</a>
                                        </div>
                                        <div className="popup__menu popup__box">
                                            <ul className="menu-arrow">
                                                <li>
                                                    <a href="#" title="Demos">All Places</a>
                                                </li>
                                                <li>
                                                    <Link to={'/about-us'}>About Us</Link>
                                                </li>
                                                <li>
                                                    <a title="Page" href="#">Contact Us</a>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="site__brand">
                                <Link to={'/'} className="site__brand__logo"><img src={logo} alt="Golo" /></Link>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-xl-6 col-7">
                        <div className="right-header align-right">
                            <nav className="main-menu">
                                <ul>
                                    <li>
                                        <a href="#" title="Demos">All Places</a>
                                    </li>
                                    <li>
                                        <Link to={'/about-us'}>About Us</Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact-us'}>Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="right-header__login">
                                <Link to={'/login'}>Login</Link>
                            </div>
                            <div className="popup popup-form">
                                <a title="Close" href="#" className="popup__close">
                                    <i className="las la-times la-24-black"></i>
                                </a>
                                <ul className="choose-form">
                                    <li className="nav-signup"><a title="Sign Up" href="#signup">Sign Up</a></li>
                                    <li className="nav-login"><a title="Log In" href="#login">Log In</a></li>
                                </ul>
                                <p className="choose-more">Continue with <a title="Facebook" className="fb" href="#">Facebook</a> or <a title="Google" className="gg" href="#">Google</a></p>
                                <p className="choose-or"><span>Or</span></p>
                                <div className="popup-content">
                                    <form action="#" className="form-sign form-content" id="signup">
                                        <div className="field-inline">
                                            <div className="field-input">
                                                <input type="text" placeholder="First Name" value="" name="first_name" />
                                            </div>
                                            <div className="field-input">
                                                <input type="text" placeholder="Last Name" value="" name="last_name" />
                                            </div>
                                        </div>
                                        <div className="field-input">
                                            <input type="email" placeholder="Email" value="" name="email" />
                                        </div>
                                        <div className="field-input">
                                            <input type="password" placeholder="Password" value="" name="password" />
                                        </div>
                                        <div className="field-check">
                                            <label htmlFor="accept">
                                                <input type="checkbox" id="accept" value="" />
                                                Accept the <a title="Terms" href="#">Terms</a> and <a title="Privacy Policy" href="#">Privacy Policy</a>
                                                <span className="checkmark">
                                                    <i className="la la-check"></i>
                                                </span>
                                            </label>
                                        </div>
                                        <input type="submit" name="submit" value="Sign Up" />
                                    </form>
                                    <form action="#" className="form-log form-content" id="login">
                                        <div className="field-input">
                                            <input type="text" placeholder="Username or Email" value="" name="user" />
                                        </div>
                                        <div className="field-input">
                                            <input type="password" placeholder="Password" value="" name="password" />
                                        </div>
                                        <a title="Forgot password" className="forgot_pass" href="#">Forgot password</a>
                                        <input type="submit" name="submit" value="Login" />
                                    </form>
                                </div>
                            </div>
                            <div className="right-header__search">
                                <a title="Search" href="#" className="search-open">
                                    <i className="las la-search la-24-black"></i>
                                </a>
                                <div className="site__search">
                                    <a title="Close" href="#" className="search__close">
                                        <i className="la la-times"></i>
                                    </a>
                                    <form action="#" className="site__search__form" method="GET">
                                        <div className="site__search__field">
                                            <span className="site__search__icon">
                                                <i className="las la-search la-24-black"></i>
                                            </span>
                                            <input className="site__search__input" type="text" name="s" placeholder="Search places, cities" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header