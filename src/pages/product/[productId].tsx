import { GetServerSideProps, NextPage } from "next";
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
import { MyMetaTags } from "../../components/global/MyMetaTags";
import { ProductReviewsDisplay } from "../../components/pages/product/ProductReviewsDisplay";
import { APP_NAME } from "../../constants";
import CartContext from "../../contexts/CartContext";
import {
  FindOneProductQuery,
  Product_Review_Sort_By,
  Sort_Direction,
} from "../../lib/graphql";
import { ssrFindOneProduct, ssrPublishedProductReviews } from "../../lib/page";
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
interface ProductPageProps {
  product: FindOneProductQuery["product"];
}
interface SelectOption {
  label: string;
  value: string;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<null | string>(null);
  const router = useRouter();
  const queryColor = router.query.color;

  const { addToCart: addToCartStore } = useContext(CartContext);

  useEffect(() => {
    // ? what is dis code dude?
    if (queryColor) {
      const attr = product.attributes.find(
        (attr) => attr.color.value === queryColor
      );
      setSelectedSize(attr?.size.value || null);
    } else {
      setSelectedSize(product.attributes[0].size.value);
    }
  }, [queryColor, product.attributes]);

  const addToCart = () => {
    const sku = product.attributes.find((attr) => {
      return (
        attr.color.value === queryColor && attr.size.value === selectedSize
      );
    })?.sku;
    if (!sku) {
      return;
    }

    addToCartStore({
      sku,
      quantity: 1,
      price: product.currentPrice,
    });
  };

  return (
    <FadeInContainer className="text-app-dark min-h-screen pb-40 pt-20">
      <MyMetaTags
        title={`${product.name} - ${APP_NAME}`}
        description={product.description}
        image={product.images[0].imageUrl.replace("{size}", "1200") + "&h=630"}
        productMeta={{
          currency: "EUR",
          priceAmount: product.currentPrice.toString(),
        }}
      />
      <MyContainer className=" text-app-dark">
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
                    quality={100}
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
                className="text-13 bg-app-dark w-1/2 py-4 font-semibold uppercase text-white xl:w-full "
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* product description */}
        <div className="bg-app-light-gray mt-12 space-y-4 p-4 lg:w-1/2 lg:p-8 xl:w-6/12">
          <h3 className="text-sm font-semibold">Product description:</h3>
          <p className="text-13 font-light">{product.description}</p>
        </div>
      </MyContainer>
      <ProductReviewsDisplay product={product} />
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
      await ssrPublishedProductReviews.getServerPage({
        variables: {
          input: {
            limit: 6,
            offset: 0,
            productId: +productId,
            sortBy: Product_Review_Sort_By.CreatedAt,
            sortDirection: Sort_Direction.Desc,
          },
        },
      });
    return {
      props: {
        product: props.data.product,
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
