import React from "react";
import { useNavigate } from "react-router-dom";

export default function StatusBar() {
  //อาจจะต้องลบ yes no wait แต่ใช้การลูปและเงื่อนแล้วดึงแสดงข้อมูลมาแทน
  // const navigate = useNavigate();

  // const navigateToAll = () => {
  //   navigate("/reservations");
  // };
  // const navigateToWait= () => {
  //   navigate("/reservations/reservationWait");
  // };
  // const navigateToYes= () => {
  //   navigate("/reservations/reservationYes");
  // };
  // const navigateToNot= () => {
  //   navigate("/reservations/reservationNot");
  // };
  return (
    <div className="status-bar">
      <style>
        {`
          .status-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px;
          }
          
          button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: rgb(202, 194, 194);;
            color: #0e0d0d;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          button:hover {
            background-color: rgb(162, 156, 156);;
          }
          
        `}
      </style>
      <button>ทั้งหมด</button>
      <button>รอการอนุมัติ</button>
      <button>อนุมัติ</button>
      <button>ไม่อนุมัติ</button>
      {/* <button onClick={navigateToAll}>ทั้งหมด</button>
      <button onClick={navigateToWait}>รอการอนุมัติ</button>
      <button onClick={navigateToYes}>อนุมัติ</button>
      <button onClick={navigateToNot}>ไม่อนุมัติ</button> */}
    </div>
  );
}
