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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);
 console.log("userData Home is " , userData);
  
  // const location = useLocation();
  // const userData = location.state?.userData|| null;
  
  
  // console.log("userData" , userData);
  // console.log("ชื่อไทย " , userData.displayname_th);
 
  return (
    <>
      <Header />
      <Menu  userData/>
      <WhiteRectangle>

        <div className="content">
          <h2>เงื่อนไขการจองห้อง</h2>
          <h3>
            -การจองห้องจะต้องจองล่วงหน้า 3 วันทำการ{" "}
            <p>-การจองใน 1 ครั้ง จะสามารถจองได้เพียง 3 วัน</p>
          </h3>
          {/* {displayname_th && <p>ชื่อผู้ใช้: {displayname_th}</p>} */}
        </div>
     </WhiteRectangle>
    </>
  );
}

export default Home;
