import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { PocketbaseContextProvider } from "./context/pocketbase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PocketbaseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PocketbaseContextProvider>
  </React.StrictMode>
);
