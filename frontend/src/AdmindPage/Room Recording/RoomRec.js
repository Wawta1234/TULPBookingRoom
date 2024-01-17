import React from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";

export default function RoomRec() {
    const navigate = useNavigate();

    const navigateToRec2 = () => {
      navigate("/RoomRecording/RoomRecording2");
    };
  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="content">
          <label for="Faculty">คณะ</label>
          <span>&nbsp;&#42;</span>
          <select name="คณะ">
            <option value="">-กรุณาเลือกคณะ-</option>
            <option value="">นิติศาสตร์</option>
            <option value="">สังคมสงเคราะห์ศาสตร์</option>
            <option value="">วิทยาลัยสหวิทยาการ</option>
            <option value="">ศิลปกรรมศาสตร์</option>
            <option value="">วิทยาศาสตร์แลัเทคโนโลยี</option>
            <option value="">สาธารณะสุขศาสตร์</option>
          </select>

          <label for="title">รายวิชา</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="Subjects" />

          <label for="title">อาจารย์ผู้สอน</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="Instructors" />
          <br />

          <label for="title">จำนวนผู้เข้าร่วม</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="Students" />

          <label for="title">เซค</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="Section " />
          <br />

          <label for="title">อาคาร</label>
          <span>&nbsp;&#42;</span>
          <select name="Building">
            <option value="">-กรุณาเลือกอาคาร-</option>
            <option value="">อาคารสิรินธรารัตน์</option>
            <option value="">อาคารเรียนรวม 4 ชั้น</option>
            <option value="">อาคารเรียนรวม 5 ชั้น</option>
            <option value="">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
            <option value="">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม </option>
            <option value="">อาคารนวัตกรรมบริการ</option>
            <option value="">อาคารบุญชูปณิธาน</option>
          </select>

          <label for="title">ชั้น</label>
          <span>&nbsp;&#42;</span>
          <select name="Floor">
            <option value="">-กรุณาเลือกชั้น-</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5 </option>
          </select>
          <br />

          <label for="title">วันที่เริ่มการบรรยาย </label>
          <span>&nbsp;&#42;</span>
          <input type="date" name="start" />
          <label for="title">วันที่สิ้นสุดการบรรยาย </label>
          <span>&nbsp;&#42;</span>
          <input type="date" name="stop" />
          <br />

          <button onClick={navigateToRec2}>ตกลง </button>
        </div>
      </WhiteRectangle>
    </>
  );
}
