import React, { useEffect, useState } from "react";

function DeassignDivision() {
  const [orgUnitData, setOrgUnitData] = useState([]);
  const [selectedUnitID, setSelectedUnitID] = useState("");
  const [divisionData, setDivisionData] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null); // New state variable

  const token = localStorage.getItem("token");
  const [updateData, setUpdateData] = useState({
    User_id: "",
    Unit_id: "",
    Division_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleOrgUnitChange = (e) => {
    const selectedUnit = JSON.parse(e.target.value);
    setSelectedUnitID(selectedUnit._id);
    setSelectedOrgUnit(selectedUnit);

    const orgDivisionIDsArray = selectedUnit.orgDivisionIDs;

    const requestData = {
      orgDivisionIDs: orgDivisionIDsArray,
    };

    // This obtains the specific Divisions details
    fetch("/app/division/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDivisionData(data);
      })
      .catch((error) => {
        console.error("Error fetching division data: ", error);
      });
  };

  const handleDivisionChange = (e) => {
    const selectedDivisionStr = e.target.value;
    const selectedDivision = JSON.parse(selectedDivisionStr);
    setSelectedDivision(selectedDivision);
  };

  const handleDivisionDeassign = (e) => {
    e.preventDefault();

    const newDivision = {
      User_id: updateData.User_id,
      Unit_id: selectedUnitID,
      Division_id: selectedDivision._id,
    };

    console.log(newDivision);

    // Sends a POST request to Remove the user from the Division
    fetch(`/app/user/division/deassign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newDivision),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.alert("User deassigned successfully!");
        window.location.href = `/dashboard/admin/update/division/deassign`;
      })
      .catch((error) => {
        window.alert("Error updating the users Division!");
        console.error("Error updating the users Division:", error);
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

  const goBackToUpdateDivision = () => {
    window.location.href = `/dashboard/admin/update/division`; // Redirect to the parent page
  };

  // The user ID, OU ID and Division ID must be added
  return (
    <div className="div-deassign ">
      <div className="back-ou">
        <button onClick={goBackToUpdateDivision}>Back</button>
      </div>

      <h3>Deassign a Division</h3>
      <h5>Please complete the following user details:</h5>

      <div className="form">
        <form onSubmit={handleDivisionDeassign}>
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
            onChange={handleOrgUnitChange}
            value={JSON.stringify(selectedOrgUnit)}
          >
            <option value="">Select an Organisational Unit</option>
            {orgUnitData.map((unit) => (
              <option key={unit._id} value={JSON.stringify(unit)}>
                {unit.orgUnitName}
              </option>
            ))}
          </select>

          {selectedUnitID && (
            <select
              name="Division_id"
              onChange={handleDivisionChange}
              value={JSON.stringify(selectedDivision)}
            >
              <option value="">Select a Division</option>
              {divisionData.map((division) => (
                <option key={division._id} value={JSON.stringify(division)}>
                  {division.divisionName}
                </option>
              ))}
            </select>
          )}
          <button type="submit">Deassign</button>
        </form>
      </div>
    </div>
  );
}

export default DeassignDivision;
