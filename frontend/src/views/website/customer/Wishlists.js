import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import apiService from 'utility/apiService';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const Wishlists = () => {
    const [customer, setProfile] = useState([]);
    const [wishlists, setWishlists] = useState([]);

    const fetchData = () => {
        let url = "/api/user";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setProfile(data.profile);
                    setWishlists(data.profile.wishlists);
                } else {
                    console.log('error', data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const truncateAddress = (address, maxLength) => {
        return address.length > maxLength
            ? `${address.substring(0, maxLength)}....`
            : address;
    };

    const RemoveWishlist = (id) => {
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
            <div className="card mb-3">
                <div className="card-body">
                    <div className='row'>
                        {wishlists?.map((place) => {
                            return (
                                <div className='col-md-4'>
                                    <div class="card bg-light-subtle mt-4">
                                        <img src={apiService.ledgerUrl + place.thumb} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <div class="text-section">
                                                <p class="card-title">{place.place_type} <span className='float-end'>{place.city}</span></p>
                                                <p class="card-text">{place.name}</p>
                                                <p class="card-text mb-3"><i class="la la-map-marker"></i> {truncateAddress(place.address, 60)}</p>
                                            </div>
                                            <div class="cta-section">
                                                <div>
                                                    {place.avg_reviews > 0 ? (<span><span style={{ color: "#23d3d3" }}><i class="la la-star"></i> {place.avg_reviews}</span> ({place.total_reviews} Reviews)</span>) : (<span>No Reviews</span>)}<span className='float-end'>{place.currency_icon}{place.price_range}</span>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    {place.is_booking ? (
                                                        <Link to={`/customer-bookings`} class="btn btn-success">View Booking</Link>
                                                    ) : (<Link to={`/place-details/${place.place_id}`} class="btn btn-success">Book Now</Link>)}
                                                    <button class="btn btn-danger" onClick={() => RemoveWishlist(place.place_id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlists