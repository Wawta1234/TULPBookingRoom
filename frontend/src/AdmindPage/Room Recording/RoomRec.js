import React, { useState } from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
export default function RoomRec() {
  const navigate = useNavigate();

  const [filterCriteria, setFilterCriteria] = useState({
    faculty: "",
    teacher: "",
    std_num: "",
    section: "",
    building: "",
    floor: "",
    
    //เหลือเรื่องวันที่
  });

  const handleFilterChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setFilterCriteria({
        ...filterCriteria,
        [name]: value,
      });
    }
  };
 
  const navigateToRec2 = () => {
    navigate("/RoomRecording/RoomRecording2", { state: filterCriteria });
  };

  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="content">
          คณะ
          <span>&nbsp;&#42;</span>:
          <select name="faculty_id" onChange={handleFilterChange}>
            <option value="">-กรุณาเลือกคณะ-</option>
            <option value="1">นิติศาสตร์</option>
            <option value="2">สังคมสงเคราะห์ศาสตร์</option>
            <option value="3">วิทยาลัยสหวิทยาการ</option>
            <option value="4">ศิลปกรรมศาสตร์</option>
            <option value="5">วิทยาศาสตร์แลัเทคโนโลยี</option>
            <option value="6">สาธารณะสุขศาสตร์</option>
          </select>
          รายวิชา <span>&nbsp;&#42;</span> :
          <input
            type="text"
            name="subject"
            onChange={(e) => handleFilterChange(e)}
          />
          {/* อาจารย์ผู้สอน
          <span>&nbsp;&#42;</span> : 
          <input type="text" name=""
          />
          <br /> */}
          <p />
          จำนวนผู้เข้าร่วม
          <span>&nbsp;&#42;</span> :
          <input type="number" name="std_amount"
          />
          เซค
          <span>&nbsp;&#42;</span>
          <input type="number" name="section"
          />
          <br />
          <p />
          อาคาร <span>&nbsp;&#42;</span>:
          <select name="building_id" onChange={handleFilterChange}>
            <option value="">-กรุณาเลือกอาคาร-</option>
            <option value="1">อาคารบุญชูปณิธาน</option>
            <option value="2">อาคารเรียนรวม 4 ชั้น</option>
            <option value="3">อาคารเรียนรวม 5 ชั้น</option>
            <option value="4">อาคารสิรินธรารัตน์</option>
            <option value="5">อาคารนวัตกรรมบริการ</option>
            <option value="6">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
            <option value="7">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
          </select>
          ชั้น :
          <select name="floor" onChange={handleFilterChange}>
            <option value="">-กรุณาเลือกชั้น-</option>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            <option value="4"> 4</option>
            <option value="5"> 5</option>
          </select>
          <p />
          {/* ติดไว้ก่อน */}
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
