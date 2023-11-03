import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="m-5">
        <h1 className="text-center my-5 pt-5 fw-bolder">Oops!</h1>
        <p className="text-center my-5">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-center my-5">
          <h1 className="text-danger">Page Not Found!</h1>
          <span
            className="btn mt-2"
            onClick={() => {
              navigate("..", { relative: "path" });
            }}
          >
            Go back
          </span>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
