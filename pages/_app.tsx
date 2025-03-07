import React from 'react'
import './globals.css';
import {useRouter} from "next/router";
import Head from 'next/head';
import {AppProps} from "next/app";
import {Montserrat, Lato, Work_Sans} from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";

import "./globals.css";
import './style.css';
import {Provider} from "react-redux";
import {store} from "@/store";
import {Toaster} from "react-hot-toast";

const RootLayout = dynamic(() => import('./layout'), {ssr: false});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-work-sans',
});

const pageTitles = {
  '/': 'EditKits',
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

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": pageProps.article?.metadata.meta_title,
    "image": pageProps.article?.metadata.content?.filter(cont => cont.type === "image").map(image => image.src),
    "author": {
      "@type": "Person",
      // "name": pageProps.article?.author.name,
      // "url": pageProps.article?.author.url,
    },
    "publisher": {
      "@type": "Company",
      "name": "EditKits",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/img/editkits.png",
      },
    },
    // "datePublished": pageProps.article?.datePublished,
    // "dateModified": pageProps.article?.dateModified,
    // "description": pageProps.article?.description,
    "mainEntityOfPage": `${process.env.NEXT_PUBLIC_API_URL}/blog/entry?slug=${pageProps.article?.slug}`,
  };

  if (router.pathname.startsWith('/blog')) {
    if (pageProps.article?.metadata) {
      title = `${pageProps.article?.metadata.meta_title} - EditKits`;
      keywords = pageProps.article?.metadata.keywords
    } else {
      title = 'Blog - EditKits';
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/assets/img/editkits.png"/>
        <meta name="description" content="EditKits is your next video and image processing tool"/>
        {keywords?.map(keyword => <meta name="keyword" content={keyword}/>)}
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
      <div className={`${montserrat.variable} ${lato.variable} ${workSans.variable} font-sans`}>
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
