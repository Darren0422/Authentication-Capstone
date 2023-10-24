import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import CredentialRepoDetails from "./pages/CredRepoDetails";
import Header from "./components/Header";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <div className="App-head">
        <Header />
      </div>

      <div className="App-api">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/admin/*" element={<Admin />} />
          <Route
            path="/dashboard/repo/:division/:id/*"
            element={<CredentialRepoDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
