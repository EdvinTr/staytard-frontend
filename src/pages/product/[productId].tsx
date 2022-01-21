import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FadeInContainer } from "../../components/global/FadeInContainer";
import { MyContainer } from "../../components/MyContainer";
import { FindOneProductQuery } from "../../lib/graphql";
import { ssrFindOneProduct } from "../../lib/page";
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
interface ProductPageProps {
  product: FindOneProductQuery["product"];
}
const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  console.log();

  // TODO: add meta tags and OG tags
  return (
    <FadeInContainer className="text-staytard-dark min-h-screen pb-40 pt-20">
      <MyContainer className=" text-staytard-dark">
        <div className="lg:flex lg:justify-center lg:space-x-20">
          <div className="min-w-0 max-w-2xl">
            <Swiper
              navigation
              pagination={{ dynamicBullets: false, clickable: true }}
              slidesPerView={1.4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
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
          <div className="min-w-0">
            {/* small images that do absolutely nothing :) */}
            <div className="flex space-x-2">
              {product.images.slice(0, 4).map(({ imageUrl }, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      width={60}
                      height={100}
                      objectFit="contain"
                      src={imageUrl.replace("{size}", "100")}
                      alt={`${product.brand.name} - ${product.name}`}
                    />
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
              <h2 className="text-lg font-bold">{product.priceLabel}</h2>
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
