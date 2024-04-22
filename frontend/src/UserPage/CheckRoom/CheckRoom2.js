import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import RoomCheck from '../../UserPage/publicUser/RoomCheck'
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckRoom2() {
  const location = useLocation();
  const filterCriteria = location.state;
  return (
    <>
    <Header/>
    <Menu />
    <WhiteRectangle>
    <RoomCheck building_id = {filterCriteria.building_id}  floor={filterCriteria.floor} room_type={ filterCriteria.room_type} dateStart={filterCriteria.dateStart}  dateEnd={filterCriteria.dateEnd}/> 
    </WhiteRectangle>
    </>
  )
}
