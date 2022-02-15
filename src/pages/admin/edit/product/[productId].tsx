import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { AdminNavbarGroup } from "../../../../components/pages/admin/components/nav/AdminNavbarGroup";
import { PaddingContainer } from "../../../../components/pages/admin/components/PaddingContainer";
import { PageContentWrapper } from "../../../../components/pages/admin/components/PageContentWrapper";
import { EditProductView } from "../../../../components/pages/admin/products/edit/EditProductView";
import { APP_NAME } from "../../../../constants";
import { useFindOneProductQuery } from "../../../../lib/graphql";

const EditProductPage: NextPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data } = useFindOneProductQuery({
    variables: {
      id: +productId,
    },
  });
  return (
    <Fragment>
      <Head>
        <title>{APP_NAME}.com</title>
      </Head>
      <AdminNavbarGroup />
      <PageContentWrapper>
        <div className="bg-[#F8F8F9]">
          <PaddingContainer>
            <div className="flex items-center lg:justify-between">
              <h1 className="hidden lg:block lg:text-4xl lg:font-semibold">
                Edit Product
              </h1>
            </div>
          </PaddingContainer>
        </div>
        <PaddingContainer>
          <EditProductView />
        </PaddingContainer>
      </PageContentWrapper>
    </Fragment>
  );
};

export default EditProductPage;
