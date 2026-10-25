import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initializeSampleData } from "./data/sampleData";

// Initialize sample data on first load
initializeSampleData();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
