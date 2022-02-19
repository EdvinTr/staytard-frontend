import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { CenteredBeatLoader } from "../../../../components/global/CenteredBeatLoader";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { SubPageHeader } from "../../../../components/pages/admin/components/SubPageHeader";
import { BasicInputLabel } from "../../../../components/pages/admin/products/edit/EditProductView";
import { APP_NAME } from "../../../../constants";
import { useFindOneProductReviewQuery } from "../../../../lib/graphql";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";

const ProductReviewPage: NextPage = () => {
  const router = useRouter();
  const reviewId = router.query.reviewId as string;

  const { data, loading, error } = useFindOneProductReviewQuery({
    variables: {
      id: +reviewId,
    },
  });
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AdminNavbarGroup />
      <PageContentWrapper>
        <SubPageHeader title={`Edit review`} />
        <PaddingContainer>
          {loading && <CenteredBeatLoader />}

          <div className="w-full opacity-50">
            <BasicInputLabel htmlFor="productId">Product ID</BasicInputLabel>
            <input
              className="mt-2 block w-full border border-opacity-0 bg-blue-50 text-sm"
              type="text"
              id="productId"
              name="productId"
              disabled
              value={data?.oneProductReview?.productId}
            />
          </div>
        </PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default ProductReviewPage;
