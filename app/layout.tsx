'use client'
import React from "react";

import "./globals.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  subsets: ['cyrillic'],
})

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

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
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}
