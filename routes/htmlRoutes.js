const express = require("express");

const router = express.Router();

router.get("/notes", function(request, response) {
    response.sendFile("notes.html", {root: "./public"});
})

router.get("/*", function(request, response) {
    response.sendFile("index.html", {root: "./public"});
})

module.exports = router;