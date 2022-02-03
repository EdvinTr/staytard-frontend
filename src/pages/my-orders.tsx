import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";

const MyOrders: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{APP_NAME}.com</title>
        <meta name="description" content="" />
      </Head>
      <AppHeader />
      {/* nav */}
      <div>
        <UserSettingsNavbar />
        <div>The users orders are presented here</div>
      </div>
    </div>
  );
};

export default MyOrders;
