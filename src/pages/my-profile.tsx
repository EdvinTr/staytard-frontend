import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { CenteredBeatLoader } from "../components/global/CenteredBeatLoader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { ChangePassword } from "../components/user/my-profile/ChangePassword";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { useMeQuery } from "../lib/graphql";

const MyProfile: NextPage = ({ cookies }: any) => {
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

export default MyProfile;
