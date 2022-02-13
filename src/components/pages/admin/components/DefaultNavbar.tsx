import {
  BookmarkIcon,
  ClipboardCheckIcon,
  CubeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { ADMIN_SUB_PAGE_ROUTE, APP_PAGE_ROUTE } from "../../../../constants";

export const navItems = [
  {
    query: { show: ADMIN_SUB_PAGE_ROUTE.PRODUCTS },
    icon: CubeIcon,
  },
  {
    query: { show: ADMIN_SUB_PAGE_ROUTE.REVIEWS },
    icon: BookmarkIcon,
  },
  {
    query: { show: ADMIN_SUB_PAGE_ROUTE.ORDERS },
    icon: ClipboardCheckIcon,
  },
  {
    query: { show: ADMIN_SUB_PAGE_ROUTE.USERS },
    icon: UserIcon,
  },
];

export const DefaultNavbar = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="relative min-w-[5rem] max-w-[5rem]">
        <div className="bg-deep-blue fixed h-full min-h-screen min-w-[5rem] max-w-[5rem]">
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <div className="bg-deep-blue-darker flex w-full justify-center py-4 text-center">
              <Link href={APP_PAGE_ROUTE.INDEX}>
                <a aria-label={`Home page`}>
                  <HomeIcon className="hover:text-staytard-yellow w-8 text-gray-200  transition-all duration-150" />
                </a>
              </Link>
            </div>
            {navItems.map((item, idx) => {
              const currentQuery = router.query.show;
              return (
                <NavItemContainer
                  key={idx}
                  className={`${
                    currentQuery === item.query.show
                      ? "border-staytard-yellow bg-deep-blue-darker border-l-2"
                      : ""
                  }`}
                >
                  <Link
                    shallow
                    href={{
                      pathname: APP_PAGE_ROUTE.ADMIN,
                      query: { ...item.query },
                    }}
                  >
                    <a aria-label={`${item.query.show}`}>
                      <item.icon
                        className={`hover:text-staytard-yellow w-8  transition-all duration-150 ${
                          currentQuery === item.query.show
                            ? "text-staytard-yellow"
                            : "text-gray-600"
                        }`}
                      />
                    </a>
                  </Link>
                </NavItemContainer>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const NavItemContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className={`flex w-full justify-center py-4 text-center ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </div>
  );
};
