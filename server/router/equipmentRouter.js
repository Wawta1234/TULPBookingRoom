const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const equipmentRouter = router;

equipmentRouter .get('/api/data/equipment' , (req, res) =>{
    db.query("SELECT * FROM equipment", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

equipmentRouter.post('/api/data/equipment/creat' , (req, res) =>{
    console.log("Request body:", req.body);
   
    const room_id = req.body.room_id;
    const equipment_name = req.body.equipment_name;
    const quantity = req.body.quantity;
    
    db.query("INSERT INTO equipment (equipment_name, quantity, room_id) VALUES (?, ?, ?)", [room_id, equipment_name, quantity], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
    
})


equipmentRouter.put('/api/data/equipment/update/:room_id', (req, res) =>{
    console.log("Request body:", req.body);
    
    const { equipment_name, quantity } = req.body;
    const room_id = req.params.room_id;

    const sqlQuery = `UPDATE equipment 
                      SET equipment_name = ?, quantity = ? 
                      WHERE room_id = ?`;
  
    db.query(sqlQuery, [equipment_name, quantity, room_id], (err, result) => {
      if (err) {
        console.error('Error updating equipment:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      console.log('Equipment updated successfully');
      res.status(200).send('Equipment updated successfully');
    });
  });

  


equipmentRouter.delete('/api/data/equipment/delete/:room_id', (req, res) => {
    const id = req.params.id; // เปลี่ยนจาก req.params.room_id เป็น req.params.id เนื่องจากเรากำลังใช้ id ของอุปกรณ์
    db.query("DELETE FROM equipment WHERE id = ?", [id], (err, result) => { // เปลี่ยนจาก rooms เป็น equipment เนื่องจากตารางที่ต้องการลบข้อมูลคือ equipment
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});



module.exports = equipmentRouter ;