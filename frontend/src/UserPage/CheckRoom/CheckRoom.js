import React, { useState, useEffect } from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import "./CheckRoom.css"
export default function CheckRoom() {
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
    navigate("/checkRoom/checkRoom2", { state: filterCriteria });
  }

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
            </p>
             */}
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
      </WhiteRectangle>
    </>
  );
  }
