const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration Failed" });
  }
});

// Login
router.post("login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: "Login Successful", user });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login Error" });
  }
});

module.exports = router;
