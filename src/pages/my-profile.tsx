import { GetServerSideProps, NextPage } from "next";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { ChangePassword } from "../components/user/my-profile/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { ssrMe } from "../lib/page";

const MyProfile: NextPage = () => {
  return (
    <Fragment>
      <MyMetaTags title={`My profile | ${APP_NAME}`} />
      <AppHeader />
      <UserSettingsNavbar />
      <FadeInContainer duration={0.7}>
        <ChangePassword />
      </FadeInContainer>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* return await isUserLoggedInRouteGuard(ctx, APP_PAGE_ROUTE.LOGIN); */
  try {
    // fetch user by passing the cookies in the request header
    const { props } = await ssrMe.getServerPage({
      context: { headers: ctx.req.headers },
    });
    if (!props.data || !props.data.me) {
      throw new Error(); // redirect to index page
    }
    return {
      props,
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
};

export default MyProfile;
