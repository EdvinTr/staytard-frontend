import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Accordion } from "../global/Accordion";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "../icons/Icons";
import { footerItems } from "./footer-items.data";
interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const { width: windowWidth } = useWindowSize();
  return (
    <Fragment>
      <div className="bg-staytard-dark text-white">
        {/* customer service link */}
        <article className="text-center font-bold space-y-6 py-16">
          <p>Need help?</p>
          <Link href="#">
            <a className="bg-white font-semibold text-staytard-dark inline-block text-13 px-12 py-4">
              <div className="flex items-center">
                <span>Customer service</span>
                <ChevronRightIcon className="w-5" />
              </div>
            </a>
          </Link>
        </article>
        {windowWidth && windowWidth <= 1024 && (
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
        )}
        {/* social media icons */}
        <div className="flex items-center justify-center space-x-12 pb-12 pt-32 min-h-[10rem]">
          <InstagramIcon />
          <FacebookIcon />
          <TikTokIcon />
          <YouTubeIcon />
        </div>
      </div>
    </Fragment>
  );
};
