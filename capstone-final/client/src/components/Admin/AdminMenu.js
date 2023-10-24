import React from "react";

function AdminMenu() {
  // Menu to navigate update a users Role, OU or Division
  return (
    <div className="Admin-menu">
      <h2>Admin Menu</h2>
      <nav>
        <ul>
          <li>
            <a href={`/dashboard/admin/update/role`}>Update Role</a>
          </li>
          <li>
            <a href={`/dashboard/admin/update/ou`}>Update OU</a>
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
