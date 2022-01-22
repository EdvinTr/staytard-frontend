import { ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/MyContainer";
import { ProductCard } from "../components/products/ProductCard";
import { GetOneCategoryQuery } from "../lib/graphql";
import { GetProductsResponse } from "../typings/GetProductsResponse.interface";
interface SlugPageProps {
  category: GetOneCategoryQuery["getOneCategory"];
}
const getFullPath = (slug: string[]) => {
  const [first, ...rest] = slug;
  const fullUrl = `/${first}/${rest.join("/")}`;
  return fullUrl;
};
const fetcher = (url: string) => axios.get(url).then((r) => r.data);

const LIMIT = 5;

const SlugPage: NextPage<SlugPageProps> = () => {
  const router = useRouter();
  const pathVariables = router.query.slug as string[];
  const fullPath = getFullPath(pathVariables);

  const { data, size, setSize } = useSWRInfinite<GetProductsResponse>(
    (index) =>
      `${
        process.env.NEXT_PUBLIC_REST_API_ENDPOINT
      }/products?limit=${LIMIT}&page=${index + 1}&categoryPath=/jeans`,
    fetcher
  );

  const merged: GetProductsResponse[] = data ? [].concat(...(data as [])) : [];

  const allItems = [];
  for (const arr of merged) {
    for (const item of arr.products) {
      allItems.push(item);
    }
  }
  console.log(allItems);

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen py-16 relative">
      <MyContainer className=" text-staytard-dark">
        <div className="overflow-x-auto overflow-y-hidden"></div>
        {/* product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 gap-x-4 md:gap-x-0">
          {/* product cards */}
          {allItems &&
            allItems.length &&
            allItems.map((item, idx) => {
              return <ProductCard key={idx} product={item} />;
            })}
        </div>
        {/* load more group */}
        <div className="pt-8 max-w-xs mx-auto space-y-4 relative">
          {/*        <div className="px-2 space-y-1 text-center">
            <p className="text-[#6b6b6b]">
              You have seen {productData?.products.items.length} of{" "}
              {productData?.products.totalCount} products
            </p>
            <progress
              max={productData?.products.totalCount}
              value={productData?.products.items.length}
              className="appearance-none bg-gray-50 w-full block h-[0.125rem]"
              style={{
                color: "#222",
              }}
            ></progress>
          </div> */}

          {/* load more button */}
          {
            <button
              className="text-white w-full bg-staytard-dark p-4 flex justify-center items-center"
              onClick={() => {
                setSize(size + 1);
              }}
            >
              <span>Show more</span>
              <ChevronDownIcon className="w-6" />
            </button>
          }
        </div>
      </MyContainer>
    </FadeInContainer>
  );
};

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [first, ...rest] = ctx.query.slug as string[];
  let fullUrl = `/${first}`;
  if (rest.length > 0) {
    fullUrl = `/${first}/${rest.join("/")}`;
  }
  try {
    const { props: productProps } = await ssrFindProducts.getServerPage({
      variables: {
        input: {
          categoryPath: fullUrl,
          limit: 50,
          offset: 0,
        },
      },
    });
    const { props: categoryProps } = await ssrGetOneCategory.getServerPage({
      variables: {
        path: fullUrl,
      },
    });
    return {
      props: {
        initialApolloState: productProps.apolloState,
        category: categoryProps.data.getOneCategory,
      },
    };
  } catch (err) {
    return {
      props: {}, // TODO: return NotFound page
      notFound: true,
    };
  }
}; */

export default SlugPage;
