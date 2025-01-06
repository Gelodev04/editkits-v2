import '../app/globals.css';
import Head from 'next/head';
import { AppProps } from "next/app";
import { Montserrat, Lato } from "next/font/google";
import dynamic from "next/dynamic";

const RootLayout = dynamic(() => import('../app/layout'), { ssr: false });

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


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Edit Kits</title>
      </Head>
      <div className={`${montserrat.variable} ${lato.variable} font-sans`}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {ssr: false})
