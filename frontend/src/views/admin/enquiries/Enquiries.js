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
import { Modal as antdModal } from "antd";
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import apiService from "utility/apiService";
const { confirm } = antdModal;

function Enquiries() {

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([
    {
      Header: "First Name",
      accessor: "first_name",
      sortType: "alphanumeric",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      sortType: "alphanumeric",
    },
    {
      Header: "Email",
      accessor: "email",
      sortType: "alphanumeric",
    },
    {
      Header: "Message",
      accessor: "message",
      sortType: "alphanumeric",
    },
    {
      Header: "Mark as Read",
      accessor: "status",
      disableSortBy: true,
      Cell: ({ row }) => (
        <>
          {row.original.status === "activated" ? (
            <BsIcons.BsToggle2Off
              className="text-danger cr-pointer fs-2"
              onClick={() => handleChangeStatus(row.original.id, "deactivated", "mark as read")}
            />
          ):(
            <BsIcons.BsCheck2All
              className="text-success fs-2"
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
          <AiIcons.AiOutlineDelete
            className="text-danger cr-pointer fs-4"
            onClick={() => handleChangeStatus(row.original.id, "deleted", "deleted")}
          />
        </div>
      ),
    },
  ]);

  const fetchData = () => {
    let url = "/api/admin/pages/contacts";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.contacts);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  const statusChange = (id, status, msg) => {
    api
      .post(`/api/admin/pages/contacts/status/${id}`, { status: status })
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
            fetchData();
          setTimeout(() => {
            toast.success(`Successfully ${msg}.`);
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

  const handleChangeStatus = (id, status, msg) => {
    confirm({
      title: "Are you sure?",
      content: `You Want to ${msg}`,
      onOk() {
        setTimeout(() => {
          statusChange(id, status, msg);
        }, 2000);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Enquiries List </CardTitle>
              </CardHeader>
              <CardBody>
                <Table data={data} header={header} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Enquiries;
