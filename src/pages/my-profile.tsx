import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { ChangePassword } from "../components/user/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../constants";
import { ssrMe } from "../lib/page";

const MyProfile: NextPage = () => {
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
      </div>
      <ChangePassword />
    </div>
  );
};

// TODO: refactor into a routeGuard function
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
  if (!accessToken) {
    // save some CPU if no access token is present
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
    console.log(
      "🚀 ~ file: my-profile.tsx ~ line 289 ~ constgetServerSideProps:GetServerSideProps= ~ err",
      err
    );
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
};

export default MyProfile;
