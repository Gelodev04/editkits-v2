'use client';
import React from "react";
import "./globals.css";
import {Montserrat} from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ['cyrillic'],
});

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <div className={montserrat.className}>
      <div className="border border-b-1">
        <Header/>
      </div>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  );
}
