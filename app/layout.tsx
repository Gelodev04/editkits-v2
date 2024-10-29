'use client'
import React from "react";

import "./globals.css";
import {Montserrat} from "next/font/google";
import {useState} from "react";
import Header from "../components/Header/index";
import AuthModal from "../components/modals/Auth/index";

const montserrat = Montserrat({
  subsets: ['cyrillic'],
})

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);
  return (
    <html lang="en">
    <head>
      <title>My Page Title</title>
      <meta property="og:title" content="Edit Kits"/>
    </head>
    <body
      className={montserrat.className}
    >
    <div>

      <div className="bg-neutral-50 min-h-screen">
        <Header type={type} setType={setType} setAuthModal={setAuthModal}/>
        {children}
      </div>

      <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal}/>
    </div>
    </body>
    </html>
  );
}
