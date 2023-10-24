import React from "react";
import { Route, Routes } from "react-router-dom";
import UserListForOU from "../OU/UserListForOU";
import DivisionMenu from "./DivisionMenu";
import AssignDivision from "./AssignDivision";
import DeassignDivision from "./DeassignDivision";

function UpdateDivision() {
  // Menu to navigate Division pages
  return (
    <div>
      <div className="role-nav">
        <Routes>
          <Route path="/" element={<DivisionMenu />} />
          <Route path="/assign" element={<AssignDivision />} />
          <Route path="/deassign" element={<DeassignDivision />} />
        </Routes>
      </div>

      <div className="ou-user-list">
        <UserListForOU />
      </div>
    </div>
  );
}

export default UpdateDivision;
