import React, { useState, useEffect } from "react";
import "./Room.css";
import axios from "axios";

export default function Room({
  building_id,
  floor,
  capacity,
  room_type,
  dateStart,
  dateEnd,
  selectedRooms,
  setSelectedRooms,
}) {
  const [roomNumber, setroomNumber] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const range = [];

    // Generate the date range array
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      range.push(new Date(date));
    }

    setDateRange(range);

    // Fetch room data
    axios
      .get("http://localhost:8080/api/data/roomForAdd", {
        params: { building_id, floor, capacity, room_type },
      })
      .then((response) => {
        console.log(response.data);
        setroomNumber(response.data);

        axios
          .get(`http://localhost:8080/api/data/building/${building_id}`)
          .then((response) => {
            setBuildingName(response.data.building_name);
          })
          .catch((error) => {
            console.error("Error fetching building data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching building data:", error);
      });
  }, [building_id, floor, capacity, room_type, dateStart, dateEnd]);

  const handleTimeSelect = (time, room, date) => {
    const selectedRoom = {
      room_number: room.room_number,
      date: date,
      selectedTime: time,
    };
    setSelectedRooms(prevSelectedRooms => [...prevSelectedRooms, selectedRoom]);
    console.log("ห้องที่เลือก : ", selectedRoom);
  };

  return (
    <div className="room">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />

      {/* Start looping from here */}
      {dateRange.map((date, index) => (
        <div key={index}>
          <pre>
            <h2>
              {" "}
              อาคาร : {buildingName} ชั้น : {floor} วันที่{" "}
              {date.toLocaleDateString()}
            </h2>
          </pre>
          {roomNumber.map((room, roomIndex) => (
            <div key={roomIndex} className="item">
              <i className="bi bi-door-open"></i>
              <p>
                <h2>{room.room_number}</h2>
                <button
                  className="button"
                  onClick={() => handleTimeSelect("1", room, date)}
                >
                  09 : 00 - 12 : 30
                </button>
                <button
                  className="button"
                  onClick={() => handleTimeSelect("2", room, date)}
                >
                  13 : 30 - 16 : 30
                </button>
                <button
                  className="button"
                  onClick={() => handleTimeSelect("3", room, date)}
                >
                  17 : 00 - 20 : 00
                </button>

                <br />
                <span className="room-details">
                  <span className="details-label">จำนวนที่นั่ง: </span>{" "}
                  {room.capacity} ,
                </span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
