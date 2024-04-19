const express = require("express");
const router = express.Router();
const db = require("../connect"); // Correct the import statement
const roomAddRouter = router;

roomAddRouter.get("/api/data/roomAll", (req, res) => {
  db.query(
    "SELECT room.*, equipment.equipment_name ,  equipment.room_id ,  equipment.quantity, building.building_name FROM room INNER JOIN equipment on room.id = equipment.room_id inner join building on room.building_id = building.id;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  //    console.log("Request body in get data:", req.body);
});

roomAddRouter.get("/api/data/roomAvailable", (req, res) => {
  const { time_slot_id, date_use, room_id } = req.query; // ดึงค่าพารามิเตอร์จาก req.query
//   console.log("data is : ", req.query);
  // ตรวจสอบว่ามีค่าพารามิเตอร์ที่ต้องการหรือไม่
 
  db.query(
    "SELECT COUNT(*) AS count FROM reservationsdetal WHERE time_slot_id = ? AND date_format(date_use, '%Y-%m-%d') = ? AND room_id = ? ",
    [time_slot_id, date_use, room_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("An error occurred while fetching room availability.");
      } else {
        const count = result[0].count; // รับค่า count จากผลลัพธ์ของ query
        // console.log("count is :", count);
        res.send({ count }); // ส่งค่า count ไปยัง frontend
      }
    }
  );
});

// roomAddRouter.post('/api/data/roomForAdd/create' , (req, res) =>{
//     console.log("Request body:", req.body);

//     // const id = req.body.id;
//     const room_number = req.body.room_number;
//     const building_id = req.body.building_id;
//     const floor = req.body.floor;
//     const capacity = req.body.capacity;
//     const room_type = req.body.room_type;

//     db.query("INSERT INTO room (room_number, building_id,floor, capacity, room_type) VALUES(?,?,?,?,?)",[room_number, building_id,floor, capacity, room_type],
//     (err,result) =>{
//         if(err){
//             console.log(err);
//         } else{
//             res.send("Valuse inserted");
//         }
//     }
//     )
// })

roomAddRouter.post("/api/data/roomForAdd/create", (req, res) => {
  console.log("Request body is:", req.body);

  const {
    room_number,
    building_id,
    floor,
    capacity,
    room_type,
    equipmentList,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error starting transaction");
    }

    db.query(
      "INSERT INTO room (room_number, building_id, floor, capacity, room_type) VALUES (?, ?, ?, ?, ?)",
      [room_number, building_id, floor, capacity, room_type],
      (err, roomResult) => {
        if (err || !roomResult) {
          db.rollback(() => {
            console.error(err || "Room insertion failed");
            return res.status(500).send(err || "Room insertion failed");
          });
        } else {
          const room_id = roomResult.insertId;

          equipmentList.forEach((equipment) => {
            db.query(
              "INSERT INTO equipment (equipment_name, quantity, room_id) VALUES (?, ?, ?)",
              [equipment.equipment_name, equipment.quantity, room_id],
              (err, equipmentResult) => {
                if (err) {
                  db.rollback(() => {
                    console.error(err);
                    return res
                      .status(500)
                      .send("Error inserting data into equipment table");
                  });
                }
              }
            );
          });

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error(err);
                return res.status(500).send("Error committing transaction");
              });
            }
            console.log("Transaction successfully committed");
            res.send("Data inserted successfully");
          });
        }
      }
    );
  });
});

roomAddRouter.put("/api/data/roomForAdd/update", (req, res) => {
  console.log("Request body:", req.body);
  const id = req.body.id;
  const room_number = req.body.room_number;
  const building_id = req.body.building_id;
  const floor = req.body.floor;
  const capacity = req.body.capacity;
  const room_type = req.body.room_type;

  db.query(
    "UPDATE room SET room_number = ?, building_id = ?, floor = ?, capacity = ?, room_type = ? WHERE id = ?",
    [room_number, building_id, floor, capacity, room_type, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  );
});

roomAddRouter.delete("/api/data/roomForAdd/delete/:room_id", (req, res) => {
  const room_id = req.params.room_id;
  console.log("Delete room with room_id:", room_id);

  db.query(
    "DELETE FROM equipment WHERE room_id = ?",
    [room_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("เกิดข้อผิดพลาดในการลบข้อมูลอุปกรณ์ภายในห้อง");
      } else {
        db.query("DELETE FROM room WHERE id = ? ", [room_id], (err, result) => {
          // console.log("id is :", id);
          if (err) {
            console.error(err);
            res.status(500).send("เกิดข้อผิดพลาดในการลบห้อง");
          } else {
            res.send("ลบห้องและข้อมูลอุปกรณ์ภายในห้องเรียบร้อยแล้ว");
          }
        });
      }
    }
  );
});

roomAddRouter.get("/api/data/roomForAdd", (req, res) => {
  const { building_id, floor, capacity, room_type } = req.query;
  // console.log(response.data);
  let sql =
    "SELECT room.*, building.building_name FROM room inner join building on room.building_id = building.id WHERE 1=1";

  if (building_id) {
    sql += ` AND room.building_id = '${building_id}'`;
  }
  if (floor) {
    sql += ` AND floor = '${floor}'`;
  }
  if (capacity) {
    if (capacity <= 50) {
      sql += " AND capacity = 50";
    } else if (capacity > 50 && capacity <= 100) {
      sql += " AND capacity = 100";
    } else if (capacity > 100 && capacity <= 150) {
      sql += " AND capacity = 150";
    } else if (capacity > 150 && capacity <= 200) {
      sql += " AND capacity = 200";
    } else if (capacity > 200 && capacity <= 250) {
      sql += " AND capacity = 250";
    } else if (capacity > 250 && capacity <= 500) {
      sql += " AND capacity = 500";
    } else {
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

roomAddRouter.get("/api/data/roomForRoomCheck", (req, res) => {
  const { building_id, floor, room_type } = req.query;
  // console.log(response.data);
  let sql =
    "SELECT room.*, building.building_name FROM room inner join building on room.building_id = building.id WHERE 1=1";

  if (building_id) {
    sql += ` AND room.building_id = '${building_id}'`;
  }
  if (floor) {
    sql += ` AND floor = '${floor}'`;
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

module.exports = roomAddRouter;
