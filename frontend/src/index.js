import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import Login from "views/auth/Login";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "components/routes/Private";
import WebSite from "layouts/WebSite";
import ErrorPage from "components/error-page/ErrorPage";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<WebSite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route exact path="/admin/*" element={<AdminLayout />} />
          </Route>
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
