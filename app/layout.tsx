import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edem's Eatery - Authentic Ghanaian Cuisine in Liverpool",
  description: "Experience authentic Ghanaian cuisine at Edem's Eatery in Liverpool, NSW. Enjoy traditional dishes like Jollof Rice, Waakye, Banku, and more. 100% Halal certified. Dine-in, takeaway, and catering available.",
  keywords: "Ghanaian restaurant, African food Liverpool, Halal restaurant Sydney, Jollof rice, Waakye, Banku, Fufu, African cuisine NSW",
  authors: [{ name: "Edem's Eatery" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    title: "Edem's Eatery - Authentic Ghanaian Cuisine",
    description: "Where Every Bite Tells a Story of Heritage, Flavor & Passion",
    type: "website",
    locale: "en_AU",
    url: "https://edemseatery.com",
    siteName: "Edem's Eatery",
    images: [
      {
        url: "https://edemseatery.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Edem's Eatery - Authentic Ghanaian Cuisine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edem's Eatery - Authentic Ghanaian Cuisine",
    description: "Experience authentic Ghanaian cuisine in Liverpool, NSW",
    images: ["https://edemseatery.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3E2723',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
