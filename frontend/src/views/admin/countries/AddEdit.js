import React from 'react'
import { Link } from "react-router-dom";
import Countries from "views/admin/countries/List.js";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

const AddEdit = () => {
  return (
    <>
        <div className="content">
            <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                    <div className='d-flex justify-content-between'>
                        <CardTitle tag="h5">Add</CardTitle>
                        <CardTitle tag="h5">
                            <Link className='me-auto' to={'/admin/countries'} element={<Countries />}>Back</Link>
                        </CardTitle>
                    </div>
                        {/* <p className="card-category">24 Hours performance</p> */}
                    </CardHeader>
                    <CardBody>
                    
                    </CardBody>
                </Card>
            </Col>
            </Row>
      </div>
    </>
  )
}

export default AddEdit