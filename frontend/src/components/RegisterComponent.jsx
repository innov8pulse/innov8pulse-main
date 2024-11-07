import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LogoBlack from "../assets/logo-black.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentails, setCredentials] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
    const [errorMessages, setErrorMessages] = useState({ name: "", email: "", password: "", role: "" });
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        let errors = { name: "", email: "", password: "", role: "" };
        let isValid = true;

        if (!credentails.name) {
            errors.name = "Name is required.";
            isValid = false;
        }
        if (!credentails.email) {
            errors.email = "Email is required.";
            isValid = false;
        }
        if (!credentails.password) {
            errors.password = "Password is required.";
            isValid = false;
        }
        if (!role) {
            errors.role = "Please select a role (mentor or participant).";
            isValid = false;
        }

        setErrorMessages(errors);
        return isValid;
    };

    const register = async () => {
        if (!validateInputs()) {
            return;
        }

        setLoading(true);

        // if (role === "mentor") {
        //     // Redirect mentors to the MentorForm instead of registering them immediately
        //     navigate("/mentor-form"); // Update this to redirect to the mentor form route
        //     setLoading(false);
        //     return;
        // }

        try {
            const userCredential = await RegisterAPI(credentails.email, credentails.password);
            const user = userCredential.user;

            if (user && user.email) {
                toast.success("Account created!");

                const userData = {
                    name: credentails.name,
                    email: credentails.email,
                    role: role,
                    imageLink: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90byWYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
                };

                await postUserData(userData);
                localStorage.setItem("userEmail", user.email);
                setCredentials({ name: "", email: "", password: "" });
                setRole("");
                setErrorMessages({ name: "", email: "", password: "", role: "" });
                navigate("/login");
            } else {
                toast.error("User registration failed. Please try again.");
            }
        } catch (err) {
            switch (err.code) {
                case 'auth/invalid-email':
                    toast.error("Check email format and try again.");
                    break;
                case 'auth/email-already-in-use':
                    toast.error("Email already in use. Please use a different email.");
                    break;
                case 'auth/weak-password':
                    toast.error("Password is too weak. Please choose a stronger password.");
                    break;
                default:
                    console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <img src={LogoBlack} className="innov8Logo" onClick={() => navigate("/")}/>

            {loading ? (
                <Loader />
            ) : (
                <div className="login-wrapper-inner">
                    <h1 className="heading">ignite ideas</h1>

                    <div className="auth-inputs">
                        <input
                            onChange={(event) => setCredentials({ ...credentails, name: event.target.value })}
                            value={credentails.name}
                            type="text"
                            className="common-input"
                            placeholder="your name"
                        />
                        {errorMessages.name && <p className="error-label">{errorMessages.name}</p>}

                        <input
                            onChange={(event) => setCredentials({ ...credentails, email: event.target.value })}
                            value={credentails.email}
                            type="email"
                            className="common-input"
                            placeholder="email or phone number"
                        />
                        {errorMessages.email && <p className="error-label">{errorMessages.email}</p>}

                        <div className="password-container">
                            <input
                                onChange={(event) => setCredentials({ ...credentails, password: event.target.value })}
                                value={credentails.password}
                                type={showPassword ? "text" : "password"}
                                className="common-input"
                                placeholder="password (6 or more characters)"
                            />
                            {errorMessages.password && <p className="error-label">{errorMessages.password}</p>}
                            <label className="password-toggle">
                                <input
                                    type="checkbox"
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <div className="toggle">show password</div>
                            </label>
                        </div>
                    </div>

                    <div className="role-selection">
                        <label>
                            <input
                                type="radio"
                                value="participant"
                                checked={role === "participant"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Participant
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="mentor"
                                checked={role === "mentor"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Mentor
                        </label>
                        {errorMessages.role && <p className="error-label">{errorMessages.role}</p>}
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
            )}
        </div>
    );
}
