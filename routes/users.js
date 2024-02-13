const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const usersController = require("../controllers/users")

router.route("/register")
  .get(usersController.renderRegisterForm)
  .post(catchAsync(usersController.register))


router.route("/login")
  .get(usersController.renderLoginForm)
  .post(storeReturnTo ,passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,usersController.login)


router.get("/logout", usersController.logout)

module.exports = router; 