const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const userRouter = router


userRouter.get('/api/data/user', (req, res) => {
    // const username = req.query.username; // รับชื่อผู้ใช้งานจากพารามิเตอร์ของคำขอ
    db.query("SELECT * FROM user ", (err, result) => {
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
});


userRouter.post('/api/data/user/create', (req, res) => {
    console.log("Request body: ", req.body);

    const username = req.body.username;
    const displayname_th = req.body.displayname_th;
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department;

    // ตรวจสอบว่ามีผู้ใช้งานอยู่ในฐานข้อมูลหรือไม่
    db.query("SELECT * FROM user WHERE username = ?", [username], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error checking user existence");
            return;
        }

        // ถ้ามีผู้ใช้งานอยู่แล้วในฐานข้อมูล
        if (rows.length > 0) {
            res.status(400).send("User already exists");
            return;
        }

        // หากไม่มีผู้ใช้งานอยู่ในฐานข้อมูล ให้ทำการเพิ่มข้อมูลผู้ใช้
        db.query("INSERT INTO user (username, displayname_th, email, password , department ) VALUES (?, ?, ?, ?, ?)",
            [username, displayname_th, email, password, department],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error inserting data");
                } else {
                    res.send("Values inserted");
                }
            }
        );
    });
});




// userRouter.post('/api/data/user/create', (req, res) => {
//     console.log("Request body: ", req.body);

//     const id = req.body.id;
//     const username = req.body.username;
//     const displayname_th = req.body.displayname_th;
//     const email = req.body.email;
//     const password = req.body.password;
//     const department = req.body.department;
   

//     db.query("INSERT INTO user (id, username, displayname_th, email, password ,department) VALUES ( ?, ?, ?, ?, ? , ?)",
//         [id, username, displayname_th, email, password, department],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Values inserted");
//             }
//         }
//     );
// });

userRouter.put('/api/data/user/update', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const username = req.body.username;
    const displayname_th = req.body.displayname_th;
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department;

    db.query("UPDATE user SET username = ?, displayname_th = ?, email = ?, password = ? ,department = ?, WHERE id = ?",
        [id, username, displayname_th, email, password, department],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

userRouter.delete('/api/data/user/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = userRouter;
