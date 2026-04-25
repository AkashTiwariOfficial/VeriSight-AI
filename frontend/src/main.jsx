import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import "./index.css";

import { ExamProvider } from './context/ExamContext.jsx';
import { fullscreenGuard } from './utils/sandbox/fullscreenGuard.js';
import { preventCopyPaste } from './utils/sandbox/preventCopyPaste.js';
import { preventDevTools } from './utils/sandbox/preventDevTools.js';
import { preventMultipleTabs } from './utils/sandbox/preventMultipleTabs.js';

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