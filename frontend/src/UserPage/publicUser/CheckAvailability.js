import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoomCheck from "./RoomCheck";

export default function CheckAvailabilityForPublic() {
  const bookingHeaderStyle = {
    color: "red",
  };
  const location = useLocation();
  const filterCriteria = location.state;
  const { building_id, floor, room_type, dateStart, dateEnd } = filterCriteria;

  console.log("dateStart is ", dateStart);
  console.log("dateEnd is ", dateEnd);
  return (
    <div>
      <h1 style={bookingHeaderStyle}>
        TULP
        <br />
        Booking Room
      </h1>

      <RoomCheck
        building_id={filterCriteria.building_id}
        floor={filterCriteria.floor}
        room_type={filterCriteria.room_type}
        dateStart={filterCriteria.dateStart}
        dateEnd={filterCriteria.dateEnd}
      />
    </div>
  );
}
