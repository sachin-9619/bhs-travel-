import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import usePWAInstall from "./usePWAInstall"; // 🔹 Add this

const queryClient = new QueryClient();

// 🔹 Root component with install hook
function Root() {
  usePWAInstall(); // 🔹 shows custom install prompt
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// 🔥 Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("✅ SW registered"))
      .catch((err) => console.error("❌ SW registration failed", err));
  });
}
