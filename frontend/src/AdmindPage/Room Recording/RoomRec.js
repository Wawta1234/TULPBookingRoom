import React, { useState, useEffect } from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
export default function RoomRec() {
  const [filterCriteria, setFilterCriteria] = useState({
    faculty: "",
    teacher_name: "",
    section: "",
    dateStart: "",
    dateEnd: "",
    building_id: "",
    capacity: "",
    floor: "",
    room_type: "",
    subject : "",
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
        <div className="content">
          <form onSubmit={navigateToRec2}>
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
              onChange={handleFilterChange}
            />
            <p>
              อาจารย์ผู้บรรยาย :
              <input
                type="text"
                name="teacher_name"
                onChange={handleFilterChange}
              />
            </p>
            <p />
            จำนวนผู้เข้าร่วม
            <span>&nbsp;&#42;</span> :
            <input type="number" name="capacity"   onChange={handleFilterChange}/>
            เซค
            <span>&nbsp;&#42;</span>
            <input type="number" name="section" />
            <br />
            <p />
            อาคาร <span>&nbsp;&#42;</span>:
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
            <p>
              ประเภทห้อง
              <select name="room_type" onChange={handleFilterChange}>
                <option value="">-กรุณาเลือกประเภทห้อง-</option>
                <option value="1">ห้องเรียน </option>
                <option value="2">ห้องประชุม</option>
              </select>
            </p>
            {/* ติดไว้ก่อน */}
            ระบุ วัน เดือน ปี ที่ต้องการเริ่มการจอง :
            <input type="date" name="dateStart" onChange={handleFilterChange} />
            <br></br>
            ระบุ วัน เดือน ปี ที่ต้องการสิ้นสุดการจอง :
            <input type="date" name="dateEnd" onChange={handleFilterChange} />
            <p></p>
            <button onClick={navigateToRec2}>ตกลง </button>
          </form>
        </div>
      </WhiteRectangle>
    </>
  );
}
