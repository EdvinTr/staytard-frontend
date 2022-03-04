import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { AppHeader } from "../components/global/AppHeader";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { FormContainer } from "../components/register-form/FormContainer";
import { RegisterForm } from "../components/register-form/RegisterForm";
import { APP_NAME, APP_PAGE_ROUTE, COOKIE_NAME } from "../constants";
import { RegisterUserDto, useRegisterUserMutation } from "../lib/graphql";
const RegisterPage: NextPage = () => {
  const router = useRouter();

  const [registerUser, { error: registerUserError, client }] =
    useRegisterUserMutation();
  const onFormSubmit = async (values: RegisterUserDto) => {
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            ...values,
          },
        },
      });
      if (!data || !data.registerUser) {
        throw new Error();
      }
      await client.resetStore();
      await router.push(APP_PAGE_ROUTE.INDEX);
    } catch {}
  };
  return (
    <Fragment>
      <MyMetaTags title={`${APP_NAME} - Register`} />
      <AppHeader />
      <FadeInContainer className="min-h-screen">
        <FormContainer className="text-center">
          <div>
            <div className="space-y-6 pt-10 pb-4">
              <h1 className="text-2xl">Register</h1>
              <h2 className="text-13">
                Fill in the information below to register an account with{" "}
                {APP_NAME}.
              </h2>
            </div>
            <RegisterForm
              onSubmit={onFormSubmit}
              errorMessage={registerUserError?.message}
            />
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
