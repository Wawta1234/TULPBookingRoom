import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import AdminBar from "../../component/AdminBar";
import WhiteRectangle from "../../component/WhiteRectangle";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./EditRoom.css"

export default function EditRoom2() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterCriteria = location.state;
  const [timetable, setTimetable] = useState([]);

  const [subjectData, setsubjectData] = useState([]);
  const [teacherName, setTeacherName] = useState("");

  // console.log("รายวิชาที่ส่งมา : ",filterCriteria ) ;
  useEffect(() => {
    if (filterCriteria && filterCriteria.subject) {
      axios
        .get("http://localhost:8080/api/data/timetable", {
          params: { subject: filterCriteria.subject },
        })
        .then((response) => {
          console.log("Timetable data:", response.data);
          setTimetable(response.data);
        })
        .catch((error) => {
          console.error("Error fetching timetable data:", error);
        });
    }
  }, [filterCriteria]);

  useEffect(() => {
    if (filterCriteria && filterCriteria.subject) {
      axios
        .get("http://localhost:8080/api/data/subject", {
          params: { subject: filterCriteria.subject },
        })
        .then((response) => {
          console.log("data from subjec", response.data);
          setsubjectData(response.data);
          let data = response.data[0].teacher_id;
          axios
            .get(`http://localhost:8080/api/data/teacher`, {
              params: { id: data },
            })
            .then((response) => {
              console.log("data from teacher", response.data);
              setTeacherName(response.data[0].teacher_name);
            })
            .catch((error) => {
              console.error("Error fetching building data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching subject data:", error);
        });
    }
  }, [filterCriteria]);

  const handleConfirm = (subjectData) => {
    if (subjectData.length > 0 && subjectData[0].subject_name) {
      const subjectName = subjectData[0].subject_name;
      Swal.fire({
        title: `ต้องการลบรายวิชา ${subjectName} หรือไม่`,
        showCancelButton: true,
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://localhost:8080/api/data/timetable/delete/${subjectName}`
            )
            .then(() => {
              Swal.fire({
                title: "ลบรายวิชาเรียบร้อย",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then(() => {
                navigate("/EditRoom");
              });
            })
            .catch((error) => {
              console.error("Error deleting subject:", error);
              Swal.fire({
                title: "เกิดข้อผิดพลาดในการลบรายวิชา",
                icon: "error",
                confirmButtonText: "ตกลง",
              });
            });
        } else {
          navigate("/EditRoom/EditRoom2");
        }
      });
    } else {
      console.error("Error: No subject data available");
    }
  };

  const handleEditOptions = () => {
    // ให้ผู้ใช้เลือกแก้ไขบางส่วน หรือ แก้ไขทั้งหมด
    Swal.fire({
      title: "เลือกรูปแบบการแก้ไข",
      showCancelButton: true,
      confirmButtonText: "แก้ไขข้อมูลรายวิชาทั้งหมด",
      cancelButtonText: "แก้ไขเวลาบรรยายบางส่วน",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // การแก้ไขทั้งหมด
        navigate("/EditRoom/EditRoom2/EditRoom3", { state: { subjectData, timetable } });
        console.log("subjectData is : " , subjectData)
      } else {
        // การแก้ไขบางส่วน
        navigate("/RoomRecording/RoomRecording2/RoomRecording3");
      }
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const navigateToEdit1 = () => {
    navigate("/EditRoom");
  };

  //   const navigateToEdit3 = () => {
  //     navigate("/EditRoom/EditRoom2/EditRoom3");
  //   };
  return (
    <>
      <Header />
      <AdminBar />
      <WhiteRectangle>
        <div className="EditRoom2">
          {subjectData.length > 0 &&
            subjectData.map((subject, index) => (
              <div key={index}>
                <br />
                <br />
                <br />
                <h3>รายละเอียดการบรรยาย</h3>
                <h3>
                  {" "}
                  <pre>
                    {" "}
                    รหัสวิชา : {subject.subject}       รายวิชา :  {" "}
                    {subject.subject_name}     ผู้สอน :    {teacherName}{" "}
                  </pre>
                </h3>
                <br />

                <pre>
                  {timetable.map((timetables, index) => (
                    <div key={index}>
                      <pre>
                        ครั้งที่ {index + 1} :   วันที่  {" "}
                        {formatDate(timetables.date)}   เวลา   {" "}
                        {timetables.time_slot_id === 1
                          ? "09:30 - 12:30"
                          : timetables.time_slot_id === 2
                          ? "13:30 - 16:30"
                          : timetables.time_slot_id === 3
                          ? "17:00 - 20:00"
                          : "ไม่ระบุเวลา"}{" "}
                          ห้อง   {timetables.room_number}
                      </pre>
                    </div>
                  ))}
                </pre>
                <br />
                <button
                  onClick={() => handleConfirm(subjectData)}
                  style={{ backgroundColor: "#e10925", color: "white" }}
                >
                  ลบรายวิชา
                </button>
                <button
                  onClick={handleEditOptions}
                  style={{ backgroundColor: "#ff8b13", color: "white" }}
                >
                  แก้ไข
                </button>

                <button onClick={navigateToEdit1}style={{ backgroundColor: "#2ca61d", color: "white" }}>ตกลง </button>
              </div>
            ))}
        </div>
      </WhiteRectangle>
    </>
  );
}
