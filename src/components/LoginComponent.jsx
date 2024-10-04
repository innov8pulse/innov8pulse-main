import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LogoBlack from "../assets/logo-black.png"
import GoogleButton from 'react-google-button'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../index.css"
// import "../App.css"

export default function LoginComponent() {

    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const login = async () => {
      try {
        let res = await LoginAPI(credentails.email, credentails.password);
        toast.success("signed in to innov8pulse!");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      } catch (err) {
        console.log(err);
        toast.error("please check your credentials");
      }
    };
  
    const googleSignIn = async () => {
      const response = await GoogleSignInAPI(); // Await the API response
      if (response) {
        toast.success("Sign-in successful!");
        // You can handle the signed-in user here, e.g., redirect or store user info
        navigate("/home"); 
      } else {
        toast.error("Sign-in failed or cancelled!");
      }
    };
    return (
      <>
        <div className="login-wrapper">
      <img src={LogoBlack} className="innov8Logo" onClick={() => navigate("/")} />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading"></p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="email or phone"
          />
          <div className="password-container"> {/* Container for password input and toggle */}
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type={showPassword ? "text" : "password"} 
              className="common-input"
              placeholder="password"
            />
            <label className="password-toggle">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              <div className="toggle">show password</div>
            </label>
          </div>
        </div>
        <button onClick={login} className="login-btn">
          sign in
        </button>
        <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton 
      className="google-btn" 
      type="light"
  onClick={googleSignIn}
/>
        <p className="go-to-signup">
          new here?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            join now
          </span>
        </p>
      </div>
      </div>
    </div>
      </>
    );
}