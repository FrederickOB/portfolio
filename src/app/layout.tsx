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
      <body className="bg-white dark:bg-black">{children}</body>
    </html>
  );
}
