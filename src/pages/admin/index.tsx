import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { AdminNavbarGroup } from "../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PageContentWrapper } from "../../components/pages/admin/components/PageContentWrapper";
import { AdminOrdersView } from "../../components/pages/admin/orders/AdminOrdersView";
import { AdminProductsView } from "../../components/pages/admin/products/view/AdminProductsView";
import { AdminProductReviewsView } from "../../components/pages/admin/reviews/AdminProductReviewsView";
import { AdminUsersView } from "../../components/pages/admin/users/AdminUsersView";
import {
  ADMIN_PAGE_QUERY_KEY,
  ADMIN_SUB_PAGE_ROUTE,
  APP_NAME,
} from "../../constants";
import { isAdminSsrAuthGuard } from "../../utils/guards/isAdminSsrAuthGuard";

const AdminPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const showQuery = Router.query[ADMIN_PAGE_QUERY_KEY.SHOW];
    if (!showQuery) {
      Router.push({
        pathname: Router.pathname,
        query: {
          ...Router.query,
          [ADMIN_PAGE_QUERY_KEY.SHOW]: ADMIN_SUB_PAGE_ROUTE.PRODUCTS,
        },
      });
    }
  }, []);
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <div className="text-staytard-dark">
        <AdminNavbarGroup />
        <PageContentWrapper>
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
        </PageContentWrapper>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default AdminPage;
