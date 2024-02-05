const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement
const roomsRouter = router

roomsRouter.get('/api/data/rooms' , (req, res) =>{
    db.query("SELECT * FROM rooms", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

roomsRouter.get('/api/data/rooms/building', (req, res) => {
    const condition = req.query.condition; // Get the condition from the query parameters

    // SQL query to select buildings based on the condition
    const query = "SELECT * FROM rooms WHERE building = ?";

    // Execute the query with the condition
    db.query(query, [condition], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});


roomsRouter.post('/api/data/rooms/creat', (req, res) =>{
    console.log("Request body:", req.body);
    
    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const building = req.body.building;
    const floors = req.body.floors;
    const projector =req.body.projector;
    const visualizer = req.body.visualizer;
    const micophone = req.body.micophone;
    const computer =req.body.computer;

    db.query("INSERT INTO rooms (room_number, capacity, building, floors, projector,visualizer, micophone, computer) VALUES(?,?,?,?,?,?,?,?)",[room_number,capacity,building,floors,projector,visualizer,micophone,computer],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})
roomsRouter.put('/api/data/rooms/update', (req,res) => {
    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const projector =req.body.projector;
    const visualizer = req.body.visualizer;
    const micophone = req.body.micophone;
    const computer =req.body.computer;
    db.query("UPDATE rooms SET capacity=?, projector=?, visualizer=?, micophone=?, computer=? WHERE room_number=?",[capacity, projector, visualizer, micophone, computer, room_number], (err, result) =>{
        if (err) {
            console.error(err);       
        } else {
            res.send(result);
        } 
    });
})

roomsRouter.delete('/api/data/rooms/delete/', (req, res) => {
    const room_number = req.params.room_number;
    db.query("DELETE FROM rooms WHERE room_number = ?", [room_number], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = roomsRouter;