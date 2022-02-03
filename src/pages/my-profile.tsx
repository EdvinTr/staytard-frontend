import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AppHeader } from "../components/global/AppHeader";
import { ChangePassword } from "../components/user/ChangePassword";
import { EditForm } from "../components/user/EditForm";
import { UserSettingsNavbar } from "../components/user/UserSettingsNavbar";
import { APP_NAME } from "../constants";

const EditInfoContext = React.createContext({
  // updatePassword: () => {}
});

const EditInfoProvider: React.FC = ({ children }) => {
  // const [update] = useUpdateUserAddressMutation();
  return (
    <EditInfoContext.Provider
      value={
        {
          // updatePassword: update
        }
      }
    >
      {children}
    </EditInfoContext.Provider>
  );
};

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
      <EditForm label="Password">
        <ChangePassword />
      </EditForm>
    </div>
  );
};

export default MyProfile;
