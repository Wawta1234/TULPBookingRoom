import React, { useState, useEffect } from "react";
import "./CheckRoom.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CheckroomFrom() {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState({
    dateStart: "",
    building_id: "",
    floor: "",
    room_type: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const navigateToCheckRoom2 = () => {
    if (!filterCriteria.dateStart || !filterCriteria.building_id || !filterCriteria.floor || !filterCriteria.room_type){
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบ',
      });
    } else {
      navigate("/checkRoomPublic/checkRoomPublic2", { state: filterCriteria });
    }
  }
  
  // const formatDate = (date) => {
  //   const [year, month, day] = date.split("-");
  //   return `${day}/${month}/${year}`;
  // };

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };
  return (
    <div className="checkroom">
      <h2>กรุณากรอกข้อมูลให้ครบ</h2>
      <div>
        อาคาร :
        <select name="building_id" onChange={handleFilterChange}>
          <option value="">-กรุณาเลือกอาคาร-</option>
          <option value="1">อาคารบุญชูปณิธาน</option>
          <option value="2">อาคารเรียนรวม 4 ชั้น</option>
          <option value="3">อาคารเรียนรวม 5 ชั้น</option>
          <option value="5">อาคารสิรินธรารัตน์</option>
          <option value="6">อาคารนวัตกรรมบริการ</option>
          <option value="7">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
          <option value="8">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
        </select>
        <p>
          ชั้น :
          <select name="floor" onChange={handleFilterChange}>
            <option value="">-กรุณาเลือกชั้น-</option>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            <option value="4"> 4</option>
            <option value="5"> 5</option>
          </select>
        </p>
        <form action="" method="get">
              ระบุ วัน เดือน ปี ที่ต้องการเริ่มการตรวจสอบ :
              <input
                type="date"
                name="dateStart"
                onChange={handleFilterChange}
              />
            </form>
            <form action="" method="get">
              ระบุ วัน เดือน ปี ที่ต้องการสิ้นสุดการตรวจสอบ :
              <input type="date" name="dateEnd" onChange={handleFilterChange} />
            </form>
        <p>
          ประเภทห้อง
          <select name="room_type" onChange={handleFilterChange}>
            <option value="">-กรุณาเลือกประเภทห้อง-</option>
            <option value="1">ห้องเรียน </option>
            <option value="2">ห้องประชุม</option>
          </select>
        </p>
        <button onClick={navigateToCheckRoom2}>ตกลง </button>
      </div>
    </div>
  );
}