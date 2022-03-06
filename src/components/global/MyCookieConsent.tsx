import Image from "next/image";
import React from "react";
import CookieConsent from "react-cookie-consent";
import { APP_NAME } from "../../constants";

interface MyCookieConsentProps {}

export const MyCookieConsent: React.FC<MyCookieConsentProps> = ({}) => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="ACCEPT"
      buttonWrapperClasses="text-red-600"
      expires={7}
      style={{ backgroundColor: "white", display: "block" }}
      overlay
      disableButtonStyles
      containerClasses="px-4 py-6 lg:px-20 lg:py-8"
      ButtonComponent={({ ...props }) => {
        return (
          <button
            data-cy="cookie-consent-accept-button"
            {...props}
            className="bg-app-dark mx-4 mt-2 px-8 py-3 text-sm font-medium uppercase text-white "
          >
            Accept
          </button>
        );
      }}
    >
      <div className="text-app-dark">
        <div className="flex items-center">
          <div className="mr-5 font-bold  uppercase tracking-wide sm:text-xl">
            Your cookies, your choice!
          </div>
          <Image
            width={24}
            height={24}
            src="/img/cookie.png"
            className="rotate-[270deg]"
            alt="Cookie"
          />
        </div>
        <p className="pt-3 text-sm font-light leading-5  sm:text-base lg:max-w-xl xl:max-w-2xl">
          {APP_NAME} uses cookies to give you customized content and a better
          experience on our website. By accepting, you confirm that you agree to
          our use of cookies.
        </p>
      </div>
    </CookieConsent>
  );
};
