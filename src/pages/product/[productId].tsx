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
import { MyContainer } from "../../components/MyContainer";
import CartContext from "../../contexts/CartContext";
import { FindOneProductQuery } from "../../lib/graphql";
import { ssrFindOneProduct } from "../../lib/page";
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
interface ProductPageProps {
  product: FindOneProductQuery["product"];
}
interface SelectOption {
  label: string;
  value: string;
}

// TODO: add meta tags and OG tags
const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<null | string>(null);
  const router = useRouter();
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
    });
  };

  return (
    <FadeInContainer className="text-staytard-dark min-h-screen pb-40 pt-20">
      <MyContainer className=" text-staytard-dark">
        <div className="lg:flex lg:space-x-20 ">
          <div className="min-w-0 lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
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
                    objectFit="contain"
                    className="h-full w-full"
                    src={imageUrl.replace("{size}", "600")}
                    alt={`${product.brand.name} - ${product.name}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="min-w-0 xl:min-w-[30rem] 2xl:min-w-[40rem] w-full ">
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
                <span className="font-bold lg:text-lg uppercase">
                  {product.brand.name}
                </span>
                <span className="lg:text-lg">{product.name}</span>
              </h1>
              <h2 className="text-lg font-bold pt-2">
                {product.currentPriceLabel}
              </h2>
            </div>
            {/* size and color select */}
            <div className="pt-8 flex justify-evenly space-x-4">
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
                className="uppercase w-1/2 xl:w-full text-13 py-4 bg-staytard-dark text-white font-semibold "
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </MyContainer>
    </FadeInContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.query.productId;

  try {
    const { props } = await ssrFindOneProduct.getServerPage({
      variables: {
        id: +productId!,
      },
    });
    return {
      props: {
        product: props.data.product,
      },
    };
  } catch (err) {
    console.log("FindOneProduct SSR error:", err);
    return {
      props: {},
    };
  }
};

export default ProductPage;
