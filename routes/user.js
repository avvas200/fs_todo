const express = require("express");

const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
} = require("../controllers/user");
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

const User = require("../models/user");

const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid image file", false);
  }
};

const uploads = multer({ storage, fileFilter });

router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.get("/sign-out", isAuth, signOut);
router.post("upload-profile", isAuth, uploads.single("profile"), uploadProfile);
// router.post("/create-post", isAuth, (req, res) => {
//   //create post here
//   res.send("Welcome, you are in secret route");
// });

module.exports = router;
