// src/backend.jsx

// Bus types enum
export const BusType = {
  ac: "ac",
  nonAc: "nonAc",
  sleeper: "sleeper",
};

// Example data structure for future expansion (optional)
export const exampleRoutes = [
  {
    id: 1,
    busName: "Express Line",
    busType: BusType.ac,
    departure: "Mumbai",
    destination: "Pune",
    departureTime: "08:00 AM",
    arrivalTime: "12:00 PM",
    duration: "4h",
    price: 500,
    routePoints: [
      { city: "Lonavala", time: "09:30 AM" },
      { city: "Khandala", time: "10:00 AM" },
    ],
  },
  {
    id: 2,
    busName: "Night Rider",
    busType: BusType.sleeper,
    departure: "Pune",
    destination: "Mumbai",
    departureTime: "10:00 PM",
    arrivalTime: "02:00 AM",
    duration: "4h",
    price: 600,
    routePoints: [
      { city: "Lonavala", time: "11:30 PM" },
      { city: "Khandala", time: "12:00 AM" },
    ],
  },
];

