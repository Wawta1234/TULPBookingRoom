import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function StatusAdmin() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");

    console.log("userData B3 :", userDataFromStorage);
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);

  console.log("userData reservation in status  is:", userData);

  useEffect(() => {
    if (userData && userData.username) {
      // ตรวจสอบว่า userData ไม่เป็น null และมีค่า username
      axios
        .get("http://localhost:8080/api/data/reservationsForAdmin" , {
          params: {
            username: userData.username // ส่ง username ของผู้ใช้ที่ล็อกอินไปยังเซิร์ฟเวอร์
        }})
        .then((response) => {
          setReservations(response.data);
          console.log("ข้อมูลที่ได้ ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching reservations data:", error);
        });

      axios
        .get("http://localhost:8080/api/data/allRooms")
        .then((response) => {
          setRooms(response.data);
        })
        .catch((error) => {
          console.error("Error fetching rooms data:", error);
        });
    }
  }, [userData && userData.username]);
  
  console.log(
    "usename Data in status is:",
    userData ? userData.username : "userData is null"
  );

  const filterReservationsByStatus = (status) => {
    setFilterStatus(status);
  };

  const handleItemClick = (reservationId) => {
    navigate(`/AdmindReservations/AdmindReservationsDetail/${reservationId}`);
  };
  
  
  return (
    <div className="status">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
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
          filterStatus === null ? true : reservation.approve === filterStatus
        )
        .map((reservation) => {
          const room = rooms.find((room) => room.id === reservation.room_id);
          return (
            <div key={reservation.id} className="item" onClick={() => handleItemClick(reservation.id)}>
              <i className="bi bi-calendar-check"></i>
              <p>
                <pre>
                  วันที่ทำรายการ :{" "}
                  {new Date(reservation.date_reser).toLocaleDateString()}  ชื่อโครงการ : {reservation.objective}
                  {/* เวลา :{" "}
                  {reservation.time_slot_id === 1
                    ? "09:30 - 12:30"
                    : reservation.time_slot_id === 2
                    ? "13:30 - 16:30"
                    : reservation.time_slot_id === 3
                    ? "17:00 - 20:00"
                    : "ไม่ระบุเวลา"
                    } */}
                    
                  <br />
                  {/* ห้อง : {reservation.room_number} ชั้น : {reservation.floor}{" "}
                  อาคาร : {reservation.building_name} */}
                  <br />
                  สถานะคำขอ :{" "}
                  {reservation.approve === 1
                    ? "อนุมัติ"
                    : reservation.approve === 2
                    ? "ดำเนินการ"
                    : reservation.approve === 3
                    ? "รออนุมัติ"
                    : reservation.approve === 0
                    ? "ไม่อนุมัติ"
                    : "ไม่ระบุ"}{" "}
                </pre>
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
      <button onClick={() => handleClick(3)}>รอการอนุมัติ</button>
      <button onClick={() => handleClick(2)}>ดำเนินการ</button>
      <button onClick={() => handleClick(1)}>อนุมัติ</button>
      <button onClick={() => handleClick(0)}>ไม่อนุมัติ</button>
    </div>
  );
}
