const express = require('express');
const router = express.Router();
const db = require('../connect'); // Correct the import statement

const userRouter = router


userRouter.get('/api/data/user', (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


userRouter.post('/api/data/user/create', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const user_id = req.body.user_id;
    const frist_name = req.body.frist_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
   

    db.query("INSERT INTO user (id, user_id, frist_name, last_name, email, password) VALUES (?, ?, ?, ?, ?, ?, )",
        [id, user_id, frist_name, last_name, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});
userRouter.post('/api/data/user/create', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const user_id = req.body.user_id;
    const frist_name = req.body.frist_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
   

    db.query("INSERT INTO user (id, user_id, frist_name, last_name, email, password) VALUES (?, ?, ?, ?, ?, ?)",
        [id, user_id, frist_name, last_name, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

userRouter.put('/api/data/user/update', (req, res) => {
    console.log("Request body: ", req.body);

    const id = req.body.id;
    const user_id = req.body.user_id;
    const frist_name = req.body.frist_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    

    db.query("UPDATE user SET user_id = ?, frist_name = ?, last_name = ?, email = ?, password = ?  WHERE id = ?",
        [id, user_id, frist_name, last_name, email, password],
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
