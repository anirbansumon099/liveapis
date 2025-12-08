const express = require("express");
const { URL } = require("url");
const auth = require("../components/middleware/external-auth");
const {makeAuthPostRequest} = require('../components/roarzone');
const router = express.Router();
let users = [
  { id: 1, name: "Anirban" },
  { id: 2, name: "Rahim" }
];
router.use(auth);
// GET /api/users
router.get("/users", async (req, res) => {
  try {
        const postData = {  };
        const result = await makeAuthPostRequest(postData);

        if (result.success) {
            console.log("✅ Server Response:", result.data);
            res.send(result.data);
        } else {
            console.error("❌ Error:", result.error);
            res.status(500).send(result.error);
        }
    } catch (err) {
        console.error("[ERROR] /token route:", err.message);
        res.status(500).send("Server Error");
    }  
    
    
}

// POST /api/users
router.post("/roarzone", (req, res) => {
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
