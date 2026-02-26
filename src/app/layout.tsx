import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#141422",
};

export const metadata: Metadata = {
  title: {
    default: "HealthTrack",
    template: "%s | HealthTrack",
  },
  description:
    "Track your nutrition, workouts, and progress with AI-powered insights. Log meals, monitor macros, and build healthy habits — all in one place.",
  applicationName: "HealthTrack",
  keywords: [
    "health tracker",
    "nutrition tracking",
    "workout log",
    "macro tracker",
    "fitness app",
    "meal planner",
    "calorie counter",
    "AI health assistant",
  ],
  authors: [{ name: "HealthTrack" }],
  creator: "HealthTrack",
  openGraph: {
    type: "website",
    siteName: "HealthTrack",
    title: "HealthTrack — AI-Powered Health & Fitness Tracker",
    description:
      "Track nutrition, workouts, and progress with AI insights. Your complete personal health companion.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "HealthTrack — AI-Powered Health & Fitness Tracker",
    description:
      "Track nutrition, workouts, and progress with AI insights. Your complete personal health companion.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <TooltipProvider delayDuration={300}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
