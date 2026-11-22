import type { Metadata, Viewport } from "next";
import { Cairo, Manrope, Playfair_Display } from "next/font/google";
import { company } from "@/content/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

const title = "SOPC — Syrian Oil & Petrochemical Company";
const description =
  "SOPC delivers oil, gas, petrochemical and industrial solutions — equipment, chemicals, trading and services backed by engineering expertise and a commitment to quality.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: title, template: "%s | SOPC" },
  description,
  applicationName: "SOPC",
  keywords: ["SOPC", "Syrian Oil & Petrochemical Company", "oil and gas", "petrochemicals", "industrial engineering", "Syria"],
  alternates: { canonical: "/" },
  icons: { icon: "/images/sopc-logo.webp" },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "SOPC",
    locale: "en_US",
    alternateLocale: ["ar_SY"],
    images: [{ url: "/images/hero-refinery-daylight.webp", width: 2200, height: 1467, alt: "Refinery in daylight" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/hero-refinery-daylight.webp"] },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${manrope.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
