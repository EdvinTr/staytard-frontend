import { useApolloClient } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { LoginWithGoogleButton } from "../components/google/LoginWithGoogleButton";
import { LoginForm } from "../components/login-form/LoginForm";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../constants";
import { LoginUserDto, useLoginUserMutation } from "../lib/graphql";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [loginUser, { loading: isLoginUserLoading, error: loginUserGqlError }] =
    useLoginUserMutation();

  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { email, password }: LoginUserDto,
    hasUnresolvedFieldErrors: boolean
  ): Promise<void> => {
    e.preventDefault();
    if (hasUnresolvedFieldErrors || isLoginUserLoading) {
      return;
    }
    try {
      await apolloClient.resetStore();
      const { data } = await loginUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      if (!data || !data.login) {
        throw new Error();
      }

      router.push(APP_PAGE_ROUTE.INDEX);
    } catch {}
  };

  return (
    <Fragment>
      <AppHeader />
      <div className="min-h-screen sm:max-w-md lg:max-w-lg 2xl:max-w-4xl mx-auto px-8">
        <Head>
          <title>{`${APP_NAME} - Log in`}</title>
        </Head>
        <FadeInContainer>
          <div className="pt-10 text-center">
            {/* page titles */}
            <div className="space-y-6">
              <h1 className="text-2xl">Log in to {APP_NAME}.com</h1>
              <h2 className="text-13 font-light">
                Log in by filling in your e-mail address and password
              </h2>
            </div>
            {/* form */}
            <LoginForm
              isSubmitting={isLoginUserLoading}
              loginError={loginUserGqlError?.message}
              onSubmit={onFormSubmit}
            />
            {/* divider */}
            <div className="flex justify-center items-center py-4">
              <div className="w-1/2 h-[1px] bg-black opacity-20"></div>
              <span className="px-8 opacity-75 text-sm">or</span>
              <div className="w-1/2 h-[1px] bg-black opacity-20"></div>
            </div>
            <LoginWithGoogleButton className="mb-7" />
            <div className="h-[1px] w-full bg-black bg-opacity-10 mb-6"></div>

            {/* register link */}
            <Link href={APP_PAGE_ROUTE.REGISTER}>
              <a className="block p-4 w-full  border border-black text-sm border-opacity-40  hover:ring-1 hover:ring-black">
                New customer
              </a>
            </Link>
          </div>
        </FadeInContainer>
      </div>
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

export default LoginPage;
