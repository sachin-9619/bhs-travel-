// src/routes.jsx
import { createRouter, Route } from "@tanstack/react-router";
import Home from "./pages/Home.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";

// Root Route
export const rootRoute = new Route({
  path: "/",
  component: Home,
});

// Child Route
export const searchRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "search",
  component: SearchResultsPage,
});

// Router
export const router = createRouter({
  routeTree: rootRoute.addChildren([searchRoute]),
});
