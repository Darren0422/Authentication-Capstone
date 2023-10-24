const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const OrganisationalUnitModel = require("../models/organisationalUnitModel");
const DivisionModel = require("../models/divisionModel");
const CredentialRepoModel = require("../models/credentialRepoModel");
const mongoose = require("mongoose");

// Creates new user
exports.userRegistration = async function (req, res) {
  try {
    const newUserData = req.body;

    // If the newUserData is empty it displays the error message
    if (!newUserData) {
      return res.status(400).send("You must provide user details.");
    }

    // Checks if the user already exist or not
    const userExist = await UserModel.findOne({ username: req.body.username });
    if (userExist) {
      return res.status(409).send("User already exist with the given username");
    }

    // Creates the new user document
    const newUser = new UserModel(newUserData);

    // To save the newly created user to the database
    const savedUser = await newUser.save();

    console.log("The user has been registered successfully.");
    return res.send(savedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the job.");
  }
};

// Allows user to log in and creates a JWT token
exports.userLogIn = async function (req, res) {
  const { username, password } = req.body;

  try {
    // Finds a user in the DB with the same username and password.
    const user = await UserModel.findOne({ username, password })
      // Populate is used to add related data from the user document.
      .populate({
        path: "organisationalUnits.unit",
        select: "orgUnitName",
      })
      .populate({
        path: "organisationalUnits.divisions",
        select: "divisionName credentialRepoID",
      });

    if (user) {
      // Creates a payload for the JWT token
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        organisationalUnits: user.organisationalUnits,
      };

      // Signs the JWT using the secret key.
      const token = jwt.sign(payload, "jwt-secret", {
        algorithm: "HS256",
      });

      console.log("The user has logged in successfully.");
      res.send({ token });
    } else {
      console.log("Incorrect login!");
      res.status(403).send("Incorrect login!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ err: "Internal server error" });
  }
};

// Gets the user details
exports.userDetails = async function (req, res) {
  try {
    const userVerifiedData = req.user;

    // Finds a user in the DB with the same properties.
    const user = await UserModel.findOne({
      username: userVerifiedData.username,
      firstName: userVerifiedData.firstName,
      lastName: userVerifiedData.lastName,
    })
      // Populate is used to add related data from the user document.
      .populate({
        path: "organisationalUnits.unit",
        select: "orgUnitName",
      })
      .populate({
        path: "organisationalUnits.divisions",
        select: "divisionName credentialRepoID",
      });

    res.send(user);
  } catch (e) {
    return res
      .status(500)
      .send("An error occurred while retrieving the user details.");
  }
};

// Gets the Organisational Unit details
exports.orgUnitDetails = async function (req, res) {
  try {
    // Gets all Organisational Unit records from the DB
    const orgUnitData = await OrganisationalUnitModel.find();

    return res.send(orgUnitData);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        "An error occurred while retrieving the organisational unit details."
      );
  }
};

// Gets the Division details
exports.divisionDetails = async function (req, res) {
  try {
    const orgDivisionIDs = req.body.orgDivisionIDs;

    // Converts the array of orgDivisionIDs to an array of MongoDB ObjectIds
    const divisionObjectIds = orgDivisionIDs.map(
      (divisionId) => new mongoose.Types.ObjectId(divisionId)
    );

    // $in operator to find records with division IDs matching the orgDivisionIDs
    const divisionData = await DivisionModel.find({
      _id: { $in: divisionObjectIds },
    });

    return res.send(divisionData);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error occurred while retrieving the division details.");
  }
};

// Gets the Credential Repo details
exports.credentialRepoDetails = async function (req, res) {
  const { id } = req.params;
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "jwt-secret");

    // Extract the user's credentialRepoID from the token
    const userCredentialRepoID = decoded.organisationalUnits
      .map((orgUnit) => orgUnit.divisions)
      // Flattens the array of arrays into a single flat array.
      .flat()
      .map((division) => division.credentialRepoID)
      .find((repoID) => repoID === id);

    if (!userCredentialRepoID) {
      return res
        .status(403)
        .send(
          "Access denied. The user does not have access to this credential repository."
        );
    }

    // Finds the CredentialRepoModel with the given ID
    const credentialRepoData = await CredentialRepoModel.findById(id);

    if (!credentialRepoData) {
      return res.status(404).send("credential repository not found");
    }

    console.log(credentialRepoData);
    res.send(credentialRepoData);
  } catch (e) {
    return res
      .status(500)
      .send(
        "An error occurred while retrieving the credential repository details."
      );
  }
};

// Adds to a specific Credential Repo
exports.addCredentialRepo = async function (req, res) {
  try {
    // Access the user's role
    const userRole = req.user.role;
    const { id } = req.params;
    const newCredData = req.body;

    if (
      !newCredData ||
      !newCredData.organisation ||
      !newCredData.username ||
      !newCredData.password
    ) {
      return res
        .status(400)
        .send("You must provide all credential repository details.");
    }

    // Finds the Credential repository by its ID
    const repo = await CredentialRepoModel.findById(id);

    if (!repo) {
      return res.status(404).send("Credential repository not found.");
    }

    // Role authorization and permission
    if (
      userRole === "Normal" ||
      userRole === "Management" ||
      userRole === "Admin"
    ) {
    } else {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Creates a new Credential record
    const newRecord = {
      organisation: newCredData.organisation,
      username: newCredData.username,
      password: newCredData.password,
    };

    // Pushes the new record to the records array
    repo.records.push(newRecord);

    // Saves the updated Credential repository
    const savedRepo = await repo.save();

    console.log("New record added to the repository.");
    res.send(savedRepo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while adding the credential repository record.");
  }
};

// Updates a specific Credential Repo
// Updater must have Management or Admin role permissions
exports.updateCredentialRepo = async function (req, res) {
  try {
    const userRole = req.user.role;
    const { id } = req.params;
    const newCredData = req.body;

    if (
      !newCredData ||
      !newCredData._id ||
      !newCredData.organisation ||
      !newCredData.username ||
      !newCredData.password
    ) {
      return res
        .status(400)
        .send("You must provide all credential repository details.");
    }

    // Finds the Credential repository by its ID
    const repo = await CredentialRepoModel.findById(id);

    if (!repo) {
      return res.status(404).send("Credential repository not found.");
    }

    // Role authorization and permission
    if (userRole !== "Management" && userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Find the record within the records array based on the _id
    const record = repo.records.id(newCredData._id);

    if (!record) {
      return res.status(404).send("Credential repository record not found.");
    }

    // Updates the existing record with new data
    record.organisation = newCredData.organisation;
    record.username = newCredData.username;
    record.password = newCredData.password;

    // Saves the updated repository
    const savedRepo = await repo.save();

    console.log("Record updated in the repository.");
    res.send(savedRepo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while the credential repository record.");
  }
};

// Gets a list of user from the DB
exports.userList = async function (req, res) {
  try {
    // Gets all user records from the DB
    const userListData = await UserModel.find()
      // Populate is used to add related data from the user document.
      .populate({
        path: "organisationalUnits.unit",
        select: "orgUnitName",
      })
      .populate({
        path: "organisationalUnits.divisions",
        select: "divisionName credentialRepoID",
      });

    return res.send(userListData);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error occurred while retrieving the User List.");
  }
};

// Updates a specific users role
// Updater must have Admin role permissions
exports.updateUserRole = async function (req, res) {
  try {
    const userRole = req.user.role;
    const newUserData = req.body;

    if (!newUserData || !newUserData.role || !newUserData._id) {
      return res
        .status(400)
        .send("You must provide the users ID and new Role.");
    }

    // Role authorization and permission
    if (userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Finds the user by its ID
    const user = await UserModel.findById(newUserData._id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    user.role = newUserData.role;

    // Save the updated repository
    const updatedUser = await user.save();

    console.log("User role updated succesfully.");
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating the user role.");
  }
};

// Adds a user to a specific Organisational Unit
// Updater must have Admin role permissions
exports.assignUserOU = async function (req, res) {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const userRole = req.user.role;
    const newOUData = req.body;

    if (!newOUData || !newOUData.Unit_id || !newOUData.User_id) {
      return res.status(400).send("You must provide the user's ID and OU.");
    }

    // Role authorization and permission
    if (userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Finds the Organisational Unit by its ID
    const orgUnit = await OrganisationalUnitModel.findById(newOUData.Unit_id);

    if (!orgUnit) {
      return res.status(404).send("Organisational unit not found.");
    }

    // Converts the string IDs to ObjectId so they can be used for searching
    const userId = new ObjectId(newOUData.User_id);
    const unitId = new ObjectId(newOUData.Unit_id);

    // Check if the user is already assigned to the specified OU
    const user = await UserModel.findById(userId);
    if (user.organisationalUnits.some((ou) => ou.unit.equals(unitId))) {
      return res
        .status(400)
        .send("User is already a member of the specified OU.");
    }

    // Creates an organisationalUnit object
    const newOrganisationalUnit = {
      unit: unitId,
      divisions: [],
    };

    // Assigns the user's OU using $push
    const updatedUserOU = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { organisationalUnits: newOrganisationalUnit } },
      { new: true }
    );

    if (!updatedUserOU) {
      return res
        .status(500)
        .send("An error occurred while updating the Organisational unit.");
    }

    console.log("User OU assigned successfully.");
    res.send(updatedUserOU);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating the Organisational unit.");
  }
};

// Removes a user from a specific Organisational Unit
// Updater must have Admin role permissions
exports.deassignUserOU = async function (req, res) {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const userRole = req.user.role;
    const newOUData = req.body;

    if (!newOUData || !newOUData.Unit_id || !newOUData.User_id) {
      return res.status(400).send("You must provide the users ID and OU.");
    }

    // Role authorization and permission
    if (userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Finds the Organisational Unit by its ID
    const orgUnit = await OrganisationalUnitModel.findById(newOUData.Unit_id);

    if (!orgUnit) {
      return res.status(404).send("Organisational unit not found.");
    }

    // Converts the string IDs to ObjectId so it can be used to search by
    const userId = new ObjectId(newOUData.User_id);
    const unitId = new ObjectId(newOUData.Unit_id);

    // Deassigns the user's OU using $pull
    const updatedUserOU = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { organisationalUnits: { unit: unitId } } },
      { new: true }
    );

    if (!updatedUserOU) {
      return res
        .status(500)
        .send("An error occurred while updating the Organisational unit.");
    }

    console.log("User OU removed succesfully.");
    res.send(updatedUserOU);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating the Organisational unit.");
  }
};

// Adds a user to a specific Division
// Updater must have Admin role permissions
exports.assignUserDivision = async function (req, res) {
  try {
    const userRole = req.user.role;
    const newDivisionData = req.body;

    if (
      !newDivisionData ||
      !newDivisionData.Unit_id ||
      !newDivisionData.User_id ||
      !newDivisionData.Division_id
    ) {
      return res
        .status(400)
        .send("You must provide the users ID, OU, and Division.");
    }

    // Role authorization and permission
    if (userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Finds the user by its ID
    const User = await UserModel.findById(newDivisionData.User_id);

    if (!User) {
      return res.status(404).send("User not found.");
    }

    // Finds the Organisational Unit by its ID
    const orgUnit = await OrganisationalUnitModel.findById(
      newDivisionData.Unit_id
    );

    if (!orgUnit) {
      return res.status(404).send("Organisational unit not found.");
    }

    // Finds the Division by its ID
    const unitDivision = await DivisionModel.findById(
      newDivisionData.Division_id
    );

    if (!unitDivision) {
      return res.status(404).send("Division not found.");
    }

    // Checks if the user is already in the unit
    const existingUnitAssignment = User.organisationalUnits.find(
      (ou) => ou.unit && ou.unit.toString() === newDivisionData.Unit_id
    );

    if (existingUnitAssignment) {
      if (
        !existingUnitAssignment.divisions.includes(newDivisionData.Division_id)
      ) {
        // If the division is not assigned to the user, it adds it
        existingUnitAssignment.divisions.push(newDivisionData.Division_id);
      } else {
        return res
          .status(409)
          .send("Division is already assigned to the user.");
      }
    } else {
      // User is not assigned to the unit so it assigns the user
      User.organisationalUnits.push({
        unit: newDivisionData.Unit_id,
        divisions: [newDivisionData.Division_id],
      });
    }

    const updatedUserDivision = await User.save();

    console.log("User Division assigned succesfully.");
    res.send(updatedUserDivision);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating the Division.");
  }
};

// Removes a user from a specific Division
// Updater must have Admin role permissions
exports.deassignUserDivision = async function (req, res) {
  try {
    const userRole = req.user.role;
    const newDivisionData = req.body;

    if (
      !newDivisionData ||
      !newDivisionData.Unit_id ||
      !newDivisionData.User_id ||
      !newDivisionData.Division_id
    ) {
      return res
        .status(400)
        .send("You must provide the users ID, OU, and Division.");
    }

    // Role authorization and permission
    if (userRole !== "Admin") {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }

    // Finds the user by its ID
    const User = await UserModel.findById(newDivisionData.User_id);

    if (!User) {
      return res.status(404).send("User not found.");
    }

    // Finds the Organisational Unit by its ID
    const orgUnit = await OrganisationalUnitModel.findById(
      newDivisionData.Unit_id
    );

    if (!orgUnit) {
      return res.status(404).send("Organisational unit not found.");
    }

    // Finds the Division by its ID
    const unitDivision = await DivisionModel.findById(
      newDivisionData.Division_id
    );

    if (!unitDivision) {
      return res.status(404).send("Division not found.");
    }

    // Checks if the user is already in the unit
    const existingUnitAssignment = User.organisationalUnits.find(
      (ou) => ou.unit && ou.unit.toString() === newDivisionData.Unit_id
    );

    if (existingUnitAssignment) {
      if (
        existingUnitAssignment.divisions.includes(newDivisionData.Division_id)
      ) {
        // If the division is assigned to the user, it removes it
        existingUnitAssignment.divisions =
          existingUnitAssignment.divisions.filter(
            (division) => division.toString() !== newDivisionData.Division_id
          );

        const updatedUserDivision = await User.save();

        console.log("User Division removed succesfully.");
        res.send(updatedUserDivision);
      } else {
        return res.status(409).send("Division is not assigned to the user.");
      }
    } else {
      return res
        .status(409)
        .send("User is not assigned to the Organisational Unit.");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("An error occurred while updating the division.");
  }
};
