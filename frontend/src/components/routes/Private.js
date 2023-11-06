import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { useAuth } from "context/auth";
import api from "utility/api";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = () => {
      api
        .get("api/admin/login-check")
        .then((res) => {
          if (res.data.status === "success") {
            setOk(true);
          } else {
            setOk(false);
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("user-details");
            setAuth({
              ...auth,
              user: null,
              token: "",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
