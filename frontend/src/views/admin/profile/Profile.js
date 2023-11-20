import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import * as BsIcons from "react-icons/bs";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Select } from "antd";
import api from "utility/api";
import { Link, useParams } from "react-router-dom";
import apiService from "utility/apiService";

const Option = Select.Option;
const { confirm } = antdModal;

function Profile() {
  const [thumbnailImgUrl, setthumbnailImgUrl] = useState("");

  const selectThumbnailImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setthumbnailImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const removeThumImg = () => {
    setthumbnailImgUrl("");
    setValue("thumb", null);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    let url = `/api/user`;
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.status === "success") {
          const user = data.user;
          setValue("name", user.name);
        } else {
          toast(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("city_id", data.city_id != null && data.city_id);
    const url = `/api/admin/places/save/update`;
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
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
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="12">
            <div className="card">
              <CardHeader className="border-bottom">
                <CardTitle tag="h3">Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="my-2 col-12">
                      <div className="w-50 mx-auto rounded p-2 text-center position-relative">
                        {thumbnailImgUrl ? (
                          <>
                            <BsIcons.BsX
                              className="img-remove-btn"
                              onClick={() => {
                                removeThumImg();
                              }}
                            />
                            <img
                              src={thumbnailImgUrl}
                              className="img-fluid img-thumbnail"
                              style={{ height: "180px", maxWidth: "100%" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                              className="img-fluid img-thumbnail"
                              style={{ height: "120px", maxWidth: "100%" }}
                            />
                          </>
                        )}
                        <input
                          type="file"
                          className="image-input"
                          {...register("thumb")}
                          accept="image/jpeg, image/jpg, image/png, application/pdf"
                          onChange={selectThumbnailImg}
                        />
                      </div>
                    </div>
                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Name</small>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        {...register("name")}
                        placeholder="What the name of place"
                      />
                    </div>

                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Email</small>
                        <small className="text-danger">
                          {errors?.email && "Email is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Phone Number</small>
                        <small className="text-danger">
                          {errors?.phone_number && "Phone Number is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        {...register("phone_number", { required: true })}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="my-2 col-md-12">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Website</small>
                        <small className="text-danger">
                          {errors?.website && "Website is required"}
                        </small>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        {...register("website", { required: true })}
                        placeholder="Enter Website"
                      />
                    </div>

                    <div className="my-2 col-12">
                      <small className="text-muted">Video</small>
                      <input
                        className="form-control"
                        type="text"
                        {...register("video")}
                        placeholder="YouTube, Vimeo video url"
                      />
                    </div>
                    <div className="d-flex border-top mt-4 justify-content-end gap-3">
                      <button
                        className="btn btn-outline-primary rounded-pill"
                        type="submit"
                      >
                        Submit
                      </button>
                      <Link
                        to="/admin/all-place"
                        className="btn btn-outline-danger rounded-pill"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </CardBody>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Profile;
