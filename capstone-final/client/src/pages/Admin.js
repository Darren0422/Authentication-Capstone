import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminMenu from "../components/Admin/AdminMenu";
import UpdateRole from "../components/Admin/Role/UpdateRole";
import UpdateOU from "../components/Admin/OU/UpdateOU";
import UpdateDivision from "../components/Admin/Division/UpdateDivision";

function Admin() {
  useEffect(() => {
    // Check if the user is authorized (has a valid token)
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const goBackToDash = () => {
    window.location.href = `/dashboard`;
  };

  return (
    <div className="userprofile">
      <h1> Manage Users</h1>

      <div className="back">
        <button onClick={goBackToDash}>Dashboard</button>
      </div>

      <div className="admin-nav">
        <Routes>
          <Route path="/" element={<AdminMenu />} />
          <Route path="/update/role" element={<UpdateRole />} />
          <Route path="/update/ou/*" element={<UpdateOU />} />
          <Route path="/update/division/*" element={<UpdateDivision />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
