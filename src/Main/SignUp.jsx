import axios from "axios";
import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function SignUpForm() {
  const [state, setState] = useState({
    fullname: "",
    username: "",
    gender: "",
    age:"",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    message: "",
    hidden: false, 
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const response = await axios.post("http://localhost:8080/user/register", state);

    if (response.status === 200) {
      setMessage({
        type: "success",
        message: "Registered Successfully",
        hidden: false, 
      });

      setTimeout(() => {
        setMessage((prev) => ({
          ...prev,
          hidden: true,
        }));
      }, 7000);

      setState({
        fullname: "",
        username: "",
        gender: "",
        age: "",
        email: "",
        password: "",
      });
    } else {
      setMessage({
        type: "failed",
        message: "Something went wrong, try again.",
        hidden: false, 
      });

      setTimeout(() => {
        setMessage((prev) => ({
          ...prev,
          hidden: true,
        }));
      }, 3000);
    }
  };

  return (
    <div>
      
    <div className="form-container sign-up-container">
      
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {message.message && (
          <div
            className={`message ${message.type} ${message.hidden ? "hidden" : ""}`}
          >
            {message.message}
          </div>
        )}
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGooglePlusG />
          </a>
          <a href="#" className="social">
            <FaLinkedinIn />
          </a>
        </div>

        <input
          type="text"
          name="fullname"
          value={state.fullname}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="username"
          value={state.username} 
          onChange={handleChange}
          placeholder="Username"
        />
        <div className="gender-box">
          <select
            id="gender"
            name="gender"
            onChange={handleChange}
            required
            value={state.gender}
          >
            <option value="">--Select Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <input
          type="number"
          name="age"
          value={state.age}
          onChange={handleChange}
          placeholder="Enter Age"
        />

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        
        <button type="submit">Sign Up</button> {/* Changed onClick to type="submit" */}
        
        
      </form>

      <style>{`
        .gender-box {
          width: 100%;     /* Makes it responsive */
          max-width: 350px; /* Limits the maximum width */
        }

        .message {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    transition: opacity 0.3s ease;
  }

  .message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message.failed {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .message.hidden {
    opacity: 0;
    pointer-events: none;
  }
        .gender-box select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background-color: #f8f8f8;
          font-size: 16px;
          color: #333;
          transition: all 0.3s ease;
          box-sizing: border-box; /* Ensures padding is included in width */
        }

        .gender-box select:focus {
          border-color: #007bff;
          background-color: white;
          outline: none;
        }

        .gender-box option {
          padding: 10px;
        }


    




        

        
        select,
         {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 4px;
          border: 1px solid #ddd;
          box-sizing: border-box;
        }

       


        

       
      `}</style>
    </div>
    
    </div>
  );
}

export default SignUpForm;
