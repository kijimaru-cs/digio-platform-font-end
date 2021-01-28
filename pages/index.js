import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import cookie from "js-cookie";

export default function Home() {
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function Login() {
    axios
      .post("http://localhost:3001/login_user", {
        username: { username },
        password: { password },
      })
      .then((res) => {
        if (res.data.error == true) {
          setLoginError(res.data.message);
        } else {
          cookie.set("username", res.data.username, { expires: 2 });
          cookie.set("firstName", res.data.firstName, { expires: 2 });
          cookie.set("lastName", res.data.lastName, { expires: 2 });
          cookie.set("gender", res.data.gender, { expires: 2 });
          Router.push("/home");
        }
      });
  }
  return (
    <div className="container">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Login Page</h1>
        <br></br>
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
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button type="submit" value="Submit" onClick={Login}>
          Login
        </button>
        <Link href="/register">
          <button>Sign up</button>
        </Link>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
