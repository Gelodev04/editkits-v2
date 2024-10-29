import '../app/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="border border-b-1">
        <Header />
      </div>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
