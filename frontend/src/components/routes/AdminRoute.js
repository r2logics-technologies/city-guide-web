import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { useAuth } from "context/auth";
import api from "utility/api";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = () => {
      api
        .get("/api/admin/login-check")
        .then((res) => {
          if (res.data.status === "success") {
            if (auth.user && auth.user.user_type === "admin") {
               setOk(true); 
            }
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
