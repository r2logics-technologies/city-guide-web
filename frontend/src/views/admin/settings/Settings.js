import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import * as BsIcons from "react-icons/bs";
import { useForm } from "react-hook-form";
import api from "utility/api";
import apiService from "utility/apiService";
import uploadImg from "assets/img/img-upload.png";


function Settings() {
  const [imgUpload, setImgUpload] = useState(uploadImg);
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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const removeThumImg = () => {
    setthumbnailImgUrl("");
    setValue("logo", null);
  };
 
  useEffect(() => {
   fetchData();
  }, []);


  const fetchData = () => {
    let url = `/api/admin/settings`;
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.status === "success") {
          const setting = data.setting;
          setValue("name", setting.name);
          setValue("version", setting.version);
          if (setting.logo != null) {
            setImgUpload(apiService.ledgerUrl + setting.logo);
          }
        } else {
          toast(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (data) => {
    const formData = new FormData();    
    formData.append("name", data.name != null && data.name);
    formData.append("version", data.version != null && data.version);
    formData.append("logo", data.logo != null && data.logo[0]);

    const url = `/api/admin/settings/update`;
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
            <Card>
              <CardHeader className="border-bottom">
                <CardTitle tag="h3">
                  Settings <BsIcons.BsGear />
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="my-2 col-md-4">
                      <div className="p-2 text-center position-relative">
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
                              style={{ height: "120px", maxWidth: "100%" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={imgUpload}
                              style={{ height: "120px", maxWidth: "100%" }}
                            />
                          </>
                        )}
                        <input
                          type="file"
                          className="image-input"
                          {...register("logo")}
                          accept="image/jpeg, image/jpg, image/png, application/pdf"
                          onChange={selectThumbnailImg}
                        />
                        {!thumbnailImgUrl && (
                          <div>
                            <label className="mt-2">
                              Select App Logo 
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="my-2">
                        <div className="d-flex justify-version-between">
                          <small className="text-muted required-field">
                            App Name
                          </small>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          {...register("name")}
                          placeholder="Enter app name"
                        />
                      </div>
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted required-field">
                            App Version
                          </small>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          {...register("version")}
                          placeholder="Enter app version"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex border-top mt-4 justify-content-end gap-3">
                    <button
                      className="btn btn-outline-primary rounded-pill"
                      type="submit"
                    >
                      Update Setting
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Settings;
