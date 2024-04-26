import React from "react";
import "./Menu.css"

export default function AdminBar() {
  return (
    <div className="menubar">
   
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />

      <section class="menu">
        <ul>
          <li>
          <i class="bi bi-save2"></i>
            <a href="/RoomRecording">บันทึกห้องบรรยาย</a>
          </li>
          <li>
          <i class="bi bi-pencil-square"></i>
            <a href="/EditRoom">แก้ไขข้อมูลห้องบรรยาย</a>
          </li>
          <li>
          <i class="bi bi-card-checklist"></i>
            <a href="/AdmindReservations">ตรวจสอบคำขอ</a>
          </li>
          <li>
          <i class="bi bi-building-check"></i>
            <a href="/AdminCheckRoom">ตรวจสอบสถานะห้องว่าง</a>
          </li>
          <li>
          <i class="bi bi-database-add"></i>
            <a href="/Roomdata">บันทึกข้อมูลห้อง</a>
          </li>
          
        </ul>
      </section>
  </div>
  );
}
