import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContexProvider } from "./components/contex/AuthContex";

// react bootstrap configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContexProvider>
);
