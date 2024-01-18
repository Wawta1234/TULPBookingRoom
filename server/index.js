const express = require('express');
const app= express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database : "tulpbookingrooms"
})
app.listen('3002', () =>{
    console.log('server is running on port 3002');
})