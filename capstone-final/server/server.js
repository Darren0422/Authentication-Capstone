const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const helmet = require("helmet");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// Middleware to automatically parse JSON requests
app.use(express.json());

// Middleware for security
app.use(helmet());

// Connect to mongoDB using mongoose
const uri =
  "mongodb+srv://darrenchen0422:Password123@test.vnbfgw5.mongodb.net/cool-tech";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// To use all the routes
app.use("/app", routes);
