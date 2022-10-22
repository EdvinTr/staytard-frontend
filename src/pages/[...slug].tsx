import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Breadcrumbs } from "../components/global/Breadcrumbs";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/global/MyContainer";
import { MyMetaTags } from "../components/global/MyMetaTags";
import { ScrollTopButton } from "../components/global/ScrollTopButton";
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
  productData: GetProductsResponse;
  metaImage?: string;
}

const SlugPage: NextPage<SlugPageProps> = ({
  productData,
  categoryData,
  metaImage,
}) => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs(router);
  return (
    <>
      <MyMetaTags
        description={categoryData?.description}
        title={`${categoryData?.name} | Large assortment for men - Buy online at ${APP_NAME}.com`}
        image={metaImage ? metaImage : "/img/staytard-logo.png"}
      />
      <FadeInContainer className="text-app-dark relative min-h-screen pt-6 pb-40">
        <MyContainer className=" text-app-dark">
          <div className="px-3 md:px-0">
            <div className="">
              <div className="text-xs">
                {breadcrumbs.length >= 2 ? (
                  <Fragment>
                    <Breadcrumbs />
                    <div className="pt-8">
                      <Link href={breadcrumbs[breadcrumbs.length - 2].href}>
                        <a className="inline-block">
                          <h1 className="flex items-center text-2xl font-semibold md:text-3xl">
                            <ArrowLeftIcon className="text-app-dark w-6" />
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
            {categoryData && categoryData.children && (
              <div className="overflow-x-auto overflow-y-hidden">
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
              initialData={productData}
            />
          </div>
        </MyContainer>
      </FadeInContainer>
      <ScrollTopButton />
    </>
  );
};

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

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
        productData: data,
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
