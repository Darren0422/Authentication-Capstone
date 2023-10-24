const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CredentialRepoModel = require("./credentialRepoModel");

// Each divison has its own credential repository (contains a list of login details for various places).
// Divisions reference to a single CredentialRepoModel
const divisionSchema = new Schema({
  divisionName: {
    type: String,
    required: true,
  },
  credentialRepoID: {
    type: Schema.Types.ObjectId,
    ref: CredentialRepoModel, // Reference to a single CredentialRepoModel
  },
});

const DivisionModel = mongoose.model("Division", divisionSchema);
module.exports = DivisionModel;
