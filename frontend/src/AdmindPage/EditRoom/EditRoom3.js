import React from "react";
import Header from "../../component/Header";
import AdminBar from "../../component/AdminBar";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useLocation } from "react-router-dom";

export default function EditRoom3() {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    console.error("No data passed from previous page");
    return null; // หรือแสดงข้อความแจ้งเตือนหรือโครงสร้าง HTML อื่นๆ ตามต้องการ
  }
  const { subjectData, timetable } = state;
  console.log("ข้อมูลที่ส่งมาใน EditRoom3: ", subjectData, timetable);

  const subject = subjectData[0]; // เรียกใช้ข้อมูลของวิชาจาก index 0
  const subjectName = subject.subject_name;
  const teacherName = subject.teacher_name;
  

  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="EditRoom3">
        <h3>
          <pre>
            รหัสวิชา : {subject.subject}     รายวิชา : {subjectName}      ผู้สอน : {teacherName}
          </pre>
        </h3>

          <label for="title">จำนวนผู้เข้าร่วม</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="title" />

          <label for="title">เซค</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="Section " />
          <br />

          <label for="title">อาคาร</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="title" />

          <label for="title">ชั้น</label>
          <span>&nbsp;&#42;</span>
          <input type="text" name="title" />
          <br />

          <label for="title">วันที่เริ่มการบรรยาย </label>
          <span>&nbsp;&#42;</span>
          <input type="date" name="start" />
          <label for="title">วันที่สิ้นสุดการบรรยาย </label>
          <span>&nbsp;&#42;</span>
          <input type="date" name="start" />
        </div>
      </WhiteRectangle>
    </>
  );
}
