import { clsx } from "clsx";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/utils/provider";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Driving Log",
  description: "Track hours driven for student drivers",
  content: "initial-scale=1, width=device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "min-h-screen")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
