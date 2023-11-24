import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import { Link, useNavigate } from 'react-router-dom';
import apiService from 'utility/apiService';

const Dashboard = () => {

    const [customer, setProfile] = useState([]);
    const [total_booking, setTotalBooking] = useState([]);
    const [total_wishlist, setTotalWishlist] = useState([]);

    const fetchData = () => {
        let url = "/api/user";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setProfile(data.profile);
                    setTotalBooking(data.bookings_count);
                    setTotalWishlist(data.wishlists_count);
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
            <div className="row gutters-sm">
                <div className="col-sm-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="d-flex align-items-center">Total Bookings</h6>
                            <h5 className="d-flex align-items-center">{total_booking}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h6 className="d-flex align-items-center">Total Wishlists</h6>
                            <h5 className="d-flex align-items-center">{total_wishlist}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard