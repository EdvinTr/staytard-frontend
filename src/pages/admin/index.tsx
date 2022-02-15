import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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
  COOKIE_NAME,
} from "../../constants";
import { ssrMe } from "../../lib/page";

const AdminPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const showQuery = router.query[ADMIN_PAGE_QUERY_KEY.SHOW];
    if (!showQuery) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
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
  try {
    const accessToken = ctx.req.cookies[COOKIE_NAME.ACCESS_TOKEN];
    if (!accessToken) {
      // save some bandwidth if no access token is present
      throw new Error();
    }
    // fetch user by passing the cookies in the request header
    const user = await ssrMe.getServerPage({
      context: { headers: ctx.req.headers },
    });
    // check if user is admin
    if (!user || !user.props.data || !user.props.data.me.isAdmin) {
      throw new Error();
    }
    return {
      props: {}, // requesting user is admin
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default AdminPage;
