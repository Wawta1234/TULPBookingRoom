import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
export default function EditRoom3() {
  return (
   <>
   <Header />
   <AdminBar />
   <WhiteRectangle>
   <div className="EditRoom3">
        <h3>
          <pre> คณะ : xxxxxxxx รายวิชา : xxxxxxx ผู้สอน : xxxxxxxx</pre>
        </h3>
        <label for="title">จำนวนผู้เข้าร่วม</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="title" />
        

        <label for="title">เซค</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="Section " />
        <br />

        <label for="title">อาคาร</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="title" />

        <label for="title">ชั้น</label>
        <span>&nbsp;&#42;</span>
        <input type="text" name="title" />
        <br />

        <label for="title">วันที่เริ่มการบรรยาย </label>
        <span>&nbsp;&#42;</span>
        <input type="date" name="start" />
        <label for="title">วันที่สิ้นสุดการบรรยาย </label>
        <span>&nbsp;&#42;</span>
        <input type="date" name="start" />
      </div>
   </WhiteRectangle>
    </>
  )
}
