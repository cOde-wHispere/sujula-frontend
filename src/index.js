import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import {
  RequestContextProvider,
} from "./context/RequestContext";

import ApiContextBinder from "./components/common/ApiContextBinder";

import "./styles/main.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RequestContextProvider>
        <ApiContextBinder>
          <App />
        </ApiContextBinder>
      </RequestContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);