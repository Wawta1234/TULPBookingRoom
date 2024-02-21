const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const teacherRouter = router


teacherRouter.get('/api/data/teacher', (req, res) => {
    const { id } = req.query;
    let sql = "SELECT teacher.*, subject.teacher_id FROM teacher INNER JOIN subject ON subject.teacher_id = teacher.id";
    if (id) {
        sql += ` WHERE teacher.id = ${id}`;
    }
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});


teacherRouter.post('/api/data/teacher/create', (req, res) =>{
    console.log("Request body:", req.body);
    
    const id = req.body.id;
    const teacher_name = req.body.teacher_name	 ;
    
    db.query("INSERT INTO teacher (id, teacher_name ) VALUES(?,?)",[id, teacher_name],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})
teacherRouter.put('/api/data/teacher/update', (req,res) => {
    const id = req.body.id;
    const teacher_name = req.body.teacher_name;

    db.query("UPDATE teacher SET teacher_name = ? WHERE id = ?", [teacher_name, id], (err, result) =>{
        if (err) {
            console.error(err);       
            res.status(500).send("Error updating data");
        } else {
            res.send(result);
        } 
    });
});


teacherRouter.delete('/api/data/teacher/delete', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM teacher WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = teacherRouter;