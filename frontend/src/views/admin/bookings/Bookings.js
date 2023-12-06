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
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";

const { confirm } = antdModal;

function Bookings() {
  const [showDetails, setShowDetails] = useState();
  const [booking, setBooking] = useState(null);
  const handleShowForm = () => {
    setShowDetails(!showDetails);
    setBooking(null);
  };

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "Name",
      accessor: "name",
      sortType: "alphanumeric",
    },
    {
      Header: "Place",
      accessor: "place",
      sortType: "alphanumeric",
    },
    {
      Header: "Booking at",
      accessor: "booking_at",
      sortType: "alphanumeric",
    },
    {
      Header: "Status",
      accessor: "status",
      sortType: "alphanumeric",
    },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="d-flex justify-content-start align-items-center gap-2">
          <div className="d-flex justify-content-start gap-3">
            <AiIcons.AiOutlineEye
              className="text-info cr-pointer fs-4"
              onClick={() => handleDetail(row)}
            />
          </div>
          {row.original.status == "pending" ? (
            <>
              <div className="d-flex justify-content-start gap-3">
                <AiIcons.AiOutlineCheck
                  className="text-success cr-pointer fs-4"
                  onClick={() =>
                    handleChangeStatus(row.original.id, "accepted")
                  }
                />
              </div>
              <div className="d-flex justify-content-start gap-3">
                <AiIcons.AiOutlineClose
                  className="text-danger cr-pointer fs-4"
                  onClick={() =>
                    handleChangeStatus(row.original.id, "rejected")
                  }
                />
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-start gap-3">
              <AiIcons.AiOutlineDelete
                className="text-danger cr-pointer fs-4"
                onClick={() => handleChangeStatus(row.original.id, "deleted")}
              />
            </div>
          )}
        </div>
      ),
    },
  ]);

  const handleDetail = (row) => {
    handleShowForm();
    setBooking(row.original);
  };
  console.log(booking);
  const statusChange = (id, status) => {
    api
      .post(`/api/admin/bookings/change/status/${id}`, { status: status })
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setTimeout(() => {
            toast.success(
              `Successfully ${
                status == "accepted" ? "accepted." : status == "deleted" ? "deleted." : "cancelled."
              }.`
            );
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
      content: `You want to ${
        status == "activated" ? "accept this booking." : status == "deleted" ? "delete this booking." : "cancel this booking."
      }`,
      onOk() {
        setTimeout(() => {
          statusChange(id, status);
        }, 2000);
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    let url = "/api/admin/bookings";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.bookings);
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
                <CardTitle tag="h4">Bookings List </CardTitle>
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

export default Bookings;
