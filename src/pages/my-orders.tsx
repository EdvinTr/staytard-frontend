import { NextPage } from "next";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { CustomerOrderTable } from "../components/user/my-orders/CustomerOrderTable";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { withAuth } from "../components/withAuth";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";

const MyOrders: NextPage = () => {
  return (
    <div>
      <MyMetaTags title={`My orders | ${APP_NAME}`} />
      <AppHeader />
      <UserSettingsNavbar />
      <section className="min-h-screen">
        <h2 className="py-12 text-center text-2xl font-semibold uppercase">
          My orders
        </h2>
        <CustomerOrderTable />
      </section>
      <div className="min-h-[50vh]"></div>
    </div>
  );
};

export default withAuth(MyOrders, APP_PAGE_ROUTE.LOGIN);
