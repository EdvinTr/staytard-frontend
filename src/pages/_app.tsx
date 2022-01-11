import { ApolloProvider } from "@apollo/client";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { Fragment, useEffect } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { APP_PAGE_ROUTE } from "../constants";
import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const currentPath = router.pathname;
  console.log(currentPath);

  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
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

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>{`Staytard.com | Fashion & Designer clothes for men online`}</title>
        <meta
          name="description"
          content="Shop menswear, shoes and accessories online. Complete with skin and hair care, home range and technical gadgets. Get style inspiration for your wardrobe and find your favorite brands."
        />
      </Head>
      <Fragment>
        {currentPath === APP_PAGE_ROUTE.LOGIN ||
        currentPath === APP_PAGE_ROUTE.REGISTER ? null : (
          <Navbar />
        )}
        <Component {...pageProps} />
      </Fragment>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
