import React from "react";
import loading from "../../assets/img/loading.svg";

const Spinner = ({ height,divHeight }) => {
  
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img src={loading} style={{  height: '150px' }} />
      </div>
    </>
  );
};

export default Spinner;
