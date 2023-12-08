import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import apiService from 'utility/apiService';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const Bookings = () => {
    const [customer, setProfile] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchData = () => {
        let url = "/api/user";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setProfile(data.profile);
                    setBookings(data.profile.bookings);
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

    const BookingDeatils = (id) => {
        api
            .get(`/api/user/booking-details/${id}`)
            .then((res) => {
                const data = res.data;
                console.log('first', data);
                if (data.status === "success") {
                    setIsSuccess(true);
                    setBooking(data.booking);
                } else {
                    console.log('error')
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const RemoveBooking = (id) => {
        api
            .get(`/api/user/remove-booking/${id}`)
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

    const CloseModal = () => {
        setIsSuccess(false);
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <div className='row'>
                        {bookings?.map((place) => {
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
                                                    {place.avg_reviews > 0 ? (<span><span style={{ color: "#23d3d3" }}><i class="la la-star"></i> {place.avg_reviews}</span> ({place.total_reviews} Reviews)</span>) : (<span>No Reviews</span>)}<span className='float-end'><i className={'la '+place.currency_icon}></i>{place.price_range}</span>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <button class="btn btn-success" onClick={() => BookingDeatils(place.id)}>Deatils</button>
                                                    {place.status != 'accepted' ? (<button class="btn btn-danger" onClick={() => RemoveBooking(place.id)}>Cancel</button>) : (<span className='text-success mt-3'>Accepted</span>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>

            <div className="modal fade show" style={{ ...(isSuccess && { display: "block" }) }} id="bookingDetailsModal" tabindex="-1" aria-labelledby="bookingDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="bookingDetailsModalLabel">Booking Details</h5>
                        </div>
                        <div className="modal-body">
                            <h6>Booking Date : {booking.booking_date}</h6>
                            <h6>Booking Time : {booking.booking_time}</h6>
                            <h6>Total Adults : {booking.total_adults}</h6>
                            <h6>Total Childs : {booking.total_childs}</h6>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => CloseModal(true)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings