import React, {useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';

import {auth} from '../../Auth/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


import "./styles.css";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();


    // Signup Function 
    const handleSignup = () => {
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user.email);
            // account created succssfully
            navigate("/dashboard");
        })
        .catch((error) => {
            alert(
              "Account Not created\nCheck your email id again\nMinimum required length for password: 6"
            );
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    };

    // Login Function
    const handleLogin = () => {
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Signup successful for user");
            console.log(user.email);
            navigate("/dashboard");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("Unable to login!");
            console.log(errorMessage);
            alert("Invalid credentials");
        });
    };


    return (
        <>
            <div className="main-page">
                <div className="side-img">
                    <div className="left-title">
                        <h1 className="font-title">Dash Do!</h1>
                    </div>
                    <div className="info">
                        <h3 className="info-txt">
                        A quick, clean, and modern focus/productivity web application <br/>
                        <br/>Keep track of your day at ease!
                        </h3>
                    </div>
                </div>

                <div className="right-section">
                    <header className="App-header">
                        <div className="right-heading">
                            <h1>Let's get Started</h1>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="row-items">
                                    <input
                                        className="form-control my-2"
                                        ref={emailRef}
                                        type="email"
                                        name="given_email"
                                        placeholder="Email"
                                    />
                                    <input
                                        className="form-control my-2"
                                        ref={passwordRef}
                                        type="password"
                                        name="give_pass"
                                        placeholder="Password [Minimum 6 characters]"
                                    />
                                    <div className="submit">
                                        <button
                                            className="btn btn-primary my-2 w-100"
                                            onClick={handleSignup}
                                        >
                                            Signup
                                        </button>
                                        <button
                                            className="btn btn-success my-2 w-100"
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <Link
                                        className="btn btn-sm btn-outline-warning my-3 w-100"
                                        to="/dashboard"
                                    >
                                        Try without signup
                                    </Link>
                                    <div className="opacity-25">
                                        <strong>
                                            <h5>
                                            <i className="bi bi-exclamation-circle-fill"></i> Sign/Log In to save your tasks
                                            </h5>
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    )

}