import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/global/MyContainer";
import { ProductReviewsDisplay } from "../../components/ProductReviewsDisplay";
import { APP_NAME } from "../../constants";
import CartContext from "../../contexts/CartContext";
import { FindOneProductQuery, ProductReviewsQuery } from "../../lib/graphql";
import { ssrFindOneProduct, ssrProductReviews } from "../../lib/page";
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
interface ProductPageProps {
  product: FindOneProductQuery["product"];
  reviews: ProductReviewsQuery["productReviews"];
}
interface SelectOption {
  label: string;
  value: string;
}

// TODO: add meta tags and OG tags
const ProductPage: NextPage<ProductPageProps> = ({ product, reviews }) => {
  const [selectedSize, setSelectedSize] = useState<null | string>(null);
  const router = useRouter();
  const productId = router.query.productId as string;
  const currentPath = router.pathname;
  const queryColor = router.query.color;

  const { addToCart: addToContextCart } = useContext(CartContext);

  useEffect(() => {
    if (queryColor) {
      const attr = product.attributes.find(
        (attr) => attr.color.value === queryColor
      );
      setSelectedSize(attr?.size.value || null);
    } else {
      setSelectedSize(product.attributes[0].size.value);
    }
  }, [queryColor, product.attributes]);
  /*  if (!queryColor) {
    router.push(
      `/${APP_PAGE_ROUTE.PRODUCT}/${product.id}?color=${product.attributes[0].color.value}`
    );
  } */

  const addToCart = () => {
    const sku = product.attributes.find((attr) => {
      return (
        attr.color.value === queryColor && attr.size.value === selectedSize
      );
    })?.sku;
    if (!sku) {
      return; // TODO: show error of some sort
    }
    addToContextCart({
      sku,
      quantity: 1,
      price: product.currentPrice,
    });
  };

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen pb-40 pt-20">
      <Head>
        <title>
          {product.name} - {APP_NAME}
        </title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:type" content="product" />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={
            product.images[0].imageUrl.replace("{size}", "1200") + "&h=630"
          }
        />
        <meta
          property="product:price:amount"
          content={product.currentPrice.toString()}
        />
        <meta property="product:price:currency" content="EUR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta
          name="twitter:image"
          content={
            product.images[0].imageUrl.replace("{size}", "1200") + "&h=630"
          }
        />
      </Head>
      <MyContainer className=" text-staytard-dark">
        <div className="lg:flex">
          <div className="min-w-0 lg:w-1/2 xl:w-6/12">
            <Swiper
              navigation
              pagination={{ dynamicBullets: false, clickable: true }}
              slidesPerView={1.4}
            >
              {product.images.map(({ imageUrl }, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    width={1800}
                    height={2400}
                    priority
                    objectFit="cover"
                    className=""
                    src={imageUrl.replace("{size}", "600")}
                    alt={`${product.brand.name} - ${product.name}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full min-w-0 lg:w-1/2 lg:pl-16 xl:w-5/12">
            {/* small images that do absolutely nothing :) */}
            <div className="flex space-x-2 pb-8">
              {product.images.slice(0, 5).map(({ imageUrl }, idx) => {
                const attributeColor = product.attributes[idx]?.color.value;
                return (
                  <div key={idx}>
                    <Link
                      shallow
                      href={`/product/${product.id}?color=${
                        attributeColor || ""
                      }`}
                    >
                      <a
                        className={`${
                          queryColor === attributeColor
                            ? "outline outline-1"
                            : ""
                        }`}
                      >
                        <Image
                          width={60}
                          height={100}
                          objectFit="contain"
                          src={imageUrl.replace("{size}", "100")}
                          alt={`${product.brand.name} - ${product.name}`}
                        />
                        <span className="block text-center text-xs">
                          {attributeColor}
                        </span>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div>
              {/* product info */}
              <h1 className="flex flex-col ">
                <span className="font-bold uppercase lg:text-lg">
                  {product.brand.name}
                </span>
                <span className="lg:text-lg">{product.name}</span>
              </h1>
              <h2 className="pt-2 text-lg font-bold">
                {product.currentPriceLabel}
              </h2>
            </div>
            {/* size and color select */}
            <div className="flex justify-evenly space-x-4 pt-8">
              <select
                name="size"
                id="size-select"
                className="w-1/2 xl:w-full"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.attributes.map((item, idx) => {
                  return (
                    item.color.value === queryColor && (
                      <option key={idx} value={item.size.value}>
                        {item.size.value}
                      </option>
                    )
                  );
                })}
              </select>

              <button
                onClick={() => addToCart()}
                className="text-13 bg-staytard-dark w-1/2 py-4 font-semibold uppercase text-white xl:w-full "
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* product description */}
        <div className="bg-staytard-light-gray mt-12 space-y-4 p-4 lg:w-1/2 lg:p-8 xl:w-6/12">
          <h4 className="text-sm font-semibold">Product description:</h4>
          <p className="text-13 font-light">{product.description}</p>
        </div>
      </MyContainer>
      <ProductReviewsDisplay productId={+productId} />
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.query.productId as string;

  try {
    const { props } = await ssrFindOneProduct.getServerPage({
      variables: {
        id: +productId,
      },
    });
    const { props: productReviewsProps } =
      await ssrProductReviews.getServerPage({
        variables: {
          input: {
            limit: 5,
            offset: 0,
            productId: +productId,
          },
        },
      });
    return {
      props: {
        product: props.data.product,
        reviews: productReviewsProps.data.productReviews,
        initialApolloState: productReviewsProps.apolloState,
      },
    };
  } catch (err) {
    console.log("FindOneProduct SSR error:", err);
    return {
      props: {},
      notFound: true,
    };
  }
};

export default ProductPage;
