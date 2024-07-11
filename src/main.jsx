import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "iconify-icon";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import Store from "./components/redux/Store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
    </Provider>
    <ToastContainer theme="colored" />
  </BrowserRouter>
);
