import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import apiService from 'utility/apiService';
import { useForm } from 'react-hook-form';
import { Link, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Dashboard from './Dashboard';
import Profile from './Profile';
import Wishlists from './Wishlists';
import Bookings from './Bookings';
import ChangePassword from './ChangePassword';

const Index = () => {
    const [customer, setProfile] = useState([]);

    const fetchData = () => {
        let url = "/api/user";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setProfile(data.profile);
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
            <div className="container-fluid">
                <Toaster />
                <div className="main-body customer-profile px-5">
                    <div className="row gutters-sm">
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={apiService.ledgerUrl + customer.avatar} alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{customer.name}</h4>
                                            <p className="text-secondary mb-1">{customer.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <Link to={'/customer/dashboard'} className="mb-0"><i class="las la-home"></i> Dashboard</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <Link to={'/customer/profile'} className="mb-0"><i class="las la-user"></i> Profile</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <Link to={'/customer/change-password'} className="mb-0"><i class="las la-lock"></i> Change Password</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <Link to={'/customer/bookings'} className="mb-0"><i class="las la-map-marker"></i> Bookings</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <Link to={'/customer/wishlists'} className="mb-0"><i class="las la-bookmark"></i> Wishlists</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <Routes>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/change-password' element={<ChangePassword />} />
                                <Route path='/wishlists' element={<Wishlists />} />
                                <Route path='/bookings' element={<Bookings />} />
                            </Routes>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Index