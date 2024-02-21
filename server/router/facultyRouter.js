const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const facultyRouter = router


facultyRouter.get('/api/data/faculty' , (req, res) =>{
    db.query("SELECT * FROM faculty", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

facultyRouter.post('/api/data/faculty/create', (req, res) => {
    console.log("Request body:", req.body);
    
    const id = req.body.id;
    const faculty_name = req.body.faculty_name;
    
    if (!id || !faculty_name) {
        return res.status(400).send("ID and faculty name are required");
    }
    
    db.query("INSERT INTO faculty (id, faculty_name) VALUES (?, ?)", [id, faculty_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting data");
        } else {
            res.send("Values inserted");
        }
    });
});

facultyRouter.put('/api/data/faculty/update', (req, res) => {
    const id = req.body.id;
    const faculty_name = req.body.faculty_name;

    if (!id || !faculty_name) {
        return res.status(400).send("ID and faculty name are required");
    }

    db.query("UPDATE faculty SET faculty_name = ? WHERE id = ?", [faculty_name, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating data");
        } else {
            res.send("Values updated");
        }
    });
});


facultyRouter.delete('/api/data/faculty/delete', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM faculty WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = facultyRouter;