import { GetServerSideProps, NextPage } from "next";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { ChangePassword } from "../components/user/my-profile/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";

const MyProfile: NextPage = ({ cookies }: any) => {
  console.log(cookies);
  return (
    <Fragment>
      <MyMetaTags title={`My profile | ${APP_NAME}`} />
      <AppHeader />
      <UserSettingsNavbar />
      <div className="max-w-xl">
        <div>{JSON.stringify(cookies)}</div>
      </div>
      <FadeInContainer duration={0.7}>
        <ChangePassword />
      </FadeInContainer>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* return await isUserLoggedInRouteGuard(ctx, APP_PAGE_ROUTE.LOGIN); */
  /*  try { */
  return {
    props: {
      cookies: ctx.req.headers,
    },
  };
  // fetch user by passing the cookies in the request header
  /*    const apollo = initializeApollo();
    const props = await apollo.query({
      query: MeDocument,
      context: { headers: ctx.req.headers },
    }); */
  /*   const { props } = await ssrMe.getServerPage({
      context: { headers: ctx.req.headers },

    }); */
  /*  if (!props.data || !props.data.me) {
      throw new Error(); // redirect to index page
    }
    return {
      props: {
        ...props,
        ctx: ctx.req.headers,
      },
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    }; */
  /*  } */
};

export default MyProfile;
