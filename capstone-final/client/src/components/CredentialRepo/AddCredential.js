import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddCredential() {
  // Obtained from the url
  const { id, division } = useParams();
  const token = localStorage.getItem("token");

  const [recordData, setRecordData] = useState({
    organisation: "",
    username: "",
    password: "",
  });

  // Function to update the recordData properties
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // Function to add the record to the database when the form is submitted
  const handleCredentialAdd = (e) => {
    e.preventDefault();

    console.log(id);
    console.log(token);

    const newRecord = {
      organisation: recordData.organisation,
      username: recordData.username,
      password: recordData.password,
    };

    // Sends a POST request to the server to add the new record to the Credential Repo
    fetch(`/app/credentialRepo/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newRecord),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Record added successfully!");
        // Reloads the page so the updated Repo is displayed
        window.location.href = `/dashboard/repo/${division}/${id}`;
      })
      .catch((error) => {
        console.error("Error creating a record:", error);
      });
  };

  // Take the user back to the previous menu
  const goBackToMenu = () => {
    window.location.href = `/dashboard/repo/${division}/${id}`;
  };

  return (
    <div className="CredAdd">
      <div className="back">
        <button onClick={goBackToMenu}>Back</button>
      </div>

      <div className="form-container">
        <h3>Add</h3>
        <h5>Please complete the following record details:</h5>

        <div className="form">
          <form onSubmit={handleCredentialAdd}>
            <input
              type="text"
              name="organisation"
              placeholder="Organisation"
              value={recordData.organisation}
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={recordData.username}
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={recordData.password}
              required
              onChange={handleInputChange}
            />

            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCredential;
