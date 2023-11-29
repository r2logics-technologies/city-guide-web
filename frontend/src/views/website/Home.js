import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import apiService from 'utility/apiService';
import { useForm } from 'react-hook-form';
import { bg_1, bg_app, app_store, google_play, thumb_1, thumb_5, thumb_8 } from 'assets/website/img';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
    const [cities, setCities] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [searches, setSearch] = useState([]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // const handleFocus = () => {
    //     setSuggestionsVisible(true);
    // };

    // const handleBlur = () => {
    //     setSuggestionsVisible(false);
    // };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSelectedText(value);
        const inputValueLength = value.length;
        if (inputValueLength >= 3) {
            setSuggestionsVisible(true);
            onSearch(value);
        }else{
            setSuggestionsVisible(false);
        }
    };

    const onSearch = async (data) => {
        const url = `/api/website/search`;
        const formData = new FormData();
        formData.append("search", data);
        api
            .post(url, formData)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setSearch(data.searches);
                } else {
                    setSuggestionsVisible(false);
                }
            })
            .catch((err) => {
                console.error(err);
                console.log("Something went wrong!");
            });
    };

    const SearchSubmit = async (data) => {
        try {
            const searchURL = `/search?q=${encodeURIComponent(data.search)}`;
            navigate(searchURL);
        } catch (error) {
            console.error('Error during redirection:', error);
        }
    };

    const fetchData = () => {
        let url = "/api/website";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setCities(data.cities);
                    setBlogs(data.blogs);
                } else {
                    console.log('error', data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <div id="wrapper">
                <main id="main" className="site-main overflow">
                    <div className="site-banner" style={{ backgroundImage: `url(${bg_1})` }}>
                        <div className="container">
                            <div className="site-banner__content">
                                <h1 className="site-banner__title">Explore the world</h1>
                                <form onSubmit={handleSubmit(SearchSubmit)} className="site-banner__search layout-02">
                                    <div className="field-input">
                                        <label htmlFor="s">Find</label>
                                        {/* onFocus={handleFocus} onBlur={handleBlur} */}
                                        <input
                                            className="site-banner__search__input open-suggestion"
                                            type="text"
                                            id='s'
                                            placeholder='Ex: Country, City, Place'
                                            autoComplete='off'
                                            value={selectedText}
                                            {...register("search")}
                                            onChange={handleInputChange}
                                        />
                                        {isSuggestionsVisible && (
                                            <div className="search-suggestions name-suggestions">
                                                <ul>
                                                    {searches?.map((search) => {
                                                        return (
                                                            <li>
                                                                <Link to={`/place-details/${search.place_id}`}>
                                                                    <span><i className="las la-place-of-worship"></i>{search.place_name} <span className='float-end'><i className="las la-map-marker"></i>{search.city}</span></span>
                                                                </Link>
                                                            </li>)
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="field-submit">
                                        <button><i className="las la-search la-24-black"></i></button>
                                    </div>
                                </form>
                                {/* <p className="site-banner__meta">
                                    <span>Popular:</span>
                                    <a title="London" href="city-details-1.html">London</a>
                                    <a title="Paris" href="city-details-1.html">Paris</a>
                                    <a title="Chicago" href="city-details-1.html">Chicago</a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="cities">
                        <div className="container">
                            <h2 className="cities__title title offset-item">Popular cities</h2>
                            <div className="cities__content offset-item">
                                <div className="row">
                                    {cities?.map((city) => {
                                        return (
                                            <div className="col-lg-3 col-sm-6" >
                                                <div className="cities__item hover__box">
                                                    <div className="cities__thumb hover__box__thumb">
                                                        <Link title={city.country_name} to={`/city-details/${city.id}`}>
                                                            <img src={apiService.ledgerUrl + city.thumb} alt={city.name} />
                                                        </Link>
                                                    </div>
                                                    <h4 className="cities__name">{city.country_name}</h4>
                                                    <div className="cities__info">
                                                        <h3 className="cities__capital">{city.name}</h3>
                                                        <p className="cities__number">{city.total_place} places</p>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                    {/* <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="Barca" href="city-details-3.html">
                                                    <img src={barca} alt="Barca" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">Spain</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Barca</h3>
                                                <p className="cities__number">92 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="New York" href="city-details-3.html">
                                                    <img src={new_work} alt="New York" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">United States</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">New York</h3>
                                                <p className="cities__number">64 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="Paris" href="city-details-3.html">
                                                    <img src={paris} alt="Paris" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">France</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Paris</h3>
                                                <p className="cities__number">23 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="Amsterdam" href="city-details-3.html">
                                                    <img src={amsterdam} alt="Amsterdam" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">Netherlands</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Amsterdam</h3>
                                                <p className="cities__number">44 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="Singapo" href="city-details-3.html">
                                                    <img src={singapo} alt="Singapo" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">Singapo</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Singapo</h3>
                                                <p className="cities__number">60 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="Sydney" href="city-details-3.html">
                                                    <img src={sydney} alt="Sydney" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">Australia</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Sydney</h3>
                                                <p className="cities__number">36 places</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="cities__item hover__box">
                                            <div className="cities__thumb hover__box__thumb">
                                                <a title="angeles" href="city-details-3.html">
                                                    <img src={angeles} alt="angeles" />
                                                </a>
                                            </div>
                                            <h4 className="cities__name">United States</h4>
                                            <div className="cities__info">
                                                <h3 className="cities__capital">Angeles</h3>
                                                <p className="cities__number">44 places</p>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-apps" style={{ backgroundImage: `url(${bg_app})` }}>
                        <div className="container">
                            <div className="banner-apps__content">
                                <h2 className="banner-apps__title offset-item">Get the App</h2>
                                <p className="banner-apps__desc offset-item">Download the app and go to travel the world.</p>
                                <div className="banner-apps__download offset-item">
                                    <a title="App Store" href="#" className="banner-apps__download__iphone"><img src={app_store} alt="App Store" /></a>
                                    <a title="Google Play" href="#" className="banner-apps__download__android"><img src={google_play} alt="Google Play" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="news">
                        <div className="container">
                            <h2 className="news__title title title--more offset-item">
                                Related stories
                                <Link title="View more" to={'/blogs'}>
                                    View more
                                    <i className="la la-angle-right"></i>
                                </Link>
                            </h2>
                            <div className="news__content offset-item">
                                <div className="row">
                                {blogs?.map((blog) => {
                                    return (<div className="col-md-4">
                                        <article className="post hover__box">
                                            <div className="post__thumb hover__box__thumb">
                                                <Link title={blog.title} to={'blog-details/'+blog.id}><img src={apiService.ledgerUrl+blog.thumb} alt={blog.title} /></Link>
                                            </div>
                                            <div className="post__info">
                                                <ul className="post__category">
                                                    <li><Link title="Food" to={'blog-details/'+blog.id}>{blog.category_name}</Link></li>
                                                </ul>
                                                <h3 className="post__title"><Link title={blog.title} to={'blog-details/'+blog.id}>{blog.title}</Link></h3>
                                            </div>
                                        </article>
                                    </div>)
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home