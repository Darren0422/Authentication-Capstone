import React from "react";
import { Route, Routes } from "react-router-dom";
import UserListForOU from "./UserListForOU";
import OUMenu from "./OUMenu";
import AssignOU from "./AssignOU";
import DeassignOU from "./DeassignOU";

function UpdateOU() {
  // Menu to navigate OU pages
  return (
    <div>
      <div className="role-nav">
        <Routes>
          <Route path="/" element={<OUMenu />} />
          <Route path="/assign" element={<AssignOU />} />
          <Route path="/deassign" element={<DeassignOU />} />
        </Routes>
      </div>

      <div className="ou-user-list">
        <UserListForOU />
      </div>
    </div>
  );
}

export default UpdateOU;
