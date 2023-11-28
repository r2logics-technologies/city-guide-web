import React from 'react';
import api from 'utility/api';
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { contact_bg } from 'assets/website/img'

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = `/api/website/contact`;
    const formData = new FormData();
    formData.append("first_name", data.first_name != null && data.first_name);
    formData.append("last_name", data.last_name != null && data.last_name);
    formData.append("email", data.email != null && data.email);
    formData.append("message", data.message != null && data.message);
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
    <div>
      <Toaster />
      <div class="page-title page-title--small align-left" style={{ backgroundImage: `url(${contact_bg})` }}>
        <div class="container">
          <div class="page-title__content">
            <h1 class="page-title__name">Contact Us</h1>
            <p class="page-title__slogan">We want to hear from you.</p>
          </div>
        </div>
      </div>
      <div class="site-content site-contact">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="contact-text">
                <h2>Our Offices</h2>
                <div class="contact-box">
                  <h3>London (HQ)</h3>
                  <p>Unit TAP.E, 80 Long Lane, London, SE1 4GT</p>
                  <p>+44 (0)34 5312 3505</p>
                  <a href="#" title="Get Direction">Get Direction</a>
                </div>
                <div class="contact-box">
                  <h3>Paris</h3>
                  <p>Station F, 2 Parvis Alan Turing, 8742, Paris France</p>
                  <p>+44 (0)34 5312 3505</p>
                  <a href="#" title="Get Direction">Get Direction</a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="contact-form">
                <h2>Get in touch with us</h2>
                <form onSubmit={handleSubmit(onSubmit)} class="form-underline">
                  <div class="field-inline">
                    <div class="field-input">
                      <input type="text" {...register("first_name", { required: true })} name="first_name" placeholder="First Name" />
                      <small className="text-danger">
                        {errors?.first_name && "First name is required"}
                      </small>
                    </div>
                    <div class="field-input">
                      <input type="text" {...register("last_name")} name="last_name" placeholder="Last Name" />
                    </div>
                  </div>
                  <div class="field-input">
                    <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" />
                    <small className="text-danger">
                      {errors?.email && "Email is required"}
                    </small>
                  </div>
                  <div class="field-textarea">
                    <textarea name="message" {...register("message", { required: true })} placeholder="Message"></textarea>
                    <small className="text-danger">
                      {errors?.message && "Message is required"}
                    </small>
                  </div>
                  <div class="field-submit">
                    <input type="submit" value="Send Message" class="btn" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact