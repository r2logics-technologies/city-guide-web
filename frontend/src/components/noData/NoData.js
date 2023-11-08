import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loading from "../../assets/img/no-data.gif";

const NoData = ({ height,divHeight }) => {
  
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img src={loading} style={{ height:"150px" }} />
        <p className="text-center">No Data!</p>
      </div>
    </>
  );
};

export default NoData;
