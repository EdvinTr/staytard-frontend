import {
  ExclamationIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AppHeader } from "../components/AppHeader";
import { APP_NAME, APP_PAGE_ROUTE, LOCAL_STORAGE_KEY } from "../constants";
import { useLoginUserMutation } from "../lib/graphql";
import { Localized } from "../Localized";
import { isEmailAddress } from "../utils/isEmailAddress";

const inputClassNames =
  "w-full pl-12 text-xs placeholder-black placeholder-opacity-60 placeholder:font-normal focus:text-sm font-bold ring-black h-[50px] ring-1 ring-opacity-25 focus:ring-1 focus:ring-black focus:ring-opacity-60 border-none focus:border-none ";
const inputIconClassNames =
  "w-[13px] absolute top-[19px] left-4 text-black text-opacity-40";

const inputErrorClassNames = [
  "ring-red-500",
  "ring-opacity-100",
  "placeholder-red-600",
  "placeholder-opacity-100",
];
const exclamationIconClassNames =
  "w-[13px] absolute top-[19px] right-3 text-red-600";

const {
  loginFailedErrorMessage,
  emailInputErrorMessage: loginEmailInputErrorMessage,
  passwordInputErrorMessage: loginPasswordInputErrorMessage,
} = Localized.page.login;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [inputEmailState, setInputEmailState] = useState<{
    email: string;
    error: string | null;
  }>({
    email: "",
    error: null,
  });
  const [inputPasswordState, setInputPasswordState] = useState<{
    password: string;
    error: string | null;
  }>({
    password: "",
    error: null,
  });

  const [loginUser, { loading: isLoginUserLoading, error: loginUserGqlError }] =
    useLoginUserMutation();
  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (isLoginUserLoading) {
      return;
    }
    try {
      const { data } = await loginUser({
        variables: {
          input: {
            email: inputEmailState.email,
            password: inputPasswordState.password,
          },
        },
      });
      if (!data || !data.login) {
        throw new Error();
      }
      const { accessToken, refreshToken } = data.login;
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      router.push(APP_PAGE_ROUTE.INDEX);
    } catch {}
  };

  return (
    <Fragment>
      <AppHeader />
      <div className="sm:max-w-md lg:max-w-lg 2xl:max-w-4xl mx-auto px-8">
        <Head>
          <title>{`${APP_NAME} - Log in`}</title>
        </Head>
        <div className="pt-16 text-center">
          {/* page titles */}
          <div className="space-y-6">
            <h1 className="text-2xl">Log in to Staytard.com</h1>
            <h2 className="text-13 font-light">
              Log in by filling in your e-mail address and password
            </h2>
          </div>
          {/* form */}
          <form className="pt-6" onSubmit={onFormSubmit}>
            <div className="space-y-3">
              <div className="relative">
                {/* email input */}
                <input
                  type="email"
                  className={`${inputClassNames}`}
                  placeholder="E-mail"
                  required
                  onFocus={(e) => {
                    e.target.classList.remove(...inputErrorClassNames);
                  }}
                  onChange={(e) => {
                    setInputEmailState({
                      email: e.target.value,
                      error: null,
                    });
                  }}
                  onBlur={(e) => {
                    const value = e.target.value.trim();
                    if (value.length > 0) {
                      if (isEmailAddress(value)) {
                        return setInputEmailState({
                          ...inputEmailState,
                          error: null, // reset error
                        });
                      }
                    }
                    // email field was not valid
                    setInputEmailState({
                      ...inputEmailState,
                      error: loginEmailInputErrorMessage,
                    });
                    e.target.classList.add(...inputErrorClassNames);
                  }}
                />
                <MailIcon className={inputIconClassNames} />
                {inputEmailState.error && (
                  <ExclamationIcon className={`${exclamationIconClassNames}`} />
                )}
              </div>
              {/* email error */}
              {inputEmailState.error && (
                <p
                  className="text-red-600 text-left text-[11px]"
                  data-cy="email-input-error"
                >
                  {inputEmailState.error}
                </p>
              )}
              <div className="relative">
                {/* password input */}
                <input
                  type="password"
                  required
                  className={`${inputClassNames}`}
                  placeholder="Password"
                  onChange={(e) => {
                    setInputPasswordState({
                      password: e.target.value,
                      error: null,
                    });
                  }}
                  onFocus={(e) => {
                    e.target.classList.remove(...inputErrorClassNames);
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value.length === 0) {
                      setInputPasswordState({
                        ...inputPasswordState,
                        error: loginPasswordInputErrorMessage,
                      });
                      e.target.classList.add(...inputErrorClassNames);
                    }
                  }}
                />
                {/* icons */}
                <LockClosedIcon className={inputIconClassNames} />
                {inputPasswordState.error && (
                  <ExclamationIcon className={`${exclamationIconClassNames}`} />
                )}
              </div>
              {/* password field error */}
              {inputPasswordState.error && (
                <p
                  className="text-red-600 text-left text-[11px]"
                  data-cy="password-input-error"
                >
                  {inputPasswordState.error}
                </p>
              )}
            </div>
            {/* login error */}
            {loginUserGqlError && (
              <div className="text-red-600 text-13 bg-red-50 p-4 mt-4">
                <div data-cy="login-failed-error">
                  {loginFailedErrorMessage}
                </div>
              </div>
            )}
            <div className="text-13 pt-4 font-light hover:underline cursor-pointer">
              {/* //TODO should be link */}
              Forgot password?
            </div>
            {/* submit button */}
            <button
              type="submit"
              className={
                `w-full p-4 mt-5 outline-none uppercase text-sm font-bold tracking-wider bg-staytard-yellow transition-all duration-300 ease-out ` +
                (isLoginUserLoading ? "" : "hover:bg-black hover:text-white ")
              }
            >
              {isLoginUserLoading ? (
                <SpinnerCircularFixed
                  data-cy="login-button-spinner"
                  size={30}
                  thickness={80}
                  speed={300}
                  color="rgba(0,0,0,1)"
                  secondaryColor="rgba(172, 57, 57, 0)"
                  className="inline"
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* divider */}
          <div className="h-[1px] w-full bg-black bg-opacity-10 my-6"></div>
          {/* register link */}
          <Link href={APP_PAGE_ROUTE.REGISTER}>
            <a className="block p-4 w-full  border border-black text-sm border-opacity-40  hover:ring-1 hover:ring-black">
              New customer
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

// TODO: should SSR and check if user is already logged in, incase it should return props with redirect to index page.
// alternatively, should check if user is logged in on client side, but then you get weird flickering on page load since it actually renders the login page then redirects

export default LoginPage;
