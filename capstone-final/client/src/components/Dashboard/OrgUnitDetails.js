import React, { useEffect, useState } from "react";

function OrgUnitDetails() {
  const [orgUnitData, setOrgUnitData] = useState([]);
  const [divisionData, setDivisionData] = useState([]); // Initialize as an empty array
  const [selectedOrgUnit, setSelectedOrgUnit] = useState(null);

  const handleOrgUnitButtonClick = (unit) => {
    setSelectedOrgUnit(unit);

    // Creates an object with the orgDivisionIDs
    const requestData = {
      orgDivisionIDs: unit.orgDivisionIDs,
    };
    console.log(requestData);

    // This obtains the specific Org Units Divisions
    fetch("/app/division/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDivisionData(data);
      })
      .catch((error) => {
        console.error("Error fetching division data: ", error);
      });
  };

  // This obtains the Organisational unit details
  useEffect(() => {
    fetch("/app/orgunit/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrgUnitData(data);
      })
      .catch((error) => {
        console.error("Error fetching org unit data: ", error);
      });
  }, []);

  // All Organisational Units are displayed as buttons
  // When clicked the specific Org Units Divisions are displayed with a link to their associated Credential Repository
  return (
    <div className="org-unit-container">
      <h3>Organisational Units:</h3>

      <div className="org-unit-content">
        <ul>
          {orgUnitData.map((unit) => (
            <li key={unit._id}>
              <button onClick={() => handleOrgUnitButtonClick(unit)}>
                <strong>{unit.orgUnitName}</strong>
              </button>
            </li>
          ))}
        </ul>

        {selectedOrgUnit && (
          <div>
            <h3>{selectedOrgUnit.orgUnitName} Divisions:</h3>
            <ul>
              {divisionData.map((division) => (
                <li key={division._id}>
                  <strong>{division.divisionName} Division: </strong>
                  <a
                    href={`/dashboard/repo/${division.divisionName}/${division.credentialRepoID}`}
                  >
                    Credential Repository
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgUnitDetails;
