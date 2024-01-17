import React from 'react'
import AdminBar from '../../component/AdminBar';
import Header from '../../component/Header';
import WhiteRectangle from '../../component/WhiteRectangle';
import { useLocation } from "react-router-dom";

export default function AdminHome() {
    const location = useLocation();
    const user = location.state?.user || null;
  return (
    <>
    <Header />
    <AdminBar />
    <WhiteRectangle>
    <div className="content">
          <h2>เงื่อนไขการจองห้อง</h2>
          <h3>
            -การจองห้องจะต้องจองล่วงหน้า 3 วันทำการ{" "}
            <p>-การจองใน 1 ครั้ง จะสามารถจองได้เพียง 3 วัน</p>
          </h3>
          {user && <p>ชื่อผู้ใช้: {user}</p>}
        </div>
    </WhiteRectangle>
        </>
    
  )
}
