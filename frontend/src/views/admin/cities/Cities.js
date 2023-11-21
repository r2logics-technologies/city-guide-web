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
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import uploadImg from "../../../assets/img/img-upload.png";
import apiService from "utility/apiService";
const Option = Select.Option;
const { confirm } = antdModal;

function Cities() {
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
    control,
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
  const [countries, setCountries] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "City Name",
      accessor: "name",
      sortType: "alphanumeric",
    },
    {
      Header: "Country Name",
      accessor: "country_name",
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
    setValue("name", row.original.name);
    setValue("country_id", row.original.country_id);
    if (row.original?.thumb != null) {
      setImageUrl(apiService.ledgerUrl + row.original?.thumb);
    }
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/cities/change/status/${id}`, { status: status })
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

  const fetchCountryData = () => {
    let url = "/api/admin/countries";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCountries(data.countries);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchData = () => {
    let url = "/api/admin/cities";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.cities);
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
    fetchCountryData();
  }, []);

  const onSubmit = async (data) => {
    const url = `/api/admin/cities/save/update`;
    const formData = new FormData();
    formData.append("edited", data.edited != null && data.edited);
    formData.append("country_id", data.country_id != null && data.country_id);
    formData.append("name", data.name != null && data.name);
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

  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Cities List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add city"
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
        <ModalHeader>{getValues("edited") ? "Edit" : "Add"} City</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("edited")} />
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
                  {...register("thumb")}
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
            <div className="my-2">
              <div className="d-flex justify-content-between">
                <small className="text-muted required-field">Country</small>
                <small className="text-danger">
                  {errors?.country_id && "Country is required"}
                </small>
              </div>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="w-100"
                    placeholder="Select Country"
                    {...field}
                  >
                    {countries.map((country) => (
                      <Option key={country.id} value={country.id}>
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between">
                <small className="text-muted required-field">City Name</small>
                <small className="text-danger">
                  {errors?.name && "City Name is required"}
                </small>
              </div>
              <input
                className="form-control"
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter City Name"
              />
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

export default Cities;
