import {
  ExclamationIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AppHeader } from "../components/AppHeader";
import { BaseInput } from "../components/BaseInput";
import { APP_NAME, APP_PAGE_ROUTE, LOCAL_STORAGE_KEY } from "../constants";
import { useLoginUserMutation } from "../lib/graphql";
import { Localized } from "../Localized";
import { isEmailAddress } from "../utils/isEmailAddress";

const inputIconClassNames =
  "w-[13px] absolute top-[19px] left-4 text-black text-opacity-40";

const exclamationIconClassNames = "w-[13px] absolute top-[19px] right-4 ";

const {
  loginFailedErrorMessage,
  emailInputErrorMessage,
  passwordInputErrorMessage,
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
    if (inputEmailState.error || inputPasswordState.error) {
      return;
    }
    if (isLoginUserLoading) {
      return; // prevent spamming
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
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [isDisplayPasswordCheckMark, setIsDisplayPasswordCheckMark] =
    useState(false);
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
            <div>
              <div className={`relative`}>
                {/* email input */}
                <BaseInput
                  type="email"
                  required
                  className={`${!inputEmailState.error && "mb-3"} `}
                  placeholder="E-mail"
                  value={inputEmailState.email}
                  label="E-mail"
                  isFocused={isEmailInputFocused}
                  hasError={!!inputEmailState.error}
                  errorMessage={inputEmailState.error}
                  hasLeftIcon={true}
                  onChange={(e) => {
                    setInputEmailState({
                      ...inputEmailState,
                      email: e.target.value,
                    });
                  }}
                  onFocus={() => {
                    setIsEmailInputFocused(true);
                  }}
                  onBlur={(e) => {
                    setIsEmailInputFocused(false);
                    const value = e.target.value.trim();
                    if (value.length === 0 || !isEmailAddress(value)) {
                      return setInputEmailState({
                        ...inputEmailState,
                        error: emailInputErrorMessage,
                      });
                    }
                    return setInputEmailState({
                      ...inputEmailState,
                      error: null, // reset error
                    });
                  }}
                />
                <MailIcon
                  className={`${inputIconClassNames} ${
                    isEmailInputFocused && "opacity-50"
                  }`}
                />
                {inputEmailState.error && (
                  <ExclamationIcon
                    className={`${exclamationIconClassNames} ${
                      isEmailInputFocused
                        ? "text-black opacity-30"
                        : "text-red-600"
                    }`}
                  />
                )}
              </div>
              <div className="relative">
                {/* password input */}
                <BaseInput
                  type="password"
                  required
                  placeholder="Password"
                  label="Password"
                  errorMessage={inputPasswordState.error}
                  hasLeftIcon
                  hasError={!!inputPasswordState.error}
                  isFocused={isPasswordInputFocused}
                  onFocus={() => {
                    setIsPasswordInputFocused(true);
                  }}
                  onBlur={(e) => {
                    setIsPasswordInputFocused(false);
                    setIsDisplayPasswordCheckMark(false);
                    const value = e.target.value;
                    if (value.length === 0) {
                      return setInputPasswordState({
                        ...inputPasswordState,
                        error: passwordInputErrorMessage,
                      });
                    }
                    setInputPasswordState({
                      ...inputPasswordState,
                      error: null,
                    });
                    setIsDisplayPasswordCheckMark(true);
                  }}
                  value={inputPasswordState.password}
                  onChange={(e) => {
                    setInputPasswordState({
                      ...inputPasswordState,
                      password: e.target.value,
                    });
                  }}
                />
                {/* icons */}
                <LockClosedIcon
                  className={`${inputIconClassNames} ${
                    isPasswordInputFocused && "opacity-50"
                  } `}
                />
                {inputPasswordState.error && (
                  <ExclamationIcon
                    className={`${exclamationIconClassNames} ${
                      isPasswordInputFocused ? "opacity-50" : "text-red-600"
                    }`}
                  />
                )}
                {/* check mark */}
                {isDisplayPasswordCheckMark && (
                  <CheckIcon className="w-4 absolute top-[19px] right-4 opacity-40" />
                )}
              </div>
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
                /* //TODO: when tabbing and pressing enter key, should color the button back again to yellow or do this in the loading spinner (change to white spinner)*/
                `w-full p-4 mt-5 outline-none focus-visible:bg-black  focus-visible:text-white  uppercase text-sm font-bold tracking-wider bg-staytard-yellow transition-all duration-300 ease-out ` +
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
