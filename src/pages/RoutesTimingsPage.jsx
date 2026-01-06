import { useNavigate } from "react-router-dom";
import { useGetRoutesSortedByDepartureTime } from "../hooks/useQueries";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import {
  IndianRupee,
  Bus,
  ArrowRight,
} from "lucide-react";

export default function RoutesTimingsPage() {
const API_BASE = import.meta.env.VITE_API_BASE;

  const { data: routes, isLoading } = useGetRoutesSortedByDepartureTime();
  const navigate = useNavigate();

  // ✅ SIMPLE bus type mapper (NO ENUM)
  const getBusTypeLabel = (busType) => {
    if (busType === "ac") return "AC";
    if (busType === "non-ac" || busType === "nonAc") return "Non-AC";
    if (busType === "sleeper") return "Sleeper";
    return busType;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 via-white to-pink-50">
        <div className="text-xl font-semibold text-indigo-600 animate-pulse">
          Loading routes...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-linear-to-b from-indigo-50 via-white to-pink-50">
      <div className="container px-4 mx-auto">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-500">
            Routes & Timings
          </h1>
          <p className="text-lg text-gray-600">
            🚌 Our Bus Services – Complete Schedule
          </p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <Card className="hidden border border-indigo-100 shadow-2xl md:block rounded-3xl bg-white/80">
          <CardHeader className="p-4 bg-linear-to-r from-indigo-100 to-pink-100 rounded-t-3xl">
            <CardTitle className="text-2xl font-bold text-gray-700">
              Bus Schedule
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Stops</TableHead>
                  <TableHead className="text-right">Fare</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {routes?.map((route) => (
                  <TableRow
                    key={route.id}
                    className="transition hover:bg-indigo-50/50"
                  >
                    <TableCell className="font-bold">
                      {route.busName}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {getBusTypeLabel(route.busType)}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium">
                      {route.departure}
                      <ArrowRight className="inline w-4 h-4 mx-2 text-gray-400" />
                      {route.destination}
                    </TableCell>

                    <TableCell className="font-semibold text-indigo-600">
                      {route.departureTime}
                    </TableCell>

                    <TableCell className="font-semibold text-pink-500">
                      {route.arrivalTime}
                    </TableCell>

                    <TableCell>{route.duration}</TableCell>

                    <TableCell>{route.routePoints?.length || 0}</TableCell>

                    <TableCell className="font-bold text-right">
                      <IndianRupee className="inline w-4 h-4 mr-1" />
                      {route.price}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/booking/${route.id}`)}
                        className="rounded-full bg-linear-to-r from-indigo-600 to-pink-500"
                      >
                        Book
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ================= MOBILE CARDS ================= */}
        <div className="mt-10 space-y-6 md:hidden">
          {routes?.map((route) => (
            <Card
              key={route.id}
              className="border border-indigo-100 shadow-lg rounded-3xl bg-white/80"
            >
              <CardHeader className="p-4 bg-linear-to-r from-indigo-100 to-pink-100 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    {route.busName}
                  </CardTitle>
                  <Badge variant="outline">
                    {getBusTypeLabel(route.busType)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">From</div>
                    <div className="font-bold">{route.departure}</div>
                    <div className="text-indigo-600">
                      {route.departureTime}
                    </div>
                  </div>

                  <Bus className="w-8 h-8 text-gray-400" />

                  <div className="text-right">
                    <div className="text-xs text-gray-400">To</div>
                    <div className="font-bold">{route.destination}</div>
                    <div className="text-pink-500">
                      {route.arrivalTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-gray-500">
                    {route.routePoints?.length || 0} stops
                  </div>
                  <div className="text-xl font-bold text-indigo-600">
                    <IndianRupee className="inline w-4 h-4 mr-1" />
                    {route.price}
                  </div>
                </div>

                <Button
                  onClick={() => navigate(`/booking/${route.id}`)}
                  className="w-full h-12 rounded-xl bg-linear-to-r from-indigo-600 to-pink-500"
                >
                  Book Seats
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
