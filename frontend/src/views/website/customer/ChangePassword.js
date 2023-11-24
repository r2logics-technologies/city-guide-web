import React, { useEffect, useState } from 'react'
import api from 'utility/api';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const url = `/api/user/change-password`;
        const formData = new FormData();
        formData.append("old_password", data.old_password != null && data.old_password);
        formData.append("new_password", data.new_password != null && data.new_password);
        api
            .post(url, formData)
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    setTimeout(() => {
                        toast.success(data.message);
                    }, 1000);
                    reset()
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label for="old_password" className="form-label">Old Password</label>
                                <input type="password" {...register("old_password", { required: true })} className="form-control" id="old_password" placeholder="Old Password" />
                                <small className="text-danger">
                                    {errors?.old_password && "Old password is required"}
                                </small>
                            </div>
                            <div className='mt-2'>
                                <label for="new_password" className="form-label">New Password</label>
                                <input type="password" {...register("new_password", { required: true })} className="form-control" id="new_password" placeholder="New Password" />
                                <small className="text-danger">
                                    {errors?.new_password && "New Password is required"}
                                </small>
                            </div>
                            <div className='mt-2'>
                                <label for="confirm_password" className="form-label">Confirm Password</label>
                                <input type="password" {...register("confirm_password", { required: true })} className="form-control" id="confirm_password" placeholder="Confirm Password" />
                                <small className="text-danger">
                                    {errors?.confirm_password && "Confirm Password is required"}
                                    {watch('new_password') !== watch('confirm_password') && (
                                        <p>Passwords do not match</p>
                                    )}
                                </small>
                            </div>
                            <div className="field-submit text-center">
                                <input type="submit" className="btn" value="Update" name="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword