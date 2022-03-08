const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to assessment test backend developer Digital Envision by Aprilia Ramadhayanti." });
});
require("./app/routes/route.users.js")(app);

app.listen(8080, ()=>{
});