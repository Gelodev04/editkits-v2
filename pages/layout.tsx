import React, {useState, useEffect} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {montserrat, roboto, opensans, workSans} from "@/lib/fonts";

export default function RootLayout({children}: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`${montserrat.variable} ${roboto.variable} ${opensans.variable} ${workSans.variable}`}>
      <div className="border border-b-1">
        <Header/>
      </div>
      <div className="min-h-[100vh]">
        {children}
      </div>
      <Footer/>
    </div>
  );
}
