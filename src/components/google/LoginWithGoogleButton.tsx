import Image from "next/image";
import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
interface LoginWithGoogleButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginWithGoogleButton = ({
  ...props
}: LoginWithGoogleButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    setErrorMessage(null);
    if ("accessToken" in response) {
      const googleAccessToken = response.accessToken;
      try {
        console.log(googleAccessToken);
        // throw new Error();
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
            className={`w-full relative border ${props.className} py-4 text-sm font-semibold tracking-wide `}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className="absolute left-4 bottom-2">
              <Image
                src={"/svg/colored-google-icon.svg"}
                height={28}
                width={28}
              />
            </div>
            <span className="opacity-90">Sign in with Google</span>
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
