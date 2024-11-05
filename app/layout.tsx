'use client';
import { useRouter } from 'next/router';
import React from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ['cyrillic'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className={montserrat.className}>
      <div className="border border-b-1">
        { router.pathname !== '/pricing' && <Header /> }
      </div>
      {children}
      { router.pathname !== '/pricing' && <Footer /> }
    </div>
  );
}
