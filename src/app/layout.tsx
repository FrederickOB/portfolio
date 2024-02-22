import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import "./globals.css";
import Script from "next/script";
export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Frederick Ofori-Boadu",
  description: "Frederick's Porfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && (
        <GoogleAnalytics
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
        />
      )}
      <script
        defer
        src="https://analytics.us.umami.is/script.js"
        data-website-id="dfbb00ae-1979-4d7d-acdb-5598e2ed0dec"
      ></script>
      <body className="bg-white dark:bg-black">{children}</body>
    </html>
  );
}
