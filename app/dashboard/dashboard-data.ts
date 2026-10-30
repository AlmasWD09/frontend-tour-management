export type TourStatus = "Published" | "Draft";

export type Tour = {
  id: string;
  title: string;
  destination: string;
  duration: number;
  price: number;
  status: TourStatus;
  bookings: number;
  image: string;
  description: string;
};

export const initialTours: Tour[] = [
  { id: "bali-escape", title: "A quiet escape to Bali", destination: "Ubud, Indonesia", duration: 6, price: 840, status: "Published", bookings: 24, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80", description: "A slower side of Bali, with rice terraces, local food, and time to unwind." },
  { id: "chefchaouen", title: "The blue streets of Chefchaouen", destination: "Chefchaouen, Morocco", duration: 5, price: 620, status: "Published", bookings: 18, image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=500&q=80", description: "Wander the blue medina and explore the Rif Mountains with a local host." },
  { id: "dolomites", title: "Slow mornings in the Dolomites", destination: "South Tyrol, Italy", duration: 7, price: 1140, status: "Draft", bookings: 0, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80", description: "A small-group mountain escape with scenic walks and cozy alpine stays." },
];
