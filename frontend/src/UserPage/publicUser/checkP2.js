import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
// import Room from '../../component/Room' 
import { useNavigate, useLocation } from "react-router-dom";
import RoomCheck from './RoomCheck'


export default function CheckAvailability2() {
    const bookingHeaderStyle = {
        color: "red",
      };
    const location = useLocation();
    const filterCriteria = location.state;

  return (
    <div>
        <h1 style={bookingHeaderStyle}>
        TULP
        <br />
        Booking Room
      </h1>
      
      <RoomCheck building_id = {filterCriteria.building_id}  floor={filterCriteria.floor} room_type={ filterCriteria.room_type} dateStart={filterCriteria.dateStart}  dateEnd={filterCriteria.dateEnd}/> 
    
   </div>
  )
}

