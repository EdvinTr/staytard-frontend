import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { CenteredBeatLoader } from "../components/global/CenteredBeatLoader";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { useMeQuery } from "../lib/graphql";

const MyOffers: NextPage = () => {
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
      <MyMetaTags title={`My offers | ${APP_NAME}`} />
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

export default MyOffers;
