import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import ToastProvider from "@/redux/TostProvider";

export const metadata: Metadata = {
  title: "Elsewhere — Travel, thoughtfully",
  description:
    "Thoughtful small-group journeys and locally loved places. Find your next somewhere with Elsewhere Travel.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ReduxProvider>
          {children}
          <ToastProvider />
        </ReduxProvider>
      </body>
    </html>
  );
}
