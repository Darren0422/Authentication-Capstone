const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Each repository contains a record of login details for various places.
const credentialRepoSchema = new Schema({
  repositoryName: {
    type: String,
    required: true,
  },
  records: [
    {
      organisation: {
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
    },
  ],
});

const CredentialRepoModel = mongoose.model(
  "CredentialRepository",
  credentialRepoSchema
);

module.exports = CredentialRepoModel;
