import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const Booking3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRooms = location.state ? location.state.selectedRooms : [];
  const building = location.state ? location.state.building : "";
  const floor = location.state ? location.state.floor : "";
  const capacity = location.state ? location.state.capacity : "";
  const [userData, setUserData] = useState(null);
  const date = location.state ? location.state.date : "";
  const selectedTime = location.state ? location.state.selectedTime : "";

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);

  const addReservations = () => {
    const objective = document.getElementsByName("objective")[0].value;
    console.log("user id in booking3  is :", userData.username);
    selectedRooms.forEach((room) => {
      axios
        .post(
          "http://localhost:8080/api/data/reservations/create",
          {
            user_id: userData.username,
            date_reser: new Date(),
            approve: 2,
            objective: objective,
            time_slot_id: room.selectedTime,
            room_id: room.room_number,
            date_use: new Date(room.date),
            std_amount: capacity

          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Data posted successfully:", response.data);
          Swal.fire({
            title: "ส่งคำขอเรียบร้อย",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/Home");
          });
        })
        .catch((error) => {
          console.error("Error adding room:", error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถส่งคำขอได้ในขณะนี้ โปรดลองอีกครั้ง",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    });
  };
  

  const getBuildingName = () => {
    switch (parseInt(building)) {
      case 1:
        return "อาคารบุญชูปณิธาน";
      case 2:
        return "อาคารเรียนรวม 4 ชั้น";
      case 3:
        return "อาคารเรียนรวม 5 ชั้น";
      case 5:
        return "อาคารสิรินธรารัตน์";
      case 6:
        return "อาคารนวัตกรรมบริการ";
      case 7:
        return "อาคารอเนกประสงค์และสนามกีฬาในร่ม";
      case 8:
        return "อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม";
      default:
        return "";
    }
  };
  const navigateToBooking2 = () => {
    navigate("/Booking/booking2");
  };

  return (
    <>
      {" "}
      <Header />
      <Menu />
      <WhiteRectangle>
        <div className="contentbooking3">
          <h2>กรุณากรอกรายละเอียดเพิ่มเติมให้ครบ</h2>
          <pre>
            ชื่อ - สกุล ผู้จอง : {userData ? userData.displayname_th : ""} <p />
            รหัสนักศึกษา : {userData ? userData.username : ""} <br />
            อีเมลล์ : {userData ? userData.email : ""} คณะ :{" "}
            {userData ? userData.department : ""}
            <br />
            <br />
            สถานที่    ชั้น  : {floor}       อาคาร : {getBuildingName()}
            <br />
            {selectedRooms.map((room, index) => (
              <div key={index}>
                วันที่  {room.date
                    ? new Date(room.date).toLocaleDateString()
                    : ""}{" "}    เวลา : {" "}
                {room.selectedTime === "1"
                  ? "09:30 - 12:30"
                  : room.selectedTime === "2"
                  ? "13:30 - 16:30"
                  : room.selectedTime === "3"
                  ? "17:00 - 20:00"
                  : ""}{" "}    ห้อง : {room.room_number} <br />
              </div>
            ))}
          </pre>
          <br />
          <pre>
            <label for="objective">กรุณาระบุชื่อโครงการ</label>
            <span>&nbsp;&#42;</span>
            <input type="text" name="objective" /> จำนวนผู้เข้าร่วม : {capacity} <br />
            <label for="Projectdocuments">
              {" "}
              เอกสารอนุมัติโครงการ / กำหนดการ
            </label>
            <span>&nbsp;&#42;</span>
            <input type="file" name="Projectdocuments" /> <br />
          </pre>
          <button className="edit-btn" onClick={navigateToBooking2}>
            แก้ไข
          </button>
          <button onClick={addReservations}>ตกลง</button>

          {/* <input type="date" name="date_reser" /> */}
        </div>
      </WhiteRectangle>
    </>
  );
}
export default Booking3;
