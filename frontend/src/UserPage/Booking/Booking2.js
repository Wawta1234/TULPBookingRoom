import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import { useNavigate, useLocation } from "react-router-dom";


export default function Booking2() {
  const location = useLocation();
  const filterCriteria = location.state;

  const navigate = useNavigate();


console.log("Filter Criteria:", filterCriteria);
  
  const navigateToBooking= () => {
    navigate("/Booking");
  };

  const navigateToBooking3= () => {
    navigate("/Booking/booking2/booking3");
  };

  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle >
        {/* ส่งข้อมูลอาคาร วันที่ และชั้นเข้าไปเพื่อแสดง */}
        <Room building_id={filterCriteria.building_id} floor={filterCriteria.floor} capacity={filterCriteria.capacity} room_type={ filterCriteria.room_type}/>
        <button className="edit-btn" onClick={navigateToBooking}>แก้ไข</button>
        <button onClick={navigateToBooking3}>ตกลง</button>
      </WhiteRectangle>
    </>
  )
}
