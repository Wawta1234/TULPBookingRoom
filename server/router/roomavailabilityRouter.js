
const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const roomavailabilityRouter = router
roomavailabilityRouter.get('/api/data/roomavailability' , (req, res) =>{
    db.query("SELECT * FROM roomavailability", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

roomavailabilityRouter.post('/api/data/roomavailability/creat' , (req , res) =>{
    console.log("Request body : " , req.body);

    const availability = req.body.availability;
    const room_id = req.body.room_id;
    const date = req.body.date;
    const time_slot_id =req.body.time_slot_id;
    const is_available = req.body.is_available;
    const time_slot = req.body.time_slot;
    db.query("INSERT INTO roomavailability (availability,  room_id, date, time_slot_id,is_available) VALUES(?,?,?,?,?)",[availability ,  room_id, date, time_slot_id,is_available,time_slot],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
    
})


roomavailabilityRouter.put('/api/data/roomavailability/update' , (req , res) =>{
    console.log("Request body : " , req.body);

    const availability = req.body.availability;
    const room_id = req.body.room_id;
    const date = req.body.date
    const time_slot_id =req.body.time_slot_id;
    const is_available = req.body.is_available;
    const time_slot = req.body.time_slot;
    db.query("UPDATE roomavailability set availability = ? , room_id = ?, date= ?, time_slot_id = ? ,is_available = ?, time_slot = ?) ",[availability ,  room_id, date, time_slot_id,is_available,time_slot],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    }
    )
    
})

roomavailabilityRouter.delete('/api/data/roomavailability/delete', (req, res) => {
    const availability = req.params.availability;
    db.query("DELETE FROM roomavailability WHERE availability = ?", [availability ], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = roomavailabilityRouter;