import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { APP_PAGE_ROUTE } from "../../constants";
import { useAuthenticateWithGoogleMutation } from "../../lib/graphql";
interface LoginWithGoogleButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginWithGoogleButton = ({
  ...props
}: LoginWithGoogleButtonProps) => {
  const [authenticateWithGoogle] = useAuthenticateWithGoogleMutation();
  const router = useRouter();
  const apollo = useApolloClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    setErrorMessage(null);
    if ("accessToken" in response) {
      const googleAccessToken = response.accessToken;
      try {
        const response = await authenticateWithGoogle({
          variables: {
            googleAuthToken: googleAccessToken,
          },
        });
        if (!response || !response.data) {
          throw new Error();
        }
        await apollo.resetStore();
        await router.push(APP_PAGE_ROUTE.INDEX);
      } catch (err) {
        setErrorMessage(
          "An error occurred while logging in with Google. Try again later."
        );
      }
    }
  };
  return (
    <div className="text-center">
      {/*  {errorMessage && <div className="text-red-500 pb-4">{errorMessage}</div>} */}
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Login"
        render={(renderProps) => (
          <button
            className={`relative w-full border ${props.className} bg-blue-700 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:bg-blue-600`}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className="absolute left-4 bottom-2">
              <Image
                src={"/svg/colored-google-icon.svg"}
                height={28}
                width={28}
                alt="Google icon"
              />
            </div>
            <span>Sign in with Google</span>
          </button>
        )}
        onSuccess={loginSuccess}
        onFailure={() => {
          // TODO: handle failure or swallow it i suppose
        }}
        cookiePolicy={"single_host_origin"}
        responseType="code, token"
      />
    </div>
  );
};
