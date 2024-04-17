import React, { useState } from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoomRec2() {
  const location = useLocation();
  const filterCriteria = location.state;
  const [selectedRooms, setSelectedRooms] = useState([]);
  console.log(5555);

  const navigate = useNavigate();
  console.log("Filter Criteria:", { filterCriteria });

  const navigateToRoomRec = () => {
    navigate("/RoomRecording");
  };

  const navigateToRoomRec3 = () => {
    const startDate = new Date(filterCriteria.dateStart);
    const endDate = new Date(filterCriteria.dateEnd);
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7); 
    }


    const selectedRoomsForDates = dates.flatMap(date => {
      return selectedRooms.map(selectedRoom => ({
        ...selectedRoom,
        date: date
      }));
    });

    navigate("/RoomRecording/RoomRecording2/RoomRecording3", {
      state: {
        selectedRooms: selectedRoomsForDates,
        building: filterCriteria.building_id,
        dateStart: filterCriteria.dateStart,
        dateEnd: filterCriteria.dateEnd,
        floor: filterCriteria.floor,
        date: filterCriteria.date,
        capacity: filterCriteria.capacity,
        subject: filterCriteria.subject,
        faculty_id: filterCriteria.faculty_id,
        teacher_name: filterCriteria.teacher_name,
        section: filterCriteria.section,
        subject_name : filterCriteria.subject_name,
        faculty: filterCriteria.faculty,
      },
    });
  };

  return (
    <>
      <Header />
      <AdminBar />

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

            <button className="edit-btn" onClick={navigateToRoomRec}>
              แก้ไข
            </button>
            <button onClick={navigateToRoomRec3}>ตกลง</button>
          </div>
        )}

        <Room
          building_id={filterCriteria.building_id}
          floor={filterCriteria.floor}
          capacity={filterCriteria.capacity}
          room_type={filterCriteria.room_type}
          dateStart={filterCriteria.dateStart}
          dateEnd={filterCriteria.dateEnd}
          selectedRooms={selectedRooms} 
          setSelectedRooms={setSelectedRooms}
        />
      </WhiteRectangle>
    </>
  );
}
