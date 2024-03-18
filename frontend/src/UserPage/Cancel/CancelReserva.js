
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Status from '../../component/Status'
// import StatusBar from '../../component/statusBar'
export default function CancelReserva() {
  
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/data/reservations/approve")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations data:", error);
      });

    axios.get("http://localhost:8080/api/data/allRooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms data:", error);
      });
  }, []);

  

  return (

    <>
    <Header />
    <Menu />
    <WhiteRectangle >
    <div className="status">
    {reservations
        .filter((reservation) => reservation.approve === 2) // Filter only reservations with status 2 (รอการอนุมัติ)
        .map((reservation) => {
          const room = rooms.find((room) => room.id === reservation.room_id);
          return (
            <div key={reservation.id} className="item">
              <i className="bi bi-calendar-check"></i>
              <p><pre>
                วันที่ : {" "}
                {new Date(reservation.date_reser).toLocaleDateString()}     เวลา : {" "}
                {reservation.time_slot_id === 1
                  ? "09:30 - 12:30"
                  : reservation.time_slot_id === 2
                  ? "13:30 - 16:30"
                  : reservation.time_slot_id === 3
                  ? "17:00 - 20:00"
                  : "ไม่ระบุเวลา"}
                <br />
                 ห้อง : {reservation.room_number }     ชั้น : {reservation.floor }     อาคาร :  {reservation.building_name }
                <br/>สถานะคำขอ : {reservation.approve	 === 1
                  ? "อนุมัติ"
                  : reservation.approve	 === 2
                  ? "รออนุมัติ"
                  : reservation.approve	=== 0
                  ? "ไม่อนุมัติ"
                  : "ไม่ระบุ"} </pre>
              </p>
            </div>
          );
        })}
    </div>
    </WhiteRectangle>
    </>
  )
}

function StatusBar({ onFilterChange }) {
  const handleClick = (status) => {
    onFilterChange(status);
  };
  return (

    <div className="status-bar">
     
      <button onClick={() => handleClick(2)}>รอการอนุมัติ</button>
      
    </div>
  );
}