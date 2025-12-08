const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

router.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Anirban" },
    { id: 2, name: "Rahim" }
  ];

  res.render("users", { title: "Users", users });
});

module.exports = router;
