import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { EditProductReview } from "../../../../components/pages/admin/reviews/edit/EditProductReview";
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
    <EditPageWrapper
      hasData={!!data && !!data.oneProductReview}
      noDataErrorMessage="Data for this review could not be found."
      navTitle="Edit review"
      error={error}
      loading={loading}
    >
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      {data && <EditProductReview review={data.oneProductReview} />}
    </EditPageWrapper>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default ProductReviewPage;
