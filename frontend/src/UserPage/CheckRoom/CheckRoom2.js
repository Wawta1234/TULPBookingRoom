import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Room from '../../component/Room'
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckRoom2() {
  const location = useLocation();
  const filterCriteria = location.state;
  return (
    <>
    <Header/>
    <Menu />
    <WhiteRectangle>
        <Room building_id={filterCriteria.building_id}  floor={filterCriteria.floor} room_type={ filterCriteria.room_type}/> 
    </WhiteRectangle>
    </>
  )
}
