import React from "react";
import "./Status.css"
export default function Status() {
  return (
    <div className="status">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
       <div className="item">
        <i class="bi bi-calendar-check"></i>
        วันที่ XX/XX/XXXX เวลา XX : XX - XX : XX <br />
        ห้อง XXXX ชั้น XX อาคาร XXXX อนุมัติแล้ว
      </div>
    </div>
  );
}
