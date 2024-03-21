import React, { useState, useEffect } from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function RoomRec3() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRooms = location.state ? location.state.selectedRooms : [];
  const subject = location.state ? location.state.subject : "";
  const teacher_name = location.state ? location.state.teacher_name : "";

  const handleConfirm = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "บันทึกข้อมูลห้องบรรยายเรียบร้อยแล้ว",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/AdminHome");
    });
  };

  const handleEditEpisode = (episodeNumber) => {
    navigate("/Edit4", {
      state: {
        episodeNumber,
        selectedRooms,
        subject,
        teacher_name,
      },
    });
  };

  const handleDeleteEpisode = async (episodeNumber) => {
    const result = await Swal.fire({
      title: `คุณต้องการลบบรรยายครั้งที่ ${episodeNumber} ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
      cancelButtonColor: "#ffd13f",
      confirmButtonColor: "#c3002f",
    });

    if (result.isConfirmed) {
      
      Swal.fire({
        title: `ลบบรรยายครั้งที่ ${episodeNumber} เรียบร้อยแล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="content">
          <p>
            <strong>รายวิชา:</strong> {subject} <br />
            <strong>อาจารย์ผู้สอน:</strong> {teacher_name} <br /><br />
            {selectedRooms && selectedRooms.length > 0 ? (
              selectedRooms.map((room, index) => (
                <div key={index}>
                  <strong>ครั้งที่ {index + 1}:</strong> วันที่{" "}
                  {room.date.toLocaleDateString()} เวลา {room.selectedTime === "1" ? "09:30 - 12:30" : room.selectedTime === "2" ? "13:30 - 16:30" : "17:00 - 20:00"} ห้อง: {room.room_number} {" "}
                  <i className="bi bi-pencil-square" onClick={() => handleEditEpisode(index + 1)}></i>{" "}
                  <i className="bi bi-trash" onClick={() => handleDeleteEpisode(index + 1)}></i>
                </div>
              ))
            ) : (
              <p>ไม่พบรายการบรรยาย</p>
            )}
          </p>
          <button onClick={handleConfirm}>ตกลง</button>
        </div>
      </WhiteRectangle>
    </>
  );
}
