import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import * as BiIcons from "react-icons/bi";
import * as CiIcons from "react-icons/ci";
import api from "utility/api";

function Dashboard() {
  const [data, setData] = useState([]);

  const getData = () => {
    api
      .get("/api/admin/dashboard")
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const reviewChartData = {
    labels: data.reviews_chart?.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Reviews",
        borderColor: "#6bd098",
        backgroundColor: "#6bd098",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        data: data.reviews_chart?.map((item) => item.count),
      },
    ],
  };

  const reviewChartOpt = {
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    },
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const bookingChartData = {
    labels: data?.booking_chart
      ? Object.keys(data.booking_chart).map(capitalizeFirstLetter)
      : [],
    datasets: [
      {
        label: "Emails",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ["#fcc468", "#4acccd", "#6bd098", "#ef8157", "#e3e3e3"],
        borderWidth: 0,
        data: data?.booking_chart
          ? Object.values(data.booking_chart)
          : [],
      },
    ],
  };
  const bookingChartOptions = {
    maintainAspectRatio: false,
    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2,
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const userChartData = {
    labels: data.users_chart?.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Users",
        data: data.users_chart?.map((item) => item.count),
        fill: false,
        borderColor: "#fbc658",
        backgroundColor: "transparent",
        pointBorderColor: "#fbc658",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col sm="12">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Welcome to Admin Dashboard</CardTitle>
                <p className="card-category">
                  The Administrator access to manage (delete, edit, create)
                  places, categories, cities, country, manage users, review,
                  booking...
                </p>
              </CardHeader>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <BiIcons.BiSolidCity className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Cities</p>
                      <CardTitle tag="p">{data.cities || 0}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <CiIcons.CiLocationOn className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Places</p>
                      <CardTitle tag="p">{data.places || 0}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <BiIcons.BiCalendarCheck className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Bookings</p>
                      <CardTitle tag="p">{data.bookings || 0}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <BiIcons.BiSolidUserDetail className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Users</p>
                      <CardTitle tag="p">{data.users || 0}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Reviews</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={reviewChartData}
                  options={reviewChartOpt}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Bookings Statistics</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie data={bookingChartData} options={bookingChartOptions} />
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Users</CardTitle>
                <p className="card-category">Users/Months</p>
              </CardHeader>
              <CardBody>
                <Line data={userChartData} width={400} height={100} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
