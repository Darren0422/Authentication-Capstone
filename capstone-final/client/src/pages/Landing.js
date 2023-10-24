import React, { useState } from "react";

function Landing() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  // Function to update the userData properties
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    const userLogIn = {
      username: userData.username,
      password: userData.password,
    };

    fetch("/app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogIn),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Adds the JWT token to localstorage for usage
          localStorage.setItem("token", data.token);
          console.log("Token saved to local storage.");

          window.location.href = "/dashboard";
        } else {
          // If no token was received
          console.error("No token received in the response");
        }
      })
      .catch((error) => {
        console.error("An error occurred during the login process:", error);
      });
  };

  // Takes the user to the register page
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="login-container">
      <h4>Log in</h4>

      <div className="login-form">
        <form onSubmit={handleLogIn}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.name}
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={userData.description}
            required
            onChange={handleInputChange}
          />

          <button type="submit">
            <strong>Login</strong>
          </button>
        </form>

        <div>
          <button onClick={handleRegister}>
            <strong>Register</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
