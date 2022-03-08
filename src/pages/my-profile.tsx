import { NextPage } from "next";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { ChangePassword } from "../components/user/my-profile/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { withAuth } from "../components/withAuth";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";

const MyProfile: NextPage = () => {
  return (
    <Fragment>
      <MyMetaTags title={`My profile | ${APP_NAME}`} />
      <AppHeader />
      <UserSettingsNavbar />
      <FadeInContainer className="min-h-screen">
        <ChangePassword />
      </FadeInContainer>
    </Fragment>
  );
};

export default withAuth(MyProfile, APP_PAGE_ROUTE.LOGIN);
