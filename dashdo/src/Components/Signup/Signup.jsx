import React, {useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';

import {auth} from '../../Auth/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

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
                    <h1>Hello. Dash Do!</h1>
                </div>
                <div className="right-section">
                    
                </div>
            </div>
        </>
    )

}