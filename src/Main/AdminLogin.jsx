import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onAdminLoggedIn }) {
  const [type, setType] = useState("login");
  const [adminCred, setAdminCred] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setAdminCred({ ...adminCred, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/login", adminCred);
      if (response.status === 200) {
        localStorage.setItem("admin", adminCred.username);
        onAdminLoggedIn();
        setAdminCred({ username: "", password: "" });
        setError("");
        navigate("/admin/adminhome");
      } else {
        setError("Login failed. Please try again.");
        setAdminCred({ username: "", password: "" });
      }
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass = "container " + (type === "login" ? "right-panel-active" : "");

  return (
    <div className="login">
      <style>{`
        body {
          background: #f6f5f7;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: "Montserrat", sans-serif;
          height: 100vh;
          margin: -20px 0 50px;
        }
        .login {
          font-family: sans-serif;
          text-align: center;
        }
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
        * {
          box-sizing: border-box;
        }
        .container {
          margin-top:10px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 550px;
        }
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }
        .login-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }
        .container.right-panel-active .login-container {
          transform: translateX(100%);
        }
        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }
        .overlay {
          background: #ff416c;
          background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
          background: linear-gradient(to right, #ff4b2b, #ff416c);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }
        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        .overlay-left {
          transform: translateX(-20%);
        }
        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }
        input {
          background-color: #eee;
          border: none;
          padding: 12px 10px; /* Increased vertical padding */
          margin: 8px 0; /* Reduced margin */
          margin-top: 10px; /* Reduced top margin */
          width: 90%; /* Adjusted width */
          border-radius: 5px; /* Optional rounded corners */
          height: 50px; /* Increased height */
        }
        button {
          border-radius: 20px;
          border: 1px solid #ff4b2b;
          background-color: #ff4b2b;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
        }
        button:active {
          transform: scale(0.95);
        }
        button.ghost {
          background-color: transparent;
          border-color: #ffffff;
        }
      `}</style>
      <h2 style={{ marginTop: "100px" }}>Admin Login</h2>

      <div className={containerClass} id="container">
        <div className="form-container login-container">
          <form onSubmit={submitForm}>
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={adminCred.username}
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={adminCred.password}
              onChange={handleInput}
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Admin!</h1>
              <p>Access your dashboard and manage everything seamlessly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}