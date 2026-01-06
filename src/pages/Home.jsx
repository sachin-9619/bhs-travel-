import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "../components/Button";
import puneCity from "../assets/images/pune-city.jpg";
import { Bus, Shield, Clock, Award, MapPin, ArrowRight, Wifi, Wallet, Headphones, Smartphone } from "lucide-react";

const QUICK_INFO = [
  {
    icon: MapPin,
    title: "Route",
    info: "Solapur → Pune",
    subInfo: "5h Comfortable Journey",
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Departure",
    info: "Multiple Timings",
    subInfo: "Daily Services",
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Bus,
    title: "Fare",
    info: "Starting ₹500/600",
    subInfo: "AC / Sleeper",
    bg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const FEATURES = [
{
    icon: Shield,
    title: "Safety First",
    desc: "Regular maintenance and strict safety inspections.",
    points: [
      "GPS Tracking",
      "Trained & Verified Drivers",
      "Daily Bus Safety Checks",
      "Emergency Support System",
    ],
    gradient: "from-indigo-600 to-indigo-400",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "Reliable and punctual departures.",
    points: [
      "Live Bus Status",
      "Fixed Departure Timings",
      "Optimized Routes",
      "Minimal Delays",
    ],
    gradient: "from-pink-500 to-pink-400",
  },
  {
    icon: Award,
    title: "Comfort & Quality",
    desc: "Premium travel experience with modern buses.",
    points: [
      "AC Sleeper & Seater Options",
      "Clean & Spacious Seating",
      "Mobile Charging Ports",
      "Smooth Suspension Ride",
    ],
    gradient: "from-indigo-500 to-pink-400",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Network",
    desc: "Enjoy extra facilities during your journey.",
    points: [
      "Free Wi-Fi",
      "Entertainment System",
      "Reading Lights",
      "Water Bottles",
    ],
    gradient: "from-purple-600 to-indigo-500",
  },
    {
    icon: Smartphone,
    title: "Easy Online Booking",
    desc: "Book your tickets in just a few clicks.",
    points: [
      "Mobile Friendly Website",
      "Instant Booking Confirmation",
      "Secure Online Payments",
      "E-Ticket Support",
    ],
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "We’re always here to help you.",
    points: [
      "Call & WhatsApp Support",
      "Instant Issue Resolution",
      "Booking Assistance",
      "Friendly Staff",
    ],
    gradient: "from-orange-500 to-pink-500",
  },

];

export default function HomePage() {
    const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  return (
    <div className="w-full bg-linear-to-b from-indigo-50 via-white to-pink-50">
      
      {/* ================= HERO ================= */}
      <section className="relative flex items-center justify-center overflow-hidden h-140">
        <img
          src={puneCity}
          alt="Pune City"
          className="absolute inset-0 object-cover w-full h-full scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />

        <div className="relative z-10 max-w-3xl px-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-extrabold tracking-wide md:text-7xl drop-shadow-lg">
            BHS Travels
          </h1>
          <p className="mb-3 text-2xl font-semibold">
            Travel Smart. Travel Safe.
          </p>
          <p className="mb-8 text-lg opacity-90">
            Solapur → Pune | Trusted • Comfortable • Affordable
          </p>

          <Button
            onClick={() => navigate("/routes")}
            className="px-10 py-4 text-lg font-bold text-white transition-all rounded-full shadow-xl bg-linear-to-r from-indigo-600 to-pink-600 hover:scale-105 hover:shadow-2xl"
          >
            Book Your Seat
            <ArrowRight className="inline ml-2" />
          </Button>
        </div>
      </section>

     {/* ================= QUICK INFO ================= */}
<section className="py-20 bg-gray-50">
  <div className="container px-6 mx-auto">

    {/* Headline */}
    <div className="text-center mb-14">
      <h2 className="mb-4 text-4xl font-extrabold">
            Everything <span className="text-indigo-600">You Need to Know</span>?
          </h2>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
        Key highlights that make your journey safe, comfortable, and reliable.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {QUICK_INFO.map((item, index) => (
        <Card
          key={index}
          className="p-8 text-center transition-all duration-300 bg-white/80 backdrop-blur rounded-3xl hover:shadow-2xl hover:-translate-y-2"
        >
          <div
            className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <item.icon className={`w-8 h-8 ${item.iconColor}`} />
          </div>

          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-1 font-semibold">{item.info}</p>
          <p className="text-sm text-gray-500">{item.subInfo}</p>
        </Card>
      ))}
    </div>

  </div>
</section>


      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-4 text-4xl font-extrabold">
            Why Choose <span className="text-indigo-600">BHS Travels</span>?
          </h2>
          <p className="mb-16 text-gray-600">
            We focus on safety, comfort & reliability
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Card
                key={i}
                className="p-10 transition-all duration-300 bg-white rounded-3xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div
                  className={`w-20 h-20 bg-linear-to-br ${f.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <f.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="mt-3 text-gray-600">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
