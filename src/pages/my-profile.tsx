import { GetServerSideProps, NextPage } from "next";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import MyMetaTags from "../components/global/MyMetaTags";
import { ChangePassword } from "../components/user/my-profile/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { isUserLoggedInRouteGuard } from "../utils/guards/isLoggedInSsrRouteGuard";

const MyProfile: NextPage = () => {
  return (
    <Fragment>
      <MyMetaTags title={`${APP_NAME}.com`} />
      <AppHeader />
      <UserSettingsNavbar />
      <FadeInContainer duration={0.7}>
        <ChangePassword />
      </FadeInContainer>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await isUserLoggedInRouteGuard(ctx, APP_PAGE_ROUTE.LOGIN);
};

export default MyProfile;
