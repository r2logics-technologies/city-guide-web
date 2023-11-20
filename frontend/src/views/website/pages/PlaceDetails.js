import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from 'utility/api';
import apiService from 'utility/apiService';
import { useAuth } from "context/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { paris_lager, wf, card, cld, smk } from 'assets/website/img';

const PlaceDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [auth, setAuth] = useAuth();
    const [place, setPlace] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const fetchData = () => {
        let url = "/api/website/place/" + id;
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setPlace(data.place);
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


    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        // console.log('place', place.id);
        const url = `/api/website/book-place/${place.id}`;
        const formData = new FormData();
        formData.append("total_adults", data.total_adults != null && data.total_adults);
        formData.append("total_childs", data.total_childs != null && data.total_childs);
        formData.append("booking_date", data.booking_date != null && data.booking_date);
        formData.append("booking_time", data.booking_time != null && data.booking_time);
        api
          .post(url, formData)
          .then((res) => {
            const data = res.data;
            if (data.status === "success") {
                setTimeout(() => {
                    toast.success(data.message);
                }, 1000);
                reset();
            } else {
              toast.error(data.message);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong!");
          });
      };

    return (
        <div className='site-main single single-02'>
            <Toaster />
            <div className="place">
                <div className="slick-sliders">
                    <div className="slick-slider" data-item="1" data-arrows="true" data-itemscroll="1" data-dots="true" data-infinite="true" data-centermode="true" data-centerpadding="418px" data-tabletitem="1" data-tabletscroll="1" data-tabletpadding="70px" data-mobileitem="1" data-mobilescroll="1" data-mobilepadding="30px">
                        <div className="place-slider__item bd"><a title="Place Slider Image" href="#"><img src={paris_lager} alt="slider-01" /></a></div>
                    </div>
                    <div className="place-share">
                        <a title="Save" href="#" className="add-wishlist" onClick={() => Wishlist(place.id)}>
                            <i className="la la-bookmark large"></i>
                        </a>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-lg-8">
                            <div className="place__left">
                                <ul className="place__breadcrumbs breadcrumbs">
                                    <li><a title={place.country} href="#">{place.country}</a></li>
                                    <li><a title={place.city} href="#">{place.city}</a></li>
                                    <li><a title={place.category} href="#">{place.category}</a></li>
                                </ul>
                                <div className="place__box place__box--npd">
                                    <h1>{place.name}</h1>
                                    <div className="place__meta">
                                        <div className="place__reviews reviews">
                                            <span className="place__reviews__number reviews__number">
                                                4.2
                                                <i className="la la-star"></i>
                                            </span>
                                            <span className="place__places-item__count reviews_count">(3 reviews)</span>
                                        </div>
                                        <div className="place__currency">$ {place.price_range}</div>
                                        <div className="place__category">
                                            <a title="Restaurant" href="#">{place.place_type}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="place__box place__box-hightlight">
                                    <div className="hightlight-grid">
                                        {place.amenities?.map((amenitie) => {
                                            return (
                                                <div className="place__amenities">
                                                    <img src={apiService.ledgerUrl + amenitie.icon} alt="Free wifi" />
                                                    <span>{amenitie.name}</span>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="place__box place__box-overview">
                                    <h3>Overview</h3>
                                    <div className="place__desc">{place.description}</div>
                                </div>
                                <div className="place__box place__box-map">
                                    <div className="address">
                                        <i className="la la-map-marker"></i>
                                        {place.address}
                                        <a href={'http://maps.google.com/?q= ' + place.address} target='_blank' title="Direction">(Direction)</a>
                                    </div>
                                </div>
                                <div className="place__box">
                                    <h3>Contact Info</h3>
                                    <ul className="place__contact">
                                        <li>
                                            <i className="la la-phone"></i>
                                            <a title={place.phone_number} href={'tel:' + place.phone_number}>{place.phone_number}</a>
                                        </li>
                                        <li>
                                            <i className="la la-globe"></i>
                                            <a title={place.website} href={place.website} target='_blank'>{place.website}</a>
                                        </li>
                                        {place.placesocials?.map((social) => {
                                            return (
                                                <li>
                                                    <i className="la la-facebook-f"></i>
                                                    <a title={social.social_url} href={social.social_url}>{social.social_type}</a>
                                                </li>)
                                        })}
                                    </ul>
                                </div>
                                <div className="place__box place__box-open">
                                    <h3 className="place__title--additional">
                                        Opening Hours
                                    </h3>
                                    <table className="open-table">
                                        <tbody>
                                            {place.placeopens?.map((open) => {
                                                return (
                                                    <tr>
                                                        <td className="day">{open.day}</td>
                                                        <td className="time">{open.time}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="place__box place__box--reviews">
                                    <h3 className="place__title--reviews">
                                        Review (3)
                                        <span className="place__reviews__number">
                                            4.2
                                            <i className="la la-star"></i>
                                        </span>
                                    </h3>
                                    <ul className="place__comments">
                                        <li>
                                            <div className="place__author">
                                                <div className="place__author__avatar">
                                                    <a title="Sebastian" href="#"><img src="images/avatars/male-4.jpg" alt="" /></a>
                                                </div>
                                                <div className="place__author__info">
                                                    <a title="Sebastian" href="#">Sebastian</a>
                                                    <div className="place__author__star">
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <span style={{ width: "72%" }}>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                        </span>
                                                    </div>
                                                    <span className="time">October 1, 2019</span>
                                                </div>
                                            </div>
                                            <div className="place__comments__content">
                                                <p>Went there last Saturday for the first time to watch my favorite djs (Kungs, Sam Feldet and Watermat) and really had a great experience. The atmosphere is amazing and I am going next week.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="place__author">
                                                <div className="place__author__avatar">
                                                    <a title="Nitithorn" href="#"><img src="images/avatars/female-4.jpg" alt="" /></a>
                                                </div>
                                                <div className="place__author__info">
                                                    <a title="Nitithorn" href="#">Nitithorn</a>
                                                    <div className="place__author__star">
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <i className="la la-star"></i>
                                                        <span style={{ width: "72%" }}>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                            <i className="la la-star"></i>
                                                        </span>
                                                    </div>
                                                    <span className="time">October 1, 2019</span>
                                                </div>
                                            </div>
                                            <div className="place__comments__content">
                                                <p>Went there last Saturday for the first time to watch my favorite djs (Kungs, Sam Feldet and Watermat) and really had a great experience.</p>
                                            </div>
                                        </li>
                                    </ul>
                                    {auth.token ? (
                                        <div className="review-form" >
                                            <h3>Write a review</h3>
                                            <form action="#">
                                                <div className="rate">
                                                    <span>Rate This Place</span>
                                                    <div className="stars">
                                                        <a href="#" title="star-1">
                                                            <i className="la la-star"></i>
                                                        </a>
                                                        <a href="#" title="star-2">
                                                            <i className="la la-star"></i>
                                                        </a>
                                                        <a href="#" title="star-3">
                                                            <i className="la la-star"></i>
                                                        </a>
                                                        <a href="#" title="star-4">
                                                            <i className="la la-star"></i>
                                                        </a>
                                                        <a href="#" title="star-5">
                                                            <i className="la la-star"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="field-textarea">
                                                    <img className="author-avatar" src="images/avatars/male-1.jpg" alt="" />
                                                    <textarea name="review_text" placeholder="Write a review"></textarea>
                                                </div>
                                                <div className="field-submit">
                                                    <input type="submit" className="btn" value="Submit" name="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <p><Link to={'/login'}>Login</Link> to review</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {auth.token ? (
                                <div className="booking-form">
                                    <div className='card'>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <p className='text-center fw-bold fs-5 mb-2'>Make a reservation</p>
                                                <div>
                                                    <label for="adults" className="form-label">Total Adults</label>
                                                    <input type="number" {...register("total_adults", { required: true })} className="form-control" id="adults" placeholder="Total Adults" />
                                                    <small className="text-danger">
                                                        {errors?.total_adults && "Total Adults is required"}
                                                    </small>
                                                </div>
                                                <div className='mt-2'>
                                                    <label for="Childrens" className="form-label">Total Childrens</label>
                                                    <input type="number" {...register("total_childs", { required: true })} className="form-control" id="Childrens" placeholder="Total Childrens" />
                                                    <small className="text-danger">
                                                        {errors?.total_childs && "Total Childrens is required"}
                                                    </small>
                                                </div>
                                                <div className='mt-2'>
                                                    <label for="Date" className="form-label">Booking Date</label>
                                                    <input type="date" {...register("booking_date", { required: true })} className="form-control" id="Date" />
                                                    <small className="text-danger">
                                                        {errors?.booking_date && "Booking Date is required"}
                                                    </small>
                                                </div>
                                                <div className='mt-2'>
                                                    <label for="Time" className="form-label">Booking Time</label>
                                                    <input type="time" {...register("booking_time", { required: true })} className="form-control" id="Time" />
                                                    <small className="text-danger">
                                                        {errors?.booking_time && "Booking Time is required"}
                                                    </small>
                                                </div>
                                                <div className="field-submit text-center">
                                                    <input type="submit" className="btn" value="Request a book" name="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p><Link to={'/login'}>Login</Link> For Booking</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceDetails