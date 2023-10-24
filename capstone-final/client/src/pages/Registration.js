import React, { useState } from "react";

function Registration() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  // Function to update the userData properties
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    // Create a user object with the form data
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      password: userData.password,
    };

    fetch("/app/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((data) => {
        window.alert("Registration successful!");
        // Takes the user back to the landing page so they can now log in
        window.location.href = "/";
      })
      .catch((error) => {
        window.alert("Error registering!");
        console.error("Error registering:", error);
      });
  };

  return (
    <div className="Register">

      <div className="Register-container">
        <h4>Register</h4>

        <div className="reg-form">
          <form onSubmit={handleRegistration}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userData.firstName}
              required
              onChange={handleInputChange}
            />
            <input
              type="test"
              name="lastName"
              placeholder="Last Name"
              value={userData.lastName}
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              required
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              required
              onChange={handleInputChange}
            />

            <button type="submit">
              <strong>Register</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
