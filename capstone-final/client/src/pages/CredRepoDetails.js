import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AddCredential from "../components/CredentialRepo/AddCredential";
import RepoMenu from "../components/CredentialRepo/RepoMenu";
import UpdateCredential from "../components/CredentialRepo/UpdateCredential";

function CredentialRepoDetails() {
  const [repoData, setRepoData] = useState({});
  const [accessGranted, setAccessGranted] = useState(false);
  const { id, division } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Obtains the specific Credential Repos details
    fetch(`/app/credentialRepo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRepoData(data);
        setAccessGranted(true);
      })
      .catch((error) => {
        console.error("Error fetching org unit data: ", error);
      });
  }, [id]);

  useEffect(() => {
    console.log(repoData);
  }, [repoData]);

  const goBackToDash = () => {
    window.location.href = `/dashboard`;
  };

  // The specific Credential Repos details are displayed.
  // The user needs to have permission to access the Divisions specific Credential Repo (They need to be apart of it or access is denied)
  return (
    <div className="CredRepo-container">
      <h1> {division} Credential Repository</h1>
      {accessGranted ? (
        <div className="repo-container">
          <div className="back-dash">
            <button onClick={goBackToDash}>Dashboard</button>
          </div>
          <div className="repo-menu">
            <Routes>
              <Route path="/" element={<RepoMenu />} />
              <Route path="/add" element={<AddCredential />} />
              <Route path="/update" element={<UpdateCredential />} />
            </Routes>
          </div>
          <h3> {division} Credentials:</h3>
          <div className="repo-details">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Organisation</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {repoData.records &&
                  repoData.records.map((record) => (
                    <tr key={record._id}>
                      <td>{record._id}</td>
                      <td>{record.organisation}</td>
                      <td>{record.username}</td>
                      <td>{record.password}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Access denied. You are not allowed to view this content.</p>
      )}
    </div>
  );
}

export default CredentialRepoDetails;
