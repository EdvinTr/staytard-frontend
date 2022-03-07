import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { EditProductView } from "../../../../components/pages/admin/products/edit/EditProductView";
import { withAuth } from "../../../../components/withAuth";
import { APP_NAME, APP_PAGE_ROUTE } from "../../../../constants";
import { useFindOneProductQuery } from "../../../../lib/graphql";

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
export default withAuth(EditProductPage, APP_PAGE_ROUTE.NOT_FOUND, true);
