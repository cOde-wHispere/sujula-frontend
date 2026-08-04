import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App";
import { RequestContextProvider } from "./context/RequestContext";
import ApiContextBinder from "./components/common/ApiContextBinder";
import "./styles/main.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <RequestContextProvider>
      <ApiContextBinder>
        <App />
      </ApiContextBinder>
    </RequestContextProvider>
  </React.StrictMode>
);