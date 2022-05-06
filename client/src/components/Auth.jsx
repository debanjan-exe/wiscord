import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState(initialState);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = "https://wiscord.herokuapp.com/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={formSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">
                Password{" "}
                <span
                  style={{
                    color: showPass ? "red" : "#0dc700",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "(Hide)" : "(Show)"}
                </span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account ?"
                : "Don't have an account ?"}
              <span onClick={switchMode}>
                {isSignUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
