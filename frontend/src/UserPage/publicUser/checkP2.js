import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Room from '../../component/Room'
import { useNavigate, useLocation } from "react-router-dom";
import CheckAvailability from './check'

export default function CheckAvailability2() {
    const location = useLocation();
    const filterCriteria = location.state;
  return (
    <div>
    <Room building={filterCriteria.building} date={filterCriteria.dateStart} floor={filterCriteria.floor}/>
    
   </div>
  )
}

