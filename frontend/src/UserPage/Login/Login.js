import React from "react";
import { Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Application-Key",
      "TU6478d2951a9e13ddaa28a71bf622de5d953fad6f99503e0af27027c102f87495a41902ada4cb77b1690ee34580e84af7"
    );
    myHeaders.append("Cookie", "ci_session=e3gcv672rfcqngh45vmvm0stj8u9hu3n");

    var raw = JSON.stringify({
      UserName: inputs.username,
      PassWord: inputs.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === false) {
          MySwal.fire({
            icon: "error",
          });
        } else {
          navigate("/Home", { state: { user: inputs.username } });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="background-image">
      <div className="container">
        <ul>
          <li><a href="">ตรวจสอบสถานะห้องว่าง </a></li>
          <li><a href="">รายละเอียดห้องที่ต้องเปิดประจำวัน </a></li>
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
