import React from "react";

function AdminMenu() {
  // Menu to navigate update a users Role, OU or Division
  return (
    <div className="Admin-menu">
      <nav>
        <ul>
          <li>
            <a href={`/dashboard/admin/update/role`}>Update Role</a>
          </li>
          <li>
            <a href={`/dashboard/admin/update/ou`}>Update Organisational Unit</a>
          </li>
          <li>
            <a href={`/dashboard/admin/update/division`}>Update Division</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminMenu;
