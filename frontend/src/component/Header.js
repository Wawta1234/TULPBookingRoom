
import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; 
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const location = useLocation();
  // const displayname_th = location.state?.displayname_th || null;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);
console.log("userData Header is:" , userData);


  const handleLogout = () => {
    // console.log("name : ",displayname_th)
    const confirmLogout = window.confirm("ต้องการออกจากระบบหรือไม่?");
    if (confirmLogout) {
      localStorage.removeItem("userData");
      navigate("/", { replace: true });
    }
  };
  return (
    <header className="body">
      <h1>TULP<br /> 
        Booking Room</h1> {/* ชื่อ "TULP Booking Room" อยู่ทางซ้ายมือ */}
        
        {userData ? userData.displayname_th : ''}
        <a onClick={handleLogout}>ออกจากระบบ</a> 
      {/* <i className="bi bi-person"onClick={handleLogout}></i> ไอคอนคนอยู่ขวามือ */}
    </header>
  );
};

export default Header;
