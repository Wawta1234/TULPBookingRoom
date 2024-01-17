// Home.js

import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import Status from "../../component/Status";
import StatusBar from "../../component/statusBar";

function Home() {
  const location = useLocation();
  const user = location.state?.user || null;

  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle>
   {/* <StatusBar /> */}
        {/* <Room /> */}
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
  );
}

export default Home;
