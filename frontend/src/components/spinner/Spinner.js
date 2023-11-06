import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loading from "../../assets/img/loading.gif";

const Spinner = ({ path = "/login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0)
      navigate(`${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <img src={loading} style={{ color: "#36d7b7", minHeight:"3rem" }} />
      </div>
    </>
  );
};

export default Spinner;
