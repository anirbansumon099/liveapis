const express = require("express");

const auth = require("../components/middleware/external-auth");

const { makeAuthPostRequest } = require("../components/Roarzone");



const router = express.Router();
let users = [
  { id: 1, name: "Anirban" },
  { id: 2, name: "Rahim" }
];
router.use(auth);
// GET /api/users
router.get("/users", (req, res) => {
  res.json({
    success: true,
    users
  });
});

// POST /api/users
router.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.json({
    success: true,
    user: newUser
  });
});

module.exports = router;
