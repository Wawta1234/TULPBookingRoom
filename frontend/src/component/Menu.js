import React from "react";
import "./Menu.css"

export default function Menu(userData) {
  return (
    <div className="menubar">
   
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />

      <section class="menu">
        <ul>
          <li>
            <i class="bi bi-journal-plus" />
            <a href="/booking" usta>จองห้อง</a>
          </li>
          <li>
            <i class="bi bi-bookmark-check"></i>
            <a href="/checkRoom">ตรวจสอบสถานะห้องว่าง</a>
          </li>
          <li>
            <i class="bi bi-clipboard2-check"></i>
            <a href="/reservations">ตรวจสอบสถานะคำขอ</a>
          </li>
          <li>
            <i class="bi bi-clipboard2-x"></i>
            <a href="/cancelReserva">ยกเลิกการจองห้อง</a>
          </li>
        </ul>
      </section>
  </div>
  );
}
