const express = require("express");

const auth = require("../components/middleware/external-auth");

const { makeAuthPostRequest } = require("../components/Roarzone");

const { makeAuthPostRequest_2 } = require("../components/Ayna");



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


router.get("/ayna",async(req,res)=>{
    try {
        const postData = {  };
        const result = await makeAuthPostRequest_2("",postData);

        if (result.success) {
            res.json({
                token: result.data
            });
            // res.send(result.data);
        } else {
            console.error("❌ Error:", result.error);
            
            res.status(500).send(result.error);
        }
    } catch (err) {
        console.error("[ERROR] /token route:", err.message);
        res.status(500).send("Server Error");
    }
    
});




router.get("/iptvidn",async(req,res)=>{
    
  res.json({
      message:"token server is currently runing on the waye"
  }); 
    
    
});





router.get("/roarzone", async (req, res) => {
    try {
        const postData = {  };
        const result = await makeAuthPostRequest(postData);

        if (result.success) {
            res.json({
                token: result.data
            });
            // res.send(result.data);
        } else {
            console.error("❌ Error:", result.error);
            
            res.status(500).send(result.error);
        }
    } catch (err) {
        console.error("[ERROR] /token route:", err.message);
        res.status(500).send("Server Error");
    }
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
