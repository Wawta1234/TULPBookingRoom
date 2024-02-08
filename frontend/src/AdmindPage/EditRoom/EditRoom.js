import React, { useState } from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
import { useNavigate } from 'react-router-dom'

export default function EditRoom() {
    const navigate = useNavigate();
    const [filterCriteria, setFilterCriteria] = useState({
      course_name : ""
    });
    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setFilterCriteria({
        ...filterCriteria,
        [name]: value,
      });
    };
  
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
    <input type="text" name="course_name" onChange={handleFilterChange} />
    <button onClick={navigateToEdit2}>ตกลง</button>
    
  </div>
</WhiteRectangle>

    </>
  )
}
