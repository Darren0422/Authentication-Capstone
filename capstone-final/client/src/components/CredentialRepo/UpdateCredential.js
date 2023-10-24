import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCredential() {
  // Obtained from the url
  const { id, division } = useParams();
  const token = localStorage.getItem("token");

  const [recordData, setRecordData] = useState({
    _id: "",
    organisation: "",
    username: "",
    password: "",
  });

  // Function to update the recordData properties
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // Function to update the record in the database when the form is submitted
  const handleCredentialUpdate = (e) => {
    e.preventDefault();

    // Sends a PUT request to the server to update the existing record in the Credential Repo
    fetch(`/app/credentialRepo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recordData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Display a success alert and then redirect to the parent page
          window.alert("Record updated successfully!");
          window.location.href = `/dashboard/repo/${division}/${id}`;
        } else if (response.status === 403) {
          // Display a specific alert for insufficient permissions
          window.alert(
            "Access Denied: You do not have permission to update this record."
          );
          window.location.href = `/dashboard/repo/${division}/${id}`;
        } else {
          window.alert("Failed to update the record. Please try again.");
          window.location.href = `/dashboard/repo/${division}/${id}`;
        }
      })
      .catch((error) => {
        window.alert("An error occurred while updating the record.");
        console.error("Error updating record:", error);
      });
  };

  // Take the user back to the previous menu
  const goBackToMenu = () => {
    window.location.href = `/dashboard/repo/${division}/${id}`;
  };

  return (
    <div className="CredUpdate">
      <div className="back">
        <button onClick={goBackToMenu}>Back</button>
      </div>

      <div className="form-container">
        <h3>Update</h3>
        <h5>Please complete the following record details:</h5>

        <div className="form">
          <form onSubmit={handleCredentialUpdate}>
            <input
              type="text"
              name="_id"
              placeholder="ID"
              value={recordData._id}
              required
              onChange={handleInputChange}
            />
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

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCredential;
