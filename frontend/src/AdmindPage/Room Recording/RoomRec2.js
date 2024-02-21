import React from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import Room from "../../component/Room";
import { useNavigate , useLocation } from "react-router-dom";

export default function RoomRec2() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterCriteria = location.state;

  console.log("Filter Criteria:", {filterCriteria});

  const navigateToRoomRec = () => {
    navigate("/RoomRecording");
  };
  const navigateToRoomRec3 = () => {
    navigate("/RoomRecording/RoomRecording2/RoomRecording3");
  };
  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        {/* Add a conditional check for filterCriteria */}
        {filterCriteria && (
          <Room building_id={filterCriteria.building_id} floor={filterCriteria.floor} capacity={filterCriteria.capacity} room_type={filterCriteria.room_type = 2}/>
        )}
        <button className="edit-btn" onClick={navigateToRoomRec}>
          แก้ไข
        </button>
        <button onClick={navigateToRoomRec3}>ตกลง</button>
      </WhiteRectangle>
    </>
  );
}
