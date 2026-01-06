import React, { useState, useEffect } from "react";

export default function RouteModal({ route, onClose, onSave }) {
  const [form, setForm] = useState({
    busName: "",
    busType: "AC",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: 40,
    price: 0,
    stops: ""
  });

  useEffect(() => {
    if (route) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        busName: route.busName || "",
        busType: route.busType || "AC",
        departure: route.departure || "",
        destination: route.destination || "",
        departureTime: route.departureTime || "",
        arrivalTime: route.arrivalTime || "",
        availableSeats: route.availableSeats || 40,
        price: route.price || 0,
        stops: ""
      });
    }
  }, [route]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded w-105 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold">
          {route ? "Edit Route" : "Add Route"}
        </h2>

        {[
          ["Bus Name", "busName"],
          ["From", "departure"],
          ["To", "destination"]
        ].map(([label, name]) => (
          <div key={name}>
            <label>{label}</label>
            <input
              className="w-full p-2 mb-2 border"
              name={name}
              value={form[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <label>Bus Type</label>
        <select
          className="w-full p-2 mb-2 border"
          name="busType"
          value={form.busType}
          onChange={handleChange}
        >
          <option value="AC">AC</option>
          <option value="NON-AC">NON-AC</option>
          <option value="SLEEPER">SLEEPER</option>
        </select>

        <label>Departure Time</label>
        <input
          type="time"
          className="w-full p-2 mb-2 border"
          name="departureTime"
          value={form.departureTime}
          onChange={handleChange}
        />

        <label>Arrival Time</label>
        <input
          type="time"
          className="w-full p-2 mb-2 border"
          name="arrivalTime"
          value={form.arrivalTime}
          onChange={handleChange}
        />

        <label>Available Seats</label>
        <input
          type="number"
          className="w-full p-2 mb-2 border"
          name="availableSeats"
          value={form.availableSeats}
          onChange={handleChange}
        />

        <label>Price (₹)</label>
        <input
          type="number"
          className="w-full p-2 mb-2 border"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <label>Stops (comma separated)</label>
        <input
          className="w-full p-2 mb-4 border"
          name="stops"
          value={form.stops}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-1 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-1 text-white bg-blue-600 rounded" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
