import {
  ClipboardCheckIcon,
  RefreshIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { AdminOrdersView } from "../../components/pages/admin/orders/AdminOrdersView";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";

export enum ADMIN_SUB_PAGE_ROUTE {
  PRODUCTS = "products",
  ORDERS = "orders",
  REVIEWS = "reviews",
  USERS = "users",
}
const AdminPage: NextPage = () => {
  const router = useRouter();
  let componentToShow;
  useEffect(() => {
    console.log("I rerun effect");
    Object.entries(ADMIN_SUB_PAGE_ROUTE).forEach(([key, value]) => {
      if (value === router.query.show) {
        console.log(true);

        componentToShow = <AdminOrdersView />;
      }
    });
  }, [router.query.show]);
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <div className="flex">
        <div className="relative">
          <div className="fixed h-full min-h-screen min-w-[5rem] max-w-[5rem] bg-[#1C202E]">
            <div className="flex flex-col items-center justify-center overflow-hidden">
              <div className="flex w-full justify-center bg-[#161A24] py-4 text-center">
                <RefreshIcon className="w-8 text-gray-300" />
              </div>
              <Link
                shallow
                href={{
                  pathname: APP_PAGE_ROUTE.ADMIN,
                  query: { show: ADMIN_SUB_PAGE_ROUTE.USERS },
                }}
              >
                <NavItemContainer className="hover:text-staytard-yellow">
                  <a>
                    <UserIcon className="hover:text-staytard-yellow w-8 text-gray-300" />
                  </a>
                </NavItemContainer>
              </Link>
              <NavItemContainer>
                <Link
                  shallow
                  href={{
                    pathname: APP_PAGE_ROUTE.ADMIN,
                    query: { show: ADMIN_SUB_PAGE_ROUTE.ORDERS },
                  }}
                >
                  <a>
                    <ClipboardCheckIcon className="w-8 text-gray-300" />
                  </a>
                </Link>
              </NavItemContainer>
            </div>
          </div>
        </div>
        {/* component */}
        {componentToShow}
        <h1 className="text-5xl">Hello worlf</h1>
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
// TODO: check user isAdmin or has some privileges for viewing certain routes.
// Maybe have privileges such as: ADMIN_REVIEWS, ADMIN_USERS, ADMIN_PRODUCTS, ADMIN_ORDERS and then in SSR return props determining what routes are available for this admin
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default AdminPage;
