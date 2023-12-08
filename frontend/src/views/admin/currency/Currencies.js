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
import { MDBInput } from "mdb-react-ui-kit";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";

const Option = Select.Option;
const { confirm } = antdModal;

function Currencies() {
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
  };

  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "Title",
      accessor: "title",
      sortType: "alphanumeric",
    },
    {
      Header: "Country",
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
    setValue("title", row.original.title);
    setValue("country_id", row.original.country_id);
    setValue("currency_icon", row.original.currency_icon);
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/currencies/change/status/${id}`, { status: status })
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
    let url = "/api/admin/currencies";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.currencies);
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
    console.log("object", data);
    const url = `/api/admin/currencies/save/update`;
    api
      .post(url, data)
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
                <CardTitle tag="h4">Currencies List </CardTitle>
                <BsIcons.BsPlusCircle
                  title="add place type"
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
          {getValues("edited") ? "Edit" : "Add"} Currency
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("edited")} />
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
                <small className="text-muted required-field">
                  Title
                </small>
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
            <div className="my-2">
              <div className="d-flex justify-content-between">
                <small className="text-muted required-field">
                  Icon
                </small>
                <small className="text-danger">
                  {errors?.currency_icon && "Icon is required"}
                </small>
              </div>
              <input
                className="form-control"
                type="text"
                {...register("currency_icon", { required: true })}
                placeholder="Enter Icon"
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

export default Currencies;
