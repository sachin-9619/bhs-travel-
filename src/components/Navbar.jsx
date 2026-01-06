import { NavLink, useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaBus, FaBars, FaUserShield, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔐 SIMPLE CHECK
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");

  const links = [
    { name: "Home", path: "/" },
    { name: "Routes & Timings", path: "/routes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 px-6 py-4 shadow-md backdrop-blur-xl bg-white/70">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-transparent bg-linear-to-r from-indigo-500 to-pink-500 bg-clip-text">
              BHS
            </span>
            <span className="text-lg font-semibold text-gray-600">
              Travels
            </span>
            <FaBus className="text-indigo-500" />
          </div>

          {/* DESKTOP MENU */}
          <div className="items-center hidden gap-8 md:flex">

            {/* NORMAL LINKS (ONLY WHEN ADMIN LOGGED OUT) */}
            {!isAdminLoggedIn &&
              links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <div key={link.name} className="relative">
                    <NavLink
                      to={link.path}
                      className={`font-medium transition-colors ${
                        isActive
                          ? "text-1xl font-bold text-transparent bg-linear-to-r from-indigo-500 to-pink-500 bg-clip-text"
                          : "text-gray-600 hover:text-pink-500"
                      }`}
                    >
                      {link.name}
                    </NavLink>

                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-1 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 -bottom-2"
                      />
                    )}
                  </div>
                );
              })}

            {/* 🔐 ADMIN BUTTON */}
            {isAdminLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/admin-login")}
                className="flex items-center gap-2 px-4 py-1.5 text-white rounded-full
                bg-linear-to-r from-indigo-500 to-pink-500 hover:scale-105 transition"
              >
                <FaUserShield /> Admin Login
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="text-2xl md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 w-3/4 h-full p-6 shadow-xl backdrop-blur-xl bg-white/90"
          >
            <div className="flex justify-between mb-6">
              <span className="text-xl font-bold text-indigo-600">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* LINKS */}
            {!isAdminLoggedIn &&
              links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block mb-4 text-lg text-gray-700"
                >
                  {link.name}
                </NavLink>
              ))}

            {/* ADMIN BUTTON */}
            {isAdminLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-2 mt-6 text-white bg-red-600 rounded-md"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/admin-login"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-2 mt-6 text-center text-white bg-orange-600 rounded-md"
              >
                Admin Login
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
