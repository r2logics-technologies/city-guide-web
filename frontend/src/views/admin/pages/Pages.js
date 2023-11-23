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
import { useForm, Controller } from "react-hook-form";
import apiService from "utility/apiService";
import NoImg from "assets/img/no-data.gif";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { confirm } = antdModal;

function Pages() {
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
    control,
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
      accessor: "thumb",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.thumb != null ? (
            <img
              style={{ height: "50px", width: "80px" }}
              src={apiService.ledgerUrl + row.original.thumb}
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
      Header: "Title",
      accessor: "title",
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
    setValue("title", row.original.title != null ? row.original.title : "");
    setValue("content", row.original.content != null ? row.original.content : "");
    if (row.original.thumb != null) {
      setImageUrl(apiService.ledgerUrl + row.original.thumb);
    }
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/pages/change/status/${id}`, { status: status })
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
    let url = "/api/admin/pages";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.pages);
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
    const url = `/api/admin/pages/save/update`;
    const formData = new FormData();
    formData.append("edited", data.edited != null && data.edited);
    formData.append("title", data.title != null && data.title);
    formData.append("content", data.content != null && data.content);
    formData.append("thumb", data.thumb[0] != null && data.thumb[0]);
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
  // Define your custom toolbar options
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ script: "sub" }, { script: "super" }],
  ];

  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Pages List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add pages"
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
          {getValues("edited") ? "Edit" : "Add"} Page
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
                    {...register("thumb")}
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
              <div className="col-md-8">
                <div className="col-12">
                  <div className="my-2">
                    <div className="d-flex justify-content-between">
                      <small className="text-muted required-field">Title</small>
                      <small className="text-danger">
                        {errors?.title && "Title is required"}
                      </small>
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Enter Title"
                    />
                  </div>
                </div>
                <div className="my-2">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Content</small>
                    <small className="text-danger">
                      {errors?.content && "Content is required"}
                    </small>
                  </div>
                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <ReactQuill
                        className="border rounded"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                      />
                    )}
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

export default Pages;
