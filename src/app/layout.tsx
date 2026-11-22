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

const title = "SOPC — Syrian Oil & Petrochemical Company | Oil Services in Syria";
const description =
  "SOPC — Syrian Oil & Petrochemical Company: crude oil extraction, oil well maintenance and field operations, pumping station operation and maintenance, import and export of equipment, and training consultancy.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: title, template: "%s | SOPC" },
  description,
  applicationName: "SOPC",
  keywords: ["SOPC", "Syrian Oil & Petrochemical Company", "oil and gas", "petrochemicals", "industrial engineering", "Syria"],
  alternates: { canonical: "./" },
  icons: { icon: "images/sopc-logo.webp" },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "SOPC",
    locale: "en_US",
    alternateLocale: ["ar_SY"],
    images: [{ url: "og-image.jpg", width: 1200, height: 630, alt: "SOPC — Syrian Oil & Petrochemical Company" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["og-image.jpg"] },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${manrope.variable} ${playfair.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply a saved dark-mode choice before first paint (no light flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("sopc-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
