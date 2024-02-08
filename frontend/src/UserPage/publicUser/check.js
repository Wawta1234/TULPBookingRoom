
import React from "react";
import WhiteRectangle from "../../component/WhiteRectangle";
import CheckroomFrom from "../../component/CheckroomFrom";

export default function CheckAvailability() {
  const bookingContainerStyle = {
    backgroundColor: "white", // พื้นหลังสีขาว
    width: "fit-content", // ตั้งค่าขนาดตามเนื้อหา
    margin: "auto", // ย้ายไปตรงกลาง
    padding: "20px", // เพิ่ม Padding 20px
    borderRadius: "10px", // กำหนดมุมโค้ง
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", // เพิ่มเงา
    with: "300px"
  };

  const bookingHeaderStyle = {
    color: "red",

  };
  // const buttonStyle = {
  //   backgroundColor: "green", // กำหนดสีเขียว
  //   color: "white", // กำหนดสีข้อความเป็นขาว
  //   padding: "10px 20px", // กำหนดขนาดพื้นที่ padding
  //   border: "none", // กำหนดไม่มีเส้นขอบ
  //   borderRadius: "5px", // กำหนดเส้นรอบวง
  //   cursor: "pointer", // เปลี่ยนรูปแบบเคอร์เซอร์เป็น pointer เมื่อชี้ไปที่ปุ่ม
  //   display: "block", // ทำให้ปุ่มตรงกลาง
  //   margin: "auto", // ย้ายไปตรงกลาง
  //   marginTop: "20px", // ขยับจากด้านบน
  // };


  return (
    <div>
      <h1 style={bookingHeaderStyle}>
        TULP
        <br />
        Booking Room
      </h1>
      <div style={bookingContainerStyle}>
        <br />
        <CheckroomFrom />
 
      </div>
    </div>
  );
}