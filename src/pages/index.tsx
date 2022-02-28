import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeInContainer } from "../components/global/FadeInContainer";
import { MyContainer } from "../components/global/MyContainer";
import { HeroImageSection } from "../components/pages/index/HeroImageSection";
import { ProductNewsSection } from "../components/pages/index/ProductNewsSection";
import { ShopByBrandSection } from "../components/pages/index/ShopByBrandSection";
import { ProductCard } from "../components/products/ProductCard";
import { initializeApollo } from "../lib/apolloClient";
import { FindProductsDocument, FindProductsQuery } from "../lib/graphql";
import { ProductItem } from "../typings/GetProductsResponse.interface";

interface HomePageProps {
  products: FindProductsQuery["products"];
}
const IndexPage: NextPage<HomePageProps> = ({ products }) => {
  const hasProducts = products && products.items.length > 0;
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen">
      <div className=" text-staytard-dark">
        <HeroImageSection />
        <MyContainer>
          <div className="py-12 text-center uppercase leading-8 lg:pt-24">
            <h2 className="font-semibold lg:text-3xl ">
              Icon <sup className="text-[10px] lg:text-sm">TM</sup>{" "}
              <span>Styles</span>
            </h2>
            <Link href="/clothes">
              <a>
                <p className="inline-block border-b border-black pb-1 text-sm tracking-wide">
                  See the entire collection
                </p>
              </a>
            </Link>
          </div>
          <div className="mx-auto grid max-w-[105rem] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-0">
            {hasProducts &&
              products.items.slice(0, 4).map((product, idx) => {
                return (
                  <ProductCard
                    key={idx}
                    isLoading={false}
                    product={product as ProductItem}
                  />
                );
              })}
          </div>
          <div className="mx-auto max-w-[85rem] py-20 md:space-x-10 lg:flex 2xl:max-w-[95rem] 2xl:-space-x-10">
            <div className="lg:w-7/12">
              <Link href="/clothes/jeans">
                <a>
                  <Image
                    src="/img/front-page/2208_denim_catpush_new_season.webp"
                    width={800}
                    height={980}
                    objectFit="contain"
                    className="w-full"
                    alt="Man in white shirt and blue jeans"
                  />
                  <div className="pt-4 pb-8 text-center uppercase lg:pb-0 lg:pt-2 lg:text-left">
                    <h4 className="text-xl font-semibold tracking-wide lg:text-2xl">
                      Spring jeans
                    </h4>
                    <div className="inline-block border-b border-black pt-1 font-light">
                      Shop here
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-0 lg:w-5/12 2xl:gap-y-8">
              {hasProducts &&
                products.items.slice(4, 8).map((product, idx) => {
                  return (
                    <div
                      key={idx}
                      className="lg:h-52 lg:w-52 xl:h-60 xl:w-[16rem] 2xl:h-72 2xl:w-80"
                    >
                      <ProductCard
                        isLoading={false}
                        product={product as ProductItem}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </MyContainer>
        <MyContainer className="space-y-12 py-20">
          <ProductNewsSection />
          <ShopByBrandSection />
        </MyContainer>
      </div>
    </FadeInContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const revalidate = 10;
  try {
    const apollo = initializeApollo();
    const products = await apollo.query({
      query: FindProductsDocument,
      variables: {
        input: {
          limit: 12,
          offset: 0,
          categoryPath: "/",
        },
      },
    });
    return {
      props: {
        products: products.data?.products,
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {},
      revalidate,
    };
  }
};

export default IndexPage;
