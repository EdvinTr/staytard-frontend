import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { CenteredBeatLoader } from "../components/global/CenteredBeatLoader";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { CustomerOrderTable } from "../components/user/my-orders/CustomerOrderTable";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { useMeQuery } from "../lib/graphql";

const MyOrders: NextPage = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return <CenteredBeatLoader />;
  }
  if (!data || !data.me) {
    router.push(APP_PAGE_ROUTE.LOGIN);
    return <></>;
  }
  return (
    <div>
      <MyMetaTags title={`My orders | ${APP_NAME}`} />
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

export default MyOrders;
