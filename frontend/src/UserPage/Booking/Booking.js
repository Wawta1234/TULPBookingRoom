import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Booking.css";
export default function Booking() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [fuser, setFUser] = useState(" ");

  const navigate = useNavigate();

  const navigateToBook = () => {
    navigate("/Booking/booking2");
  };
  return (
    <>
      {" "}
      <Header />
      <Menu />
      <WhiteRectangle>
        <div className="content">
          <h2>กรุณากรอกข้อมูลให้ครบ</h2>

          <form action="" method="post">
            ระบุ วัน เดือน ปี ที่ต้องการเริ่มการจอง :
            <input type="date" name="start" />
            <br></br>
            ระบุ วัน เดือน ปี ที่ต้องการสิ้นสุดการจอง :
            <input type="date" name="start" />
            <p></p>
            อาคาร :
            <select name=" อาคาร">
            <option value="">-กรุณาเลือกอาคาร-</option>
              <option value="อาคารบุญชูปณิธาน">อาคารบุญชูปณิธาน</option>
              <option value="อาคารเรียนรวม 4 ชั้น">อาคารเรียนรวม 4 ชั้น</option>
              <option value="อาคารเรียนรวม 5 ชั้น">อาคารเรียนรวม 5 ชั้น</option>
              <option value="อาคารสิรินธรารัตน์">อาคารสิรินธรารัตน์</option>
              <option value="อาคารนวัตกรรมบริการ">อาคารนวัตกรรมบริการ</option>
              <option value="อาคารอเนกประสงค์และสนามกีฬาในร่ม">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
              <option value="อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
            </select>
            {/* <p>
            ชั้น :
            <select name="ชั้น ">
              <option value="">-กรุณาเลือกชั้น-</option>
              <option value="">=ชั้น 1</option>
              <option value="">ชั้น 2</option>
              <option value="">ชั้น 3</option>
              <option value="">ชั้น 4</option>
              <option value="">ชั้น 5</option>
            </select>
          </p> */}
            <p>
              จำนวนผู้เข้าร่วม :
              <input type="text" name="numberofuser" />
            </p>
            <p>
              <input type="radio" name="room" id="" value="meeting" />
              ห้องประชุม
              <input type="radio" name="room" id="" value="class" />
              ห้องบรรยาย
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
