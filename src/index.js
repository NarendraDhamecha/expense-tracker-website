import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux-store/Store";

// react bootstrap configuration
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
