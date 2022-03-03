import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { CustomerOrderTable } from "../components/user/my-orders/CustomerOrderTable";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { isUserLoggedInRouteGuard } from "../utils/guards/isLoggedInSsrRouteGuard";

const MyOrders: NextPage = () => {
  return (
    <div>
      <MyMetaTags title={`${APP_NAME}.com`} />
      <AppHeader />
      <UserSettingsNavbar />
      <section>
        <h2 className="py-12 text-center text-2xl font-semibold uppercase">
          My orders
        </h2>
        <CustomerOrderTable />
      </section>
      <div className="min-h-[50vh]"></div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await isUserLoggedInRouteGuard(ctx, APP_PAGE_ROUTE.LOGIN);
};

export default MyOrders;
