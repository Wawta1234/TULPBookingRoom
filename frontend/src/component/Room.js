import React from 'react'
import "./Room.css"

export default function Room() {
  return (
    <div className="room">
         <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />

    <h2>อาคาร xxx ชั้น xx วันที่ XX/XX/XX</h2>
        <div className="item">
          <i class="bi bi-door-open"></i><p>
          <h2>ห้อง XXXX</h2>
          <button class="button"><i class="bi bi-plus"></i>09 : 00 - 12 : 30</button>
          <button disabled class="disabled-button"><i class="bi bi-dash"></i>13 : 30 - 16 : 30</button>
          <button class="button"><i class="bi bi-plus"></i>17 : 00 - 20 : 00</button></p>
        </div>
</div>
  )
}
