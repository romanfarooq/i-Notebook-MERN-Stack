const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  body("email", "Enter a valid email").isEmail(),
  body("name", "Enter a valid email").isLength({ min: 3 }),
  body("password", "Password should at least have 5 characters").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // let flag = await User.findOne({email: req.body.email})
    // console.log(flag)
    // if (flag) {
    //   return res.status(400).json({
    //     errors: [
    //       {
    //         value: req.body.email,
    //         msg: "Enter a unique email",
    //         param: "email",
    //         location: "body",
    //       },
    //     ],
    //   })
    // }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => res.json(user));
  }
);

module.exports = router;