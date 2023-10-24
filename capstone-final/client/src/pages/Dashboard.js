import React, { useEffect, useState } from "react";
import OrgUnitDetails from "../components/Dashboard/OrgUnitDetails";
import UserProfile from "../components/Dashboard/UserProfile";

function Dashboard() {
  const [adminAccess, setAdminAccess] = useState(false);

  // Clears the users JWT token from local storage
  // Redirect to the login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.alert("You have successfully logged out!");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // IF the user has no token, they are taken back to the landing page
    if (!token) {
      window.location.href = "/";
    }
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
        if (data.role === "Admin") {
          setAdminAccess(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  // Takes the user to the admin page
  // Only accesible and viewable if the users adminAccess is set to true
  const goToAdmin = () => {
    window.location.href = "/dashboard/admin";
  };

  return (
    <div className="dashboard">
      <div className="options">
        {adminAccess && (
          <div className="admin">
            <div className="go">
              <button onClick={goToAdmin}>Manage Users</button>
            </div>
          </div>
        )}

        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="user-profile">
        <div>
          <UserProfile />
        </div>
      </div>

      <div className="OrgUnit-details">
        <OrgUnitDetails />
      </div>
    </div>
  );
}

export default Dashboard;
