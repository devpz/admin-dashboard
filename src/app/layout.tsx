import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toast";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ETS SFDC | Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" />
        <div className="flex flex-row gap-10">
          <Sidebar />
          <main className="mt-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
