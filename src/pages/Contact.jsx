import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactPage() {
    const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔒 BACK / BACKSPACE CONTROL
  useEffect(() => {
    const handleBack = () => {
      navigate("/contact", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.subject ||
      !form.message
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // BACKEND SAVE
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed");

      alert("✅ Message sent successfully!");

      // RESET FORM
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-linear-to-br from-indigo-50 via-white to-pink-50">
      {/* HEADER */}
      <div className="mb-16 text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">We’re here to help you 🚀</p>
      </div>

      <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8">
          <div className="p-8 text-white shadow-2xl rounded-3xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600">
            <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
            <div className="space-y-6">
              <Info icon={<Phone />} label="Phone" value="+91 8767743975" />
              <Info icon={<Mail />} label="Email" value="info@bhstravels.com" />
              <Info
                icon={<MapPin />}
                label="Address"
                value="BHS Travels, Solapur, Maharashtra – 413001"
              />
            </div>
          </div>

          <div className="p-8 text-white shadow-2xl rounded-3xl bg-linear-to-br from-green-500 to-emerald-600">
            <div className="flex items-center gap-4 mb-6">
              <SiWhatsapp size={42} />
              <div>
                <h3 className="text-2xl font-bold">WhatsApp Support</h3>
                <p className="opacity-90">Instant replies • 24/7</p>
              </div>
            </div>

            <a
              href="https://wa.me/918767743975"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-lg font-semibold text-center h-14 rounded-xl bg-white/20 hover:bg-white/30"
            >
              <MessageCircle className="inline mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <div className="p-10 text-white shadow-2xl rounded-3xl bg-linear-to-br from-slate-800 via-slate-900 to-black">
            <h2 className="mb-8 text-3xl font-bold text-center">
              Send us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
              </div>

              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
              <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} />

              <div>
                <label className="block mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-white rounded-xl bg-white/10 focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-lg font-bold h-14 rounded-xl bg-linear-to-r from-indigo-600 to-pink-600 hover:scale-105"
              >
                {loading ? "Sending..." : "Send Message 🚀"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */
function Info({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
        {icon}
      </div>
      <div>
        <p className="font-bold">{label}</p>
        <p className="text-white/80">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>
      <input
        {...props}
        className="w-full h-12 px-4 text-white rounded-xl bg-white/10 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
