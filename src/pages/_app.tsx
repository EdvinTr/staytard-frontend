import { ApolloProvider } from "@apollo/client";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { Fragment, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { CartProvider } from "../contexts/CartContext";
import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

const pathsWithoutMainNavbar = [
  APP_PAGE_ROUTE.LOGIN,
  APP_PAGE_ROUTE.REGISTER,
  APP_PAGE_ROUTE.CHECKOUT,
  APP_PAGE_ROUTE.MY_PROFILE,
  APP_PAGE_ROUTE.MY_ORDERS,
  APP_PAGE_ROUTE.MY_OFFERS,
  APP_PAGE_ROUTE.ADMIN,
];

const pathsWithoutFooter = [
  APP_PAGE_ROUTE.MY_PROFILE,
  APP_PAGE_ROUTE.MY_ORDERS,
  APP_PAGE_ROUTE.MY_OFFERS,
  APP_PAGE_ROUTE.ADMIN,
];
export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const currentPath = router.pathname;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const end = () => {
      setIsLoading(false);
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
      <CartProvider>
        <Head>
          <meta charSet="utf-8" />
          <title>{`${APP_NAME}.com | Fashion & Designer clothes for men online`}</title>
          <meta
            name="description"
            content="Shop menswear, shoes and accessories online. Complete with skin and hair care, home range and technical gadgets. Get style inspiration for your wardrobe and find your favorite brands."
          />
        </Head>
        <Fragment>
          {pathsWithoutMainNavbar.includes(
            ("/" + currentPath.split("/")[1]) as APP_PAGE_ROUTE
          ) ? null : (
            <Navbar />
          )}
          {/*    {isLoading && (
          <BeatLoader
            color="#faba"
            css="display:flex; justify-content:center; padding: 4rem 0; min-height: 100vh;"
          />
        )} */}
          <Component {...pageProps} />
          {pathsWithoutFooter.includes(
            ("/" + currentPath.split("/")[1]) as APP_PAGE_ROUTE
          ) ? null : (
            <Footer />
          )}
        </Fragment>
      </CartProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
