import { ArrowLeftIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { PageHeading } from "../../../../components/pages/admin/components/PageHeading";
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
        <div className="bg-[#F8F8F9]">
          <PaddingContainer className="flex items-center space-x-5">
            <button aria-label="Navigate back" onClick={() => router.back()}>
              <ArrowLeftIcon className="h-6" aria-hidden />
            </button>
            <PageHeading visibleOnMobile>Hello i am review</PageHeading>
          </PaddingContainer>
        </div>
        <PaddingContainer></PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default ProductReviewPage;
