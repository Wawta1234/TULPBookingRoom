const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const subjectRouter = router

// subjectRouter.get("/api/data/subject", (req, res) => {
//     db.query("SELECT * FROM subject", (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูลรายวิชา");
//         } else {
//             res.status(200).send(result);
//         }
//     });
// });

  
subjectRouter.get('/api/data/subject' , (req, res) =>{
    const {subject} = req.query;
    let sql = "SELECT * FROM subject"
    if (subject) {
        sql += " WHERE subject = ?";
        db.query(sql, [subject], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        });
    }
});

subjectRouter.post('/api/data/subject/creat', (req, res) =>{
    console.log("Request body:", req.body);
    
    const id = req.body.id;
    const subject  = req.body.subject ;
    const subject_name = req.body.subject_name;
    const teacher_id  = req.body.teacher_id ;
    const faculty_id = req.body.faculty_id;

    db.query("INSERT INTO subject (id, subject ,subject_name,teacher_id,faculty_id) VALUES(?,?,?,?,?)",[id, subject ,subject_name,teacher_id,faculty_id],
    (err,result) =>{
        if(err){
            console.log(err);
        } else{
            res.send("Valuse inserted");
        }
    }
    )
})
subjectRouter.put('/api/data/subject/update', (req,res) => {
    const id = req.body.id;
    const subject  = req.body.subject ;
    const subject_name = req.body.subject_name;
    const teacher_id  = req.body.teacher_id ;
    const faculty_id = req.body.faculty_id;


   
    db.query("UPDATE subject SET subject = ?, subject_name = ?, teacher_id = ?, faculty_id = ? WHERE id = ?", [subject, subject_name, teacher_id, faculty_id, id], (err, result) => {
        if (err) {
            console.error(err);       
        } else {
            res.send(result);
        } 
    });
    
})

subjectRouter.delete('/api/data/subject/delete', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM subject WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = subjectRouter;