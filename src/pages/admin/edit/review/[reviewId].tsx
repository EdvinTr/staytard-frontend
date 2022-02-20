import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { CenteredBeatLoader } from "../../../../components/global/CenteredBeatLoader";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { SubPageHeader } from "../../../../components/pages/admin/components/SubPageHeader";
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
  if (loading) {
    return <WrapperGroup loading />;
  }
  if (error) {
    return (
      <WrapperGroup loading={false}>
        <BasicErrorMessage error={error.message} />
      </WrapperGroup>
    );
  }
  if (!data || !data.oneProductReview) {
    return (
      <WrapperGroup loading={false}>
        <BasicErrorMessage error="Data for this review could not be found." />
      </WrapperGroup>
    );
  }
  return (
    <WrapperGroup loading={false}>
      <div className="pb-20text-sm mx-auto max-w-2xl">
        <EditProductReview review={data.oneProductReview} />
      </div>
    </WrapperGroup>
  );
};

const BasicErrorMessage = ({ error }: { error: string }) => {
  return <div className="text-sm text-red-600">{error}</div>;
};

interface WrapperGroupProps {
  loading: boolean;
}
const WrapperGroup: React.FC<WrapperGroupProps> = ({ children, loading }) => {
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
          {children}
        </PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default ProductReviewPage;
