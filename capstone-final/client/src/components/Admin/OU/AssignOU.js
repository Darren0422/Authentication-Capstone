import React, { useEffect, useState } from "react";

function AssignOU() {
  const token = localStorage.getItem("token");
  const [orgUnitData, setOrgUnitData] = useState([]);
  const [updateData, setUpdateData] = useState({
    User_id: "",
    Unit_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleOUpdate = (e) => {
    e.preventDefault();

    const newOU = {
      User_id: updateData.User_id,
      Unit_id: updateData.Unit_id,
    };

    // Sends a POST request to Add the user to the Org Unit
    fetch(`/app/user/ou/assign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newOU),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.alert("User assigned successfully!");
        window.location.href = `/dashboard/admin/update/ou/assign`;
      })
      .catch((error) => {
        window.alert("Error updating the users Organisational Unit!");
        console.error("Error updating the users Organisational Unit:", error);
      });
  };

  // This obtains the specific Org Units details
  useEffect(() => {
    fetch("/app/orgunit/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrgUnitData(data);
      })
      .catch((error) => {
        console.error("Error fetching org unit data: ", error);
      });
  }, []);

  const goBackToUpdateOU = () => {
    window.location.href = `/dashboard/admin/update/ou`;
  };

  // The user ID and OU ID must be added
  return (
    <div className="ou-assign">
      <div className="back-ou">
        <button onClick={goBackToUpdateOU}>Back</button>
      </div>

      <h3>Assign an Organisational Unit</h3>
      <h5>Please complete the following user details:</h5>

      <div className="form">
        <form onSubmit={handleOUpdate}>
          <input
            type="text"
            name="User_id"
            placeholder="User ID"
            value={updateData.User_id}
            required
            onChange={handleInputChange}
          />
          <select
            name="Unit_id"
            value={updateData.Unit_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an Organisational Unit</option>
            {orgUnitData.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.orgUnitName}
              </option>
            ))}
          </select>

          <button type="submit">Assign</button>
        </form>
      </div>
    </div>
  );
}

export default AssignOU;
