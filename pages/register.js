import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
export default function register() {
  const [signupError, setSignupError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  function Submit() {
    axios
      .post("http://localhost:3001/reg_user", {
        username: { username },
        password: { password },
        firstName: { firstName },
        lastName: { lastName },
        gender: { gender },
      })
      .then((res) => {
        if (res.data.error == true) {
          setSignupError(res.data.message);
        } else {
          Router.push("/");
        }
      });
  }

  function changeGender(value) {
    setGender(value);
  }

  return (
    <div className="container">
      <div className="content">
        <label>Username</label>
        <br></br>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <label>First Name</label>
        <br></br>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br></br>
        <label>Last Name</label>
        <br></br>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br></br>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={(e) => changeGender("male")}
        />
        <label>Male</label>
        <br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={(e) => changeGender("female")}
        />
        <label>Female</label>
        <br />
        <input
          type="radio"
          id="other"
          name="gender"
          value="other"
          onChange={(e) => changeGender("other")}
        />
        <label>Other</label>
        <br />
        <button type="submit" value="Submit" onClick={Submit}>
          submit
        </button>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .content {
          flex: 1;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
