const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const courseRouter = router


courseRouter.get('/api/data/course', (req, res) => {
    db.query("SELECT * FROM course", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


courseRouter.post('/api/data/course/create', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const faculty = req.body.faculty;
    const course_name = req.body.course_name;
    const teacher = req.body.teacher;
    const capacity = req.body.capacity;
    const section = req.body.section;
    const building = req.body.building;
    const floors = req.body.floors;
    const room_id = req.body.room_id;
    const time_slot_id = req.body.time_slot_id;
    const date = req.body.date

    db.query("INSERT INTO course (id, faculty, course_name, teacher, capacity, section, building,floors, room_id, time_slot_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?,?)",
        [id, faculty, course_name, teacher, capacity, section, building,floors,room_id,time_slot_id,date],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});
courseRouter.post('/api/data/course/create', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const faculty = req.body.faculty;
    const course_name = req.body.course_name;
    const teacher = req.body.teacher;
    const capacity = req.body.capacity;
    const section = req.body.section;
    const building = req.body.building;
    const floors = req.body.floors;
    const room_id = req.body.room_id;
    const time_slot_id = req.body.time_slot_id;
    const date = req.body.date

    db.query("INSERT INTO course (id, faculty, course_name, teacher, capacity, section, building,floors ,room_id,time_slot_id,date) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?,?)",
        [id, faculty, course_name, teacher, capacity, section, building ,floors ,room_id,time_slot_id,date],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

courseRouter.put('/api/data/course/update', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const faculty = req.body.faculty;
    const course_name = req.body.course_name;
    const teacher = req.body.teacher;
    const capacity = req.body.capacity;
    const section = req.body.section;
    const building = req.body.building;
    const floors = req.body.floors;
    const room_id = req.body.room_id;
    const time_slot_id = req.body.time_slot_id;
    const date = req.body.date

    db.query("UPDATE course SET faculty = ?, course_name = ?, teacher = ?, capacity = ?, section = ?, building = ?,floors = ? ,room_id = ? , time_slot_id = ? ,date = ?  WHERE id = ?",
        [id, faculty, course_name, teacher, capacity, section, building,floors ,room_id,time_slot_id,date],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

courseRouter.delete('/api/data/course/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM course WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});
