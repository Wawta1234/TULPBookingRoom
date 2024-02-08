import React, { useState, useEffect } from 'react';
import "./Room.css"
import axios from 'axios';

export default function Room({ building, date, floor }) {
  const [roomNumber, setroomNumber] = useState([]);

  useEffect(() => {
    // console.log(55555)
    // console.log( {building} )

    // Make a GET request to your API endpoint
    axios.get('http://localhost:8080/api/data/rooms', { params: {building :building, date:date, floor:floor } })
    
      .then(response => {
        setroomNumber(response.data);
      })
      .catch(error => {
        console.error('Error fetching building data:', error);
      });


      //course
      // axios.get('http://localhost:8080/api/data/course', { params: {building :building, floor:floor} })
    
      // .then(response => {
      //   setroomNumber(response.data);
      // })
      // .catch(error => {
      //   console.error('Error fetching building data:', error);
      // });
  }, []); 

  

  return (
    <div className="room">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    
    <h2>{building} ชั้น :{floor} วันที่ {date}</h2>
      
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
              <span className="details-label">computer:</span> {room.computer} ,
              <span className="details-label">projector:</span> {room.projector}{" "}
              ,<span className="details-label">microphone:</span>{" "}
              {room.microphone} ,
              <span className="details-label">visualizer:</span>{" "}
              {room.visualizer}
            </span>
          </p>
        </div>
      ))} 
    </div>
  )
}
