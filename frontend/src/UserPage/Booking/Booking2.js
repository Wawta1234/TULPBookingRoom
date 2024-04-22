import React from "react";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Booking2() {
  const location = useLocation();
  const filterCriteria = location.state;
  const [selectedRooms, setSelectedRooms] = useState([]);

  const navigate = useNavigate();

  console.log("selectedRooms :", selectedRooms);
  const navigateToBooking = () => {
    navigate("/Booking");
  };

  const navigateToBooking3 = () => {
    navigate("/Booking/booking2/booking3", {
      state: {
        selectedRooms: selectedRooms.map(room => ({
          ...room,
          room_number: room.room_number
        })),
        building: filterCriteria.building_id,
        dateStart: filterCriteria.dateStart,
        dateEnd: filterCriteria.dateEnd,
        floor: filterCriteria.floor,
        date: filterCriteria.date,
        capacity: filterCriteria.capacity,
      },
    });
  };
  

  return (
    <>
      <Header />
      <Menu />
      <WhiteRectangle displayname_th>
        {/* ส่งข้อมูลอาคาร วันที่ และชั้นเข้าไปเพื่อแสดง */}
        {selectedRooms.length > 0 && (
          <div>
            <h3>ห้องที่เลือก</h3>
            {selectedRooms.map((selectedRoom, index) => (
              <div key={index}>
                <p>
                  ห้อง {selectedRoom.room_number} วันที่{" "}
                  {selectedRoom.date
                    ? new Date(selectedRoom.date).toLocaleDateString()
                    : ""}{" "}
                  เวลา{" "}
                  {selectedRoom.selectedTime === "1"
                    ? "09:30 - 12:30"
                    : selectedRoom.selectedTime === "2"
                    ? "13:30 - 16:30"
                    : selectedRoom.selectedTime === "3"
                    ? "17:00 - 20:00"
                    : ""}
                </p>
              </div>
            ))}

            <button className="edit-btn" onClick={navigateToBooking}>
              แก้ไข
            </button>
            <button onClick={navigateToBooking3}>ตกลง</button>
          </div>
        )}

        <Room
          building_id={filterCriteria.building_id}
          floor={filterCriteria.floor}
          capacity={filterCriteria.capacity}
          room_type={filterCriteria.room_type}
          dateStart={filterCriteria.dateStart}
          dateEnd={filterCriteria.dateEnd}
          selectedRooms={selectedRooms} // ส่ง selectedRooms ผ่าน props
          setSelectedRooms={setSelectedRooms}
        />
      </WhiteRectangle>
    </>
  );
}
