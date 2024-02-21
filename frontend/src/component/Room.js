import React, { useState, useEffect } from 'react';
import "./Room.css"
import axios from 'axios';

export default function Room({ building_id,floor, capacity,room_type }) {
  const [roomNumber, setroomNumber] = useState([]);
  const [buildingName, setBuildingName] = useState("");

  useEffect(() => {
    // console.log(55555)
    // console.log( {building} )

    // Make a GET request to your API endpoint
    axios.get('http://localhost:8080/api/data/roomForAdd', { params: {building_id :building_id, floor:floor ,capacity : capacity, room_type: room_type } })
    
      .then(response => {
        console.log(response.data); 
        setroomNumber(response.data);

        axios.get(`http://localhost:8080/api/data/building/${building_id}`)
          .then(response => {
            console.log(response.data); 
            setBuildingName(response.data.building_name);
            console.log(response.data.building_name); 
          })
          .catch(error => {
            console.error('Error fetching building data:', error);
          });

      })
      .catch(error => {
        console.error('Error fetching building data:', error);
      });

  }, []); 

  

  return (
    <div className="room">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    
   <pre><h2>{buildingName}     ชั้น : {floor}   วันที่ </h2></pre>
      
      {/* Render your building data */}
      {roomNumber.map((room, index) => (
        <div key={index} className="item">
          <i className="bi bi-door-open"></i>
          <p>
            <h2>{room.room_number}</h2>
            <button className="button">09 : 00 - 12 : 30</button>
            <button disabled className="disabled-button">13 : 30 - 16 : 30</button>
            <button className="button">17 : 00 - 20 : 00</button>

            <br />
            <span className="room-details">
              <span className="details-label">จำนวนที่นั่ง: </span> {room.capacity} ,
              {/* <span className="details-label">computer:</span> {room.computer} ,
              <span className="details-label">projector:</span> {room.projector}{" "}
              ,<span className="details-label">microphone:</span>{" "}
              {room.microphone} ,
              <span className="details-label">visualizer:</span>{" "}
              {room.visualizer} */}
            </span>
          </p>
        </div>
      ))} 
    </div>
  )
}