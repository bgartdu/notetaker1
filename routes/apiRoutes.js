const uuid = require("uuid").v4;

const fs = require("fs");
const express = require("express");
const router = express.Router();

const notes = require ("../db/db.json");
console.log(`loaded ${notes.length} notes`)



router.get("/notes", function (request, response) {
    response.send(notes);
})
router.post("/notes", function (request, response) {
    const data = request.body;
    
    console.log("Got body:")
    console.log(data)
    
    if (data.title && data.text 
            && typeof(data.title) === "string" 
            && typeof(data.text) === "string") {
        const note = {
            title: data.title,
            text: data.text,
            id: uuid()
        }
        notes[notes.length] = note;

        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        
    }
    
    response.send("Success!")
})
router.delete("/notes/:id", function (request, response) {
    console.log("Response id:" + request.params.id);
    response.send("Response id:" + request.params.id);
    
});


router.get("/*", function (request, response) {
    response.statusCode = 404;
    response.send("404, Please make request to an actual endpoint..." 
    +"<br>" + uuid() );
})




module.exports = router;

