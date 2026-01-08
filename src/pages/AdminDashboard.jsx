import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSync, FaEnvelope } from "react-icons/fa";
import RouteModal from "../components/RouteModal";

// ✅ Ensure VITE_API_BASE includes /api
const API_BASE = import.meta.env.VITE_API_BASE;

const glassCard = "bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30";
const actionBtn = "p-2 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-xl";

export default function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  const [showRouteModal, setShowRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
    fetchBookings();
    fetchMessages();
  }, []);

  /* =========================
     FETCH DATA
  ========================= */
  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/routes`);
      setRoutes(res.data);
    } catch (err) {
      console.error("Fetch routes failed:", err.response?.data || err.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/booking`); // <-- singular
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch bookings failed:", err.response?.data || err.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/contact`);
      setMessages(res.data);
    } catch (err) {
      console.error("Fetch messages failed:", err.response?.data || err.message);
    }
  };

  /* =========================
     DELETE ACTIONS
  ========================= */
  const deleteRoute = async (id) => {
    if (!window.confirm("Delete this route?")) return;
    try {
      await axios.delete(`${API_BASE}/routes/${id}`);
      fetchRoutes();
    } catch (err) {
      console.error("Delete route failed:", err.response?.data || err.message);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`${API_BASE}/booking/${id}`); // <-- singular
      fetchBookings();
      fetchRoutes(); // update seat availability
    } catch (err) {
      console.error("Delete booking failed:", err.response?.data || err.message);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_BASE}/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Delete message failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-center text-white mb-14 drop-shadow-xl">
        🚀 Admin Dashboard
      </h1>

      {/* ================= ROUTES ================= */}
      <section className={`mb-14 p-6 ${glassCard}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🚌 Routes</h2>
          <button
            onClick={() => { setSelectedRoute(null); setShowRouteModal(true); }}
            className="flex items-center gap-2 px-6 py-2 font-semibold text-white rounded-full bg-linear-to-r from-blue-500 to-cyan-500 hover:scale-105"
          >
            <FaPlus /> Add Route
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="text-gray-700 border-b">
                {["Bus", "From", "To", "Seats", "Price", "Action"].map(h => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.map(r => (
                <tr key={r.id} className="transition hover:bg-white/60">
                  <td className="p-3 font-semibold">{r.bus_name}</td>
                  <td className="p-3">{r.departure}</td>
                  <td className="p-3">{r.destination}</td>
                  <td className="p-3">{r.available_seats}</td>
                  <td className="p-3 font-bold">₹{r.price}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => { setSelectedRoute(r); setShowRouteModal(true); }}
                        className={`${actionBtn} bg-yellow-400`}
                      ><FaEdit /></button>
                      <button
                        onClick={() => deleteRoute(r.id)}
                        className={`${actionBtn} bg-red-500 text-white`}
                      ><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= BOOKINGS ================= */}
      <section className={`mb-14 p-6 ${glassCard}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📑 Bookings</h2>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-5 py-2 text-white rounded-full bg-linear-to-r from-green-500 to-emerald-500 hover:scale-105"
          >
            <FaSync /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b">
                {["Customer", "Route", "Seats", "Amount", "Date", "Action"].map(h => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-white/60">
                  <td className="p-3">{b.user_name}</td>
                  <td className="p-3">{b.route}</td>
                  <td className="p-3">{b.seats}</td>
                  <td className="p-3 font-bold">₹{b.amount}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className={`${actionBtn} bg-red-500 text-white`}
                      ><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= MESSAGES ================= */}
      <section className={`p-6 ${glassCard}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <FaEnvelope /> Messages
          </h2>
          <button
            onClick={fetchMessages}
            className="flex items-center gap-2 px-5 py-2 text-white rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105"
          >
            <FaSync /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b">
                {["Name", "Email", "Subject", "Message", "Date", "Action"].map(h => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id} className="hover:bg-white/60">
                  <td className="p-3 font-semibold">{m.first_name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.subject}</td>
                  <td className="max-w-xs p-3 truncate">{m.message}</td>
                  <td className="p-3">{new Date(m.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteMessage(m.id)}
                        className={`${actionBtn} bg-red-500 text-white`}
                      ><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= ROUTE MODAL ================= */}
      {showRouteModal && (
        <RouteModal
          route={selectedRoute}
          onClose={() => setShowRouteModal(false)}
          onSave={() => { setShowRouteModal(false); fetchRoutes(); }}
        />
      )}
    </div>
  );
}
