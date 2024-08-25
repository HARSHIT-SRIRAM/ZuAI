const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userControllers");

router.post("/register", userControllers.register);

router.post("/login", userControllers.loginUser);

router.get("/profile/:id", userControllers.getProfileById);

module.exports = router;
