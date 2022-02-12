import {
  BookmarkIcon,
  ClipboardCheckIcon,
  CubeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AdminOrdersView } from "../../components/pages/admin/orders/AdminOrdersView";
import { AdminProductsView } from "../../components/pages/admin/products/AdminProductsView";
import { AdminProductReviewsView } from "../../components/pages/admin/reviews/AdminProductReviewsView";
import { AdminUsersView } from "../../components/pages/admin/users/AdminUsersView";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";

export enum ADMIN_SUB_PAGE_ROUTE {
  PRODUCTS = "products",
  ORDERS = "orders",
  REVIEWS = "reviews",
  USERS = "users",
}
const navItems = [
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
const AdminPage: NextPage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <div className="flex">
        <div className="relative min-w-[5rem] max-w-[5rem]">
          <div className="bg-deep-blue fixed h-full min-h-screen min-w-[5rem] max-w-[5rem]">
            <div className="flex flex-col items-center justify-center overflow-hidden">
              <div className="bg-deep-blue-darker flex w-full justify-center py-4 text-center">
                <Link href={APP_PAGE_ROUTE.INDEX}>
                  <a>
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
                      <a>
                        <item.icon
                          className={`hover:text-staytard-yellow w-8 text-gray-600 transition-all duration-150 ${
                            currentQuery === item.query.show
                              ? "text-staytard-yellow"
                              : ""
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
        {/* component */}
        <div className="w-full">
          {router.query.show === ADMIN_SUB_PAGE_ROUTE.USERS && (
            <AdminUsersView />
          )}
          {router.query.show === ADMIN_SUB_PAGE_ROUTE.ORDERS && (
            <AdminOrdersView />
          )}
          {router.query.show === ADMIN_SUB_PAGE_ROUTE.PRODUCTS && (
            <AdminProductsView />
          )}
          {router.query.show === ADMIN_SUB_PAGE_ROUTE.REVIEWS && (
            <AdminProductReviewsView />
          )}
          <h1 className="text-5xl">Hello worlf</h1>
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
// TODO: also check the query parameter ("show"), if it is not valid, return 404 page.
// TODO: check user isAdmin or has some privileges for viewing certain routes.
// Maybe have privileges such as: ADMIN_REVIEWS, ADMIN_USERS, ADMIN_PRODUCTS, ADMIN_ORDERS and then in SSR return props determining what routes are available for this admin
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default AdminPage;
