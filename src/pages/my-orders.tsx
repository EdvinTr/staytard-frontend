import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { CustomerOrderTable } from "../components/user/my-orders/CustomerOrderTable";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";
import { isUserLoggedInRouteGuard } from "../utils/guards/isLoggedInSsrRouteGuard";

const MyOrders: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AppHeader />
      <UserSettingsNavbar />
      <section>
        <h2 className="text-center text-2xl font-semibold uppercase py-12">
          My orders
        </h2>
        <CustomerOrderTable />
      </section>
      <div className="min-h-[50vh]"></div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await isUserLoggedInRouteGuard(ctx);
};

export default MyOrders;
