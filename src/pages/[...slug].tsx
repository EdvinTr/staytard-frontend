import { useWindowWidth } from "@react-hook/window-size";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig } from "swr";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCardList } from "../components/products/ProductCardList";
import { APP_NAME } from "../constants";
import { useSsrCompatible } from "../hooks/useSsrCompatible";
import { GetOneCategoryQuery } from "../lib/graphql";
import { ssrGetOneCategory } from "../lib/page";
// import {accessoriesCategories} from "../components/navbar/categories.data"
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
import { getPathFromParams } from "../utils/getPathFromParams";
interface SlugPageProps {
  categoryData: GetOneCategoryQuery["getOneCategory"];
  fallback: any;
}

const fetcher = (url: string) => axios.get(url).then((r) => r.data);
const MAX_LIMIT = 5;

const dummyCategories: any = {
  "/clothes": {},
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
// 3. Refactor into multiple components
const SlugPage: NextPage<SlugPageProps> = ({ fallback, categoryData }) => {
  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const router = useRouter();
  const currentPathParams = getPathFromParams(router.query.slug as string[]);

  // ! ---------categories playground -------------
  const categoryPathRegex = new RegExp(currentPathParams);
  const childrenKeys = [];
  for (const [key, value] of Object.entries(dummyCategories)) {
    if (categoryPathRegex.test(key) && key !== currentPathParams) {
      childrenKeys.push(key);
    }
  }

  const category = dummyCategories[currentPathParams];
  // get actual category with the first key
  // get children with the rest of the keys
  // ! --------------------- playground end -----------------

  return (
    <SWRConfig value={{ fallback }}>
      <FadeInContainer className="text-staytard-dark min-h-screen py-16 relative">
        <NextHead>
          <title>
            {categoryData?.name} | Large assortment for men - Buy online at{" "}
            {APP_NAME}
            .com
          </title>
          <meta name="description" content={categoryData?.description} />
        </NextHead>
        <MyContainer className=" text-staytard-dark">
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
