import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { ChangePassword } from "../components/user/ChangePassword";
import { TogglerView } from "../components/user/TogglerView";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";

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
      {/* change password */}
      <TogglerView label="Password">
        <ChangePassword />
      </TogglerView>
    </div>
  );
};

export default MyProfile;
