import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./styles/main-style.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/auth/Login";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "components/routes/Private";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminLayout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
