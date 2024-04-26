const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement
const buildingRouter = router;


buildingRouter.get('/api/data/building/:id', (req, res) => {
    const buildingId = req.params.id;
    
    db.query("SELECT building_name FROM building WHERE id = ?", buildingId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.send(result[0]); // ส่งข้อมูลอาคารเฉพาะของ building_id ที่ระบุกลับไป
           
        }
    });
}); 

buildingRouter.post('/api/data/building/create', (req, res) => {
    console.log("Request body:", req.body);
    
    const id = req.body.id;
    const building_name = req.body.building_name;

    if (!id || !building_name) {
        return res.status(400).send("ID and building name are required");
    }

    db.query("INSERT INTO building (id, building_name) VALUES (?, ?)", [id, building_name], (err, result) => {
        if(err) {
            console.log(err);
            // res.status(500).send("Error inserting data");
        } else {
            res.send("Values inserted");
        }
    });
});

buildingRouter.put('/api/data/building/update', (req,res) => {
    const id = req.body.id;
    const building_name = req.body.building_name;

    db.query("UPDATE building SET building_name = ? WHERE id = ?", [building_name, id], (err, result) =>{
        if (err) {
            console.error(err);       
            // Handle error response if needed
        } else {
            res.send(result);
        } 
    });
})


buildingRouter.delete('/api/data/building/delete', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM building WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = buildingRouter ;