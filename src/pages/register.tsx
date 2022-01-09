import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { FormContainer } from "../components/form/FormContainer";
import { RegisterForm } from "../components/form/RegisterForm";
import { APP_NAME } from "../constants";

const RegisterPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME} - Register</title>
      </Head>
      <AppHeader />
      <FormContainer className="text-center">
        <div>
          <div className="space-y-6 pt-16">
            <h1 className="text-2xl">Register</h1>
            <h2 className="text-13">
              Fill in the information below to register an account with{" "}
              {APP_NAME}.
            </h2>
          </div>
          <RegisterForm />
        </div>
      </FormContainer>
    </Fragment>
  );
};

export default RegisterPage;
