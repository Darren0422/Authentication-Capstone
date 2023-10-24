const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrganisationalUnitModel = require("./organisationalUnitModel");
const DivisionModel = require("./divisionModel");

// Schema for the user model:
// OU's have multiple divisions within them and each division has its own credential repository (contains a list of login details for various places).
// Allows for user to be part of more than one OU and Division.
// Additionally, it account for user roles.
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Normal", "Management", "Admin"],
    default: "Normal",
    required: true,
  },
  organisationalUnits: [
    {
      unit: {
        type: Schema.Types.ObjectId,
        ref: OrganisationalUnitModel,
      },
      divisions: [
        {
          type: Schema.Types.ObjectId,
          ref: DivisionModel,
        },
      ],
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
