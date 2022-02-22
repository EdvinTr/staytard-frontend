import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { APP_NAME } from "../../../../constants";
import { useFindOneUserQuery } from "../../../../lib/graphql";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";
const EditOrderPage: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { data, loading, error } = useFindOneUserQuery({
    variables: {
      id: orderId,
    },
  });

  return (
    <EditPageWrapper
      hasData={!!data && !!data.user}
      noDataErrorMessage="No data for this order could be found"
      navTitle="Edit order"
      error={error}
      loading={loading}
    >
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
    </EditPageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default EditOrderPage;
