import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Booking.css"
export default function Booking3() {
    const navigate = useNavigate();
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
  const navigateToBooking2= () => {
    navigate("/Booking/booking2");
  };
  return (
    <>
      {" "}
      <Header />
      <Menu />
      <WhiteRectangle>
      <div className="contentbooking3">
        <h2>กรุณากรอกรายละเอียดเพิ่มเติมให้ครบ</h2><pre>
        ชื่อ - สกุล ผู้จอง : xxxxxx xxxxxx          รหัสนักศึกษา : 6201453689 <br />
        อีเมลล์ : xxx.xxxxxx@dome.tu.ac.th        คณะ : วิทยาศาสตร์และเทคโนโลยี <br /><br />
        สถานที่ : ชั้น 3   อาคารบุญชูปนิธาน <br />
        วันที่ 1 : 20/04/66        เวลา : 13 : 30 - 16 : 30       ห้อง : 7301 <br />
        วันที่ 2 : 21/04/66        เวลา : 13 : 30 - 16 : 30       ห้อง : 7301 <br /></pre><br />
        <label for="title">กรุณาระบุชื่อโครงการ</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="title" /> จำนวนผู้เข้าร่วม : xx <br />
        <label for="equipment">เบอร์โทรติดต่อ</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="phone" />
        <label for="Projectdocuments">เอกสารอนุมัติโครงการ / กำหนดการ</label>
        <span>&nbsp;&#42;</span>
        <input type="file" name="Projectdocuments" /> <br />
        <button className="edit-btn" onClick={navigateToBooking2}>แก้ไข</button>
        <button onClick={handleConfirm}>ตกลง</button>
        
      </div>
      </WhiteRectangle>
      </>
  )
}