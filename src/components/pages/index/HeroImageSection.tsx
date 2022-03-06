import { ChevronRightIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import Image from "next/image";
import React from "react";
import { useSsrCompatible } from "../../../hooks/useSsrCompatible";

const paragraphText =
  "A design concept of timeless garments in high quality that you can easily create a complete wardrobe with this spring";
export const HeroImageSection = () => {
  const windowWidth = useSsrCompatible(useWindowWidth(), 0);
  return (
    <div className="relative">
      {windowWidth >= 768 ? (
        <div className="relative">
          <Image
            width={1600}
            height={400}
            alt="Icon brand"
            quality={100}
            objectFit="contain"
            layout="responsive"
            priority
            src="/img/front-page/2208_icon_fullwide_ny_1.jpg"
          />
          <div className="absolute top-1/3 w-full font-light tracking-widest text-white">
            <div className="flex items-center justify-center text-5xl uppercase">
              <div className="mr-5">Introducing</div>
              <div className="flex font-semibold">
                <div>Icon</div>
                <sup className="text-sm">TM</sup>
              </div>
            </div>
            <p className="mx-auto max-w-xl pt-4 text-center text-sm tracking-normal">
              {paragraphText}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Image
            width={580}
            height={580}
            alt="Icon brand"
            objectFit="contain"
            quality={100}
            layout="responsive"
            src="/img/front-page/2208_icon_fullwith_mobil_1.jpg"
            className="max-h-[2rem]"
          />
          <div className="absolute top-1/3 w-full font-light tracking-widest text-white">
            <div className="flex justify-center text-2xl uppercase">
              Introducing
            </div>
            <div className="relative flex justify-center ">
              <span className="text-7xl font-bold uppercase tracking-widest sm:text-8xl">
                Icon
              </span>
              {/*   <sub className="absolute top-0 right-10 text-base font-semibold sm:right-40 ">
                TM
              </sub> */}
              <sub className="text-xs font-semibold">TM</sub>
            </div>
            <p className="mx-auto max-w-xs pt-0 text-center text-xs leading-5 tracking-normal">
              {paragraphText}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="absolute bottom-0 mb-5 border-b-2 border-white text-center text-lg font-semibold text-white">
          <div className="flex items-center">
            Discover
            <span className="ml-2">
              Icon <sup className="text-xss">TM</sup>
            </span>
            <ChevronRightIcon className="ml-1 h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  );
};
