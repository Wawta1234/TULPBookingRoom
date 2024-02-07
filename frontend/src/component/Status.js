import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Status() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/data/reservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations data:", error);
      });

    axios.get("http://localhost:8080/api/data/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms data:", error);
      });
  }, []);

  const filterReservationsByStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    
    <div className="status">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
      <style>
        {`
          .status-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px;
          }
          
          button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: rgb(202, 194, 194);;
            color: #0e0d0d;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          button:hover {
            background-color: rgb(162, 156, 156);;
          }
          
        `}
      </style>
      <StatusBar onFilterChange={filterReservationsByStatus} />
      {reservations
        .filter((reservation) =>
          filterStatus === null ? true : reservation.reservations_status === filterStatus
        )
        .map((reservation) => {
          const room = rooms.find((room) => room.id === reservation.room_id);
          return (
            <div key={reservation.id} className="item">
              <i className="bi bi-calendar-check"></i>
              <p>
                วันที่ :{" "}
                {new Date(reservation.date).toLocaleDateString()} เวลา :{" "}
                {reservation.time_slot_id === 1
                  ? "09:30 - 12:30"
                  : reservation.time_slot_id === 2
                  ? "13:30 - 16:30"
                  : reservation.time_slot_id === 3
                  ? "17:00 - 20:00"
                  : "ไม่ระบุเวลา"}
                <br />
                ห้อง :{room ? room.room_number : "ไม่พบข้อมูล"} ชั้น :{room ? room.floors : "ไม่พบข้อมูล"} อาคาร :
                {room ? room.building : "ไม่พบข้อมูล"}
                <br/>สถานะคำขอ :
                {reservation.reservations_status	 === 1
                  ? "อนุมัติ"
                  : reservation.reservations_status	 === 2
                  ? "รออนุมัติ"
                  : reservation.reservations_status	=== 0
                  ? "ไม่อนุมัติ"
                  : "ไม่ระบุ"} 
              </p>
            </div>
          );
        })}
    </div>
  );
}

function StatusBar({ onFilterChange }) {
  const handleClick = (status) => {
    onFilterChange(status);
  };

  return (
    <div className="status-bar">
      <button onClick={() => handleClick(null)}>ทั้งหมด</button>
      <button onClick={() => handleClick(2)}>รอการอนุมัติ</button>
      <button onClick={() => handleClick(1)}>อนุมัติ</button>
      <button onClick={() => handleClick(0)}>ไม่อนุมัติ</button>
    </div>
  );
}
