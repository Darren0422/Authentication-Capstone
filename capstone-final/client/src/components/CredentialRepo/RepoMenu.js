import React from "react";
import { useParams } from "react-router-dom"; // Import 'useParams'

function RepoMenu() {
  const { id, division } = useParams();

  // Menu to navigate to add or update a Credential
  return (
    <div>
      <h2>Menu</h2>
      <nav>
        <ul>
          <li>
            <a href={`/dashboard/repo/${division}/${id}/add`}>Add Credential</a>
          </li>
          <li>
            <a href={`/dashboard/repo/${division}/${id}/update`}>
              Update Credential
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default RepoMenu;
