// Header.js
import React from "react";
import "./Header.css"; // คุณสามารถสร้างไฟล์ CSS นี้เพื่อใช้ในการจัดรูปแบบ

const Header = () => {
  return (
    <header className="header">
      <h1>TULP<br /> 
        Booking Room</h1> {/* ชื่อ "TULP Booking Room" อยู่ทางซ้ายมือ */}
      <i className="bi bi-person"></i> {/* ไอคอนคนอยู่ขวามือ */}
    </header>
  );
};

export default Header;
