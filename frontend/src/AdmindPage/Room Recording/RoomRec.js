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
    course_name: "",
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
// useEffect(() => {
//     const { dateStart, dateEnd } = filterCriteria;

//     if (dateStart && dateEnd) {
//       const startDate = new Date(dateStart);
//       const endDate = new Date(dateEnd);

//       if (startDate >= endDate) {
//         alert("กรุณาเลือกวันเริ่มต้นที่มาก่อนวันสิ้นสุด");
//         setFilterCriteria({
//           ...filterCriteria,
//           dateEnd: "" // เคลียร์ค่าวันสิ้นสุด
//         });
//       }
//     }
//   }, [filterCriteria]);

  // const getCourse = () => {
  //   Axios.get("http://localhost:8080/course" ,{

  //   })
  // }
  const navigateToRec2 = () => {
    navigate("/RoomRecording/RoomRecording2",{ state: filterCriteria });
  };

  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="content">
          <label for="faculty">คณะ</label>
          <span>&nbsp;&#42;</span>
          <select
            value={filterCriteria.faculty}
            onChange={(e) => handleFilterChange(e)} name="faculty"
          >
            <option value="">-กรุณาเลือกคณะ-</option>
            <option value="นิติศาสตร์">นิติศาสตร์</option>
            <option value="สังคมสงเคราะห์ศาสตร์">สังคมสงเคราะห์ศาสตร์</option>
            <option value="วิทยาลัยสหวิทยาการ">วิทยาลัยสหวิทยาการ</option>
            <option value="ศิลปกรรมศาสตร์">ศิลปกรรมศาสตร์</option>
            <option value="วิทยาศาสตร์แลัเทคโนโลยี">
              วิทยาศาสตร์แลัเทคโนโลยี
            </option>
            <option value="สาธารณะสุขศาสตร์">สาธารณะสุขศาสตร์</option>
          </select>

          <label for="title">รายวิชา</label>
          <span>&nbsp;&#42;</span>
          <input
            value={filterCriteria.course_name}
            onChange={(e) => handleFilterChange(e)}name="course_name"
          />

          <label for="title">อาจารย์ผู้สอน</label>
          <span>&nbsp;&#42;</span>
          <input
            value={filterCriteria.teacher}
            onChange={(e) => handleFilterChange(e)}name="teacher"
          />
          <br />

          <label for="title">จำนวนผู้เข้าร่วม</label>
          <span>&nbsp;&#42;</span>
          <input
            value={filterCriteria.std_num}
            onChange={(e) => handleFilterChange(e)}name="std_num"
          />

          <label for="title">เซค</label>
          <span>&nbsp;&#42;</span>
          <input
            value={filterCriteria.section}
            onChange={(e) => handleFilterChange(e)}name="section"
          />
          <br />

          <label for="title">อาคาร</label>
          <span>&nbsp;&#42;</span>
          <select
            value={filterCriteria.building}
            onChange={(e) => handleFilterChange(e)} name="building"
          >
            <option value="">-กรุณาเลือกอาคาร-</option>
            <option value="อาคารบุญชูปณิธาน">อาคารบุญชูปณิธาน</option>
            <option value="อาคารเรียนรวม 4 ชั้น">อาคารเรียนรวม 4 ชั้น</option>
            <option value="อาคารเรียนรวม 5 ชั้น">อาคารเรียนรวม 5 ชั้น</option>
            <option value="อาคารสิรินธรารัตน์">อาคารสิรินธรารัตน์</option>
            <option value="อาคารนวัตกรรมบริการ">อาคารนวัตกรรมบริการ</option>
            <option value="อาคารอเนกประสงค์และสนามกีฬาในร่ม">
              อาคารอเนกประสงค์และสนามกีฬาในร่ม
            </option>
            <option value="อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม">
              อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม
            </option>
          </select>

          <label for="title">ชั้น</label>
          <span>&nbsp;&#42;</span>
          <select
            value={filterCriteria.floor}
            onChange={(e) => handleFilterChange(e)} name="floor"
          >
            <option value="">-กรุณาเลือกชั้น-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 </option>
          </select>
          <br />

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
