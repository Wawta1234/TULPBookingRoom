const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement
const roomsRouter = router;


roomsRouter.get('/api/data/capacity', (req, res) => {
    const condition = req.query.condition; // Get the condition from the query parameters

    // SQL query to select capacity based on the condition
    const query = "SELECT * FROM rooms WHERE capacity  ";


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


roomsRouter.get('/api/data/rooms/building', (req, res) => {
    const condition = req.query.condition; // Get the condition from the query parameters
    //console.log()
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

roomsRouter.get('/api/data/rooms/capacity', (req, res) => {
    const condition = req.query.condition; // เงื่อนไขที่รับมาจากการส่งคำขอ

    let query = "SELECT * FROM rooms";
    if (condition === "more_than_50") {
        query += " WHERE capacity > 50"; // เพิ่มเงื่อนไขในคำสั่ง SQL ถ้ามากกว่า 50
    } else if (condition === "more_than_100") {
        query += " WHERE capacity > 100"; // เพิ่มเงื่อนไขในคำสั่ง SQL ถ้ามากกว่า 100
    } else if (condition === "more_than_150") {
        query += " WHERE capacity > 150"; // เพิ่มเงื่อนไขในคำสั่ง SQL ถ้ามากกว่า 150
    } else if (condition === "more_than_150") {
        query += " WHERE capacity > 150"; // เพิ่มเงื่อนไขในคำสั่ง SQL ถ้ามากกว่า 150
    }

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

roomsRouter.get('/api/data/allRooms', (req, res) => {
    db.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});



roomsRouter.get('/api/data/rooms', (req, res) => {
//    console.log(req.query)
    db.query("SELECT * FROM rooms where  building = ? AND floors = ? ", [req.query.building, req.query.floor]  , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});


roomsRouter.post('/api/data/rooms/create', (req, res) => {
    console.log("Request body:", req.body);

    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const building = req.body.building;
    const floors = req.body.floors;
    const projector = req.body.projector;
    const visualizer = req.body.visualizer;
    const microphone = req.body.microphone;
    const computer = req.body.computer;

    db.query("INSERT INTO rooms (room_number, capacity, building, floors, projector, visualizer, microphone, computer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [room_number, capacity, building, floors, projector, visualizer, microphone, computer],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.send("Values inserted");
            }
        }
    ) 
});

roomsRouter.put('/api/data/rooms/update', (req, res) => {
    const room_number = req.body.room_number;
    const capacity = req.body.capacity;
    const projector = req.body.projector;
    const visualizer = req.body.visualizer;
    const microphone = req.body.microphone;
    const computer = req.body.computer;
    db.query("UPDATE rooms SET capacity=?, projector=?, visualizer=?, microphone=?, computer=? WHERE room_number=?", [capacity, projector, visualizer, microphone, computer, room_number], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

roomsRouter.delete('/api/data/rooms/delete/:room_number', (req, res) => {
    const room_number = req.params.room_number;
    db.query("DELETE FROM rooms WHERE room_number = ?", [room_number], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

module.exports = roomsRouter;
