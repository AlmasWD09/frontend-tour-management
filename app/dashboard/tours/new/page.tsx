"use client";

import { useRouter } from "next/navigation";
import { TourForm } from "../tour-form";
import { useDashboard } from "../../dashboard-provider";

export default function NewTourPage() {
  const router = useRouter();
  const { addTour } = useDashboard();
  return <TourForm submitLabel="Create tour" onSubmit={(tour) => { addTour(tour); router.push("/dashboard/tours"); }} />;
}
