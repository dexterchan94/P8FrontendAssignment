import Layout from "../components/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

/* 
  Notes
  - The API only handles integer values for interest rate but the mockup shows decimals
  - Some font colours do not have enough contrast
  - "Qualify or apply your mortgage in minutes" typo?
*/
