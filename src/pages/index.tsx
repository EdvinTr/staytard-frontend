import { GetStaticProps, NextPage } from "next";
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
          <div className="mx-auto grid max-w-[105rem] grid-cols-2 gap-4  lg:grid-cols-4 lg:gap-0">
            {products &&
              products.items.length > 0 &&
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
