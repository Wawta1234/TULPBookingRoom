import React, { useEffect, useState } from "react";

import Header from "../../component/Header";
import AdminBar from "../../component/AdminBar";
import WhiteRectangle from "../../component/WhiteRectangle";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function EditRoom2() {
  const navigate = useNavigate();
  const location = useLocation();
  const filterCriteria = location.state;

  const [subjectData, setsubjectData] = useState([]);
  const [teacherName , setTeacherName] = useState("");
  // const [filterCriteria, setFilterCriteria] = useState({ subject: "" });
 
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/data/subject", {
        params: { subject: filterCriteria.subject},
      })
      .then((response) => {
        console.log('data from subjec' ,response.data); 
        setsubjectData(response.data);
        let data = response.data[0].teacher_id;
        // console.log('data teacher id: ', data)

        axios.get(`http://localhost:8080/api/data/teacher`,{
          params : {id : data}
        })
          .then(response => {
            // console.log('data teacher id: ', data) 
            console.log('data from teacher' ,response.data); 
            setTeacherName(response.data[0].teacher_name);
             
          })
          .catch(error => {
            console.error('Error fetching building data:', error);
          });

      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });
  }, []);

  const handleConfirm = (e) => {
    Swal.fire({
      title: "ต้องการลบรายวิชา xxx หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบรายวิชาเรียบร้อย",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/EditRoom");
        });
      } else {
        navigate("/EditRoom/EditRoom2");
      }
    });
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
        navigate("/EditRoom//EditRoom2/EditRoom3");
      } else {
        // การแก้ไขบางส่วน
        navigate("/RoomRecording/RoomRecording2/RoomRecording3");
      }
    });
  };

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
        <div className="EditRoom">
          {subjectData.map((subject, index) => (
            <div key={index}>
              <h3>รายละเอียดห้องบรรยาย</h3>
              <h3>
                {" "}
                <pre>
                  {" "}
                  รหัสวิชา : {subject.subject} รายวิชา : {subject.subject_name} ผู้สอน : {teacherName}{" "}
                </pre>
              </h3>
              <br />
              <h4>
                <pre>
                  ครั้งที่ 1 : วันที่ 08/04/66 เวลา 13 : 00 - 16 : 00 ห้อง 7313
                </pre>
              </h4>
              <br />
              <h4>
                <pre>
                  ครั้งที่ 2 : วันที่ 15/04/66 เวลา 13 : 00 - 16 : 00 ห้อง 7313
                </pre>
              </h4>
              <br />
              <h4>
                <pre>
                  ครั้งที่ 3 : วันที่ 22/04/66 เวลา 13 : 00 - 16 : 00 ห้อง 7313
                </pre>
              </h4>
              <br />
              <h4>
                <pre>
                  ครั้งที่ 4 : วันที่ 29/04/66 เวลา 13 : 00 - 16 : 00 ห้อง 7313
                </pre>
              </h4>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h4>
                <pre>
                  ครั้งที่ 15 : วันที่ xx/xx/xxxx เวลา 13 : 00 - 16 : 00 ห้อง
                  7313
                </pre>
              </h4>
              <br />
              <button onClick={handleConfirm}>ลบรายวิชา </button>
              <button onClick={handleEditOptions}>แก้ไข </button>
              <button onClick={navigateToEdit1}>ตกลง </button>
            </div>
          ))}
        </div>
      </WhiteRectangle>
    </>
  );
}
