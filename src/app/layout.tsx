import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import "./globals.css";
import Script from "next/script";
import { Inter, Fira_Code } from "next/font/google";
import Providers from "@/components/Providers/Providers";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata = {
  title: "Frederick Ofori-Boadu | Front-End Developer & UI/UX Designer",
  description:
    "Front-End Developer & UI/UX Designer specializing in creating beautiful, functional, and user-centered digital experiences.",
  keywords: [
    "frontend developer",
    "UI/UX designer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Frederick Ofori-Boadu" }],
  creator: "Frederick Ofori-Boadu",
  publisher: "Frederick Ofori-Boadu",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frederickob.com",
    title: "Frederick Ofori-Boadu | Front-End Developer & UI/UX Designer",
    description:
      "Front-End Developer & UI/UX Designer specializing in creating beautiful, functional, and user-centered digital experiences.",
    siteName: "Frederick Ofori-Boadu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frederick Ofori-Boadu | Front-End Developer & UI/UX Designer",
    description:
      "Front-End Developer & UI/UX Designer specializing in creating beautiful, functional, and user-centered digital experiences.",
    creator: "@FRED_THE_THIRD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans `}
      >
        <Providers>{children}</Providers>
        <GoogleAnalytics
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
