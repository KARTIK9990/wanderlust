const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/users.js");

router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signupUser));

router.route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }), userController.loginUser);

router.get("/logout", userController.logoutUser);

module.exports = router;