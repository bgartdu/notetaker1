const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))
app.use("/", htmlRoutes)
app.use("/api", apiRoutes)


app.listen(PORT, () => console.log("listening on port: " + PORT))