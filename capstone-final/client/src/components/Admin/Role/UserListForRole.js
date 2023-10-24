import React, { useEffect, useState } from "react";
import "../../../App.css";

function UserListForRole() {
  const [userListData, setUserListData] = useState([]);

  useEffect(() => {
    // Check if the user is authorized (has a valid token)
    const token = localStorage.getItem("token");

    // This obtains a list of users
    fetch("/app/user/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserListData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  // Displays all the users and their details.
  return (
    <div className="list-container-role">
      <div className="user-list-role">
        <h1> Users:</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userListData.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserListForRole;
