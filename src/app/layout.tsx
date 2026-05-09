import type { Metadata } from "next";
import { DM_Sans, Epilogue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MAGED ALMOLIKY - Software Engineer Portfolio",
  description: "Software Engineer with 3+ years of experience in scalable backend systems, microservices, and AI-powered applications. Specialized in Node.js, TypeScript, NestJS, and cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} ${epilogue.variable} ${jetbrainsMono.variable} bg-surface-container-lowest text-on-surface font-body-md antialiased pt-24`}
      >
        {children}
      </body>
    </html>
  );
}
