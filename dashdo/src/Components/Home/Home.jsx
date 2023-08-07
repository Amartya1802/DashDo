import React, { useEffect } from "react";

import Profile from "../Profile/Profile";
import WebPins from "../../Features/WebPin/WebPin";
import Notes from "../../Features/Notes/Notes";
import Todo from '../../Features/ToDo/ToDo';
import Goals from '../Goals/Goals';

import "./styles.css"

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("Authentication changed");
          }
        });
      }, []);


    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <h3>Dash Do</h3>
                </div>
                <div className="nav-right">
                    {/* <h3>Right section</h3> */}
                    <Profile />
                </div>
            </div>
            {/* <h1>Hello!</h1> */}

            <div className="body-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 py-5">
                            <div className="section1">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="Goals">
                                            <Goals />
                                        </div>
                                        <div className="Notes">
                                            <Notes />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="Todo">
                                            <Todo />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <WebPins />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;
