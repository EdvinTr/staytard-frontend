import { CheckIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/global/MyContainer";
import { MyMetaTags } from "../../components/global/MyMetaTags";
import { ProductReviewsDisplay } from "../../components/pages/product/ProductReviewsDisplay";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
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
      Router.replace(
        `${APP_PAGE_ROUTE.PRODUCT}/${product.id}?color=${product.attributes[0].color.value}`
      );
    }
  }, [queryColor, product.attributes, product.id]);

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
                  <img
                    className="object-cover"
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
                          priority
                          objectFit="contain"
                          src={imageUrl.replace("{size}", "100")}
                          alt={`${product.brand.name} - ${product.name}`}
                        />
                        <img
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
            <div>
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
              <div className="mt-4 text-xs font-semibold">
                {product.attributes.reduce((acc, attribute) => {
                  if (attribute.color.value === queryColor) {
                    acc += 1;
                  }
                  return acc;
                }, 0)}{" "}
                sizes are in stock: Delivery 1-3 weekdays
              </div>

              <ul className="mt-7 space-y-3">
                <li className="flex items-center space-x-2">
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    className="h-6 w-6"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.8869 26.5273H17.8878C17.857 26.5212 17.8262 26.51 17.7954 26.5099C16.7032 26.5083 15.6109 26.5074 14.5187 26.5078C14.4711 26.5078 14.4236 26.5205 14.3761 26.5273H13.9858C13.9166 26.5204 13.8475 26.5077 13.7783 26.5076C11.3777 26.5042 8.97707 26.5027 6.57648 26.4983C6.36205 26.498 6.14574 26.457 5.93356 26.4748C5.39039 26.5205 4.87323 26.3943 4.36242 26.2448C3.51601 25.9971 2.7744 25.5508 2.11468 24.9578C1.3953 24.3112 0.830327 23.5505 0.458985 22.6474C0.0532071 21.6607 -0.067742 20.6321 0.0343291 19.5706C0.0961381 18.9278 0.246478 18.3109 0.509923 17.7234C0.934254 16.7768 1.55417 15.9886 2.35218 15.3394C2.91227 14.8838 3.52151 14.5242 4.20544 14.3035C4.53499 14.1971 4.86988 14.1081 5.18869 14.0152C4.91379 12.2004 5.52377 10.7446 7.06405 9.84096C8.83422 8.80249 10.5269 9.10871 12.024 10.5192C12.0364 10.4942 12.0538 10.4662 12.065 10.4358C12.5668 9.08493 13.3959 7.98255 14.5173 7.10693C15.7128 6.17345 17.0627 5.6325 18.5652 5.50277C19.3442 5.43552 20.1217 5.48377 20.8861 5.64451C22.136 5.90735 23.2467 6.46789 24.2144 7.3207C24.9839 7.99876 25.6242 8.78126 26.0957 9.70162C26.6402 10.7643 26.9007 11.9007 26.9264 13.0953C26.9327 13.3822 26.9296 13.6693 26.9261 13.9562C26.925 14.0461 26.944 14.093 27.0444 14.1115C27.9231 14.2727 28.7216 14.6265 29.443 15.1623C30.0165 15.5881 30.5014 16.1024 30.9094 16.6918C31.4181 17.4267 31.7677 18.2307 31.9041 19.1243C31.937 19.3399 31.9681 19.5558 32 19.7716V20.6989C31.979 20.8386 31.9524 20.9777 31.9378 21.1182C31.8528 21.9367 31.5873 22.6949 31.1736 23.3957C30.569 24.42 29.7499 25.2284 28.7168 25.7965C28.0639 26.1556 27.3821 26.441 26.6208 26.463C26.3758 26.47 26.1315 26.505 25.8869 26.5273"
                        fill="#88C9CF"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.87594 22.2753C7.35754 22.0224 6.95689 21.6687 6.674 21.214C6.39092 20.7594 6.24951 20.2376 6.24951 19.6485C6.24951 18.8673 6.4291 18.1727 6.78847 17.5643C7.14767 16.9561 7.64701 16.4806 8.28612 16.1381C8.92526 15.7956 9.65173 15.6242 10.4658 15.6242C11.1081 15.6242 11.6773 15.7411 12.1734 15.9748C12.6694 16.2086 13.0382 16.5399 13.2799 16.9688L11.6582 18.2462C11.3593 17.7213 10.9142 17.4586 10.3227 17.4586C9.97295 17.4586 9.66126 17.5451 9.3879 17.7179C9.11441 17.8908 8.90139 18.1326 8.74879 18.4431C8.59615 18.7537 8.51983 19.1074 8.51983 19.5044C8.51983 19.9015 8.64533 20.2199 8.89665 20.46C9.14777 20.7001 9.48 20.8202 9.89349 20.8202C10.4595 20.8202 10.9555 20.5609 11.3816 20.0422L12.7075 21.3196C12.3196 21.7998 11.8791 22.1424 11.3864 22.3473C10.8935 22.5521 10.3227 22.6546 9.67409 22.6546C8.9935 22.6546 8.39417 22.5281 7.87594 22.2753"
                        fill="white"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.1358 20.5417C17.4072 20.356 17.615 20.1063 17.759 19.7925C17.9027 19.4789 17.9748 19.1363 17.9748 18.7649C17.9748 18.3679 17.8554 18.051 17.6166 17.814C17.3777 17.5772 17.049 17.4587 16.6303 17.4587C16.2639 17.4587 15.9449 17.5516 15.6735 17.7372C15.402 17.923 15.1942 18.1727 15.0504 18.4863C14.9064 18.8001 14.8345 19.1427 14.8345 19.514C14.8345 19.9111 14.9538 20.228 15.1927 20.4648C15.4314 20.7018 15.7602 20.8202 16.1789 20.8202C16.5453 20.8202 16.8642 20.7275 17.1358 20.5417M14.1423 22.2753C13.6156 22.0224 13.21 21.6687 12.9254 21.2139C12.6408 20.7594 12.4985 20.2376 12.4985 19.6485C12.4985 18.8673 12.6833 18.171 13.053 17.5595C13.4225 16.9481 13.9362 16.4727 14.5937 16.1333C15.2512 15.7939 15.9954 15.6242 16.8263 15.6242C17.5263 15.6242 18.1397 15.7507 18.6663 16.0036C19.193 16.2566 19.5987 16.6103 19.8833 17.0649C20.1679 17.5196 20.3101 18.0414 20.3101 18.6304C20.3101 19.4116 20.1252 20.1079 19.7557 20.7193C19.386 21.3309 18.8724 21.8063 18.2149 22.1456C17.5574 22.485 16.8131 22.6546 15.9823 22.6546C15.2822 22.6546 14.6689 22.5281 14.1423 22.2753"
                        fill="white"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.899 20.8577H26.095L25.7371 22.6546H20.3101L20.5906 21.2309L23.425 19.0216C23.7216 18.7859 23.9264 18.5896 24.0393 18.4325C24.1521 18.2753 24.2086 18.115 24.2086 17.9513C24.2086 17.8008 24.1521 17.6798 24.0393 17.588C23.9264 17.4964 23.7764 17.4505 23.5894 17.4505C23.3895 17.4505 23.1977 17.5079 23.0138 17.6223C22.8301 17.737 22.664 17.899 22.5157 18.1084L20.9969 17.156C21.2613 16.6912 21.6547 16.3198 22.1771 16.0415C22.6995 15.7634 23.2862 15.6242 23.9377 15.6242C24.4343 15.6242 24.8825 15.7093 25.2824 15.8795C25.6822 16.0498 25.9949 16.2838 26.2207 16.5815C26.4464 16.8795 26.5593 17.2149 26.5593 17.588C26.5593 18.0267 26.4399 18.4325 26.2014 18.8056C25.9627 19.1787 25.5436 19.5945 24.9438 20.0526L23.899 20.8577Z"
                        fill="white"
                      ></path>
                    </g>
                  </svg>
                  <div className="flex space-x-1 text-xs">
                    <p className="font-semibold underline">
                      Climate-compensated shipping
                    </p>
                    <p className="text-[11px]">
                      - For the sake of the environment
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="inline-block rounded-full bg-stone-100 p-1">
                    <CheckIcon className="h-4 w-4 " />
                  </div>
                  <div className="flex space-x-1 text-xs">
                    <p className="font-semibold underline">Pay in 14 days</p>
                    <p className="text-[11px]">- Select invoice at checkout</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="inline-block rounded-full bg-stone-100 p-1">
                    <CheckIcon className="h-4 w-4 " />
                  </div>
                  <div className="flex space-x-1 text-xs">
                    <p className="font-semibold underline">Free shipping*</p>
                    <p className="text-[11px]">- Orders over 49.99€</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="inline-block rounded-full bg-stone-100 p-1">
                    <CheckIcon className="h-4 w-4 " />
                  </div>
                  <div className="flex space-x-1 text-xs">
                    <p className="font-semibold underline">Free returns</p>
                    <p className="text-[11px]">- Always free of charge</p>
                  </div>
                </li>
              </ul>
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
