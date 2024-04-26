import React, { useState, useEffect } from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./RoomRec.css"

export default function RoomRec() {
  const [filterCriteria, setFilterCriteria] = useState({
    faculty_id: "",
    teacher_name: "",
    section: "",
    dateStart: "",
    dateEnd: "",
    building_id: "",
    capacity: "",
    floor: "",
    room_type: "",
    subject: "",
    subject_name: "",
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

  const navigate = useNavigate();

  const navigateToRec2 = () => {
    navigate("/RoomRecording/RoomRecording2", { state: filterCriteria });
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
          dateEnd: "", // เคลียร์ค่าวันสิ้นสุด
        });
      }
    }
  }, [filterCriteria]);

  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="RoomRec">
          <h2>กรุณากรอกข้อมูลให้ครบ</h2>
          <form>
            <div className="form-group">
              <label htmlFor="faculty">คณะ:</label>
              <select name="faculty_id" id="faculty" onChange={handleFilterChange}>
                <option value="">-กรุณาเลือกคณะ-</option>
                <option value="1">นิติศาสตร์</option>
                <option value="2">สังคมสงเคราะห์ศาสตร์</option>
                <option value="3">วิทยาลัยสหวิทยาการ</option>
                <option value="4">ศิลปกรรมศาสตร์</option>
                <option value="5">วิทยาศาสตร์และเทคโนโลยี</option>
                <option value="6">สาธารณะสุขศาสตร์</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="teacher">อาจารย์ผู้บรรยาย:</label>
              <input type="text" name="teacher_name" id="teacher" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="subject">รายวิชา:</label>
              <input type="text" name="subject" id="subject" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="subjectName">ชื่อรายวิชา:</label>
              <input type="text" name="subject_name" id="subjectName" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">จำนวนผู้เข้าร่วม:</label>
              <input type="text" name="capacity" id="capacity" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="section">เซค:</label>
              <input type="text" name="section" id="section" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="building">อาคาร:</label>
              <select name="building_id" id="building" onChange={handleFilterChange}>
                <option value="">-กรุณาเลือกอาคาร-</option>
                <option value="1">อาคารบุญชูปณิธาน</option>
                <option value="2">อาคารเรียนรวม 4 ชั้น</option>
                <option value="3">อาคารเรียนรวม 5 ชั้น</option>
                <option value="5">อาคารสิรินธรารัตน์</option>
                <option value="6">อาคารนวัตกรรมบริการ</option>
                <option value="7">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
                <option value="8">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="floor">ชั้น:</label>
              <select name="floor" id="floor" onChange={handleFilterChange}>
                <option value="">-กรุณาเลือกชั้น-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="roomType">ประเภทห้อง:</label>
              <select name="room_type" id="roomType" onChange={handleFilterChange}>
                <option value="">-กรุณาเลือกประเภทห้อง-</option>
                <option value="1">ห้องเรียน</option>
                <option value="2">ห้องประชุม</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateStart">ระบุวันเริ่มการจอง:</label>
              <input type="date" name="dateStart" id="dateStart" onChange={handleFilterChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dateEnd">ระบุวันสิ้นสุดการจอง:</label>
              <input type="date" name="dateEnd" id="dateEnd" onChange={handleFilterChange} />
            </div>
            </form>
            <button type="button" onClick={navigateToRec2}>ตกลง</button>
          
        </div>
      </WhiteRectangle>
    </>
  );
}
