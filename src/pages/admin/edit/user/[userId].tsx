import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EditPageWrapper } from "../../../../components/pages/admin/components/EditPageWrapper";
import { EditUserView } from "../../../../components/pages/admin/users/edit/EditUserView";
import { withAuth } from "../../../../components/withAuth";
import { APP_NAME, APP_PAGE_ROUTE } from "../../../../constants";
import { useFindOneUserQuery, User } from "../../../../lib/graphql";

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

export default withAuth(EditUserPage, APP_PAGE_ROUTE.NOT_FOUND, true);
