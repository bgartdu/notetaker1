const uuid = require("uuid").v4;

const fs = require("fs");
const express = require("express");
const router = express.Router();

const notes = require ("../db/db.json");
if (!isArray(notes)) {
    console.log("Error! notes should be an array, please check `db/db.json!`");
    process.exit(1);
}
console.log(`loaded ${notes.length} notes`);

function isObject(it) {
    return typeof(it) === "object" && (!Array.isArray(it));
}
function isArray(it) {
    return typeof(it) === "object" && (Array.isArray(it));
}



router.get("/notes", function (request, response) {
    response.send(notes);
})
router.post("/notes", function (request, response) {
    const data = request.body;
    
    console.log("Got body:")
    console.log(data)
    
    if (isObject(data) && data.title && data.text 
            && typeof(data.title) === "string" 
            && typeof(data.text) === "string") {
        const note = {
            title: data.title,
            text: data.text,
            id: uuid()
        }
        notes[notes.length] = note;

        try {
            fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        } catch (err) {
            console.log("Could not save db.json:");
            console.log(err);
            response.statusCode = 500;
            response.send("Error writing file, could not save note!");
            return;
        }
        
        response.send("Success!")
    } else {
        response.statusCode = 400;
        response.send("Error, bad data, could not save note!");
    }
    
})
router.delete("/notes/:id", function (request, response) {
    const id = request.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (id === notes[i].id) {
            notes.splice(i, 1);
            try {
                fs.writeFileSync("./db/db.json", JSON.stringify(notes));
            } catch (err) {
                console.log("Could not save db.json:");
                console.log(err);
                response.statusCode = 500;
                response.send("Error writing file, could not delete note!");
                return;
            }
            response.send("Success!");
            return;
        }
    }
    response.send("No note with matching id!")

    
});


router.get("/*", function (request, response) {
    response.statusCode = 404;
    response.send("404, Please make request to an actual endpoint..." 
    +"<br>" + uuid() );
})




module.exports = router;

