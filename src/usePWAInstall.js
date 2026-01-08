// src/usePWAInstall.js
import { useEffect } from "react";

export default function usePWAInstall() {
  useEffect(() => {
    let deferredPrompt;

    const handlerBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e; // save the event
      // Show your custom banner/button here
      const banner = document.createElement("div");
      banner.id = "pwa-banner";
      banner.style = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        right: 10px;
        background: #4f46e5;
        color: white;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
        z-index: 9999;
      `;
      banner.innerHTML = `
        📲 Install BHS Travels App
        <button id="installBtn" style="
          margin-left: 12px;
          padding: 6px 12px;
          font-weight: normal;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        ">Install</button>
      `;
      document.body.appendChild(banner);

      document.getElementById("installBtn").onclick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("👍 User accepted PWA install");
        } else {
          console.log("👎 User dismissed PWA install");
        }
        deferredPrompt = null;
        banner.remove();
      };
    };

    window.addEventListener("beforeinstallprompt", handlerBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlerBeforeInstallPrompt);
    };
  }, []);
}
