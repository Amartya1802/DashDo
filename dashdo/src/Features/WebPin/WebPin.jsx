import React, { useEffect, useRef, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  addWebPin,
  getWebPins,
  removeWebPin,
  selectWebPin,
} from "./WebpinSlice";

import { useDispatch, useSelector } from "react-redux";

const WebPin=()=>{
    const dispatch=useDispatch();
    const dispatchRef=useRef(dispatch);
    const [webPinData,setWebPinData]=useState({
        name: "",
        link:"https://",
    });
    
    const handleChange=(event)=>{
        event.preventDefault();
        setwebPinData({...webPinData,[event.target.name]: event.target.value});
    };
    const webPins=useSelector(selectWebPin);
     
    const addWebPinShortcut=async(event)=>{
        event.preventDefault();
        dispatch(addWebPin(webPinData));
    };
     useEffect(() => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    dispatchRef.current(getWebPins());
  }
});
}, [dispatchRef]);
    return(
        <>
              <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              >
               <div className="modal-dialog">
                   <form onSubmit={addWebPinShortcut} className="modal-content">

                   <div classname="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add WebSite
                    </h1>
                    <button 
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                   </div>
                   <div className="modal-body">

                   <input 
                   name="name"
                   value={webPinData.name}
                   onChange={handleChange}
                   type="text" 
                   className="form-control"
                   placeholder="Website title( Max length:8)"
                   minLength={3}
                   required
                   />
                   <br />
                   <input 
                   type="url"
                   name="link"
                   onChange={handleChange}
                   className="form-control"
                   placeholder="Website URL"
                   required
                   />
                   <div className="delete">
                    {webPinslmap((element,index)=>{
                        return(
                            <div key={index} className="col py-2">
                                <label className="text-center w-50">{element.name}</label>
                                <button
                                    onClick={()=>{
                                        dispatch(removeWebPin(element.name));
                                    }}
                                    className="btn btn-outline-danger w-50"
                                    >Delete
                                </button>
                            </div>
                        );
                    })}
                    </div>
                   </div>
              
               <div className="modal-footer">
                <button type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                >Cancel
                </button>
                <button 
                className="btn btn-primary"
                type="submit">
                Add Website
                </button>
               </div>
                     </form>
               </div>
              </div>

              <div className="row py-3">
                {webPins.map((element,index)=>{
                    return(
                        <div key={index} className="col-lg-2 col-sm-3 col-4">
                               <a rel="noreferrer" target="_blank" href={element.link}>
                                
                               <img 
                                className="w-100 rounded-3 border border-1 border-secondary"
                                style={{ cursor: "pointer" }}
                                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${element.link}`}
                                alt=""
                                />
                                </a>
                                <p className="text-center">{element.name}</p>


                        </div>
                    );
                })}
                <div className="col-md-2 col-4 py-3">
                    <img 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="w-100 rounded-3  border-1 border-secondary"
                    style={{ cursor: "pointer" }}
                    src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_640.png"
                    alt=""
                     />
                     <p className="text-center">Add Website</p>
                </div>
              </div>
        </>

)
}
export default WebPin;