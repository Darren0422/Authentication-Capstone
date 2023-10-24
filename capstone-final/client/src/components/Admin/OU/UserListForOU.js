import React, { useEffect, useState } from "react";
import "../../../App.css";

function UserListForOU() {
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
  // Includes OU and Division details of each user
  return (
    <div className="list-container">
      <div className="user-list">
        <h1> Users:</h1>
        {userListData.map((user, index) => (
          <div key={index}>
            <div className="spacer"> </div>
            <table>
              <thead>
                <tr>
                  <th>User ID:</th>
                  <th>Username:</th>
                  <th>Name:</th>
                  <th>Surname:</th>
                  <th>Role:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
            {user.organisationalUnits.map((orgUnit, orgIndex) => (
              <div key={orgIndex}>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Organisational Unit:</strong>{" "}
                        {orgUnit.unit && orgUnit.unit.orgUnitName}
                      </td>
                      <td>
                        <strong>ID:</strong> {orgUnit.unit && orgUnit.unit._id}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {orgUnit.divisions.map((division, divIndex) => (
                      <tr key={divIndex}>
                        <td>
                          <strong>Division:</strong> {division.divisionName}
                        </td>
                        <td>
                          <strong>ID: </strong>
                          {division._id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListForOU;
