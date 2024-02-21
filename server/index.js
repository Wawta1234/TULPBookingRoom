const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const db = require('./connect'); // Correct the import statement

const reservationRouter = require('./router/reservationrouter');
const roomsRouter = require('./router/rooms');
const timeslotRouter = require('./router/timeslotRouter')
const userRouter = require('./router/userRouter');
const buildingRouter = require('./router/buildingRouter');
const subjectRouter = require('./router/subjectRouter');
const facultyRouter = require('./router/facultyRouter');
const roomAddRouter = require('./router/roomAddRouter');
const equipmentRouter = require('./router/equipmentRouter');
const teacherRouter = require('./router/teacherRouter');
const timetableRouter = require('./router/timetableRouter')


app.use(cors());
app.use(express.json());
app.use(reservationRouter);
app.use(roomsRouter);
app.use(timeslotRouter);
app.use(timetableRouter);
app.use(userRouter);
app.use(buildingRouter);
app.use(subjectRouter);
app.use(facultyRouter);
app.use(roomAddRouter);
app.use(equipmentRouter);
app.use(teacherRouter);


app.listen(8080, () => {
    console.log('server is running on port 8080');
});
