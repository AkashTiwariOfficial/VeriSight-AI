import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ExamProvider } from "./context/ExamContext";
import { fullscreenGuard } from "./utils/sandbox/fullscreenGuard";
import { preventCopyPaste } from "./utils/sandbox/preventCopyPaste";
import { preventDevTools } from "./utils/sandbox/preventDevTools";
import { preventMultipleTabs } from "./utils/sandbox/preventMultipleTabs";

// -------------------- SECURITY BOOTSTRAP --------------------
fullscreenGuard();
preventCopyPaste();
preventDevTools();
preventMultipleTabs();

// -------------------- RENDER APP --------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExamProvider>
      <App />
    </ExamProvider>
  </React.StrictMode>
);