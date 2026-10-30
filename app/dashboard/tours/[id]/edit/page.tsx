"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDashboard } from "../../../dashboard-provider";
import { TourForm } from "../../tour-form";

export default function EditTourPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { tours, updateTour } = useDashboard();
  const tour = tours.find((item) => item.id === params.id);

  if (!tour) return <section className="dashboard-empty missing-tour"><h1>Tour not found</h1><p>This tour may have been deleted or the link may be incorrect.</p><Link href="/dashboard/tours" className="button button-primary">Back to tours</Link></section>;

  return <TourForm key={tour.id} initialTour={tour} submitLabel="Save changes" onSubmit={(values) => { updateTour(tour.id, values); router.push("/dashboard/tours"); }} />;
}
