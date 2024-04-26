const express = require("express");
const router = express.Router();
const db = require("../connect"); // Correct the import statement

const reservationRouter = router;

reservationRouter.get("/api/data/reservations", (req, res) => {
  const username = req.query.username; // รับ username จากพารามิเตอร์ของคำขอ
  // ค้นหา id ของผู้ใช้จากฐานข้อมูล
  db.query(
    `SELECT id FROM user WHERE username = ?`,
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const userId = result[0].id; // ดึง id ของผู้ใช้จากผลลัพธ์การค้นหา
          // ค้นหาข้อมูลการจองของผู้ใช้โดยใช้ userId
          db.query(
            `SELECT reservations.* 
            FROM reservations 
            WHERE reservations.user_id = ?`,
            [userId],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send(result);
              }
            }
          );
        } else {
          console.log("User not found");
          res.send([]); // ส่งข้อมูลว่างกลับถ้าไม่พบผู้ใช้
        }
      }
    }
  );
});


reservationRouter.get("/api/data/reservationsForAdmin", (req, res) => {
  db.query("SELECT * FROM reservations", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
       
    }
});
});


//เรียกดูคำขอของ Admind
reservationRouter.get("/api/data/reservations/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId; // รับ reservationId จาก URL parameter
  // ค้นหาข้อมูลการจองโดยใช้ reservationId
  db.query(
    `SELECT reservations.*, reservationsdetal.*, room.*, building.building_name, user.*
    FROM reservations 
    INNER JOIN reservationsdetal ON reservations.id = reservationsdetal.reservations_id 
    INNER JOIN room ON reservationsdetal.room_id = room.id 
    INNER JOIN building ON room.building_id = building.id 
    INNER JOIN user ON reservations.user_id = user.id
    WHERE reservations.id = ?`,
    [reservationId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send([]); // ส่งข้อมูลว่างกลับถ้าเกิดข้อผิดพลาด
      } else {
        res.send(result);
      }
    }
  );
});

//update ค่า approve ในกรณีที่พี่ออมอนุมัติ จาก 3 เป็น 2
reservationRouter.put("/api/data/reservations/update/:reservationId", (req, res) => {
  console.log("Request body: ", req.body);

  const reservationId = req.params.reservationId;
  const approve = req.body.approve;

  // ตรวจสอบว่ามีค่า approve ที่ไม่ใช่ null
  if (!approve) {
    return res.status(400).send("Approval status is required");
  }

  // ทำการอัปเดตค่า approve ในฐานข้อมูล
  db.query(
    "UPDATE reservations SET approve = ? WHERE id = ?",
    [approve, reservationId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data");
      } else {
        res.send("Values updated");
      }
    }
  );
});

//update ค่า approve ในกรณีที่ไม่อนุมัติ  approve = 0
reservationRouter.put("/api/data/reservations/Noapprove/:reservationId", (req, res) => {
  console.log("Request body: ", req.body);
  const reservationId = req.params.reservationId;
  const approve = req.body.approve;
  // ทำการอัปเดตค่า approve ในฐานข้อมูล
  db.query(
    "UPDATE reservations SET approve = ? WHERE id = ?",
    [approve, reservationId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data");
      } else {
        res.send("Values updated");
      }
    }
  );
});


reservationRouter.post("/api/data/reservations/create", (req, res) => {
  console.log("Request body is:", req.body);

  const user_id = req.body.user_id;
  const date_reser = req.body.date_reser;
  const approve = req.body.approve;
  const objective = req.body.objective;
  const details = req.body.details;

  // Check if there are available rooms to reserve
  if (details.length === 0) {
    return res.status(400).send("No rooms selected");
  }

  // Query user id from the database
  db.query(
    "SELECT id FROM user WHERE user.username = ?",
    [user_id],
    (err, userResult) => {
      if (err) {
        console.error("Error querying user data:", err);
        return res.status(500).send("Error querying user data");
      }

      if (userResult.length === 0) {
        return res.status(404).send("User not found");
      }

      const user_id = userResult[0].id;

      // Insert reservation data into reservations table
      db.query(
        "INSERT INTO reservations (user_id, date_reser, approve, objective) VALUES (?, ?, ?, ?)",
        [user_id, date_reser, approve, objective],
        (err, result) => {
          if (err) {
            console.error("Error inserting data into reservations:", err);
            return res.status(500).send("Error inserting data into reservations");
          }

          const reservationId = result.insertId;

          // Insert details into reservations details table
          const promises = details.map(detail => {
            return new Promise((resolve, reject) => {
              db.query(
                "SELECT id FROM room WHERE room_number = ?",
                [detail.room_id],
                (err, roomResult) => {
                  if (err) {
                    console.log("Error querying room data:", err);
                    return reject("Error querying room data");
                  }

                  if (roomResult.length === 0) {
                    return reject("Room not found");
                  }

                  const room_id = roomResult[0].id;

                  db.query(
                    "INSERT INTO reservationsdetal (reservations_id, room_id, date_use, std_amount, time_slot_id) VALUES (?, ?, ?, ?, ?)",
                    [reservationId, room_id, detail.date_use, detail.std_amount, detail.time_slot_id],
                    (err, result) => {
                      if (err) {
                        console.error("Error inserting data into reservationsdetal:", err);
                        return reject("Error inserting data into reservationsdetal");
                      }

                      resolve();
                    }
                  );
                }
              );
            });
          });

          Promise.all(promises)
            .then(() => {
              res.status(200).json({
                reservationId: reservationId,
                reservationsDetails: details
              });
            })
            .catch(error => {
              console.error("Error inserting reservations details:", error);
              return res.status(500).send("Error inserting reservations details");
            });
        }
      );
    }
  );
});


reservationRouter.put("/api/data/reservations/update", (req, res) => {
  console.log("Request body: ", req.body);

  const id = req.body.id;
  const user_id = req.body.user_id;
  const date_reser = req.body.date_reser;
  const approve = req.body.approve;
  const objective = req.body.objective;
  const time_slot_id = req.body.time_slot_id;

  // ตรวจสอบว่ามีค่า user_id, date_reser และ approve ที่ไม่ใช่ null
  if (!user_id || !date_reser || approve) {
    return res
      .status(400)
      .send("User ID, Room ID, and Reservations Status are required");
  }

  // ทำการอัปเดตข้อมูลในฐานข้อมูล
  db.query(
    "UPDATE reservations SET user_id = ?, date_reser = ?, approve = ?, objective = ?, time_slot_id = ? WHERE id = ?",
    [user_id, date_reser, approve, objective, time_slot_id, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data");
      } else {
        res.send("Values updated");
      }
    }
  );
});

reservationRouter.delete("/api/data/reservations/delete/:reservationId", (req, res) => {
  const id = req.params.reservationId;
  // ลบข้อมูลในตาราง reservationsdetail ก่อน
  db.query("DELETE FROM reservationsdetal WHERE reservations_id = ?", [id], (err, detailResult) => {
    if (err) {
      console.error(err);
      res.status(500).send("เกิดข้อผิดพลาดในการลบข้อมูล reservation detail");
    } else {
      // เมื่อลบข้อมูลใน reservationsdetail เสร็จสิ้น ลบข้อมูลใน reservations
      db.query("DELETE FROM reservations WHERE id = ?", [id], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("เกิดข้อผิดพลาดในการลบข้อมูล reservation");
        } else {
          // ทั้งสองขั้นตอนลบข้อมูลสำเร็จ
          res.status(200).send("ลบข้อมูลคำขอเรียบร้อยแล้ว");
        }
      });
    }
  });
});



reservationRouter.get("/api/data/reservations/approve", (req, res) => {
  const approve = req.query.condition; // เรากำหนดค่า approve เป็น 2 เพื่อให้แสดงเฉพาะข้อมูลที่มี approve เท่ากับ 2
  const query =
    "SELECT reservations.*, reservationsdetal.*, room.*, building.building_name FROM reservations INNER JOIN reservationsdetal ON reservations.id = reservationsdetal.reservations_id INNER JOIN room ON reservationsdetal.room_id = room.id INNER JOIN building ON room.building_id = building.id WHERE approve = 2";

  db.query(query, [approve], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// reservationRouter.get('/api/data/reservations', (req, res) => {
//     const query = `
//         SELECT reservations.date, reservations.time_slot_id, rooms.room_number, rooms.floor, buildings.building_name
//         FROM reservations
//         INNER JOIN rooms ON reservations.date_reser = rooms.id
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
