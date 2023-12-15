import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import Table from "components/table/Table";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiService from "utility/apiService";
import NoImg from "assets/img/no-data.gif";

const { confirm } = antdModal;

function ListBlog() {
  const navigate = useNavigate();
  const location = useLocation();
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
      Header: "Category",
      accessor: "category",
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
            onClick={() => handleEdit(row.original.id)}
          />
          <AiIcons.AiOutlineDelete
            className="text-danger cr-pointer fs-4"
            onClick={() => handleChangeStatus(row.original.id, "deleted")}
          />
        </div>
      ),
    },
  ]);

  const handleEdit = (id) => {
    navigate("/admin/edit-blog/" + id);
  };

  const statusChange = (id, status) => {
    api
      .post(`/api/admin/posts/change/status/${id}`, { status: status })
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
    let url = "/api/admin/posts";
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.posts);
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

  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4" className="border-bottom">All Posts </CardTitle>
                <Link to="/admin/create-blog">
                  <BsIcons.BsPlusCircle
                    title="add blog"
                    className="text-success fs-3 cr-pointer"
                  />
                </Link>
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

export default ListBlog;
