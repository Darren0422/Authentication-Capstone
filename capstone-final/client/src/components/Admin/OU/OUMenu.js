import React from "react";

function OUMenu() {
  const goBackToAdmin = () => {
    window.location.href = `/dashboard/admin/`;
  };

  // Menu to navigate the OU options, Assign or Deassign
  return (
    <div className="ou-menu">
      <div className="back-ou">
        <button onClick={goBackToAdmin}>Back</button>
      </div>

      <nav>
        <ul>
          <li>
            <a href={`/dashboard/admin/update/ou/assign`}>
              Assign Organisational Unit
            </a>
          </li>
          <li>
            <a href={`/dashboard/admin/update/ou/deassign`}>
              Deassign Organisational Unit
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default OUMenu;
