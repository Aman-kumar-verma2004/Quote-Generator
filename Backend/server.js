const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express(); //creating the instance of the express
app.use(cors());

app.use(express.static(path.join(__dirname, "Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

app.get("/quote", async (req,res) => {
    try {
        const response = await axios.get("https://favqs.com/api/qotd");
        res.json(response.data);
    }catch(error) {
        res.status(500).json({ error : "Failed to connect"});
    }
})

app.listen(3000, ()=> {
    console.log("Server is live at 3000");
})