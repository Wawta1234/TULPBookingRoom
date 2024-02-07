const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement


const reservationRouter = router

reservationRouter.get('/api/data/reservations', (req, res) => {
    db.query("SELECT * FROM reservations", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

reservationRouter.post('/api/data/reservations/create', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const user_id = req.body.user_id;
    const room_id = req.body.room_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const reservations_status = req.body.reservations_status;
    const time_slot = req.body.time_slot;

    db.query("INSERT INTO reservations (id, user_id, room_id, first_name, last_name, reservations_status, time_slot) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, user_id, room_id, first_name, last_name, reservations_status, time_slot],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

reservationRouter.put('/api/data/reservations/update', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const user_id = req.body.user_id;
    const room_id = req.body.room_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const reservations_status = req.body.reservations_status;
    const time_slot = req.body.time_slot;

    db.query("UPDATE reservations SET user_id = ?, room_id = ?, first_name = ?, last_name = ?, reservations_status = ?, time_slot = ? WHERE id = ?",
        [user_id, room_id, first_name, last_name, reservations_status, time_slot, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

reservationRouter.delete('/api/data/reservations/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM reservations WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

reservationRouter.get('/api/data/reservations/reservations_status', (req, res) => {
    //http://localhost:8080/api/data/reservations/reservations_status?condition=2
    //0 = ไม่อนุมัติ ,1 = อนุมัติ ,2 =รออนุมัติ
    const reservations_status = req.query.condition; // เรากำหนดค่า reservations_status เป็น 2 เพื่อให้แสดงเฉพาะข้อมูลที่มี reservations_status เท่ากับ 2
    const query = "SELECT * FROM reservations WHERE reservations_status = ?";
    const conditions = [reservations_status];

    db.query(query, conditions, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// reservationRouter.get('/api/data/reservations', (req, res) => {
//     const query = `
//         SELECT reservations.date, reservations.time_slot, rooms.room_number, rooms.floor, buildings.building_name
//         FROM reservations
//         INNER JOIN rooms ON reservations.room_id = rooms.id
//         INNER JOIN buildings ON rooms.building_id = buildings.id
//         WHERE reservations.approval_status = 'อนุมัติ'
//     `;

//     db.query(query, (error, results) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         res.json(results);
//     });
// });




module.exports = reservationRouter;
