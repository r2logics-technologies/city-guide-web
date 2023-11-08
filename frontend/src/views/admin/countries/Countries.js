import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import Table from "components/table/Table";
import uploadImg from "../../../assets/img/img-upload.png";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import { useForm } from "react-hook-form";
import apiService from "utility/apiService";
const { confirm } = antdModal;

function Countries() {
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
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState();
  const handleShowForm = () => {
    setShowForm(!showForm);
    reset();
    setImageUrl("");
  };

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "Name",
      accessor: "name",
      sortType: "alphanumeric",
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.status === "activated" ? (
            <BsIcons.BsToggle2On
              className="text-success cr-pointer fs-2"
              onClick={() => handleChangeStatus(row.original.id, "deactivated")}
            />
          ) : (
            <BsIcons.BsToggle2Off
              className="text-danger cr-pointer fs-2"
              onClick={() => handleChangeStatus(row.original.id, "activated")}
            />
          )}
        </>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="d-flex justify-content-start gap-3">
          <AiIcons.AiOutlineEdit
            className="text-info cr-pointer fs-4"
            onClick={() => handleEdit(row)}
          />
          <AiIcons.AiOutlineDelete
            className="text-danger cr-pointer fs-4"
            onClick={() => handleChangeStatus(row.original.id, "deleted")}
          />
        </div>
      ),
    },
  ]);

  // Custom function to validate and process the uploaded image
  const beforeUpload = (file) => {
    return true;
  };

  const handleEdit = (row) => {
    handleShowForm();
    setValue("edited", row.original.id);
    setValue("name", row.original.name != null ? row.original.name : "");
    setValue(
      "seo_title",
      row.original.seo_title != null ? row.original.seo_title : ""
    );
    setValue(
      "seo_description",
      row.original.seo_description != null ? row.original.seo_description : ""
    );
    if (row.original.seo_cover_image != null) {
      setImageUrl(apiService.ledgerUrl + row.original.seo_cover_image);
    }
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/countries/change/status/${id}`, { status: status })
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(`Successfully ${status}.`);
            fetchData();
          }, 1000);
        } else {
          setTimeout(() => {
            toast.error(data.message);
          }, 1000);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  const handleChangeStatus = (id, status) => {
    confirm({
      title: "Are you sure?",
      content: `You Want to ${status}`,
      onOk() {
        setTimeout(() => {
          statusChange(id, status);
        }, 2000);
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    let url = "/api/admin/countries";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.countries);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const url = `/api/admin/countries/save/update`;
    const formData = new FormData();
    formData.append("edited", data.name != null && data.edited);
    formData.append("name", data.name != null && data.name);
    formData.append(
      "seo_description",
      data.seo_description != null && data.seo_description
    );
    formData.append("seo_title", data.seo_title != null && data.seo_title);
    formData.append(
      "seo_cover_image",
      data.seo_cover_image[0] != null && data.seo_cover_image[0]
    );
    api
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
            handleShowForm();
            fetchData();
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
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Country List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add country"
                  onClick={handleShowForm}
                  className="text-success fs-3 cr-pointer"
                />
              </CardHeader>
              <CardBody>
                <Table data={data} header={header} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        toggle={handleShowForm}
        size="lg"
        fade={true}
        centered={true}
      >
        <ModalHeader>
          {getValues("edited") ? "Edit" : "Add"} Country
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("edited")} />
            <div className="row">
              <div className="col-md-4 my-2">
                <div className="border rounded p-2 text-center position-relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      style={{ height: "120px", maxWidth: "100%" }}
                    />
                  ) : (
                    <img
                      src={uploadImg}
                      style={{ height: "120px", maxWidth: "100%" }}
                    />
                  )}
                  <input
                    type="file"
                    className="image-input"
                    {...register("seo_cover_image")}
                    accept="image/jpeg, image/jpg, image/png, application/pdf"
                    onChange={selectImage}
                  />
                  {!imageUrl && (
                    <div>
                      <label className="mt-2">Select Image</label>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted required-field">Country Name</small>
                    <small className="text-danger">
                      {errors?.name && "Country Name is required"}
                    </small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter Country Name"
                  />
                </div>
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Seo Title</small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("seo_title")}
                    placeholder="Enter Seo Title"
                  />
                </div>
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Seo Description</small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("seo_description")}
                    placeholder="Enter Seo Title"
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

export default Countries;
