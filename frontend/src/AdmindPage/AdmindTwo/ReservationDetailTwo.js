import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../component/Header";
import Menu from "../../component/Menu";
import AdminBar2 from "../../component/AdminBar2";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate, useLocation } from "react-router-dom";

export default function ReservationDetailTwo() {
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
    axios
      .get(`http://localhost:8080/api/data/reservations/${reservationId}`)
      .then((response) => {
        setReservations(response.data);
        console.log("ข้อมูลที่ได้ ", response.data);
        setUserData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching reservations data:", error);
      });
  }, [reservationId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function handleApproveReservation(reservationId) {
    // ส่งคำขออัปเดตสถานะ approve ไปยังเซิร์ฟเวอร์
    axios
      .put(
        `http://localhost:8080/api/data/reservations/update/${reservationId}`,
        { approve: 1 }
      )
      .then(() => {
        console.log("อนุมัติคำขอเรียบร้อยแล้ว");
        // แสดงข้อความแจ้งเตือน
        Swal.fire({
          title: "อนุมัติคำขอเรียบร้อย",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/AdminHomeTwo");
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอนุมัติคำขอ:", error);
        // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการอนุมัติคำขอ",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  function handleCancelReservation(reservationId) {
    axios
      .put(
        `http://localhost:8080/api/data/reservations/Noapprove/${reservationId}`,
        { approve: 0}
      )
      .then(() => {
        console.log("ไม่อนุมัติคำขอเรียบร้อยแล้ว");
        Swal.fire({
          title: "ไม่อนุมัติคำขอเรียบร้อย",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/AdminHomeTwo");
        });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการไม่อนุมัติคำขอ:", error);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการไม่อนุมัติคำขอ",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  return (
    <>
      <Header />
      <AdminBar2 />
      <WhiteRectangle>
        <pre>
          <br />
          คณะ : {userData && userData.department}
          <br />
          ชื่อผู้จอง : {userData && userData.displayname_th} <br />
          รหัสนักศึกษา : {userData && userData.username} <br />
          e-mail : {userData && userData.email} <br />
          <br />
          <br />
          {reservations.length > 0 && (
            <div key={reservations[0].id}>
              โครงการ : {reservations[0].objective} จำนวนผู้เข้าร่วม :{" "}
              {reservations[0].std_amount} <br />
              {reservations.map((reservation, index) => (
                <div key={index}>
                  วันที่ {formatDate(reservation.date_use)} เวลา :{" "}
                  {reservation.time_slot_id === 1
                    ? "09:30 - 12:30"
                    : reservation.time_slot_id === 2
                    ? "13:30 - 16:30"
                    : reservation.time_slot_id === 3
                    ? "17:00 - 20:00"
                    : "ไม่ระบุเวลา"}{" "}
                  ห้อง : {reservation.room_number} อาคาร :{" "}
                  {reservation.building_name}
                </div>
              ))}
              <br />
              <br />
              <br />
              {reservations[0].approve === 2 && (
                <>
                  <button
                    onClick={() => handleApproveReservation(reservationId)}
                    style={{ backgroundColor: "#008000", color: "white" }}
                  >
                    อนุมัติ
                  </button>

                  <button
                    onClick={() => handleCancelReservation(reservationId)}
                    style={{ backgroundColor: "#C3002F", color: "white" }}
                  >
                    ไม่อนุมัติ
                  </button>
                </>
              )}
            </div>
          )}
        </pre>
      </WhiteRectangle>
    </>
  );
}
