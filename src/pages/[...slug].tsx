import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import NextHead from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { SWRConfig } from "swr";
import { Breadcrumbs } from "../components/global/Breadcrumbs";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCardList } from "../components/products/ProductCardList";
import { APP_NAME, MAX_PRODUCT_LIMIT } from "../constants";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrGetOneCategory } from "../lib/page";
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../utils/getPathFromParams";
interface SlugPageProps {
  categoryData: GetOneCategoryQuery["getOneCategory"];
  fallback: any;
}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

// TODO:
// 1. add category description
const SlugPage: NextPage<SlugPageProps> = ({ fallback, categoryData }) => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs(router);

  return (
    <SWRConfig value={{ fallback }}>
      <FadeInContainer className="text-staytard-dark min-h-screen pt-6 pb-40 relative">
        <NextHead>
          <title>
            {categoryData?.name} | Large assortment for men - Buy online at{" "}
            {APP_NAME}.com
          </title>
          <meta name="description" content={categoryData?.name} />
        </NextHead>
        <MyContainer className=" text-staytard-dark">
          <div className="px-3">
            <div className="">
              <div className="text-xs">
                {breadcrumbs.length >= 2 ? (
                  <Fragment>
                    {/* breadcrumbs */}
                    <Breadcrumbs />
                    <div className="pt-8">
                      {/* navigate to previous breadcrumb link */}
                      <Link href={breadcrumbs[breadcrumbs.length - 2].href}>
                        <a>
                          <h1 className="text-3xl font-semibold flex">
                            <ArrowLeftIcon className="w-6 text-staytard-dark" />
                            <span className="pl-4">{categoryData?.name}</span>
                          </h1>
                        </a>
                      </Link>
                    </div>
                  </Fragment>
                ) : (
                  <h1 className="text-3xl font-semibold">
                    {categoryData?.name}
                  </h1>
                )}
              </div>
            </div>
            {/* sub categories */}
            {categoryData && categoryData.children && (
              <div className="overflow-x-auto overflow-y-hidden">
                {/* sub category list */}
                <ul className="py-4 flex items-start flex-shrink-0 space-x-3 text-sm">
                  {categoryData.children.map((child, idx) => {
                    return (
                      <li
                        key={idx}
                        className="p-3 border flex-shrink-0  font-medium border-black border-opacity-20"
                      >
                        <Link href={child.path}>
                          <a>{child.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6">
            <ProductCardList
              categoryDescription={categoryData?.description || ""}
            />
          </div>
        </MyContainer>
      </FadeInContainer>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categoryPath = getPathFromParams(ctx.query.slug as string[]);
  try {
    const API_URL = `${
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT
    }/products?limit=${MAX_PRODUCT_LIMIT}&page=${1}&categoryPath=${categoryPath}`;
    const data: GetProductsResponse = await fetcher(API_URL);

    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: categoryPath,
      },
    });
    return {
      props: {
        categoryData: categoryProps.data.getOneCategory,
        fallback: {
          [API_URL]: data,
        },
      },
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default SlugPage;
