import { NextPage } from "next";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { withAuth } from "../components/withAuth";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";

const MyOffers: NextPage = () => {
  return (
    <div>
      <MyMetaTags title={`My offers | ${APP_NAME}`} />
      <AppHeader />
      <UserSettingsNavbar />
      <FadeInContainer className="min-h-screen">
        <h1 className="py-20 text-center text-2xl font-medium tracking-wide">
          This page is currently under{" "}
          <span className="underline">construction</span>.{" "}
          <span className="block">Please come back at a later date.</span>
        </h1>
      </FadeInContainer>
    </div>
  );
};

export default withAuth(MyOffers, APP_PAGE_ROUTE.LOGIN);
