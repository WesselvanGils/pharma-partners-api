const { info, signup, signin, validateToken, isLogged, getStatus, auth} = require("../controllers/authentication.controller")
const express = require("express");
const router = express.Router();

// register a new user
router.post('/authentication/register', signup)

//  log an existing user in
router.post("/authentication/login", signin)

// log an existing user in
router.get("/authentication/validate/:id", validateToken)

// get the api info
router.get("/authentication/info", info);

router.get("/authentication/status", getStatus);

router.get("/authentication/isLogged", isLogged);

router.post('/auth/login', auth);



module.exports = router;