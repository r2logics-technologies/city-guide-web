import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import Login from "views/auth/Login";
import { AuthProvider } from "./context/auth";
import AdminRoute from "components/routes/AdminRoute";
import WebSite from "layouts/WebSite";
import Signup from "views/auth/Signup";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<WebSite />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route exact path="/admin/*" element={<AdminLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
