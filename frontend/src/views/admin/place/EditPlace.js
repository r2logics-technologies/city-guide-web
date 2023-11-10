import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import toast, { Toaster } from "react-hot-toast";
import { Modal as antdModal } from "antd";
const { confirm } = antdModal;

function EditPlace() {
  return (
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Edit Place </CardTitle>
               
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditPlace;
