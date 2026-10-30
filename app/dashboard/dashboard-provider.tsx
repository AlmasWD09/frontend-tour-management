"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { initialTours, type Tour } from "./dashboard-data";

type DashboardContextValue = {
  tours: Tour[];
  addTour: (tour: Omit<Tour, "id" | "bookings">) => string;
  updateTour: (id: string, tour: Omit<Tour, "id" | "bookings">) => void;
  deleteTour: (id: string) => void;
};

const STORAGE_KEY = "elsewhere-dashboard-tours";
const DashboardContext = createContext<DashboardContextValue | null>(null);

let cachedStorageValue: string | null | undefined;
let cachedTours = initialTours;

function getSnapshot() {
  if (typeof window === "undefined") return initialTours;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedTours;
  }
  if (raw !== cachedStorageValue) {
    cachedStorageValue = raw;
    if (!raw) cachedTours = initialTours;
    else {
      try {
        const parsed = JSON.parse(raw) as Tour[];
        cachedTours = Array.isArray(parsed) ? parsed : initialTours;
      } catch {
        cachedTours = initialTours;
      }
    }
  }
  return cachedTours;
}

function subscribe(callback: () => void) {
  window.addEventListener("elsewhere-tours-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("elsewhere-tours-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function saveTours(tours: Tour[]) {
  cachedTours = tours;
  try {
    cachedStorageValue = JSON.stringify(tours);
    window.localStorage.setItem(STORAGE_KEY, cachedStorageValue);
  } catch {
    cachedStorageValue = undefined;
  }
  window.dispatchEvent(new Event("elsewhere-tours-change"));
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const tours = useSyncExternalStore(subscribe, getSnapshot, () => initialTours);

  function addTour(tour: Omit<Tour, "id" | "bookings">) {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    saveTours([...getSnapshot(), { ...tour, id, bookings: 0 }]);
    return id;
  }

  function updateTour(id: string, tour: Omit<Tour, "id" | "bookings">) {
    saveTours(getSnapshot().map((item) => item.id === id ? { ...item, ...tour } : item));
  }

  function deleteTour(id: string) {
    saveTours(getSnapshot().filter((tour) => tour.id !== id));
  }

  return <DashboardContext.Provider value={{ tours, addTour, updateTour, deleteTour }}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used inside DashboardProvider");
  return context;
}
