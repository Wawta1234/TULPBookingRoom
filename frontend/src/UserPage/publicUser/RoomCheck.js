import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../component/CheckRoom.css"

export default function RoomCheck({
  building_id,
  floor,
  room_type,
  dateStart,
  dateEnd,
}) {
  const [roomNumber, setRoomNumber] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [roomAvailability, setRoomAvailability] = useState({});

  useEffect(() => {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const range = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      range.push(new Date(date));
    }
    setDateRange(range);

    axios
      .get("http://localhost:8080/api/data/roomForRoomCheck", {
        params: { building_id, floor, room_type },
      })
      .then((response) => {
        console.log("Data in RoomCheck is ", response.data);
        setRoomNumber(response.data);
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
        console.error("Error fetching room data:", error);
      });
  }, [building_id, floor, room_type, dateStart, dateEnd]);

  useEffect(() => {
    const fetchData = async (room) => {
      const availability = {};
      for (
        let currentDate = new Date(dateStart);
        currentDate <= new Date(dateEnd);
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const formattedDate = currentDate.toISOString().split("T")[0];
        for (let time = 1; time <= 3; time++) {
          try {
            const response = await axios.get(
              "http://localhost:8080/api/data/roomAvailable",
              {
                params: {
                  time_slot_id: time,
                  date_use: formattedDate,
                  room_id: room.id,
                },
              }
            );
            const count = response.data.count;
            availability[formattedDate] = availability[formattedDate] || {};
            availability[formattedDate][time] = count;
          } catch (error) {
            console.error("Error fetching room availability:", error);
          }
        }
      }
      setRoomAvailability((prevAvailability) => ({
        ...prevAvailability,
        [room.id]: availability,
      }));
    };

    roomNumber.forEach((room) => {
      fetchData(room);
    });
  }, [dateStart, dateEnd, roomNumber]);

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
      {dateRange.map((date, index) => (
        <div key={index}>
          <pre>
            <h2>
              อาคาร : {buildingName} ชั้น : {floor} วันที่{" "}
              {date.toLocaleDateString()}
            </h2>
          </pre>

          {roomNumber.map((room, roomIndex) => {
            const roomAvailabilityForDate = roomAvailability[room.id] || {};
            const availableTimes = Object.keys(
              (roomAvailabilityForDate[date.toISOString().split("T")[0]] || {})
            );

            return (
              <div key={roomIndex} className="item">
                <i className="bi bi-door-open"></i>
                <p>
                  <h2>{room.room_number}</h2>

                  {[1, 2, 3].map((time) => {
                    const availableCount =
                      (roomAvailabilityForDate[date.toISOString().split("T")[0]] || {})[time] || 0;
                    const isAvailable = availableCount > 0;

                    return (
                      <button
                        key={time}
                        className={isAvailable ? "disabled-button" : "button"}
                        onClick={() =>
                          !isAvailable &&
                          handleTimeSelect(time.toString(), room, date)
                        }
                      >
                        {time === 1
                          ? "09 : 00 - 12 : 30"
                          : time === 2
                          ? "13 : 30 - 16 : 30"
                          : "17 : 00 - 20 : 00"}
                      </button>
                    );
                  })}

                  <br />
                  <span className="room-details">
                    <span className="details-label">จำนวนที่นั่ง: </span>{" "}
                    {room.capacity} 
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
