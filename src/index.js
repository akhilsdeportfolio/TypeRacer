import React from "react";
import ReactDOM from "react-dom";
import TypeRacerRefactored from "./components/TypeRacerRefactored";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <TypeRacerRefactored />
  </ErrorBoundary>,
  document.getElementById("root")
);
