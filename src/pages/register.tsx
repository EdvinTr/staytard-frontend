import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { FormContainer } from "../components/register-form/FormContainer";
import { RegisterForm } from "../components/register-form/RegisterForm";
import { APP_NAME } from "../constants";
const RegisterPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME} - Register</title>
      </Head>
      <AppHeader />
      <FadeInContainer>
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
      </FadeInContainer>
    </Fragment>
  );
};

export default RegisterPage;
