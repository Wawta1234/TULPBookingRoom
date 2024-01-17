import React from "react";
import AdminBar from "../../component/AdminBar";
import Header from "../../component/Header";
import WhiteRectangle from "../../component/WhiteRectangle";
import { useNavigate } from "react-router-dom";
import Room from "../../component/Room";
import Swal from "sweetalert2";
export default function RoomRec3() {
    const navigate = useNavigate();
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

  const handleEditOptions= async (e, episodeNumber) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: `คุณต้องการลบบรรยายครั้งที่ x ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
      cancelButtonColor: "#ffd13f",
      confirmButtonColor: "#c3002f",
    });

    if (result.isConfirmed) {
      // ทำการลบรายการบรรยาย
      await deleteEpisode(episodeNumber);

      // แสดงข้อความว่าลบสำเร็จ
      Swal.fire({
        title: `ลบบรรยายครั้งที่ ${episodeNumber} เรียบร้อยแล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        // นำผู้ใช้กลับไปยังหน้า roomrec3
        navigate("/RoomRecording/RoomRecording2/RoomRecording3");
      });
    }
  };

  const deleteEpisode = async (episodeNumber) => {
    // ทำการลบรายการบรรยายในฐานข้อมูล
    // ตัวอย่าง: await axios.delete(`/api/deleteEpisode/${episodeNumber}`);
    console.log(`ลบบรรยายครั้งที่ ${episodeNumber} สำเร็จ`);
  };


  const navigateToHome = () => {
    navigate("/AdminHome");
  };

  const navigateToEdit4 = () => {
    navigate("/Edit4");
  };
  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
      <div className="content">
        <p>รายวิชา : xxxxxx     อาจารย์ผู้สอน : xxxxxxxx xxxxxxxx 
         <pre>ครั้งที่ 1 : วันที่ xx.xx.xxxx     เวลา : xx : xx         ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 2 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 3 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 4 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 5 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 6 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 7 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 8 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 9 : วันที่ xx.xx.xxxx       เวลา : xx : xx        ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 10 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 11 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions} ></i><br />
            ครั้งที่ 12 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            ครั้งที่ 13 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions} ></i><br />
            ครั้งที่ 14 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions} ></i><br />
            ครั้งที่ 15 : วันที่ xx.xx.xxxx     เวลา : xx : xx       ห้อง : xxxx  <i class="bi bi-pencil-square" onClick={navigateToEdit4}></i> <i class="bi bi-trash" onClick={handleEditOptions}></i><br />
            <button onClick={handleConfirm}>ตกลง </button>
        </pre>
        </p>

      </div>
      </WhiteRectangle>
    </>
  )
}
