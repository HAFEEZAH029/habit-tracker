import type { Metadata } from "next";
import ServiceWorker from "@/components/shared/ServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "A progressive web app to track your habits and routines",
  manifest: "/manifest.json"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
