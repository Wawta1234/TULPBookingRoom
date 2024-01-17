import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
import { useNavigate } from 'react-router-dom'

export default function EditRoom() {
    const navigate = useNavigate();

    const navigateToEdit2 = () => {
      navigate("/EditRoom/EditRoom2");
    };
  return (
    <> 
    <Header />
    <AdminBar  />
    <WhiteRectangle>
    <div className="EditRoom">
        <label for="title">ระบุรายวิชาที่ต้องการแก้ไข</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="title" /><br/>

        <button onClick={navigateToEdit2}>ตกลง </button>

      </div>

    </WhiteRectangle>
    </>
  )
}
