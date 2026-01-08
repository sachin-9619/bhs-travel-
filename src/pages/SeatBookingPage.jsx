import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Card from "../components/Card";

const SEAT_ROWS = 10;
const SEATS_PER_ROW = 4;
const SEAT_PRICE = 500;
const MAX_SEATS = 6;

export default function BookingPage() {
  const API = import.meta.env.VITE_API_URL;
  const { routeId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH BOOKED SEATS ================= */
  useEffect(() => {
    if (!travelDate) return;

    const formattedDate = new Date(travelDate)
      .toISOString()
      .split("T")[0];

    fetch(`${API}/api/booking/${routeId}/seats?date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookedSeats(data.map(Number));
        } else {
          setBookedSeats([]);
        }
      })
      .catch(() => setBookedSeats([]));
  }, [API, routeId, travelDate]);

  /* ================= SEATS ================= */
  const seats = useMemo(
    () =>
      Array.from(
        { length: SEAT_ROWS * SEATS_PER_ROW },
        (_, i) => i + 1
      ),
    []
  );

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) return prev.filter((s) => s !== seat);
      if (prev.length >= MAX_SEATS) {
        alert(`Max ${MAX_SEATS} seats allowed`);
        return prev;
      }
      return [...prev, seat];
    });
  };

  /* ================= CONFIRM BOOKING ================= */
  const handleConfirm = async () => {
    setError("");

    if (!userName) return setError("Enter name");
    if (!email) return setError("Enter email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Invalid email");
    if (!travelDate) return setError("Select travel date");
    if (!/^[6-9]\d{9}$/.test(phone))
      return setError("Invalid phone number");
    if (!selectedSeats.length)
      return setError("Select at least one seat");

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route_id: Number(routeId),
          user_name: userName,
          email,
          phone,
          seats: selectedSeats.length, // backend expects NUMBER
          amount: selectedSeats.length * SEAT_PRICE,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      alert("🎉 Booking Successful!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <Card className="max-w-3xl p-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Book Seats
        </h1>

        {/* DATE */}
        <input
          type="date"
          className="w-full p-3 mb-4 border rounded"
          value={travelDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setTravelDate(e.target.value)}
        />

        {/* SEATS */}
        <div className="mb-6 space-y-3">
          {Array.from({ length: SEAT_ROWS }).map((_, row) => (
            <div key={row} className="flex justify-center gap-3">
              {seats
                .slice(
                  row * SEATS_PER_ROW,
                  row * SEATS_PER_ROW + SEATS_PER_ROW
                )
                .map((s) => (
                  <div
                    key={s}
                    onClick={() => toggleSeat(s)}
                    className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer font-bold
                      ${
                        bookedSeats.includes(s)
                          ? "bg-gray-400 cursor-not-allowed"
                          : selectedSeats.includes(s)
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-300 hover:bg-indigo-400"
                      }`}
                  >
                    {bookedSeats.includes(s) ? <Check /> : s}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* FORM */}
        <input
          placeholder="Name"
          className="w-full p-3 mb-3 border rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full p-3 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="w-full p-3 mb-3 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && <p className="mb-3 text-red-600">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full py-3 text-white bg-indigo-500 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </Card>
    </div>
  );
}
