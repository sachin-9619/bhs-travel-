import { useEffect, useState } from "react";

export default function AdminBookings() {
const API_BASE = import.meta.env.VITE_API_BASE; 
 const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/booking/admin/all`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Bookings</h1>
      <table className="w-full border">
        <thead>
          <tr className="text-white bg-indigo-600">
            <th>Name</th>
            <th>Seat</th>
            <th>Phone</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map(b => (
            <tr key={b.id} className="text-center border">
              <td>{b.user_name}</td>
              <td>{b.seat_number}</td>
              <td>{b.phone}</td>
              <td>₹{b.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
