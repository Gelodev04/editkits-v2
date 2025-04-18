import React, { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { alexandria, lato, montserrat, opensans, roboto, workSans } from '@/lib/fonts';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`${alexandria.variable} ${lato.variable} ${montserrat.variable} ${roboto.variable} ${opensans.variable} ${workSans.variable}`}
    >
      <ThemeProvider>
        <SidebarProvider>
          {(router.pathname === '/dashboard/job-status' ||
            router.pathname === '/dashboard/uploaded-files' ||
            router.pathname === '/account') && <Sidebar />}
          <div className="border border-b-1 flex-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <Header />
            {children}
            <Footer />
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
