import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
// import Room from '../../component/Room'
import RoomCheck from '../../UserPage/publicUser/RoomCheck'
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminCheck2() {
  const location = useLocation();
  const filterCriteria = location.state;
  const { building_id, floor, room_type, dateStart, dateEnd } = filterCriteria;

  console.log("dateStart is ",dateStart);
  console.log("dateEnd is ",dateEnd);
  return (
    <>
    <Header/>
    <AdminBar />
    <WhiteRectangle>
    <RoomCheck building_id = {filterCriteria.building_id}  floor={filterCriteria.floor} room_type={ filterCriteria.room_type} dateStart={filterCriteria.dateStart}  dateEnd={filterCriteria.dateEnd}/> 
    </WhiteRectangle>
    </>
  )
}
