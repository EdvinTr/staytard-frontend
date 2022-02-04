import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { ChangePassword } from "../components/user/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../constants";
import { ssrMe } from "../lib/page";

const MyProfile: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AppHeader />
      <UserSettingsNavbar />
      <FadeInContainer duration={0.7}>
        <ChangePassword />
      </FadeInContainer>
    </Fragment>
  );
};

// TODO: refactor into a routeGuard function
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
  if (!accessToken) {
    // save some bandwidth if no access token is present
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
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
