import React, { useState } from "react";
import Axios from "axios";
import Header from "../../component/Header";
import AdminBar from "../../component/AdminBar";
import WhiteRectangle from "../../component/WhiteRectangle";

export default function RoomData() {
    const [room_number, setRoomNumber] = useState("");
    const [building_id, setbuilding_id] = useState("");
    const [floor, setFloor] = useState("");
    const [capacity, setCapacity] = useState("");
    const [room_type, setRoomType] = useState("");
    // const [building_id, setbuilding_id] = useState("");
    // const [floor, setfloor] = useState("");
    const [successPopup, setSuccessPopup] = useState(false);
    const [equipment_name, setEquipmentName] = useState("");
    const [quantity, setQuantity] = useState("");

    const addRoomData = () => {
      Axios.post(
        "http://localhost:8080/api/data/roomForAdd/create",
        {
          room_number: room_number,
          building_id: building_id,
          floor: floor,
          capacity: capacity,
          room_type: room_type,
          equipment_name: equipment_name,
          quantity: quantity,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          setSuccessPopup(true);
        })
        .catch((error) => {
          console.error("Error adding room:", error);
        });
    };
  
    const handleConfirm = () => {
      setSuccessPopup(false); // ปิดป๊อปอัพเมื่อคลิกตกลง
    };

    return (
        <>
          <Header />
          <AdminBar />
          <WhiteRectangle>
            <div className="container">
              <h1>บันทึกข้อมูลห้อง</h1>
              <div className="information">
                <div className="mb-3">
                  <label htmlFor="Building" className="form-label">
                    อาคาร :
                  </label>
                  <select
                    className="form-select"
                    onChange={(event) => {
                      setbuilding_id(event.target.value);
                    }}
                  >
                    <option value="">-กรุณาเลือกอาคาร-</option>
                    <option value="1">อาคารบุญชูปณิธาน</option>
                    <option value="2">อาคารเรียนรวม 4 ชั้น</option>
                    <option value="3">อาคารเรียนรวม 5 ชั้น</option>
                    <option value="4">อาคารสิรินธรารัตน์</option>
                    <option value="5">อาคารนวัตกรรมบริการ</option>
                    <option value="6">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
                    <option value="7">
                      อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม
                    </option>
                  </select>
                </div>
              </div>
    
              <div className="mb-3">
                <label htmlFor="floor" className="form-label">
                  ชั้น
                </label>
                <select
                  className="form-select"
                  onChange={(event) => {
                    setFloor(event.target.value);
                  }}
                >
                  <option value="">-กรุณาเลือกชั้น-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
    
              <div className="mb-3">
                <label htmlFor="room_type" className="form-label">
                  ประเภทห้อง
                </label>
                <select
                  className="form-select"
                  onChange={(event) => {
                    setRoomType(event.target.value);
                  }}
                >
                  <option value="">-กรุณาเลือกประเภทห้อง-</option>
                  <option value="1">ห้องเรียน</option>
                  <option value="2">ห้องประชุม</option>
                </select>
              </div>
    
              <form>
                <div className="mb-3">
                  <label htmlFor="room_number" className="form-label">
                    หมายเลขห้อง :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ระบุหมายเลขห้อง"
                    onChange={(event) => {
                      setRoomNumber(event.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="capacity" className="form-label">
                    จำนวนที่นั่ง:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ระบุจำนวนที่นั่งที่สามารถบรรจุได้"
                    onChange={(event) => {
                      setCapacity(event.target.value);
                    }}
                  ></input>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="equipment_name" className="form-label">
                    ชื่ออุปกรณ์:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ระบุชื่ออุปกรณ์"
                    onChange={(event) => setEquipmentName(event.target.value)}
                  />
                </div>
    
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    จำนวน:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ระบุจำนวนอุปกรณ์"
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
    
                <button className="btn btn-success" onClick={addRoomData}>
                  เพิ่มห้อง
                </button>
              </form>
    
              {successPopup && (
                <div className="alert alert-success" role="alert">
                  บันทึกข้อมูลสำเร็จ
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleConfirm}
                  ></button>
                </div>
              )}
            </div>
          </WhiteRectangle>
        </>
      );
    }
