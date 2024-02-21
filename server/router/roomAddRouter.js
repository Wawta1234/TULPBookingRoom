const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement
const roomAddRouter = router;

// roomAddRouter .get('/api/data/roomForAdd' , (req, res) =>{
//     db.query("SELECT * FROM room", (err, result) =>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     });
// });

roomAddRouter.post('/api/data/roomForAdd/create' , (req, res) =>{
    console.log("Request body:", req.body);
    
    // const id = req.body.id;
    const room_number = req.body.room_number;
    const building_id = req.body.building_id;
    const floor = req.body.floor;
    const capacity = req.body.capacity;
    const room_type = req.body.room_type;

    db.query("INSERT INTO room (room_number, building_id,floor, capacity, room_type) VALUES(?,?,?,?,?)",[room_number, building_id,floor, capacity, room_type],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})


roomAddRouter.put('/api/data/roomForAdd/update', (req, res) => {
    console.log("Request body:", req.body);
    const id = req.body.id;
    const room_number = req.body.room_number;
    const building_id = req.body.building_id;
    const floor = req.body.floor;
    const capacity = req.body.capacity;
    const room_type = req.body.room_type;

    db.query("UPDATE room SET room_number = ?, building_id = ?, floor = ?, capacity = ?, room_type = ? WHERE id = ?", [room_number, building_id, floor, capacity, room_type, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Values updated");
        }
    });
});


roomAddRouter.delete('/api/data/roomForAdd/delete/:id', (req, res) => {
    const id = req.params.id; // ใช้ id แทน room_number
    db.query("DELETE FROM rooms WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

roomAddRouter.get('/api/data/roomForAdd', (req, res) => {
    
    const { building_id, floor, capacity, room_type } = req.query;
// console.log(response.data);
    let sql = "SELECT room.*, building.building_name FROM room inner join building on room.building_id = building.id WHERE 1=1";

    if (building_id) {
        sql += ` AND room.building_id = '${building_id}'`;
    }
    if (floor) {
        sql += ` AND floor = '${floor}'`;
    }
    if (capacity) {
        if (capacity <= 50) {
            sql += " AND capacity = 50";
        } else if (capacity > 50 && capacity <= 100 ) {
            sql += " AND capacity = 100";
        } else if (capacity > 100 && capacity <= 150 ) {
            sql += " AND capacity = 150";
        }else if (capacity > 150 && capacity <= 200 ) {
            sql += " AND capacity = 200";
        }else if (capacity > 200 && capacity <= 250 ) {
            sql += " AND capacity = 250";
        }else if (capacity > 250 && capacity <= 500 ) {
            sql += " AND capacity = 500";
        }else{
            sql += " AND capacity = 1000";
        }
    }
    if (room_type) {
        sql += ` AND room_type = '${room_type}'`;
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.send(result);
        }
    });
});


module.exports = roomAddRouter ;
