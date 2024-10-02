import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LogoBlack from "../assets/logo-black.png"
import GoogleButton from 'react-google-button'
import { toast } from "react-toastify";
import "../index.css"
// import "../App.css"

export default function LoginComponent() {

    // let navigate = useNavigate();
    const [credentails, setCredentials] = useState({});
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
  
    return (
      <>
        <div className="login-wrapper">
      <img src={LogoBlack} className="innov8Logo" />

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
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="password"
          />
        </div>
        <button onClick={login} className="login-btn">
          sign in
        </button>
        <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton 
      className="google-btn" 
      type="light"
  onClick={() => { console.log('Google button clicked') }}
/>
        <p className="go-to-signup">
          new here?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
      </div>
    </div>
        {/* <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div> */}
      </>
    );
}