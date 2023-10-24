import React, { useEffect, useState } from "react";

function DeassignOU() {
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

    const deassignData = {
      User_id: updateData.User_id,
      Unit_id: updateData.Unit_id,
    };

    console.log(deassignData);

    // Sends a POST request to Remove the user from the Org Unit
    fetch(`/app/user/ou/deassign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(deassignData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.alert("User deassigned successfully!");
        window.location.href = `/dashboard/admin/update/ou/deassign`;
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
    <div className="ou-deassign">
      <div className="back-ou">
        <button onClick={goBackToUpdateOU}>Back</button>
      </div>

      <h3>Deassign an Organisational Unit</h3>
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
          <button type="submit">Deassign</button>
        </form>
      </div>
    </div>
  );
}

export default DeassignOU;
