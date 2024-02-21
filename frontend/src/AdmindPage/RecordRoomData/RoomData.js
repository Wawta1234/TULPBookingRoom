import React, { useState } from "react";
import Axios from "axios";
import Header from "../../component/Header";
import AdminBar from "../../component/AdminBar";
import WhiteRectangle from "../../component/WhiteRectangle";

export default function RoomData() {
  const [room_number, setRoomNumber] = useState(0);
  const [building_id, setBuildingId] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [room_type, setRoomType] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [roomsList, setroomList] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);

  const [equipmentList, setEquipmentList] = useState([]);
  const [equipment_name, setEquipment_name] = useState("");
  const [quantity, setQuantity] = useState(0);

  const addRoomData = () => {
    Axios.post(
      "http://localhost:8080/api/data/roomForAdd/create",
      {
        room_number: room_number,
        building_id: selectedBuilding,
        floor: selectedFloor,
        capacity: capacity,
        room_type: room_type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setroomList([
        ...roomsList,
        {
          room_number: room_number,
          capacity: capacity,
          building: selectedBuilding,
          floor: selectedFloor,
          room_type: room_type,
          building_id: selectedBuilding,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ]);
      setSuccessPopup(true);
    });

  Axios.post(
    "http://localhost:8080/api/data/equipment/create",
    {
      room_number: room_number,
      equipment_name: equipment_name,
      quantity: quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(() => {
      console.log("Equipment added successfully");
    })
    .catch((error) => {
      console.error("Error adding equipment:", error);
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
                  setSelectedBuilding(event.target.value);
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
            <label htmlFor="floors" className="form-label">
              ชั้น
            </label>
            <select
              className="form-select"
              onChange={(event) => {
                setSelectedFloor(event.target.value);
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

          <form action="">
            <div className="mb-3">
              <label htmlFor="room_number" className="form-label">
                หมายเลขห้อง :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="ระบุหมายเลขห้อง"
                onChange={(Event) => {
                  setRoomNumber(Event.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                จำนวนที่นั่ง:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="ระบุจำนวนที่นั่งที่สามารถบรรจุได้"
                onChange={(Event) => {
                  setCapacity(Event.target.value);
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
                onChange={(event) => setEquipment_name(event.target.value)}
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
