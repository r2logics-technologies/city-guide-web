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
import apiService from "utility/apiService";
import NoImg from "assets/img/no-data.gif";
const { confirm } = antdModal;

function Users() {
  const [showDetails, setShowDetails] = useState();
  const [booking, setBooking] = useState(null);
  const handleShowForm = () => {
    setShowDetails(!showDetails);
    setBooking(null);
  };

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "Avatar",
      accessor: "avatar",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.avatar != null ? (
            <img
              style={{ height: "50px", width: "80px" }}
              src={apiService.ledgerUrl + row.original.avatar}
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
      Header: "Email",
      accessor: "email",
      sortType: "alphanumeric",
    },
    {
      Header: "mobile",
      accessor: "mobile",
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
    // {
    //   Header: "Is Admin",
    //   accessor: "user_type",
    //   disableSortBy: true,
    //   Cell: ({ row }) => (
    //     <>
    //       {row.original.user_type == "admin" ? (
    //         <BsIcons.BsToggle2On
    //           className="text-success cr-pointer fs-2"
    //           onClick={() => handleChangeType(row.original.id, "customer")}
    //         />
    //       ) : (
    //         <BsIcons.BsToggle2Off
    //           className="text-danger cr-pointer fs-2"
    //           onClick={() => handleChangeType(row.original.id, "admin")}
    //         />
    //       )}
    //     </>
    //   ),
    // },
    {
      Header: "Created At",
      accessor: "created_at",
      sortType: "alphanumeric",
    },
  ]);

  const handleDetail = (row) => {
    handleShowForm();
    setBooking(row.original);
  };
  console.log(booking);
  const statusChange = (id, status) => {
    api
      .post(`/api/admin/users/change/status/${id}`, { status: status })
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
  const typeChange = (id, type) => {
    api
      .post(`/api/admin/users/change/type/${id}`, { user_type: type })
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(data.message);
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
      content: `You want to ${status}`,
      onOk() {
        setTimeout(() => {
          statusChange(id, status);
        }, 2000);
      },
      onCancel() {},
    });
  };

  const handleChangeType = (id, type) => {
    confirm({
      title: "Are you sure?",
      content: `You want to Make ${type}`,
      onOk() {
        setTimeout(() => {
          typeChange(id, type);
        }, 2000);
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    let url = "/api/admin/users";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.users);
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
  const closeBtn = (
    <AiIcons.AiOutlineCloseCircle
      className="cr-pointer fs-4"
      onClick={handleShowForm}
    />
  );
  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4" className="border-bottom">Users List </CardTitle>
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
        isOpen={showDetails}
        toggle={handleShowForm}
        size="md"
        fade={true}
        centered={true}
      >
        <ModalHeader close={closeBtn}>Booking Details</ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className="table table-bordered">
              <tr>
                <th>Name:</th>
                <td>{booking?.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{booking?.email}</td>
              </tr>
              <tr>
                <th>Mobile:</th>
                <td>{booking?.mobile}</td>
              </tr>
              <tr>
                <th>Booking Place:</th>
                <td>{booking?.place}</td>
              </tr>
              <tr>
                <th>Number of Adults:</th>
                <td>{booking?.adults}</td>
              </tr>
              <tr>
                <th>Number of Children:</th>
                <td>{booking?.childs}</td>
              </tr>

              <tr>
                <th>Booking Date:</th>
                <td>{booking?.booking_date}</td>
              </tr>
              <tr>
                <th>Booking Time:</th>
                <td>{booking?.booking_time}</td>
              </tr>
              <tr>
                <th>Booking At:</th>
                <td>{booking?.booking_at}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>{booking?.status}</td>
              </tr>
              <tr>
                <th>Message:</th>
                <td>{booking?.message}</td>
              </tr>
            </table>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Users;
