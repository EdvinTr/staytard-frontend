import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { SWRConfig } from "swr";
import { Breadcrumbs } from "../components/global/Breadcrumbs";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/global/MyContainer";
import MyMetaTags from "../components/global/MyMetaTags";
import {
  getSortString,
  ProductCardList,
} from "../components/products/ProductCardList";
import { APP_NAME, MAX_PRODUCT_LIMIT } from "../constants";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrGetOneCategory } from "../lib/page";
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../utils/getPathFromParams";
interface SlugPageProps {
  categoryData: GetOneCategoryQuery["getOneCategory"];
  fallback: any;
  metaImage?: string;
}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

const SlugPage: NextPage<SlugPageProps> = ({
  fallback,
  categoryData,
  metaImage,
}) => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs(router);
  return (
    <SWRConfig value={{ fallback }}>
      <MyMetaTags
        description={categoryData?.description}
        title={`${categoryData?.name} | Large assortment for men - Buy online at ${APP_NAME}.com`}
        image={metaImage ? metaImage : "/img/staytard-logo.png"}
      />
      <FadeInContainer className="text-staytard-dark relative min-h-screen pt-6 pb-40">
        <MyContainer className=" text-staytard-dark">
          <div className="px-3 md:px-0">
            <div className="">
              <div className="text-xs">
                {breadcrumbs.length >= 2 ? (
                  <Fragment>
                    {/* breadcrumbs */}
                    <Breadcrumbs />
                    <div className="pt-8">
                      {/* navigate to previous breadcrumb link */}
                      <Link href={breadcrumbs[breadcrumbs.length - 2].href}>
                        <a className="inline-block">
                          <h1 className="flex text-2xl font-semibold md:text-3xl">
                            <ArrowLeftIcon className="text-staytard-dark w-6" />
                            <span className="pl-4">{categoryData?.name}</span>
                          </h1>
                        </a>
                      </Link>
                    </div>
                  </Fragment>
                ) : (
                  <h1 className="text-2xl font-semibold md:text-3xl">
                    {categoryData?.name}
                  </h1>
                )}
              </div>
            </div>
            {/* sub categories */}
            {categoryData && categoryData.children && (
              <div className="overflow-x-auto overflow-y-hidden">
                {/* sub category list */}
                <ul className="flex flex-shrink-0 items-start space-x-2 pt-5 pb-3 text-sm">
                  {categoryData.children.map((child, idx) => {
                    return (
                      <li
                        key={idx}
                        className="flex-shrink-0 border border-black  border-opacity-20 font-medium"
                      >
                        <Link href={child.path}>
                          <a className=" block p-3">{child.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="my-4 h-[1px] w-[99.2%] bg-black bg-opacity-10"></div>
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
  const { slug, sortBy, sortDirection } = ctx.query;
  const categoryPath = getPathFromParams(slug as string[]);
  const sortString = getSortString(sortBy as string, sortDirection as string);
  try {
    const API_URL = `${
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT
    }/products?limit=${MAX_PRODUCT_LIMIT}&page=${1}&categoryPath=${categoryPath}${sortString}`;
    const data: GetProductsResponse = await fetcher(API_URL);

    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: categoryPath,
      },
    });
    const metaImage =
      data && data.products.length > 0
        ? data.products[0].images[0].imageUrl?.replace("{size}", "1200") +
          "&h=630"
        : null;
    return {
      props: {
        categoryData: categoryProps.data.getOneCategory,
        fallback: {
          [API_URL]: data,
        },
        metaImage,
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
