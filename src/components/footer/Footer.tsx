import { ChevronRightIcon } from "@heroicons/react/solid";
import { useWindowSize } from "@react-hook/window-size";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { Accordion } from "../global/Accordion";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "../global/icons/Icons";
import { footerItems } from "./footer-items.data";
interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const [windowWidth] = useSsrCompatible(useWindowSize(), [0, 0]);
  const imageSize = windowWidth >= 768 ? 30 : 48;

  return (
    <Fragment>
      <div className="bg-staytard-dark text-white">
        {/* newsletter section */}
        <section className="bg-staytard-yellow leading-8">
          <div className="py-16 md:py-[4.5rem] xl:py-20 px-8 xl:px-0 text-center md:max-w-xl xl:max-w-[84rem] md:mx-auto xl:flex xl:items-center xl:space-x-36">
            <h3 className="block text-[26px] text-staytard-dark font-medium">
              Do not miss the latest, subscribe to our newsletter
            </h3>
            <div className="pt-10 xl:pt-0">
              <Link href={APP_PAGE_ROUTE.REGISTER}>
                <a className="text-sm font-medium text-white bg-staytard-dark py-4 px-5">
                  Register here
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* customer service section*/}
        <section className="text-staytard-dark bg-[#ebebeb] ">
          <div className="md:grid md:grid-cols-3 max-w-3xl mx-auto space-y-8 md:space-y-0 py-12 xl:py-7 text-center text-xl md:text-sm ">
            <div className="">
              {/* free shipping */}
              <Image
                width={imageSize}
                height={imageSize}
                objectFit="contain"
                src="https://img.icons8.com/material-outlined/48/000000/truck.png"
                alt="Free shipping"
              />
              <div className="underline font-semibold">Free shipping*</div>
              <span className="text-lg md:text-xs">Orders over SEK 499</span>
            </div>
            <div>
              {/* easy return */}
              <Image
                width={imageSize}
                height={imageSize}
                objectFit="contain"
                src="https://img.icons8.com/glyph-neue/64/000000/forward-30.png"
                alt="30 days return policy"
              />
              <div className="underline font-semibold">Easy return*</div>
              <span className="text-lg md:text-xs">30 days return policy</span>
            </div>
            <div>
              {/* pay later */}
              <Image
                width={imageSize}
                height={imageSize}
                objectFit="contain"
                src="https://img.icons8.com/ios-filled/50/000000/coconut-cocktail.png"
                alt="Pay later"
              />
              <div className="underline font-semibold">Pay later</div>
              <span className="text-lg md:text-xs">
                Select invoice at checkout
              </span>
            </div>
          </div>
        </section>
        {/* customer service */}
        <div className="xl:flex xl:justify-center xl:pt-12 xl:space-x-12 xl:px-12">
          <article className="text-center xl:text-left font-bold space-y-6 pb-14 pt-10 xl:pt-0">
            <p>Need help?</p>
            <Link href="#">
              <a className="bg-white font-semibold text-staytard-dark inline-block text-13 px-8 py-4">
                <div className="flex items-center">
                  <span>Customer service</span>
                  <ChevronRightIcon className="w-5" />
                </div>
              </a>
            </Link>
          </article>
          {windowWidth <= 1024 ? (
            /* accordions on device < lg */
            <div>
              {footerItems.map(({ listItems, title }, idx, arr) => {
                const isLastItem = idx === arr.length - 1;
                return (
                  <Accordion
                    title={title}
                    key={idx}
                    className={`${isLastItem && "border-b border-opacity-10"}`}
                  >
                    <Accordion.Body>
                      <ul className="space-y-5 px-14 pb-6">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion>
                );
              })}
            </div>
          ) : (
            /* large device grid */
            <div className="flex justify-center">
              <div>
                <ul className="grid grid-cols-4 px-12 gap-x-32">
                  {footerItems.map(({ title, listItems }, idx) => {
                    return (
                      <li key={idx}>
                        <p className="font-bold">{title}</p>
                        <div className="space-y-3 pt-5">
                          {listItems.map((listItem, idx) => {
                            return (
                              <div
                                className="text-sm text-[#bdbec1] hover:underline"
                                key={idx}
                              >
                                {listItem}
                              </div>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-white border-opacity-10 mt-20 px-12">
          <div className=" lg:flex lg:items-center lg:justify-between max-w-[84rem] mx-auto pb-6 pt-32 xl:pt-2 min-h-[10rem]">
            <Link href={APP_PAGE_ROUTE.INDEX}>
              <a className="text-4xl uppercase font-bold hidden lg:block">
                {APP_NAME}
              </a>
            </Link>
            {/* social media icons */}
            <div className="flex items-center justify-center space-x-12">
              <InstagramIcon />
              <FacebookIcon />
              <TikTokIcon />
              <YouTubeIcon />
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            className="text-blue-600 text-xs hover:text-blue-700"
            href="https://icons8.com/license"
            rel="noopener noreferrer"
            target="_blank"
          >
            icons8
          </a>
        </div>
      </div>
    </Fragment>
  );
};
