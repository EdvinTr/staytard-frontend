import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { DefaultNavbar } from "../../components/pages/admin/components/DefaultNavbar";
import { MobileNavbar } from "../../components/pages/admin/components/MobileNavbar";
import { AdminOrdersView } from "../../components/pages/admin/orders/AdminOrdersView";
import { AdminProductsView } from "../../components/pages/admin/products/AdminProductsView";
import { AdminProductReviewsView } from "../../components/pages/admin/reviews/AdminProductReviewsView";
import { AdminUsersView } from "../../components/pages/admin/users/AdminUsersView";
import { ADMIN_SUB_PAGE_ROUTE, APP_NAME } from "../../constants";

const AdminPage: NextPage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <div className="">
        <div className="hidden lg:block">
          <DefaultNavbar />
        </div>
        <div className="bg-staytard-dark h-16 lg:hidden">
          <MobileNavbar />
        </div>
        <div className="w-full lg:pl-20">
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
        </div>
      </div>
    </Fragment>
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
