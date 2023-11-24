import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import apiService from 'utility/apiService';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const [customer, setProfile] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const selectImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const fetchData = () => {
        let url = "/api/user";
        api
            .get(url)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setProfile(data.profile);
                    setValue('name', data.profile.name);
                    setValue('email', data.profile.email);
                    setValue('mobile', data.profile.mobile);
                    setValue('address', data.profile.address);
                } else {
                    console.log('error', data.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const EditModal = () => {
        setIsSuccess(true);
    }

    const CloseModal = () => {
        setIsSuccess(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const url = `/api/user/update-profile`;
        const formData = new FormData();
        formData.append("name", data.name != null && data.name);
        formData.append("avatar", data.avatar[0] != null && data.avatar[0]);
        formData.append("email", data.email != null && data.email);
        formData.append("mobile", data.mobile != null && data.mobile);
        formData.append("address", data.address != null && data.address);
        api
            .post(url, formData)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setIsSuccess(false);
                    fetchData();
                    setTimeout(() => {
                        toast.success(data.message);
                    }, 1000);
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
        <div>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {customer.name}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {customer.email}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Mobile</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {customer.country_code} {customer.mobile}
                            </div>
                        </div>
                        <hr />
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Address</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {customer.address}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-info" onClick={() => EditModal(true)}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade show" style={{ ...(isSuccess && { display: "block" }) }} id="bookingDetailsModal" tabindex="-1" aria-labelledby="bookingDetailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="bookingDetailsModalLabel">Update Profile</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label for="name" className="form-label">Name</label>
                                        <input type="text" {...register("name", { required: true })} className="form-control" id="name" placeholder="Name" />
                                        <small className="text-danger">
                                            {errors?.name && "Name is required"}
                                        </small>
                                    </div>
                                    <div className='mt-2'>
                                        <label for="image" className="form-label">Image</label>
                                        <input type="file" {...register("avatar")} accept="image/*" onChange={selectImage} className="form-control" id="image" />
                                    </div>
                                    <div className='mt-2'>
                                        <label for="email" className="form-label">Email</label>
                                        <input type="email" {...register("email", { required: true })} className="form-control" id="email" placeholder="Email" />
                                        <small className="text-danger">
                                            {errors?.email && "Email is required"}
                                        </small>
                                    </div>
                                    <div className='mt-2'>
                                        <label for="mobile" className="form-label">Mobile</label>
                                        <input type="text" {...register("mobile", { required: true })} className="form-control" id="mobile" placeholder="Mobile No." />
                                        <small className="text-danger">
                                            {errors?.mobile && "Mobile is required"}
                                        </small>
                                    </div>
                                    <div className='mt-2'>
                                        <label for="address" className="form-label">Address</label>
                                        <textarea {...register("address")} className="form-control" id="address" placeholder='Address'>{customer.address}</textarea>
                                    </div>
                                    <div className="field-submit text-center">
                                        <input type="submit" className="btn" value="Update" name="submit" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => CloseModal(true)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile