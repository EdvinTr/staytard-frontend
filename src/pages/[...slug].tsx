import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import { capitalize } from "lodash";
import { GetServerSideProps, NextPage } from "next";
import NextHead from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCardList } from "../components/products/ProductCardList";
import { APP_NAME } from "../constants";
import { useSsrCompatible } from "../hooks/useSsrCompatible";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrGetOneCategory } from "../lib/page";
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../utils/getPathFromParams";
interface SlugPageProps {
  categoryData: GetOneCategoryQuery["getOneCategory"];
  fallback: any;
}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);
const MAX_LIMIT = 5;

const dummyCategories: {
  [key: string]: { name?: string; path?: string; slug?: string };
} = {
  "/clothes": {
    name: "Clothes",
  },
  "/clothes/jackets": {
    name: "Jackets",
  },
  "/clothes/jackets/bomber-baseball-jackets": {
    name: "Bomber & baseball jackets",
    path: "/clothes/jackets/bomber-baseball-jackets",
  },
  "/clothes/jackets/jeans-jackets": {
    name: "Jeans jackets",
    path: "/clothes/jackets/jeans-jackets",
  },
  "/clothes/jackets/overshirt": {
    name: "Overshirt",
    slug: "/jackets/overshirt",
    path: "/clothes/jackets/overshirt",
  },
  "/clothes/jackets/parka": {
    name: "Parka",
    slug: "/jackets/parka",
    path: "/clothes/jackets/parka",
  },
  "/clothes/shirts": {
    name: "Shirts",
    path: "/clothes/shirts",
    slug: "/shirts",
  },
};
interface Breadcrumb {
  breadcrumb: string;
  href: string;
}
const SlugPage: NextPage<SlugPageProps> = ({ fallback, categoryData }) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const router = useRouter();
  const slug = router.query.slug as string[];
  const currentPathParams = getPathFromParams(slug);

  // ! ---------categories playground -------------
  const categoryPathRegex = new RegExp(currentPathParams);
  const childrenKeys = [];
  for (const [key, value] of Object.entries(dummyCategories)) {
    if (categoryPathRegex.test(key) && key !== currentPathParams) {
      childrenKeys.push(key);
    }
  }
  const category = dummyCategories[currentPathParams];
  // ! --------------------- playground end -----------------

  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  useEffect(() => {
    if (!router) {
      return;
    }
    const linkPath = router.asPath.split("/");
    linkPath.shift();
    const pathArray = linkPath.map((path, idx) => {
      return {
        breadcrumb: path,
        href: "/" + linkPath.slice(0, idx + 1).join("/"),
      };
    });
    setBreadcrumbs(pathArray);
  }, [router]);

  return (
    <SWRConfig value={{ fallback }}>
      <FadeInContainer className="text-staytard-dark min-h-screen pt-6 pb-40 relative">
        <NextHead>
          <title>
            {categoryData?.name} | Large assortment for men - Buy online at{" "}
            {APP_NAME}
            .com
          </title>
          <meta name="description" content={categoryData?.name} />
        </NextHead>
        <MyContainer className=" text-staytard-dark">
          <div className="px-2">
            <div className="text-xs">
              {breadcrumbs.length > 1 ? (
                <Fragment>
                  {/* breadcrumbs */}
                  <ul className="flex">
                    {breadcrumbs.map(({ breadcrumb, href }, idx, arr) => {
                      const isLastItemInArray = arr.length - 1 === idx;
                      return (
                        <li key={idx} className="flex items-center">
                          {isLastItemInArray ? (
                            <span className="opacity-70">
                              {capitalize(breadcrumb)}
                            </span>
                          ) : (
                            <Fragment>
                              <Link href={href}>
                                <a className="hover:underline">
                                  {capitalize(breadcrumb)}
                                </a>
                              </Link>

                              <ChevronRightIcon className="w-4 mx-1" />
                            </Fragment>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {/* navigate to previous breadcrumb link */}
                  <div className="pt-8">
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
                <h1 className="text-3xl font-semibold pt-8">
                  {category?.name}
                </h1>
              )}
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden"></div>
          <ProductCardList />
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
    }/products?limit=${MAX_LIMIT}&page=${1}&categoryPath=${categoryPath}`;
    const data: GetProductsResponse = await fetcher(API_URL);

    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: categoryPath,
      },
    });
    if (data.pagination.totalItems === 0) {
      throw new Error();
    }
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
