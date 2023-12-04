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
import NoImg from "assets/img/no-data.gif";
const { confirm } = antdModal;


function Amenities() {
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
      Header: "Image",
      accessor: "icon",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.icon != null ? (
            <img
              style={{ height: "50px", width: "80px" }}
              src={apiService.ledgerUrl + row.original.icon}
            />
          ) : (
            <>
              <img style={{ height: "50px", width: "80px" }} src={NoImg} />
            </>
          )}
        </>
      ),
    },
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
    if (row.original.icon != null) {
      setImageUrl(apiService.ledgerUrl + row.original.icon);
    }
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/amenities/change/status/${id}`, { status: status })
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
    let url = "/api/admin/amenities";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.amenities);
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
    const url = `/api/admin/amenities/save/update`;
    const formData = new FormData();
    formData.append("edited", data.edited != null && data.edited);
    formData.append("name", data.name != null && data.name);
    formData.append("icon", data.icon[0] != null && data.icon[0]);
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
                <CardTitle tag="h4">Amenities List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add amenities"
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
        size="md"
        fade={true}
        centered={true}
      >
        <ModalHeader>
          {getValues("edited") ? "Edit" : "Add"} Amenitie
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("edited")} />
            <div className="row">
              <div className="col-12 my-2">
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
                    {...register("icon")}
                    accept="image/*, application/pdf"
                    onChange={selectImage}
                  />
                  {!imageUrl && (
                    <div>
                      <label className="mt-2">Select Image</label>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted required-field">Amenitie Name</small>
                    <small className="text-danger">
                      {errors?.name && "Amenitie Name is required"}
                    </small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter Amenitie Name"
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

export default Amenities;
