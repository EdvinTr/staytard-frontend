import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { EditUserView } from "../../../../components/pages/admin/users/edit/EditUserView";
import { APP_NAME } from "../../../../constants";
import { useFindOneUserQuery, User } from "../../../../lib/graphql";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";

const EditUserPage: NextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data, loading, error } = useFindOneUserQuery({
    variables: {
      id: userId,
    },
  });
  return (
    <EditPageWrapper
      hasData={!!data && !!data.user}
      noDataErrorMessage="No data for this user could be found"
      navTitle="Edit user"
      error={error}
      loading={loading}
    >
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      {data && <EditUserView user={data.user as User} />}
    </EditPageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default EditUserPage;
