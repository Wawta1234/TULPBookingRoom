import React from "react";
import "./CheckRoom.css"

export default function CheckroomFrom() {
  return (
    <div className="checkroom">
      
        <h2>กรุณากรอกข้อมูลให้ครบ</h2>
        <form action="" method="post">
          อาคาร
          <select name="อาคาร ">
            <option value="">-กรุณาเลือกอาคาร-</option>
            <option value="">อาคารบุญชูปณิธาน</option>
            <option value="">อาคารบุญชูปณิธาน</option>
            <option value="">อาคารเรียนรวม 5 ชั้น</option>
            <option value="">อาคารสิรินธรารัตน์</option>
            <option value="">อาคารนวัตกรรมบริการ</option>
          </select>
          <p>
            <label for="title">จำนวนผู้เข้าร่วม</label>
            <input type="text" name="numberofuser" />
          </p>
          <form action="" method="get">
            ระบุ วัน เดือน ปี ที่ต้องการตรวขสอบ :
            <input type="date" name="start" />
            <br></br>
          </form>
          <p>
            <input type="radio" name="room" id="meeting-room" value="meeting" />{" "}
            ห้องประชุม
            <input type="radio" name="room" id="class-room" value="class" />
            ห้องบรรยาย
          </p>
        </form>
   
    </div>
  );
}
