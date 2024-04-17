import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ตรวจสอบว่า username และ password ตรงกับข้อมูลของ admin หรือไม่
    if (
      inputs.username === "TuBookingRoom_Admind1" &&
      inputs.password === "TuBookingRoom_Admind01"
    ) {
      // สร้างข้อมูลผู้ใช้ admin
      const userData = {
        username: inputs.username,
        password: inputs.password,
        displayname_th: "TuBookingRoom Admind1",
        email: "admin2@example.com",
        department: "Admin Department",
        role: "admin", // กำหนดบทบาทเป็น "admin"
      };
      // เก็บข้อมูลผู้ใช้ใน localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // เข้าสู่หน้า admindhome โดยไม่ต้องตรวจสอบ API ให้ log account เลย
      navigate("/AdminHome");
    } else if (
      inputs.username === "TuBookingRoom_Admind2" &&
      inputs.password === "TuBookingRoom_Admind02"
    ) {
      const userData = {
        username: inputs.username,
        password: inputs.password,
        displayname_th: "TuBookingRoom Admind2",
        email: "admin2@example.com",
        department: "Admin Department",
        role: "admin2", // กำหนดบทบาทเป็น "admin"
      };
      // เก็บข้อมูลผู้ใช้ใน localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/AdminHomeTwo");
    } else {
      // กรณีไม่ใช่ admin ให้ทำการเรียกใช้ API เพื่อตรวจสอบข้อมูล
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Application-Key",
        "TU6478d2951a9e13ddaa28a71bf622de5d953fad6f99503e0af27027c102f87495a41902ada4cb77b1690ee34580e84af7"
      );
      myHeaders.append("Cookie", "ci_session=e3gcv672rfcqngh45vmvm0stj8u9hu3n");

      const raw = JSON.stringify({
        UserName: inputs.username,
        PassWord: inputs.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://restapi.tu.ac.th/api/v1/auth/Ad/verify",
          requestOptions
        );
        const result = await response.json();
        console.log(result);

        if (result.status === false) {
          MySwal.fire({
            icon: "error",
          });
        } else {
          // ตรวจสอบว่าผู้ใช้นี้มีในฐานข้อมูลหรือไม่
          const userExists = await checkUserExists(inputs.username);
          if (!userExists) {
            // ส่งข้อมูลผู้ใช้ไปเก็บในฐานข้อมูล
            await createUser({
              username: inputs.username,
              password: inputs.password,
              displayname_th: result.displayname_th,
              email: result.email,
              department: result.department,
            });
            const userData = {
              username: inputs.username,
              password: inputs.password,
              displayname_th: result.displayname_th,
              email: result.email,
              department: result.department,
            };
            // เก็บข้อมูลผู้ใช้ใน localStorage
            localStorage.setItem("userData", JSON.stringify(userData));
          }

          navigate("/Home");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // ฟังก์ชันตรวจสอบว่าผู้ใช้นี้มีอยู่ในฐานข้อมูลหรือไม่
  const checkUserExists = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/data/user?username=${username}`
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };


  const createUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/api/data/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  
  

  return (
    <div className="background-image">
      <div className="container">
        <ul>
          <li>
            <a href="/checkRoomPublic">ตรวจสอบสถานะห้องว่าง </a>
          </li>
        </ul>

        <aside>
          <h2>
            TULP <br />
            Booking Room
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="username">
              <label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Log in</button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default Login;
