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

function Categories() {
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
      Header: "Icon",
      accessor: "icon_map_marker",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.icon_map_marker != null ? (
            <img
              style={{ height: "50px", width: "80px" }}
              src={apiService.ledgerUrl + row.original.icon_map_marker}
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
      Header: "Priority",
      accessor: "priority",
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

  const handleEdit = (row) => {
    handleShowForm();
    setValue("edited", row.original.id);
    setValue("name", row.original.name != null ? row.original.name : "");
    setValue("priority", row.original.priority != null ? row.original.priority : "");
    setValue("feature_title", row.original.feature_title != null ? row.original.feature_title : "");
    if (row.original.icon_map_marker != null) {
      setImageUrl(apiService.ledgerUrl + row.original.icon_map_marker);
    }
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/categories/change/status/${id}`, { status: status })
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
    let url = "/api/admin/categories";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.categories);
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
    const url = `/api/admin/categories/save/update`;
    const formData = new FormData();
    formData.append("edited", data.name != null && data.edited);
    formData.append("name", data.name != null && data.name);
    formData.append("priority", data.priority != null && data.priority);
    formData.append("feature_title", data.feature_title != null && data.feature_title);
    formData.append(
      "icon_map_marker",
      data.icon_map_marker[0] != null && data.icon_map_marker[0]
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
                <CardTitle tag="h4" className="border-bottom">Categories List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add Categories"
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
          {getValues("edited") ? "Edit" : "Add"} Category
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("edited")} />
            <div className="row">
              <div className="col-md-6 my-2">
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
                    {...register("icon_map_marker")}
                    accept="image/jpeg, image/jpg, image/png, application/pdf"
                    onChange={selectImage}
                  />
                  {!imageUrl && (
                    <div>
                      <label className="mt-2"> Select Map Icon</label>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted required-field">Category Name</small>
                    <small className="text-danger">
                      {errors?.name && "Category Name is required"}
                    </small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter Category Name"
                  />
                </div>
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Priority</small>
                  </div>
                  <input
                    className="form-control"
                    type="number"
                    {...register("priority")}
                    placeholder="Enter Priority"
                  />
                </div>
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Feature Title</small>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    {...register("feature_title")}
                    placeholder="Enter Feature Title"
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

export default Categories;
