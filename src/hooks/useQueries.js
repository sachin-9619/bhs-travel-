/* =========================
   GET ALL ROUTES
========================= */
export function useGetAllRoutes() {
  const routes = [
    {
      id: 1,
      busName: "Day rider",
      busType: "ac",
      departure: "Solapur",
      destination: "Pune",
      departureTime: "08:00 AM",
      arrivalTime: "01:00 PM",
      duration: "5h",
      price: 500,
      routePoints: [
        { city: "Pandharpur", time: "09:30 AM" },
        { city: "Indapur", time: "11:00 AM" },
      ],
      availableSeats: 40,
    },
    {
      id: 2,
      busName: "Morning Express",
      busType: "non-ac",
      departure: "Solapur",
      destination: "Pune",
      departureTime: "06:00 AM",
      arrivalTime: "11:30 AM",
      duration: "5h 30m",
      price: 450,
      routePoints: [
        { city: "Mohol", time: "07:00 AM" },
        { city: "Indapur", time: "09:30 AM" },
      ],
      availableSeats: 30,
    },
    {
      id: 3,
      busName: "Shivneri Deluxe",
      busType: "ac",
      departure: "Solapur",
      destination: "Pune",
      departureTime: "02:00 PM",
      arrivalTime: "07:00 PM",
      duration: "5h",
      price: 550,
      routePoints: [
        { city: "Tembhurni", time: "03:30 PM" },
        { city: "Indapur", time: "05:00 PM" },
      ],
      availableSeats: 40,
    },
    {
      id: 4,
      busName: "Midnight Sleeper",
      busType: "sleeper",
      departure: "Solapur",
      destination: "Pune",
      departureTime: "11:30 PM",
      arrivalTime: "05:00 AM",
      duration: "5h 30m",
      price: 700,
      routePoints: [
        { city: "Pandharpur", time: "12:45 AM" },
        { city: "Daund", time: "03:30 AM" },
      ],
      availableSeats: 35,
    },
    {
  id: 5,
  busName: "Evening Rider",
  busType: "ac",
  departure: "Pune",
  destination: "Solapur",
  departureTime: "03:00 PM",
  arrivalTime: "08:00 PM",
  duration: "5h",
  price: 500,
  routePoints: [
    { city: "Indapur", time: "04:30 PM" },
    { city: "Pandharpur", time: "06:30 PM" },
  ],
  availableSeats: 40,
},
{
  id: 6,
  busName: "Early Morning Express",
  busType: "non-ac",
  departure: "Pune",
  destination: "Solapur",
  departureTime: "05:30 AM",
  arrivalTime: "11:00 AM",
  duration: "5h 30m",
  price: 450,
  routePoints: [
    { city: "Indapur", time: "07:30 AM" },
    { city: "Mohol", time: "09:30 AM" },
  ],
  availableSeats: 30,
},
{
  id: 7,
  busName: "Shivneri Return",
  busType: "ac",
  departure: "Pune",
  destination: "Solapur",
  departureTime: "01:00 PM",
  arrivalTime: "06:00 PM",
  duration: "5h",
  price: 550,
  routePoints: [
    { city: "Indapur", time: "03:00 PM" },
    { city: "Tembhurni", time: "04:30 PM" },
  ],
  availableSeats: 40,
},
{
  id: 8,
  busName: "Night Sleeper Return",
  busType: "sleeper",
  departure: "Pune",
  destination: "Solapur",
  departureTime: "11:45 PM",
  arrivalTime: "05:15 AM",
  duration: "5h 30m",
  price: 700,
  routePoints: [
    { city: "Daund", time: "02:30 AM" },
    { city: "Pandharpur", time: "04:00 AM" },
  ],
  availableSeats: 35,
}

  ];

  return { data: routes };
}

/* =========================
   SORT ROUTES BY TIME
========================= */
export function useGetRoutesSortedByDepartureTime(from = "", to = "") {
  const allRoutes = useGetAllRoutes().data;

  const filteredRoutes = allRoutes
    .filter(route =>
      route.departure.toLowerCase().includes(from.toLowerCase()) &&
      route.destination.toLowerCase().includes(to.toLowerCase())
    )
    .sort((a, b) => parseTime(a.departureTime) - parseTime(b.departureTime));

  return { data: filteredRoutes };
}

/* =========================
   TIME PARSER
========================= */
function parseTime(timeStr = "00:00 AM") {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/* =========================
   CONTACT INFO
========================= */
export function useGetContactInfo() {
  return {
    data: {
      phone: "+91 8767743975",
      email: "sachinmore@example.com",
      address: "Hadapsar, Maharashtra, India",
      whatsapp: "+91 8767743975",
      workingHours: "Mon-Sun: 8:00 AM - 8:00 PM",
    },
  };
}
