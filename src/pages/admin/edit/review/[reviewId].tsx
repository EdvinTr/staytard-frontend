import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { SubPageHeader } from "../../../../components/pages/admin/components/SubPageHeader";
import { APP_NAME } from "../../../../constants";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";

const ProductReviewPage: NextPage = () => {
  const router = useRouter();
  const reviewId = router.query.reviewId as string;

  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AdminNavbarGroup />
      <PageContentWrapper>
        <SubPageHeader title={`Edit review`} />
        <PaddingContainer></PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default ProductReviewPage;
