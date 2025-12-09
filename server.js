const express = require("express");
const path = require("path");

const HttpRequest = require("./components/HttpConnectionRequest");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS template folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.get("test",async(req,res)=>{
    
    
    
    
})



module.exports = app;
