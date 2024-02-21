const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const timeslotRouter = router

timeslotRouter.get('/api/data/time' , (req, res) =>{
    db.query("SELECT * FROM time_slot", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

timeslotRouter.post('/api/data/time/create', (req, res) =>{
    console.log("Request body:", req.body);
    
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    db.query("INSERT INTO time_slot (start_time, end_time) VALUES(?, ?)", [start_time, end_time], (err, result) =>{
        if(err){
            console.log(err);
            res.status(500).send("Error inserting data");
        } else{
            res.send("Values inserted");
        }
    });
});

timeslotRouter.put('/api/data/time/update', (req,res) => {
    const time_slot_id = req.body.time_slot_id;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    db.query("UPDATE time_slot SET start_time=?, end_time=? WHERE time_slot_id=?", [start_time, end_time, time_slot_id], (err, result) =>{
        if (err) {
            console.error(err);       
            res.status(500).send("Error updating time slot");
        } else {
            res.send("Time slot updated successfully");
        } 
    });
});


timeslotRouter.delete('/api/data/time/delete', (req, res) => {
    const time_slot_id = req.body.time_slot_id;
    db.query("DELETE FROM time_slot WHERE time_slot_id = ?", [time_slot_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting time slot");
        } else {
            res.send("Time slot deleted successfully");
        }
    });
});


module.exports = timeslotRouter;