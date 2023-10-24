import React, { useState } from "react";
import UserListForRole from "./UserListForRole";

function UpdateRole() {
  const token = localStorage.getItem("token");

  const [updateData, setUpdateData] = useState({
    _id: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleRoleUpdate = (e) => {
    e.preventDefault();

    console.log(token);

    const newRole = {
      _id: updateData._id,
      role: updateData.role,
    };

    // Send a POST request to update the specific users role
    fetch(`/app/user/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newRole),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("User updated successfully!");
        window.location.href = `/dashboard/admin/update/role`;
      })
      .catch((error) => {
        window.alert("Error updating the users role!");
        console.error("Error updating the users role:", error);
      });
  };

  const goBackToUser = () => {
    window.location.href = `/dashboard/admin`;
  };

  // The user ID and new Role must be added
  return (
    <div className="role-contianer">
      <div className="role-menu">
        <div className="back-update">
          <button onClick={goBackToUser}>Back</button>
        </div>

        <h3>Update Role</h3>
        <h5>Please complete the following user details:</h5>

        <div className="form">
          <form onSubmit={handleRoleUpdate}>
            <input
              type="text"
              name="_id"
              placeholder="User ID"
              value={updateData._id}
              required
              onChange={handleInputChange}
            />
            <select
              name="role"
              value={updateData.role}
              required
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Normal">Normal</option>
              <option value="Management">Management</option>
              <option value="Admin">Admin</option>
            </select>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
      <div className="list-container">
        <UserListForRole />
      </div>
    </div>
  );
}

export default UpdateRole;
