import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wheelzinmotion.xyz"),

  title: {
    default: "WheelzInMotion | Technology Built to Move You Forward",
    template: "%s | WheelzInMotion",
  },

  description:
    "WheelzInMotion offers custom PC builds, computer and device repair, website development, mobile app development, marketplace submissions, and technology solutions.",

  keywords: [
    "WheelzInMotion",
    "custom PC builds",
    "computer repair",
    "phone repair",
    "tablet repair",
    "console repair",
    "drone repair",
    "website development",
    "mobile app development",
    "technology services",
  ],

  authors: [
    {
      name: "WheelzInMotion",
    },
  ],

  creator: "WheelzInMotion",
  publisher: "WheelzInMotion",

  openGraph: {
    title: "WheelzInMotion",
    description:
      "Custom PC builds, repairs, websites, mobile apps, and technology solutions.",
    url: "https://wheelzinmotion.xyz",
    siteName: "WheelzInMotion",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "WheelzInMotion",
    description:
      "Custom PC builds, repairs, websites, mobile apps, and technology solutions.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}