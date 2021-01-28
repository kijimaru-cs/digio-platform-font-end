import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { render } from "react-dom";

export default function home() {
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [showMe, setShowMe] = useState(true);
  var username = cookie.get("username");
  var firstName = cookie.get("firstName");
  var lastName = cookie.get("lastName");
  var gender = cookie.get("gender");
  const [dataLogin, setDataLogin] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/user/" + username).then((res) => {
      setDataLogin(res.data);
    });
  }, []);

  function logout() {
    cookie.remove("username");
    cookie.remove("firstName");
    cookie.remove("lastName");
    cookie.remove("gender");
    username = "";
    firstName = "";
    lastName = "";
    gender = "";
  }

  function edit() {
    axios.put("http://localhost:3001/user/" + username).then((res) => {
      if (res.data.error == true) {
        setEditErrorMessage(res.data.message);
      } else {
        setEditErrorMessage(res.data.message);
      }
    });
  }
  if (username == "") {
    return <h1>Please Login</h1>;
  } else {
    return (
      <div className="container">
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
        <h1>Home Page </h1>
        <Link href="/">
          <button className="btnLogout" onClick={logout}>
            Log Out
          </button>
        </Link>

        <div className="editPage" id="editPage" hidden={showMe}>
          <h1>แก้ไขข้อมูลส่วนตัว</h1>
          <hr />
          <label>fisrt name:</label>
          <input
            type="text"
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
          ></input>
          <br />
          <label>last name:</label>
          <input
            type="text"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          ></input>
          <br />
          {editErrorMessage && (
            <p style={{ color: "red" }}>{editErrorMessage}</p>
          )}
          <br />
          <button onClick={edit}>แก้ไข</button>
        </div>
        <div className="content1">
          <p1>name: {firstName}</p1>
          <br />
          <p1>last name: {lastName}</p1>
          <br />
          <p1>username: {username}</p1>
          <br />
          <p1>gender: {gender}</p1>
          <br />
          <button
            onClick={() => {
              setShowMe(!showMe);
            }}
          >
            Edit user
          </button>
          <hr />
        </div>
        <div className="content2">
          <h2>Login log</h2>
          <table>
            <thead>
              <tr>
                <th width="50">
                  <div align="center">ลำดับ</div>
                </th>
                <th width="200">
                  <div align="center">username</div>
                </th>
                <th width="200">
                  <div align="center">เวลาล็อคอิน</div>
                </th>
                <th width="300">
                  <div align="center">สถานะ</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataLogin.map((e, index) => {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.username}</td>
                    <td>{e.time_in}</td>
                    <td>{e.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <style jsx>{`
          .container {
            padding: 20px 20px 20px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .btnLogout {
            position: absolute;
            right: 20px;
            width: 100px;
          }
          .content1 {
            flex-direction: row;
            font-size: 20px;
          }
          .content2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .editPage {
            position: absolute;
            top: 20%;
            left: 15%;
            padding: 50px 50px 50px 50px;
            width: 75%;
            height: 30%;
            background-color: white;
            border: 3px solid black;
          }
          table,
          td,
          th {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 10px;
          }
        `}</style>
      </div>
    );
  }
}
