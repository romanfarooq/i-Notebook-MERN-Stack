const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post(
  "/createuser",
  body("email", "Enter a valid email").isEmail(),
  body("name", "Enter a valid email").isLength({ min: 3 }),
  body("password", "Password should at least have 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const flag = await User.findOne({ email: req.body.email });
      if (flag) {
        return res
          .status(400)
          .json({ error: "A user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Enter correct username" });
      }
      const comparePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePass) {
        return res.status(400).json({ error: "Enter correct password" });
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user;
    const data = await User.findById(userId).select("-password");
    res.send(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
