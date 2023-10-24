import React from "react";

function DivisionMenu() {
  const goBackToAdmin = () => {
    window.location.href = `/dashboard/admin/`;
  };

  // Menu to navigate the Division options, Assign or Deassign
  return (
    <div className="div-menu">
      <div className="back-ou">
        <button onClick={goBackToAdmin}>Back</button>
      </div>

      <nav>
        <ul>
          <li>
            <a href={`/dashboard/admin/update/division/assign`}>
              Assign Division
            </a>
          </li>
          <li>
            <a href={`/dashboard/admin/update/division/deassign`}>
              Deassign Division
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DivisionMenu;
