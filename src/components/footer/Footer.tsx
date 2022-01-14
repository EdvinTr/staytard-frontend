import { ChevronRightIcon } from "@heroicons/react/solid";
import { useWindowSize } from "@react-hook/window-size";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { useSsrCompatible } from "../../hooks/useSsrCompatible";
import { Accordion } from "../global/Accordion";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "../icons/Icons";
import { footerItems } from "./footer-items.data";
interface FooterProps {}

let renders = 0;

export const Footer: React.FC<FooterProps> = ({}) => {
  renders++;
  console.log(renders);
  const [windowWidth] = useSsrCompatible(useWindowSize(), [0, 0]);
  const imageSize = windowWidth >= 768 ? 30 : 48;

  return (
    <Fragment>
      <div className="bg-staytard-dark text-white">
        {/* customer service link */}
        <section className="text-staytard-dark bg-[#ebebeb] ">
          <div className="md:grid md:grid-cols-3 max-w-3xl mx-auto space-y-8 md:space-y-0 py-12 text-center text-xl md:text-sm ">
            {/* free shipping */}
            <div className="">
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
        <article className="text-center font-bold space-y-6 pb-14 pt-10">
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
          /* accordions */
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
                    <ul className="space-y-5 px-16 pb-6">
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
                    <div key={idx}>
                      <p className="font-bold">{title}</p>
                      <div className="space-y-3 pt-5">
                        {listItems.map((listItem, idx) => {
                          return (
                            <li
                              className="text-sm text-[#bdbec1] hover:underline"
                              key={idx}
                            >
                              {listItem}
                            </li>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {/* social media icons */}
        <div className="flex items-center justify-center space-x-12 pb-12 pt-32 min-h-[10rem]">
          <InstagramIcon />
          <FacebookIcon />
          <TikTokIcon />
          <YouTubeIcon />
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
