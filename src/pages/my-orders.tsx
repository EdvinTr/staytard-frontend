import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";
import { useCustomerOrdersQuery } from "../lib/graphql";
import { isUserLoggedInRouteGuard } from "../utils/guards/isLoggedInSsrRouteGuard";

const MyOrders: NextPage = () => {
  const { data } = useCustomerOrdersQuery({
    variables: {
      input: {
        limit: 50,
        offset: 0,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AppHeader />
      <UserSettingsNavbar />
      <div>The users orders are presented here</div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await isUserLoggedInRouteGuard(ctx);
};

export default MyOrders;
