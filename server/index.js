const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const db = require('./connect'); // Correct the import statement
const reservationRouter = require('./router/reservationrouter');
const roomsRouter = require('./router/rooms');
const timeslotRouter = require('./router/timeslotRouter')
const roomavailabilityRouter = require('./router/roomavailabilityRouter');


app.use(cors());
app.use(express.json());
app.use(reservationRouter);
app.use(roomsRouter);
app.use(timeslotRouter);
app.use(roomavailabilityRouter);

app.listen(8080, () => {
    console.log('server is running on port 8080');
});
