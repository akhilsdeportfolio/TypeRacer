import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";

ReactDOM.render(
  <ErrorBoundary>
    <SettingsProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </SettingsProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
