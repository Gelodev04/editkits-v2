import './globals.css';
import Head from 'next/head';
import {AppProps} from "next/app";
import {Montserrat, Lato, Work_Sans} from "next/font/google";
import dynamic from "next/dynamic";

import "./globals.css";
import './style.css';
import {Provider} from "react-redux";
import {store} from "@/store";
import { Toaster } from "react-hot-toast";

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

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Edit Kits</title>
      </Head>
      <div className={`${montserrat.variable} ${lato.variable} ${workSans.variable} font-sans`}>
        <Provider store={store}>
          <RootLayout>
            <Toaster containerClassName="font-lato font-normal" position="top-right" />
            <Component {...pageProps} />
          </RootLayout>
        </Provider>
      </div>
    </>
  );
}

export default MyApp;
