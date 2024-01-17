import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function CancelLast() {
    const navigate = useNavigate();
    const handleConfirm = (e) => {
        e.preventDefault();
        Swal.fire({
          title: 'ยกเลิกคำขอจองห้องเรียบร้อย',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/cancelReserva"); 
        
        });
      };
  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle>
        <div className="content">
            
          <pre>
            ชื่อ - สกุล ผู้จอง : xxxxxx xxxxxx รหัสนักศึกษา : 6201453689 <br />
            อีเมลล์ : xxx.xxxxxx@dome.tu.ac.th คณะ : วิทยาศาสตร์และเทคโนโลยี{" "}
            <br />
            สถานที่ : อาคารบุญชูปนิธาน <br />
            วันที่ 1 : 20/04/66 เวลา : 13 : 30 - 16 : 30 ห้อง : 7301 <br />
            วันที่ 2 : 21/04/66 เวลา : 13 : 30 - 16 : 30 ห้อง : 7301 <br />
            ชื่อโครงการ : xxxxxxxxxxxxxxx จำนวนผู้เข้าร่วม : xx
            <br />
            เบอร์โทรติดต่อ : xxxxxxxxxx เอกสารอนุมัติโครงการ / กำหนดการ :
            xxxxxxx
            <br />
          </pre>
        </div>
        <button className="btn btn-danger" style={{ backgroundColor: 'rgb(255, 0, 0)', color: 'white' }} onClick={handleConfirm}>ยกเลิกการจองห้อง</button>
      </WhiteRectangle>
    </>
  );
}
