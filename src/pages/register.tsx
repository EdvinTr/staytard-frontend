import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { AppHeader } from "../components/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { FormContainer } from "../components/register-form/FormContainer";
import { RegisterForm } from "../components/register-form/RegisterForm";
import { APP_NAME, APP_PAGE_ROUTE } from "../constants";
import { initializeApollo } from "../lib/apolloClient";
import { MeDocument, MeQuery } from "../lib/graphql";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({ headers: ctx.req.headers });
  try {
    const { data } = await client.query<MeQuery>({
      query: MeDocument,
    });
    if (data && data.me) {
      // user is logged in
      return {
        props: {},
        redirect: {
          destination: APP_PAGE_ROUTE.INDEX,
        },
      };
    }
    // should probably never end up here
    return {
      props: {},
    };
  } catch {
    // probably got a 401 response from AuthGuard meaning: user is not logged in
    return {
      props: {},
    };
  }
};

export default RegisterPage;
