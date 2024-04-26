import React, { useState } from 'react';
import Header from '../../component/Header';
import AdminBar from '../../component/AdminBar';
import WhiteRectangle from '../../component/WhiteRectangle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EditRoom.css";
import Swal from "sweetalert2";
export default function EditRoom() {
  const navigate = useNavigate();

  const [filterCriteria, setFilterCriteria] = useState({
    subject: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const navigateToEdit2 = () => {
    // ตรวจสอบว่ามีรายวิชาที่ถูกป้อนหรือไม่
    if (filterCriteria.subject.trim() !== "") {
      // เรียกใช้ API เพื่อตรวจสอบรายวิชา
      axios
        .get("http://localhost:8080/api/data/subject", {
          params: { subject: filterCriteria.subject },
        })
        .then((response) => {
          // ตรวจสอบว่ามีข้อมูลรายวิชาหรือไม่
          if (response.data.length > 0) {
            // หากมีรายวิชา ไปหน้าถัดไป
            navigate("/EditRoom/EditRoom2", { state: filterCriteria });
          } else {
            // ถ้าไม่มีรายวิชา ใช้ Swal แจ้งเตือน
            Swal.fire({
              icon: 'error',
              title: 'ไม่พบรายวิชา',
              text: 'ไม่พบรายวิชาที่คุณค้นหา',
            });
          }
        })
        .catch((error) => {
          // กรณีเกิดข้อผิดพลาดในการเรียกใช้ API
          console.error('Error fetching subject data:', error);
          alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
        });
    } else {
      // ถ้าไม่ได้ป้อนรายวิชาให้แสดงข้อความแจ้งเตือน
      alert("กรุณาระบุรายวิชาที่ต้องการแก้ไข");
    }
  };

  return (
    <> 
      <Header />
      <AdminBar  />
      <WhiteRectangle>
        <div className="EditRoom">
          <label for="title">ระบุรายวิชาที่ต้องการแก้ไข</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="subject" onChange={handleFilterChange} />
          <p/>
          <button onClick={navigateToEdit2}>ตกลง</button>
        </div>
      </WhiteRectangle>
    </>
  );
}
