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

timetableRouter.post("/api/data/timetable/create", (req, res) => {
  console.log("Request body:", req.body);

  const id = req.body.id;
  const subject_id = req.body.suject_id;
  const time_slot_id = req.body.time_slot_id;
  const std_amount = req.body.std_amount;
  const date = req.body.date;
  const room_id = req.body.room_id;

  db.query(
    "INSERT INTO timetable (id, subject_id, time_slot_id,std_amount, date , room_id ) VALUES(?,?,?,?,?,?)",
    [id, subject_id, time_slot_id, std_amount, date, room_id],
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
  const date = req.body.date;
  const room_id = req.body.room_id;

  db.query(
    "UPDATE timetable SET subject_id=?, time_slot_id=?, std_amount=?, date=?, room_id=? WHERE id=?",
    [subject_id, time_slot_id, std_amount, date, room_id, id],
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

//ใช้บันทึกข้อมูลตารางสอน

timetableRouter.post("/api/data/timetable/saveTimetable", (req, res) => {
  console.log("Request body:", req.body);
  const teacher_name = req.body.teacher_name;
  const subject = req.body.subject;
  const subject_name = req.body.subject_name;
  const selectedRooms = req.body.selectedRooms;
  const capacity = req.body.capacity;
  const floor = req.body.floor;
  const faculty_id = req.body.faculty_id;
  const section = req.body.section;
  const building = req.body.building;

  // ตรวจสอบว่าชื่ออาจารย์ซ้ำหรือไม่
  let subjectResults;

  // ตรวจสอบว่าชื่ออาจารย์ซ้ำหรือไม่
  db.query(
    "SELECT * FROM teacher WHERE teacher_name = ?",
    [teacher_name],
    (error, teacherResults) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).send("Internal server error");
        return;
      }

      if (teacherResults.length > 0) {
        // ถ้ามีชื่ออาจารย์ซ้ำในฐานข้อมูล
        console.log("Teacher name already exists:", teacher_name);
        const teacher_id = teacherResults[0].id;

        // เพิ่มข้อมูลลงในตาราง subject โดยใช้ teacher_id ที่ได้จากการค้นหาชื่ออาจารย์
        insertSubjectAndTimetable(teacher_id);
      } else {
        // ถ้าไม่มีชื่ออาจารย์ซ้ำในฐานข้อมูล
        console.log("Teacher name does not exist:", teacher_name);

        // เพิ่มชื่ออาจารย์ลงในตาราง teacher
        db.query(
          "INSERT INTO teacher (teacher_name) VALUES (?)",
          [teacher_name],
          (teacherError, results) => {
            if (teacherError) {
              console.error(
                "Error inserting data into teacher table:",
                teacherError
              );
              res.status(500).send("Internal server error");
              return;
            }

            console.log("New record inserted into teacher table successfully");

            // เพิ่มข้อมูลลงในตาราง subject โดยใช้ teacher_id ที่เพิ่มลงในตาราง teacher ใหม่
            const teacher_id = results.insertId;
            insertSubjectAndTimetable(teacher_id);
          }
        );
      }
    }
  );

  function insertSubjectAndTimetable(teacher_id) {
    db.query(
      "INSERT INTO subject (subject, subject_name, teacher_id, faculty_id, section) VALUES (?, ?, ?, ?, ?)",
      [subject, subject_name, teacher_id, faculty_id, section],
      (subjectError, results) => {
        if (subjectError) {
          console.error(
            "Error inserting data into subject table:",
            subjectError
          );
          res.status(500).send("Internal server error");
          return;
        }

        subjectResults = results; // กำหนดค่าของ subjectResults ที่ได้จากการเพิ่มข้อมูลในตาราง subject
        console.log("New record inserted into subject table successfully");

        const subject_id = results.insertId;
        const timetablePromises = [];

        selectedRooms.forEach((room) => {
          const { date, selectedTime, room_number } = room;
          const dateStr = date; // สตริงของวันที่
          const parts = dateStr.split("/"); // แยกสตริงด้วย '/'
          const year = parts[2];
          const month = parts[1].padStart(2, "0"); // เติมเลข 0 หน้าเดือนถ้าหากมี 1 ตัวเป็นตัวเลขเดียว
          const day = parts[0].padStart(2, "0"); // เติมเลข 0 หน้าวันถ้าหากมี 1 ตัวเป็นตัวเลขเดียว
          const formattedDate = `${year}-${day}-${month}`;

          console.log("Formatted date:", formattedDate);

          const roomPromise = new Promise((resolve, reject) => {
            db.query(
              "SELECT id FROM room WHERE room_number = ?",
              [room_number],
              (roomQueryError, roomQueryResults) => {
                if (roomQueryError) {
                  console.error("Error querying room table:", roomQueryError);
                  reject(roomQueryError);
                  return;
                }

                if (roomQueryResults.length > 0) {
                  const room_id = roomQueryResults[0].id;

                  db.query(
                    "INSERT INTO timetable (subject_id, time_slot_id, std_amount, date, room_id) VALUES (?, ?, ?, ?, ?)",
                    [subject_id, selectedTime, capacity, formattedDate, room_id],
                    (timetableError, timetableResults) => {
                      if (timetableError) {
                        console.error(
                          "Error inserting data into timetable table:",
                          timetableError
                        );
                        reject(timetableError);
                        return;
                      }

                      console.log(
                        "New record inserted into timetable table successfully"
                      );
                      resolve();
                    }
                  );
                  // formattedDate = "";
                } else {
                  console.error(
                    "Room with room number",
                    room_number,
                    "not found"
                  );
                  reject("Room not found");
                }
              }
            );
          });

          timetablePromises.push(roomPromise);
        });

        Promise.all(timetablePromises)
          .then(() => {
            res
              .status(200)
              .send("Data inserted into timetable table successfully");
          })
          .catch((error) => {
            console.error("Error:", error);
            res.status(500).send("Internal server error");
          });
      }
    );
  }
});

module.exports = timetableRouter;
