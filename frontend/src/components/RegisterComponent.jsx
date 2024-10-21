import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LogoBlack from "../assets/logo-black.png"
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";

export default function RegisterComponent() {
    let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("account created!");
      try {
        await postUserData({
          userID: getUniqueID(),
          name: credentails.name,
          email: credentails.email,
          imageLink:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        });
        localStorage.setItem("userEmail", res.user.email);
        navigate("/login");
      } catch (err) {
        console.log("Error posting user data:", err);
        toast.error("Account created, but failed to save user data.");
      }
    } catch (err) {
      console.log(err);
      toast.error("cannot create your account");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LogoBlack} className="innov8Logo" onClick={() => navigate("/")}/>

      <div className="login-wrapper-inner">
        <h1 className="heading">ignite ideas</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="your name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="email or phone number"
          />
          <div className="password-container"> 
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type={showPassword ? "text" : "password"} 
              className="common-input"
              placeholder="password (6 or more characters)"
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
        <button onClick={register} className="login-btn">
          agree & join
        </button>
        <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
          <p className="go-to-signup">
            already on innov8pulse?{" "}
            <span className="join-now" onClick={() => navigate("/login")}>
              sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
