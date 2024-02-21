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
    // if ( !room_id) {
    //     return res.status(400).send("ID and building name are required");
    // }

    db.query("INSERT INTO equipment (equipment_name, quantity, room_id) VALUES (?, ?, ?)", [room_id, equipment_name, quantity], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
    
})


equipmentRouter.put('/api/data/equipment/update' , (req, res) =>{
    console.log("Request body:", req.body);
    const id = req.body.id;
    const room_id = req.body.room_id;
    const equipment_name = req.body.equipment_name;
    const quantity = req.body.quantity;

    db.query("UPDATE equipment SET room_id = ?, equipment_name = ?, quantity = ? WHERE id = ?", [room_id, equipment_name, quantity, id], (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Values updated");
        }
    });
});


equipmentRouter.delete('/api/data/equipment/delete/:id', (req, res) => {
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