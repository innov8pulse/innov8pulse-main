import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LogoBlack from "../assets/logo-black.png";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");

  const validateInputs = () => {
    let errors = {};
    if (!credentails.email) {
      errors.email = "Email is required";
    }
    if (!credentails.password) {
      errors.password = "Password is required";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const login = async () => {
    // Clear API error messages before validating inputs
    setApiError("");

    if (validateInputs()) {
      try {
        let res = await LoginAPI(credentails.email, credentails.password);
        localStorage.setItem("userEmail", res.user.email);
        navigate("/projects");
        toast.success("Signed in to Innov8Pulse!");
      } catch (err) {
        console.log(err);
        setApiError("Please check your credentials");
      }
    }
  };

  const googleSignIn = async () => {
    const response = await GoogleSignInAPI();
    if (response) {
      navigate("/projects");
    } else {
      toast.error("Sign-in failed or cancelled!");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <img
          src={LogoBlack}
          className="innov8Logo"
          onClick={() => navigate("/")}
        />

        <div className="login-wrapper-inner">
          <h1 className="heading">Sign in</h1>
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="common-input"
              placeholder="Email or phone"
            />
            {errorMessages.email && (
              <p className="error-label">{errorMessages.email}</p>
            )}

            <div className="password-container">
              <input
                onChange={(event) =>
                  setCredentials({ ...credentails, password: event.target.value })
                }
                type={showPassword ? "text" : "password"}
                className="common-input"
                placeholder="Password"
              />
              {errorMessages.password && (
                <p className="error-label">{errorMessages.password}</p>
              )}
              <label className="password-toggle">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <div className="toggle">Show password</div>
              </label>
            </div>
          </div>

          <button onClick={login} className="login-btn">
            Sign in
          </button>
          {apiError && <p className="error-label">{apiError}</p>} {/* Display API error here */}
          <hr className="hr-text" data-content="or" />
          <div className="google-btn-container">
            <GoogleButton className="google-btn" type="light" onClick={googleSignIn} />
            <p className="go-to-signup">
              New here?{" "}
              <span className="join-now" onClick={() => navigate("/register")}>
                Join now
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
