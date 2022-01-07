import { ApolloProvider } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  useEffect(() => {
    const start = (url: string) => {
      setIsRouteLoading(true);
    };
    const end = (url: string) => {
      setIsRouteLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>{`Staytard.com | Fashion & Designer clothes for men online`}</title>
        <meta
          name="description"
          content="Shop menswear, shoes and accessories online. Complete with skin and hair care, home range and technical gadgets. Get style inspiration for your wardrobe and find your favorite brands."
        />
      </Head>
      <AnimatePresence>
        {isRouteLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center align-middle justify-center min-h-[100vh]"
          >
            <SpinnerCircularFixed
              size={100}
              thickness={80}
              speed={300}
              color="rgba(239, 68, 68,1)"
              secondaryColor="rgba(172, 57, 57, 0)"
              className="mt-4"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!isRouteLoading && <Component {...pageProps} />}
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
