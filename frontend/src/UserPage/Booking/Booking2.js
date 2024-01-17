import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Booking.css"
export default function Booking2() {
  const navigate = useNavigate();
  const navigateToBooking= () => {
    navigate("/Booking");
  };
  const navigateToBooking3= () => {
    navigate("/Booking/booking2/booking3");
  };
  return (
    <>
      {" "}
      <Header />
      <Menu />
      <WhiteRectangle>
        <Room />
        <button className="edit-btn" onClick={navigateToBooking}>แก้ไข</button>
        <button onClick={navigateToBooking3}>ตกลง</button>
      </WhiteRectangle>
      </>
  )
}