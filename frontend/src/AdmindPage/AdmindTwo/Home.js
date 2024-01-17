import React from "react";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import AdminBar2 from "../../component/AdminBar2";
import { useLocation } from "react-router-dom";



export default function HomeAdd() {
    const location = useLocation();
    const user = location.state?.user || null;
  return (
    <>
    <Header />
    <AdminBar2 />
    <WhiteRectangle >
    {/* {user && <p>ชื่อผู้ใช้: {user}</p>} */}
    </WhiteRectangle></>
  )
}
