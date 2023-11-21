import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
//css
import "./style.css";
import { useAuth } from "context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import api from "utility/api";
import loginImg from "../../assets/img/login.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Login() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setLoading(true);
    const url = `/api/auth/login`;
    api
      .post(url, data)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
          }, 1000);
          sessionStorage.setItem("access_token", JSON.stringify(data.token));
          sessionStorage.setItem("user-details", JSON.stringify(data.user));
          setAuth({
            ...auth,
            token: data.token,
            user: data.user,
          });
          setLoading(false);
          navigate(
            (location.state != "/" && location.state) || "/admin/dashboard"
          );
        } else {
          toast.error("Something went wrong! Please check credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="container-fluid login-page">
      <Toaster />
      <div className="card-glass row p-5 w-75 m-auto mt-6">
        <div className="col-md-6 d-none d-md-block border-end">
          <img className="img-fluid" src={loginImg} />
        </div>
        <div className="col-md-6">
          <h1 className="text-center fw-bolder mb-5 text-orange text-griffy">
            Welcome To Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
            <small className="float-end text-danger">
              {errors?.email && "Email is required"}
            </small>
            <MDBInput
              className="my-4"
              type="email"
              {...register("email", { required: true })}
              id="form1Example1"
              label="Email address"
            />
            <small className="float-end text-danger">
              {errors?.password && "Password is required"}
            </small>
            <MDBInput
              className="my-4"
              type="password"
              {...register("password", { required: true })}
              id="form1Example2"
              label="Password"
            />

            <button
              className="btn w-100 text-capitalize text-white bg-orange"
              type="submit"
            >
              Login{" "}
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: "1rem", color: "white" }}
                      spin
                    />
                  }
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
