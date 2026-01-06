import React, { useState, useEffect } from "react";

export default function BusModal({ bus, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    ac: false,
    capacity: 0,
    amenities: "",
  });

  useEffect(() => {
    if (bus) {
      setFormData({
        name: bus.name || "",
        type: bus.type || "",
        ac: bus.ac || false,
        capacity: bus.capacity || 0,
        amenities: bus.amenities || "",
      });
    }
  }, [bus]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const busData = bus ? { ...bus, ...formData } : formData;
    onSave(busData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">{bus ? "Edit Bus" : "Add Bus"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Bus Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              placeholder="e.g., Sleeper, Seater"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleChange}
            />
            <label>AC Bus</label>
          </div>
          <div>
            <label className="block mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Amenities</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              placeholder="Wi-Fi, Recliner, etc."
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
