import Image from "next/image";
import React from "react";
import { MyContainer } from "../../global/MyContainer";

interface ShopByBrandSectionProps {}

const IMAGE_SIZE = 450;

export const ShopByBrandSection: React.FC<ShopByBrandSectionProps> = ({}) => {
  return (
    <section className="py-12 text-center xl:py-20">
      <h2 className="py-6 text-xl font-semibold uppercase lg:py-11 lg:text-4xl">
        Shop by brand
      </h2>
      <MyContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
        <Image
          src={"/img/front-page/brands/2205_brand_lesdeux.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Les Deux"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_polo.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Polo"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_newbalance.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Polo"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_gant.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Gant"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_levis.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Levis"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_dickies.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Dickies"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_carhartt.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Carhartt"
        />
        <Image
          src={"/img/front-page/brands/2205_brand_perry.webp"}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
          alt="Fred Perry"
        />
      </MyContainer>
    </section>
  );
};
