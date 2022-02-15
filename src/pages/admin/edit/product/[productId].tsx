import { ArrowLeftIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BeatLoader } from "react-spinners";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { PageHeading } from "../../../../components/pages/admin/components/PageHeading";
import { EditProductView } from "../../../../components/pages/admin/products/edit/EditProductView";
import { APP_NAME } from "../../../../constants";
import { useFindOneProductQuery } from "../../../../lib/graphql";
import { isAdminSsrAuthGuard } from "../../../../utils/guards/isAdminSsrAuthGuard";
import NotFoundPage from "../../../404";

const EditProductPage: NextPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data, loading, error } = useFindOneProductQuery({
    variables: {
      id: +productId,
    },
  });
  if (!data && !loading) {
    return <NotFoundPage />;
  }
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
            <PageHeading visibleOnMobile>{data?.product.name}</PageHeading>
          </PaddingContainer>
        </div>
        <PaddingContainer>
          <EditProductView />
          {loading && (
            <div className="fixed top-1/2 left-0 right-0 ">
              <BeatLoader
                color="#faba"
                size={20}
                css="display:flex; justify-content:center; align-items:center;"
              />
            </div>
          )}
        </PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return isAdminSsrAuthGuard(ctx);
};

export default EditProductPage;
