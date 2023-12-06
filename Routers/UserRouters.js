const express = require("express");
const router = express.Router();
// const { createUser } = require('./UserRouters.js');


router.post("/signin", async (req, res) => {
  try {
    console.log("body", req.body);

    
    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { router };
