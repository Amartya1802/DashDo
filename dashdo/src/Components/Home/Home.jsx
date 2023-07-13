import React, { useEffect } from "react";
// import Settings from "./Settings";
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
                    <h3>Right section</h3>
                </div>
            </div>
            {/* <h1>Hello!</h1> */}
        </>
    )
}

export default Home;
