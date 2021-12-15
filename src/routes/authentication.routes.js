const {info, signup, signin  } = require("../controllers/authentication.controller")
const express = require("express");
const router = express.Router();

 router.post('/authentication/register', signup)

//  log an existing user in
 router.post("/authentication/login", signin)

// // log an existing user in
// router.post("/auth/profile", validateToken )

//router.get("/authentication/info", info );

module.exports = router;