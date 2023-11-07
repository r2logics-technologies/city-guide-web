import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import Table from "components/table/Table";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import api from "utility/api";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "antd";
const { confirm } = Modal;

function List() {
  const [showForm, setShowForm] = useState();

  const handleShowForm = () => {
    setShowForm(!showForm);
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
            <BsIcons.BsToggle2Off
              className="text-success cr-pointer fs-2"
              onClick={() => handleChangeStatus(row.original.id, "deactivated")}
            />
          ) : (
            <BsIcons.BsToggle2On
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
    console.log(row.original);
  };
  const handleChangeStatus = (id, status) => {
    confirm({
      title: "Are you sure?",
      content: `You Want to ${status}`,
      onOk() {
        setTimeout(() => {
          const statusChange = () => {
            api
            .post(`api/admin/countries/change/status/${id}`,{status:status})
            .then((res) => {
              const data = res.data;
              setData(data.countries);
              if (data.status === "success") {
                setTimeout(() => {
                  toast.success(data.message);
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
          }
        }, 2000);
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    let url = "api/admin/countries";
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

  return (
    <>
      <div className="content">
        <Toaster />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <CardTitle tag="h4">Country List </CardTitle>
                <i
                  title="add country"
                  onClick={handleShowForm}
                  className="btn btn-outline-success border-0"
                >
                  <AiIcons.AiOutlinePlus className="fs-2" />
                </i>
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

export default List;
