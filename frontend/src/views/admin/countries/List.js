import React from 'react'
import { Link } from "react-router-dom";
import AddEditCountry from "views/admin/countries/AddEdit.js";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";


function List() {
  return (
    <>
        <div className="content">
        <Row>
          <Col md="12">
            <Card>
                <CardHeader>
                <div className='d-flex justify-content-between'>
                    <CardTitle tag="h5">List</CardTitle>
                    <CardTitle tag="h5">
                      <Link className='me-auto' to={'/admin/add-country'} element={<AddEditCountry />}>Add New</Link>
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

export default List