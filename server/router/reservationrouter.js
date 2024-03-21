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
            `SELECT reservations.*, reservationsdetal.*, room.*, building.building_name 
            FROM reservations 
            INNER JOIN reservationsdetal ON reservations.id = reservationsdetal.reservations_id 
            INNER JOIN room ON reservationsdetal.room_id = room.id 
            INNER JOIN building ON room.building_id = building.id 
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

reservationRouter.post("/api/data/reservations/create", (req, res) => {
  console.log(55555);
  console.log("Request body is:", req.body);

  const user_id = req.body.user_id;
  const time_slot_id = req.body.time_slot_id;
  const date_reser = req.body.date_reser;
  const approve = req.body.approve;
  const objective = req.body.objective;
  const room_id = req.body.room_id;

  console.log("room id is:", room_id);
  console.log("user user_id is:", user_id);
  // Query ข้อมูล id จากตาราง user โดยใช้ user_id
  db.query(
    "SELECT id FROM user WHERE user.username =  ?",
    [user_id],

    (err, userResult) => {
      if (err) {
        console.error("Error querying user data:", err);

        return res.status(500).send("Error querying user data");
      }

      if (userResult.length === 0) {
        // หากไม่พบข้อมูล user ให้ส่งคำตอบว่าไม่พบข้อมูล
        return res.status(404).send("User not found");
      }

      // ถ้าพบข้อมูล user ให้ใช้ id ที่ได้จากการ query เพื่อสร้างการจอง
      const user_id = userResult[0].id;
      console.log("user user_id 2  is:", user_id);

      // Insert ข้อมูลการจองลงในตาราง reservations
      db.query(
        "INSERT INTO reservations (user_id, date_reser, approve, objective, time_slot_id) VALUES (?, ?, ?, ?, ?)",
        [user_id, date_reser, approve, objective, time_slot_id],
        (err, result) => {
          console.log(999);
          if (err) {
            console.error("Error inserting data into reservations:", err);
            return res
              .status(500)
              .send("Error inserting data into reservations");
          }

          //หา room_id

          db.query(
            "SELECT id FROM room WHERE room_number = ?",
            [room_id],
            (err, roomResult) => {
              if (err) {
                console.log("error querying room data:", err);
                return res.status(500).send("error querying room data");
              }
              if (roomResult.length === 0) {
                return res.status(400).send("Data not found");
              }
              const room_id = roomResult[0].id;
          
              const reservations_id = result.insertId;
          
              // Insert ข้อมูลการจองลงในตาราง reservationsdetal
              db.query(
                "INSERT INTO reservationsdetal (reservations_id, room_id, date_use, std_amount) VALUES (?, ?, ?, ?)",
                [reservations_id, room_id, req.body.date_use, req.body.std_amount],
                (err, result) => {
                  if (err) {
                    console.error(
                      "Error inserting data into reservationsdetal:",
                      err
                    );
                    return res
                      .status(500)
                      .send("Error inserting data into reservationsdetal");
                  }
          
                  // ส่งคำตอบกลับเมื่อเสร็จสิ้น
                  res.send("Values inserted");
                }
              );
            }
          );
          
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

reservationRouter.delete("/api/data/reservations/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM reservations WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
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
