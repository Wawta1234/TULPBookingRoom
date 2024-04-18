import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../component/Header";
import Menu from "../../component/Menu";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate, useLocation } from "react-router-dom";

export default function ReservationTwo() {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const { reservationId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    console.log("userData ReservationTwo :", userDataFromStorage);
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.username) {
      axios
        .get(`http://localhost:8080/api/data/reservations/${reservationId}`, {
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


function handleCancelReservation(reservationId) {
  Swal.fire({
    title: "ยืนยันการยกเลิกคำขอ",
    text: "คุณแน่ใจหรือไม่ที่ต้องการยกเลิกคำขอนี้?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยกเลิกคำขอ",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    //ตกลง
    if (result.isConfirmed) {
      // ลบคำขอ
      axios.delete(`http://localhost:8080/api/data/reservations/delete/${reservationId}`)
        .then(() => {
          console.log("ลบคำขอเรียบร้อยแล้ว");
          Swal.fire({
            title: "ยกเลิกคำขอเรียบร้อย",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/reservations");
          });
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบคำขอ:", error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดในการลบคำขอ",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  });
}

  
  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle>
        <pre>
          <br />
          คณะ : {userData && userData.department}
          <br />
          ชื่อผู้จอง : {userData && userData.displayname_th} รหัสนักศึกษา :{" "}
          {userData && userData.username} <br />
          e-mail : {userData && userData.email} <br />
          <br />
          <br />
          {reservations.length > 0 && (
            <div key={reservations[0].id}>
              โครงการ : {reservations[0].objective}    จำนวนผู้เข้าร่วม :{" "}
              {reservations[0].std_amount} <br />
              {reservations.map((reservation, index) => (
                <div key={index}>
                  วันที่ {formatDate(reservation.date_use)}       เวลา :{" "}
                  {reservation.time_slot_id === 1
                    ? "09:30 - 12:30"
                    : reservation.time_slot_id === 2
                    ? "13:30 - 16:30"
                    : reservation.time_slot_id === 3
                    ? "17:00 - 20:00"
                    : "ไม่ระบุเวลา"}{" "}     ห้อง : {reservation.room_number}        อาคาร :{" "}
                  {reservation.building_name}
                </div>
              ))}
              <br/><br/><br/>
              {reservations[0].approve === 3 && (
                <button onClick={() => handleCancelReservation(reservationId)}style={{ backgroundColor: '#C3002F', color: 'white' }}>
                  ยกเลิกคำขอ
                </button>
              )}
            </div>
          )}
        </pre>
      </WhiteRectangle>
    </>
  );
}