const express = require("express");
const jwt = require("jsonwebtoken");
const AppCtrl = require("../controllers/controller");
const router = express.Router();

// Middleware funciton to verify the JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    console.log(token);
    return res.status(401).send("Unauthorized: No token provided.");
  }

  jwt.verify(token, "jwt-secret", (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).send("Unauthorized: Invalid token.");
    }
    req.user = decoded;
    next();
  });
}

// POST routes:
router.post("/registration", AppCtrl.userRegistration);
router.post("/login", AppCtrl.userLogIn);
router.post("/division/details", AppCtrl.divisionDetails);
router.post("/credentialRepo/:id", verifyToken, AppCtrl.addCredentialRepo);

// GET routes:
router.get("/user/details", verifyToken, AppCtrl.userDetails);
router.get("/orgunit/details", AppCtrl.orgUnitDetails);
router.get("/credentialRepo/:id", verifyToken, AppCtrl.credentialRepoDetails);
router.get("/user/list", verifyToken, AppCtrl.userList);

// PUT routes:
router.put("/credentialRepo/:id", verifyToken, AppCtrl.updateCredentialRepo);
router.put("/user/role", verifyToken, AppCtrl.updateUserRole);

router.put("/user/ou/assign", verifyToken, AppCtrl.assignUserOU);
router.put("/user/ou/deassign", verifyToken, AppCtrl.deassignUserOU);

router.put("/user/division/assign", verifyToken, AppCtrl.assignUserDivision);
router.put(
  "/user/division/deassign",
  verifyToken,
  AppCtrl.deassignUserDivision
);

module.exports = router;
