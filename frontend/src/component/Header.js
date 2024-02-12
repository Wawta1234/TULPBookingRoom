// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // คุณสามารถสร้างไฟล์ CSS นี้เพื่อใช้ในการจัดรูปแบบ

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };
  
  return (
    <header className="header">
      <h1>TULP<br /> 
        Booking Room</h1> {/* ชื่อ "TULP Booking Room" อยู่ทางซ้ายมือ */}
         <a onClick={handleLogout}>ออกจากระบบ</a> 
      {/* <i className="bi bi-person"onClick={handleLogout}></i> ไอคอนคนอยู่ขวามือ */}
    </header>
  );
};

export default Header;
