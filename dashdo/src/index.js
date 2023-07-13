import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { data } from "./Data/data";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={data}>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>
);

