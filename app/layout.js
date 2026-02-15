import "./globals.css";
import Layout from "@/components/Layout";
import { FareProvider } from "@/context/FareContext";



export const metadata = {
  title: "LUMI - Daily Fare Tracker",
  description: "Track your transport expenses.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png' }
    ],
    apple: '/icon.png',
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <FareProvider>
            <Layout>
              {children}
            </Layout>
          </FareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
