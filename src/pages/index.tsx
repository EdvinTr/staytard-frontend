import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
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
  products?: FindProductsQuery["products"];
}
const IndexPage: NextPage<HomePageProps> = ({ products }) => {
  const hasProducts = products && products.items?.length > 0;

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
          {hasProducts && (
            <CallToActionProductCardList
              href="/clothes/jeans"
              image={{
                src: "/img/front-page/2208_denim_catpush_new_season.webp",
                alt: "Man in white shirt and blue jeans",
                width: 800,
                height: 980,
              }}
              className="py-20"
              title="Spring jeans"
              subtitle="Shop here"
              products={products.items.slice(4, 8) as ProductItem[]}
            />
          )}
        </MyContainer>
        <MyContainer className="py-20">
          <ProductNewsSection />
          {hasProducts && (
            <CallToActionProductCardList
              className="pt-16 pb-10"
              href="/clothes"
              image={{
                src: "/img/front-page/top-selling.webp",
                alt: "Multiple skewed images in one image of man in different clothes",
                width: 900,
                height: 1100,
              }}
              reversed
              title="Selling most right now"
              subtitle="Shop from the top list"
              products={products.items.slice(8, 12) as ProductItem[]}
            />
          )}
          <ShopByBrandSection />
        </MyContainer>
      </div>
    </FadeInContainer>
  );
};

interface CallToActionProductCardListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: ProductItem[];
  href: string;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  title: string;
  subtitle: string;
  reversed?: boolean;
}
const CallToActionProductCardList = ({
  href,
  image,
  products,
  subtitle,
  title,
  reversed,
  className,
}: CallToActionProductCardListProps) => {
  return (
    <div
      className={`mx-auto max-w-[85rem] lg:flex 2xl:max-w-[95rem] ${
        className ? className : ""
      } ${reversed ? "lg:flex-row-reverse" : "md:space-x-10 2xl:-space-x-10"}`}
    >
      <div className={`lg:w-7/12 ${reversed ? "lg:ml-10" : ""}`}>
        <Link href={href}>
          <a>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              objectFit="contain"
              className="w-full"
              alt={image.alt}
              quality={100}
            />
            <div className="pt-4 pb-8 text-center uppercase lg:pb-0 lg:pt-2 lg:text-left">
              <h4 className="text-xl font-semibold tracking-wide lg:text-2xl">
                {title}
              </h4>
              <div className="inline-block border-b border-black pt-1 font-light">
                {subtitle}
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-0 lg:w-5/12 2xl:gap-y-8">
        {products.map((product, idx) => {
          return (
            <div
              key={idx}
              className="lg:h-52 lg:w-52 xl:h-60 xl:w-[16rem] 2xl:h-72 2xl:w-80"
            >
              <ProductCard isLoading={false} product={product as ProductItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const revalidate = 60; // 60 seconds
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
      revalidate,
    };
  } catch (err) {
    return {
      props: {},
      revalidate,
    };
  }
};

export default IndexPage;
