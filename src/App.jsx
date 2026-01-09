import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoutesTimingsPage from "./pages/RoutesTimingsPage";
import SeatBookingPage from "./pages/SeatBookingPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
/* =========================
   INNER APP (for useNavigate)
========================= */
function AppContent() {
  const navigate = useNavigate();
  // 🔥 AUTO LOGOUT ON RELOAD
  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "reload") {
      localStorage.removeItem("adminToken");
      navigate("/", { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/routes" element={<RoutesTimingsPage />} />
        <Route path="/booking/:routeId" element={<SeatBookingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Chatbot />
      <Footer />
    </>
  );
}

/* =========================
   MAIN APP
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
