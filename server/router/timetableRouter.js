const express = require("express");
const router = express.Router();
const db = require("../connect"); // Correct the import statement

const timetableRouter = router;

timetableRouter.get("/api/data/timetable", (req, res) => {
  db.query("SELECT * FROM timetable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

timetableRouter.post('/api/data/timetable/create', (req, res) => {
  console.log("Request body:", req.body);

  const id = req.body.id;
  const subject_id = req.body.suject_id;
  const time_slot_id = req.body.time_slot_id;
  const std_amount = req.body.std_amount;
  const day = req.body.day;
  const room_id = req.body.room_id;

  db.query(
    "INSERT INTO timetable (id, subject_id, time_slot_id,std_amount, day , room_id ) VALUES(?,?,?,?,?,?)",
    [id, subject_id, time_slot_id, std_amount, day, room_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valuse inserted");
      }
    }
  );
});

timetableRouter.put("/api/data/timetable/update", (req, res) => {
    console.log("Request body:", req.body);
  
    const id = req.body.id;
    const subject_id = req.body.subject_id;
    const time_slot_id = req.body.time_slot_id;
    const std_amount = req.body.std_amount;
    const day = req.body.day;
    const room_id = req.body.room_id;
  
    db.query(
      "UPDATE timetable SET subject_id=?, time_slot_id=?, std_amount=?, day=?, room_id=? WHERE id=?",
      [subject_id, time_slot_id, std_amount, day, room_id, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values updated");
        }
      }
    );
  });
  

timetableRouter.delete("/api/data/timetable/delete", (req, res) => {
  console.log("Request body:", req.body);

  const id = req.body.id;
  db.query("DELETE FROM timetable WHERE id = ? ", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Valuse inserted");
    }
  });
});

module.exports = timetableRouter;
