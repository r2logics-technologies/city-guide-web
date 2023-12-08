import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from 'utility/api';
import apiService from 'utility/apiService';
import toast, { Toaster } from "react-hot-toast";
import { paris_lager, d_02, d_07, new_work, tokyo, barca, singapo } from 'assets/website/img'

const CityDetails = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [city, setCity] = useState([]);
    // const [wishlist, setWishlist] = useState([]);
    const fetchData = () => {
        let url = "/api/website/city/" + id;
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setCity(data.city);
                } else {
                    console.log('error', data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const Wishlist = (itemId) => {
        console.log('first', itemId);
        AddWishlist(itemId);
    };

    const AddWishlist = (id) => {
        api
            .get(`/api/website/wishlist/${id}`)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    fetchData();
                    setTimeout(() => {
                        toast.success(data.message);
                    }, 1000);
                } else {
                    console.log('error')
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status == 401) {
                    navigate("/login", { replace: true });
                }
            });
    };

    const RemoveWishlist = (id) => {
        console.log('w id', id);
        api
          .get(`/api/user/remove-wishlist/${id}`)
          .then((res) => {
            const data = res.data;
            if (data.status === "success") {
              fetchData();
              setTimeout(() => {
                toast.success(data.message);
              }, 1000);
            } else {
              console.log('error')
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
            <Toaster />
            <div className="page-title" style={{ backgroundImage: `url(${apiService.ledgerUrl + city.banner})` }}>
                <div className="container">
                    <div className="page-title__content">
                        <h4 className="page-title__capita">{city.country_name}</h4>
                        <h1 className="page-title__name">{city.name}</h1>
                        <p className="page-title__slogan">the city of love</p>
                    </div>
                </div>
            </div>
            <div className="intro">
                <div className="container">
                    <h2 className="title">Introducing</h2>
                    <div className="intro__content">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="intro__text">{city.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="city-content">
                <div className="city-content__tabtitle tabs">
                    <div className="container">
                        <div className="city-content__tabtitle__tablist">
                            <ul>
                                <li className="active"><a title="France" href="#france">{city.name}</a></li>
                            </ul>
                        </div>
                        <a className="city-content__tabtitle__button btn btn-mapsview" title="Maps view" href="maps-view.html">
                            <i className="la la-map-marked-alt la-24"></i>
                            Maps view
                        </a>
                    </div>
                </div>
                <div className="city-content__panels">
                    <div className="container">
                        <div className="city-content__panel" id="france">
                            <div className="city-content__item">
                                <h2 className="title title--more">
                                    Places
                                </h2>
                                <div className="city-slider">
                                    <div className="row city-slider__grid">
                                        {city.places?.map((place) => {
                                            return (
                                                <div className="col-md-3 places-item hover__box">
                                                    <div className="places-item__thumb hover__box__thumb">
                                                        <Link title={place.place_name} to={`/place-details/${place.place_id}`}>
                                                            <img src={apiService.ledgerUrl + place.place_image} alt="" />
                                                        </Link>
                                                    </div>
                                                    {place.in_wishlist ? (<a title="Add Wishlist" href="#" onClick={() => RemoveWishlist(place.place_id)} className="place-item__addwishlist">
                                                        <i className="la la-heart la-24"></i>
                                                    </a>) : (<a title="Add Wishlist" href="#" onClick={() => Wishlist(place.place_id)} className="place-item__addwishlist">
                                                        <i className="la la-bookmark la-24"></i>
                                                    </a>)}

                                                    <div className="places-item__info">
                                                        <div className="places-item__category">
                                                            <a title="Restaurants" href="#">{place.category}</a>
                                                        </div>
                                                        <h3>
                                                            <Link title={place.name} to={`/place-details/${place.place_id}`}>
                                                                {place.place_name}
                                                            </Link>
                                                        </h3>
                                                        <div className="places-item__meta">
                                                            <div className="places-item__reviews">
                                                                <span className="places-item__number">
                                                                    <span className="places-item__count">(no reviews)</span>
                                                                </span>
                                                            </div>
                                                            <div className="places-item__currency">${place.place_price}</div>
                                                        </div>
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="other-city banner-dark">
                <div className="container">
                    <h2 className="title title--while">Explorer Other Cities</h2>
                    <div className="other-city__content">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="cities__item hover__box">
                                    <div className="cities__thumb hover__box__thumb">
                                        <a title="New York" href="#">
                                            <img src={new_work} alt="newyork" />
                                        </a>
                                    </div>
                                    <h4 className="cities__name">United states</h4>
                                    <div className="cities__info">
                                        <h3 className="cities__capital">New York</h3>
                                        <p className="cities__number">55 places</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="cities__item hover__box">
                                    <div className="cities__thumb hover__box__thumb">
                                        <a title="Tokyo" href="#">
                                            <img src={tokyo} alt="Tokyo" />
                                        </a>
                                    </div>
                                    <h4 className="cities__name">Japan</h4>
                                    <div className="cities__info">
                                        <h3 className="cities__capital">Tokyo</h3>
                                        <p className="cities__number">32 places</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="cities__item hover__box">
                                    <div className="cities__thumb hover__box__thumb">
                                        <a title="Singapore" href="#">
                                            <img src={singapo} alt="Singapo" />
                                        </a>
                                    </div>
                                    <h4 className="cities__name">Singapore</h4>
                                    <div className="cities__info">
                                        <h3 className="cities__capital">Singapore</h3>
                                        <p className="cities__number">22 places</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="cities__item hover__box">
                                    <div className="cities__thumb hover__box__thumb">
                                        <a title="barca" href="#">
                                            <img src={barca} alt="barca" />
                                        </a>
                                    </div>
                                    <h4 className="cities__name">Spain</h4>
                                    <div className="cities__info">
                                        <h3 className="cities__capital">Barca</h3>
                                        <p className="cities__number">78 places</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default CityDetails