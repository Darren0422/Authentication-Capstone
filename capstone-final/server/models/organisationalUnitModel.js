const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DivisionModel = require("./divisionModel");

// OU's have multiple  divisions within them and each division has its own credential repository (contains a list of login details for various places).
const organisationalUnitSchema = new Schema({
  orgUnitName: {
    type: String,
    required: true,
  },
  orgDivisionIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: DivisionModel,
    },
  ],
});

const OrganisationalUnitModel = mongoose.model("OU", organisationalUnitSchema);

module.exports = OrganisationalUnitModel;
