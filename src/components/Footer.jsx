import { Bus, MapPin, Phone, Mail } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="pt-16 pb-10 text-white bg-linear-to-r from-blue-400 to-green-600">
      <div className="container grid grid-cols-1 gap-10 px-4 mx-auto md:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Bus className="w-8 h-8" aria-hidden="true" />
            <span className="text-2xl font-bold">BHS Travels</span>
          </div>
          <p className="text-sm text-white/80">
            Your Journey, Our Priority. Solapur se Pune tak - Comfortable aur Safe Travel
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <NavLink to="/" className="transition-colors hover:text-white">
                Home
              </NavLink>
            </li>
          
            <li>
              <NavLink to="/routes" className="transition-colors hover:text-white">
                Routes & Timings
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="transition-colors hover:text-white">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="transition-colors hover:text-white">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Pune, Maharashtra
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              +91 8767743975
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              support@bhstravels.com
            </li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Book Your Seat</h3>
          
          <button
            onClick={() => navigate("/routes")}
            className="w-full py-3 font-bold text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600"
          >
            Book Now
          </button>
        </div>
      </div>

    
    </footer>
  );
}
