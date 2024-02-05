import React, { useState, useEffect } from 'react';
import "./Room.css"
import axios from 'axios';

export default function Room() {
  const [buildingData, setBuildingData] = useState([]);
  useEffect(() => {
    // Make a GET request to your API endpoint
    axios.get('http://localhost:3002/api/data/rooms')
      .then(response => {
        setBuildingData(response.data);
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

<h2>อาคาร xxx ชั้น xx วันที่ XX/XX/XX</h2>
      
      {/* Render your building data */}
      {buildingData.map((building, index) => (
        <div key={index} className="item">
          <i className="bi bi-door-open"></i>
          <p>
            <h2>{building.building}</h2>
            <button className="button"><i className="bi bi-plus"></i>09 : 00 - 12 : 30</button>
            <button disabled className="disabled-button"><i className="bi bi-dash"></i>13 : 30 - 16 : 30</button>
            <button className="button"><i className="bi bi-plus"></i>17 : 00 - 20 : 00</button>
          </p>
        </div>
      ))}
    
</div>
  )
}
