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

timeslotRouter.post('/api/data/time/creat', (req, res) =>{
    console.log("Request body:", req.body);
    
    const time_slot_id = req.body.time_slot_id;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    db.query("INSERT INTO time_slot (time_slot_id, start_time ,end_time) VALUES(?,?,?)",[time_slot_id, start_time,end_time],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})
timeslotRouter.put('/api/data/time/update', (req,res) => {
    const time_slot_id = req.body.time_slot_id;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

   
    db.query("UPDATE time_slot SET time_slot_id=?, start_time=?, end_timer=?",[time_slot_id,start_time ,end_time], (err, result) =>{
        if (err) {
            console.error(err);       
        } else {
            res.send(result);
        } 
    });
})

timeslotRouter.delete('/api/data/time/delete', (req, res) => {
    const time_slot_id = req.params.time_slot_id;
    db.query("DELETE FROM time_slot WHERE room_number = ?", [time_slot_id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = timeslotRouter;