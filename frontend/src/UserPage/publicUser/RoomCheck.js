import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoomCheck({
  building_id,
  floor,
  room_type,
  dateStart,
}) {
  const [roomNumber, setRoomNumber] = useState([]);
  const [buildingName, setBuildingName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/data/roomForRoomCheck", {
        params: { building_id, floor, room_type, dateStart },
      })
      .then((response) => {
        console.log("Data in RoomCheck is ", response.data);
        setRoomNumber(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [building_id, floor, room_type, dateStart]);

  const handleTimeSelect = (time, room, date) => {
    const selectedRoom = {
      room_number: room.room_number,
      date: date,
      selectedTime: time,
    };
    // Do something with selectedRoom
  };

  return (
    <div className="room">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />

      {roomNumber.map((room, index) => (
        <div key={index} className="item">
          <i className="bi bi-door-open"></i>
          <p>
            <h2>{room.room_number}</h2>
            <button
              className="button"
              onClick={() => handleTimeSelect("1", room, dateStart)}
            >
              09:00 - 12:30
            </button>
            <button
              className="button"
              onClick={() => handleTimeSelect("2", room, dateStart)}
            >
              13:30 - 16:30
            </button>
            <button
              className="button"
              onClick={() => handleTimeSelect("3", room, dateStart)}
            >
              17:00 - 20:00
            </button>
            <br />
            <span className="room-details">
              <span className="details-label">Capacity:</span> {room.capacity}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
