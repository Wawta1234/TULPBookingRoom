import React, { useState, useEffect } from "react";
import "./CheckRoom.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CheckroomFrom() {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState({
    dateStart: "",
    dateEnd: "",
    building: "",
    capacity: "",
    floor: ""
  });

  
const handleFilterChange = (event) => {
  const { name, value } = event.target;
  setFilterCriteria({
    ...filterCriteria,
    [name]: value,
  });
};

const navigateToCheckRoom2 = () => {
if (!filterCriteria.dateStart || !filterCriteria.building || !filterCriteria.floor){
  window.alert("กรุณากรอกข้อมูลให้ครบ");
}else{
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
          <form action="" method="post">
          อาคาร :
            <select name="building" onChange={handleFilterChange}>
              <option value="">-กรุณาเลือกอาคาร-</option>
              <option value="อาคารบุญชูปณิธาน">อาคารบุญชูปณิธาน</option>
              <option value="อาคารเรียนรวม 4 ชั้น">อาคารเรียนรวม 4 ชั้น</option>
              <option value="อาคารเรียนรวม 5 ชั้น">อาคารเรียนรวม 5 ชั้น</option>
              <option value="อาคารสิรินธรารัตน์">อาคารสิรินธรารัตน์</option>
              <option value="อาคารนวัตกรรมบริการ">อาคารนวัตกรรมบริการ</option>
              <option value="อาคารอเนกประสงค์และสนามกีฬาในร่ม">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
              <option value="อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
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
            {/* <p>
              จำนวนผู้เข้าร่วม :
              <input type="text" name="capacity" onChange={handleFilterChange} />
            </p> */}
            
            <form action="" method="get">
              ระบุ วัน เดือน ปี ที่ต้องการตรวขสอบ :
              <input type="date" name="dateStart" onChange={handleFilterChange} />
            </form>
            <p>
            <input type="radio" name="room" id="meeting-room" value="meeting" />{" "}
              ห้องประชุม
              <input type="radio" name="room" id="class-room" value="class" />
              ห้องบรรยาย
            </p>
            <button onClick={ navigateToCheckRoom2}>ตกลง </button> 
          </form>
        </div>
  );
}
