'use client';

import React, { useState, useEffect } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ['cyrillic'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark as mounted after first render
  }, []);

  if (!isMounted) return null; // Return nothing during SSR

  return (
    <div className={montserrat.className}>
      <div className="border border-b-1">
        <Header />
      </div>
      <div className="min-h-[100vh]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
