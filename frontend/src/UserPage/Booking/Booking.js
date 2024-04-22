import React, { useState, useEffect } from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Booking.css";

export default function Booking() {
  const [filterCriteria, setFilterCriteria] = useState({
    dateStart: "",
    dateEnd: "",
    building_id: "",
    capacity: "",
    floor: "",
    room_type : ""
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const navigateToBook = () => {
    navigate("/Booking/booking2", { state: filterCriteria });
  };

  useEffect(() => {
    const { dateStart, dateEnd } = filterCriteria;

    if (dateStart && dateEnd) {
      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);

      if (startDate >= endDate) {
        alert("กรุณาเลือกวันเริ่มต้นที่มาก่อนวันสิ้นสุด");
        setFilterCriteria({
          ...filterCriteria,
          dateEnd: "" // เคลียร์ค่าวันสิ้นสุด
        });
      }
    }
  }, [filterCriteria]);

  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle>
        <div className="Booking">
          <h2>กรุณากรอกข้อมูลให้ครบ</h2>
          <form action="" method="post">
            <form action="" method="get">
              ระบุ วัน เดือน ปี ที่ต้องการเริ่มการจอง :
              <input
                type="date"
                name="dateStart"
                onChange={handleFilterChange}
              />
            </form>
            <form action="" method="get">
              ระบุ วัน เดือน ปี ที่ต้องการสิ้นสุดการจอง :
              <input type="date" name="dateEnd" onChange={handleFilterChange} />
            </form>
            <p></p>
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
            <p>
              จำนวนผู้เข้าร่วม :
              <input type="text" name="capacity" onChange={handleFilterChange} />
            </p>
            <p>
              ประเภทห้อง 
              <select name="room_type" onChange={handleFilterChange}>
              <option value="">-กรุณาเลือกประเภทห้อง-</option>
              <option value="1">ห้องเรียน </option>
              <option value="2">ห้องประชุม</option>

            </select>
            </p>
            <p>
      
              <button onClick={navigateToBook}>ตกลง</button>
            </p>
          </form>
        </div>
      </WhiteRectangle>
    </>
  );
}