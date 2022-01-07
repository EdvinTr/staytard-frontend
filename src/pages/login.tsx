import { LockClosedIcon, MailIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AppHeader } from "../components/AppHeader";
import { APP_NAME, APP_PAGE_ROUTE, LOCAL_STORAGE_KEY } from "../constants";
import { LoginUserDto, useLoginUserMutation } from "../lib/graphql";

const inputClassNames =
  "w-full pl-12 text-xs placeholder-black placeholder-opacity-60 placeholder:font-normal focus:text-sm font-bold ring-black h-[50px] ring-1 ring-opacity-25 focus:ring-1 focus:ring-black focus:ring-opacity-60 border-none focus:border-none ";
const inputIconClassNames =
  "w-[13px] absolute top-[18px] left-4 text-black text-opacity-40";

const LoginPage: NextPage = () => {
  const router = useRouter();
  /*   const { data: meData, loading: meDataLoading } = useMeQuery();
  if (meData && !meDataLoading) {
    router.push(APP_PAGE_ROUTE.INDEX);
  } */
  const [loginUser, { loading, error }] = useLoginUserMutation();
  const [userLoginDetails, setUserLoginDetails] = useState<LoginUserDto>({
    email: "",
    password: "",
  });
  const onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          input: {
            ...userLoginDetails,
          },
        },
      });
      if (!data || !data.login) {
        throw new Error("Login failed");
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
        <div className="pt-24 text-center">
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
                  required
                  className={`${inputClassNames}`}
                  placeholder="E-mail"
                  value={userLoginDetails.email}
                  onChange={(e) =>
                    setUserLoginDetails({
                      ...userLoginDetails,
                      email: e.target.value,
                    })
                  }
                />
                <MailIcon className={inputIconClassNames} />
              </div>
              <div className="relative">
                {/* password input */}
                <input
                  type="password"
                  required
                  className={`${inputClassNames}`}
                  placeholder="Password"
                  value={userLoginDetails.password}
                  onChange={(e) =>
                    setUserLoginDetails({
                      ...userLoginDetails,
                      password: e.target.value,
                    })
                  }
                />
                <LockClosedIcon className={inputIconClassNames} />
              </div>
            </div>
            {/* login error */}
            {error && (
              <div className="text-red-600 text-13 bg-red-50 p-4 mt-4">
                <div>
                  Login failed, make sure you entered the correct email and
                  password.
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
              className="w-full p-4 mt-5 uppercase text-sm font-bold tracking-wider bg-staytard-yellow hover:bg-black hover:text-white transition-all duration-300 ease-out"
            >
              {loading ? (
                <SpinnerCircularFixed
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

// TODO: should SSR and check if user is already logged in
// alternatively, should check if user is logged in on client side, but then you get weird flickering

export default LoginPage;
