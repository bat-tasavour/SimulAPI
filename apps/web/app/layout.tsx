import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimulAPI | The Zero-Script Mocking Engine",
  description: "Instantly unblock frontend development. Turn OpenAPI specs into live, validated mock APIs in seconds. Save tokens, save time.",
  openGraph: {
    title: "SimulAPI | Stop Waiting for the Backend",
    description: "The professional API playground for high-speed frontend teams.",
    url: "https://simulapi.com",
    siteName: "SimulAPI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%232563eb%22/><path d=%22M30 30h40v10H30zM30 45h40v10H30zM30 60h25v10H30z%22 fill=%22white%22/></svg>"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}