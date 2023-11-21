import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import * as BsIcons from "react-icons/bs";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Select } from "antd";
import api from "utility/api";
import apiService from "utility/apiService";
import { useAuth } from "context/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const Option = Select.Option;
const { confirm } = antdModal;

function Profile() {
  const [loading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showForm, setShowForm] = useState();

  const [defaultUser, setDefaultUser] = useState(
    "assets/img/default-avatar.png"
  );
  const [auth, setAuth] = useAuth();

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const selectThumbnailImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
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

  const removeThumImg = () => {
    setAvatarUrl("");
    setValue("avatar", null);
  };

  useEffect(() => {
    fetchProfileData();
  }, [auth]);

  const fetchProfileData = () => {
    if (auth.user?.avatar) {
      setDefaultUser(apiService.ledgerUrl + auth.user?.avatar);
    }
    setValue("avatar", auth.user?.avatar);
    setValue("name", auth.user?.name);
    setValue("email", auth.user?.email);
    setValue("mobile", auth.user?.mobile);
    setValue("facebook", auth.user?.facebook);
    setValue("instagram", auth.user?.instagram);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", data.avatar[0] != null && data.avatar[0]);
    formData.append("name", data.name != null && data.name);
    formData.append("email", data.email != null && data.email);
    formData.append("mobile", data.mobile != null && data.mobile);
    formData.append("facebook", data.facebook != null && data.facebook);
    formData.append("instagram", data.instagram != null && data.instagram);
    const url = `/api/user/update-profile`;
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
            setEditProfile(false);
            setLoading(false);
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
        <div className="card">
          <div className="card-header border-bottom d-flex justify-content-between">
            <p className="text-muted fs-4">Profile</p>
            {!editProfile && (
              <div className="d-flex">
                <p
                  className="btn btn-outline-success mx-4 rounded-pill"
                  onClick={() => {
                    setEditProfile(!editProfile);
                  }}
                >
                  Update Profile
                </p>
                <p
                  className="btn btn-outline-primary mx-4 rounded-pill"
                  onClick={handleShowForm}
                >
                  Change Password
                </p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row card-body">
              <div className="pt-5 col-md-4">
                <div className="text-center position-relative">
                  {avatarUrl ? (
                    <>
                      <BsIcons.BsX
                        className="img-remove-btn"
                        onClick={() => {
                          removeThumImg();
                        }}
                      />
                      <img
                        src={avatarUrl}
                        className="rounded"
                        style={{ height: "120px", maxWidth: "100%" }}
                      />
                    </>
                  ) : (
                    <>
                      {editProfile && (
                        <BsIcons.BsPencil className="position-absolute top-0 end-0" />
                      )}
                      <img
                        className="rounded"
                        src={defaultUser}
                        style={{ height: "120px", maxWidth: "100%" }}
                      />
                    </>
                  )}
                  <input
                    type="file"
                    className="image-input"
                    disabled={!editProfile}
                    {...register("avatar")}
                    accept="image/jpeg, image/jpg, image/png, application/pdf"
                    onChange={selectThumbnailImg}
                  />
                </div>
              </div>
              <div className=" mt-3 col-md-8 border-start">
                <div className="m-2">
                  <div className="d-flex justify-content-start align-items-baseline">
                    <label>Name :</label>
                    <input
                      className={`form-control-sm form-control${
                        !editProfile && "-plaintext"
                      } w-75 ms-2`}
                      readOnly={!editProfile}
                      type="text"
                      {...register("name")}
                      placeholder="What the name of place"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="d-flex justify-content-start align-items-baseline">
                    <label>Email :</label>
                    <input
                      className={`form-control-sm form-control${
                        !editProfile && "-plaintext"
                      } w-75 ms-2`}
                      readOnly={!editProfile}
                      type="email"
                      {...register("email")}
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="d-flex justify-content-start align-items-baseline">
                    <label>Mobile Number :</label>
                    <input
                      className={`form-control-sm form-control${
                        !editProfile && "-plaintext"
                      } w-75 ms-2`}
                      readOnly={!editProfile}
                      type="number"
                      {...register("mobile")}
                      placeholder="Enter Mobile Number"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="d-flex justify-content-start align-items-baseline">
                    <label>Facebook :</label>
                    <input
                      className={`form-control-sm form-control${
                        !editProfile && "-plaintext"
                      } w-75 ms-2`}
                      readOnly={!editProfile}
                      type="text"
                      {...register("facebook")}
                      placeholder="Enter Facebook link"
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="d-flex justify-content-start align-items-baseline">
                    <label>Instagram :</label>
                    <input
                      className={`form-control-sm form-control${
                        !editProfile && "-plaintext"
                      } w-75 ms-2`}
                      readOnly={!editProfile}
                      type="text"
                      {...register("instagram")}
                      placeholder="Enter Instagram link"
                    />
                  </div>
                </div>
              </div>
              {editProfile && (
                <div className="d-flex border-top mt-4 justify-content-end gap-2">
                  <button
                    className="btn btn-outline-primary rounded-pill"
                    type="submit"
                  >
                    Submit{" "}
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
                  <p
                    className="btn btn-outline-warning rounded-pill"
                    onClick={() => {
                      setEditProfile(!editProfile);
                    }}
                  >
                    Cancel
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size="md"
        fade={true}
        centered={true}
      >
        <ModalHeader>Change Password</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted required-field">
                      Old Password
                    </small>
                    <small className="text-danger">
                      {errors?.old_password && "Old Password is required"}
                    </small>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    {...register("old_password", { required: true })}
                    placeholder="Enter Old Password"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted required-field">
                      New Password
                    </small>
                    <small className="text-danger">
                      {errors?.new_password && "New Password is required"}
                    </small>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    {...register("new_password", { required: true })}
                    placeholder="Enter New Password"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex border-top mt-4 justify-content-end gap-3">
              <button
                className="btn btn-outline-primary rounded-pill"
                type="submit"
              >
                Submit
              </button>
              <p
                className="btn btn-outline-danger rounded-pill"
                onClick={handleShowForm}
              >
                Cancel
              </p>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Profile;
