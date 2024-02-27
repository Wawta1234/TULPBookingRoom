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
  const [room_id, setRoom_id] = useState("");
  // const [floor, setfloor] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [equipment_name, setEquipmentName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [roomsList, setroomList] = useState([]);
  // const [newEquipmentName, setNewEquipmentName] = useState("");
  
  const [newQuantity, setNewQuantity] = useState("");
  const [newEquipmentList, setNewEquipmentList] = useState([
    { equipment_name: "", quantity: "" },
  ]);

  const getRoomData = () => {
    Axios.get("http://localhost:8080/api/data/roomAll").then((response) => {
      setroomList(response.data);
    });
  };

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
        room_id: room_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setroomList([
          ...roomsList,
          {
            room_number: room_number,
            building_id: building_id,
            floor: floor,
            capacity: capacity,
            room_type: room_type,
            equipment_name: equipment_name,
            quantity: quantity,
            room_id: room_id,
          },
        ]);
        console.log(response.data);
        setSuccessPopup(true);
      })
      .catch((error) => {
        console.error("Error adding room:", error);
      });
  };

  const updateRoomData = (val) => {
    if (val && val.room_id) {
      Axios.put(
        `http://localhost:8080/api/data/equipment/update/${val.room_id}`,
        {
          equipment_name: val.equipment_name,
          quantity: newQuantity,
        }
      )
        .then((response) => {
          console.log("Updated successfully");
          setroomList((prevRoomsList) =>
            prevRoomsList.map((room) =>
              room.room_id === val.room_id
                ? { ...room, quantity: newQuantity }
                : room
            )
          );
          setNewQuantity("");
        })
        .catch((error) => {
          console.error("Error updating room data:", error);
        });
    } else {
      console.error("Missing room_id in the object:", val);
    }
  };

  const deleteRoom = (room_id) => {
    console.log("room_id is :", room_id);
    console.error("data is :", room_id);
    Axios.delete(`http://localhost:8080/api/data/roomForAdd/delete/${room_id}`)
      .then((response) => {
        if (response.data === "success") {
          setroomList(roomsList.filter((val) => val.room_id !== room_id));
        } else {
          console.error("Error deleting room:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
      });
  };

  const handleConfirm = () => {
    setSuccessPopup(false); // ปิดป๊อปอัพเมื่อคลิกตกลง
  };

  const handleAddEquipment = () => {
    setNewEquipmentList([...newEquipmentList, { equipment_name: "", quantity: "" }]);
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
                <select value="7">
                  อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม
                </select>
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
              <select
                className="form-select"
                onChange={(event) => {
                  setEquipmentName(event.target.value);
                }}
              >
                <option value="">-กรุณาเลือกประเภทอุปกรณ์-</option>
                <option value="computer">computer</option>
                <option value="visualizer">visualizer</option>
                <option value="Projector">Projector</option>
                <option value="microphone">microphone</option>
              </select>
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
          </form>
          <button type="button" className="btn btn-warning">
            เพิ่มอุปกรณ์
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={getRoomData}
          >
            แสดงห้อง
          </button>
          <button className="btn btn-success" onClick={addRoomData}>
            เพิ่มห้อง
          </button>
          <br />
          <br />
          {roomsList.map((val, key) => {
            return (
              <div className="room card" key={key}>
                <div className="card-body text-left">
                  <pre>
                    <p className="card-text">
                      รหัสห้อง: {val.room_id}
                      เลขห้อง : {val.room_number} จำนวนที่นั่ง: {val.capacity}
                    </p>
                    <p className="card-text">
                      อาคาร : {val.building_name} ชั้น : {val.floor}
                    </p>
                  </pre>

                  <p className="card-text">
                    <pre>
                      {" "}
                      อุปกรณ์ : {val.equipment_name} จำนวนอุปกรณ์ :{" "}
                      {val.quantity}
                    </pre>
                    {/* <div className="d-flex"> */}
                    <p>
                      <input
                        type="number"
                        placeholder="เปลี่ยนแปลงจำนวนอุปกรณ์"
                        onChange={(event) => {
                          setNewQuantity(event.target.value);
                        }}
                      />
                      <button
                        className="btn btn-warning"
                        onClick={() => updateRoomData(val)}
                      >
                        Update
                      </button>{" "}
                      <button
                        className="btn btn-warning"
                        onClick={() => deleteRoom(val.room_id)}
                      >
                        delete
                      </button>
                    </p>
                    {/* </div> */}
                  </p>
                </div>
              </div>
            );
          })}

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
