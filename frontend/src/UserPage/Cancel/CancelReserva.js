
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Status from '../../component/Status'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import StatusBar from '../../component/statusBar'
export default function CancelReserva() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const { reservationId } = useParams();

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    console.log("userData B3 :", userDataFromStorage);
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.username) {
      axios
        .get("http://localhost:8080/api/data/reservations", {
          params: {
            username: userData.username,
          },
        })
        .then((response) => {
          setReservations(response.data);
          console.log("ข้อมูลที่ได้ ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching reservations data:", error);
        });
    }
  }, [userData, reservationId]);

  const handleItemClick = (reservationId) => {
    navigate(`/reservations/reservationTwo/${reservationId}`);
  };
  

  return (

    <>
    <Header />
    <Menu />
    <WhiteRectangle >
    <div className="status">
    {reservations
        .filter((reservation) => reservation.approve === 3) // เอาแค่ข้อมูล 2 (รอการอนุมัติ)
        .map((reservation) => {
          const room = rooms.find((room) => room.id === reservation.room_id);
          return (
            
            <div key={reservation.id} className="item" onClick={() => handleItemClick(reservation.id)}>
              <i className="bi bi-calendar-check"></i>
              <p><pre>
                วันที่ทำรายการ : {" "}
                {new Date(reservation.date_reser).toLocaleDateString()}     ชื่อโครงการ : {reservation.objective}
                
                <br/>สถานะคำขอ : {reservation.approve	 === 1
                  ? "อนุมัติ"
                  : reservation.approve	 === 2
                  ? "ดำเนินการ"
                  : reservation.approve	 === 3
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