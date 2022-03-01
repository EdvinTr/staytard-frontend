import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { isUserLoggedInRouteGuard } from "../utils/guards/isLoggedInSsrRouteGuard";

const MyOffers: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AppHeader />
      <UserSettingsNavbar />
      <h1 className="py-20 text-center text-2xl font-medium tracking-wide">
        This page is currently under{" "}
        <span className="underline">construction</span>.{" "}
        <span className="block">Please come back at a later date.</span>
      </h1>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await isUserLoggedInRouteGuard(ctx, APP_PAGE_ROUTE.LOGIN);
};

export default MyOffers;
