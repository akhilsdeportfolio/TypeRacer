import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";

// Import bloat module to increase bundle size for testing
// eslint-disable-next-line no-unused-vars
import * as bloat from "./bloat";

ReactDOM.render(
  <ErrorBoundary>
    <SettingsProvider>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </SettingsProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
