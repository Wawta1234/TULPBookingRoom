import React, { useState } from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Booking3() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRooms = location.state ? location.state.selectedRooms : [];
  const building = location.state ? location.state.building : "";
  const floor = location.state ? location.state.floor : "";
  const dateStart = location.state ? location.state.dateStart : "";
  const dateEnd = location.state ? location.state.dateEnd : "";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const date = location.state ? location.state.date : "";

  // useEffect(() => {
  //   const userDataFromStorage = localStorage.getItem("userData");
  //   console.log("Building from location state:", building); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่า building
  //   console.log("userData B3 :", userDataFromStorage);
  //   if (userDataFromStorage) {
  //     setUserData(JSON.parse(userDataFromStorage));
  //   }
  // }, [building]);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");

    console.log("userData B3 :", userDataFromStorage);
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);
  console.log("userData B3 is:", userData);

  const handleConfirm = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "ส่งคำขอเรียบร้อย",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/Home");
    });
  };
  const navigateToBooking2 = () => {
    navigate("/Booking/booking2");
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
                วันที่ :    {room.date
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
            <label for="title">กรุณาระบุชื่อโครงการ</label>
            <span>&nbsp;&#42;</span>
            <input type="text" name="title" /> จำนวนผู้เข้าร่วม : xx <br />
            <label for="equipment">เบอร์โทรติดต่อ</label>
            <span>&nbsp;&#42;</span>
            <input type="text" name="phone" />
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
          <button onClick={handleConfirm}>ตกลง</button>
        </div>
      </WhiteRectangle>
    </>
  );
}
