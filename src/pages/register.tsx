import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { FormContainer } from "../components/register-form/FormContainer";
import { RegisterForm } from "../components/register-form/RegisterForm";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../constants";
const RegisterPage: NextPage = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>{APP_NAME} - Register</title>
      </Head>
      <AppHeader />
      <FadeInContainer className="min-h-screen">
        <FormContainer className="text-center">
          <div>
            <div className="space-y-6 pt-10">
              <h1 className="text-2xl">Register</h1>
              <h2 className="text-13">
                Fill in the information below to register an account with{" "}
                {APP_NAME}.
              </h2>
            </div>
            <RegisterForm onSuccess={() => router.push(APP_PAGE_ROUTE.INDEX)} />
          </div>
        </FormContainer>
      </FadeInContainer>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
  if (accessToken) {
    return {
      props: {},
      redirect: {
        destination: APP_PAGE_ROUTE.INDEX,
      },
    };
  }
  return {
    props: {},
  };
};

export default RegisterPage;
