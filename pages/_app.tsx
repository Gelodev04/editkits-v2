import React from 'react'
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {AppProps} from "next/app";
import Script from "next/script";
import Head from 'next/head';

import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";

import './globals.css';
import "./globals.css";
import './style.css';

import {store} from "@/store";
import {alexandria, lato, montserrat, workSans} from "@/lib/fonts";
import {jsonLdData} from "@/lib/constants";

const RootLayout = dynamic(() => import('./layout'), {ssr: false});

const pageTitles = {
  '/home': 'The Ultimate Online Video, Audio and Image Tools Platform',
  '/account': 'Account - EditKits',
  '/blog': 'Blog - EditKits',
  '/contact-us': 'Contact Us - EditKits',
  '/dashboard': 'Dashboard - EditKits',
  '/pricing': 'Pricing - EditKits',
  '/tool/trim': 'Trim Tool - EditKits',
  '/tool/resize': 'Resize Tool - EditKits',
  '/tools': 'Tools - EditKits',
  '/404': 'Page Not Found - EditKits',
};

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  let title = pageTitles[router.pathname] || 'EditKits';
  let keywords = [];
  const GA_TRACKING_ID = 'G-HFNS6G8Q4R'

  if (router.pathname.startsWith('/blog')) {
    if (pageProps.article?.metadata) {
      title = `${pageProps.article?.metadata?.meta_title} - EditKits`;
      keywords = pageProps.article?.metadata?.keywords
    } else {
      title = 'Blog - EditKits';
    }
  }


  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/assets/img/editkits.png"/>
        <link rel="canonical" href={"https://editkits.com" + router.pathname}/>
        <meta name="viewport" content="width=1400, user-scalable=no" />
          <meta
            name="description"
            content="EditKits is the ultimate online platform for fast, high-quality video, audio, and image processing. Edit, enhance, and optimize media effortlessly with powerful cloud-based tools and APIs."
          />
          {keywords?.map(keyword => <meta name="keyword" key={keyword} content={keyword}/>)}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdData)}}
          >
          </script>
      </Head>
      {process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />

          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
          </Script>
        </>
      )}
      <div className={`${montserrat.variable} ${lato.variable} ${workSans.variable} ${alexandria.variable} font-sans`}>
        <Provider store={store}>
          <RootLayout>
            <Toaster containerClassName="font-lato font-normal" position="top-right"/>
            <Component {...pageProps} />
          </RootLayout>
        </Provider>
      </div>
    </>
);
}

export default MyApp;
