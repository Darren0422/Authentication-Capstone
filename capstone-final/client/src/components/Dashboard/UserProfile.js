import React, { useEffect, useState } from "react";

function UserProfile() {
  const [userData, setUserData] = useState({});

  // This obtains the currently logged in users details
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if the user is authorized (has a valid token)
    fetch("/app/user/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user state with the received user data
        console.log(data);
        console.log("user details log");
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  return (
    <div className="user-details-container">
      <h1>Welcome {userData.firstName}!</h1>

      <div className="User-details">
        <h3> Profile:</h3>
        <p>Username: {userData.username}</p>
        <p>
          Name: {userData.firstName} {userData.lastName}
        </p>
        <p>Role: {userData.role}</p>
        <ul>
          {userData.organisationalUnits &&
            userData.organisationalUnits.map((orgUnit) => (
              <li key={orgUnit._id}>
                <p>{orgUnit.unit.orgUnitName} Unit:</p>

                <ul>
                  {orgUnit.divisions.map((division) => (
                    <li key={division._id}>
                      <p>{division.divisionName} Division</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
