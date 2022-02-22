import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { EditProductView } from "../../../../components/pages/admin/products/edit/EditProductView";
import { APP_NAME } from "../../../../constants";
import { useFindOneProductQuery } from "../../../../lib/graphql";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";

const EditProductPage: NextPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data, loading, error } = useFindOneProductQuery({
    variables: {
      id: +productId,
    },
  });
  return (
    <EditPageWrapper
      hasData={!!data && !!data.product}
      noDataErrorMessage="No data for this product could be found"
      navTitle="Edit product"
      error={error}
      loading={loading}
    >
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      {data && <EditProductView product={data.product} />}
    </EditPageWrapper>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default EditProductPage;
