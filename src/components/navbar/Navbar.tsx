import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import { useMeQuery } from "../../lib/graphql";
import { MyCartIcon, MyUserIcon } from "../icons/Icons";
import { MyContainer } from "../MyContainer";
import { HoverMenu } from "./category-popover/HoverMenu";
import { MyPagesPopover } from "./my-pages-popover/MyPagesPopover";
interface NavbarProps {}

const shoesCategories = [
  "Alla Skor",
  "Sneakers & textilskor",
  "Boots & kängor",
  "Gummistövlar",
  "Flip flops & sandaler",
  "Skovård",
  "Dressade skor",
];
const clothesCategories = [
  " Alla Kläder",
  "Basics",
  "Byxor",
  "Jackor",
  "Jeans",
  "Kavaj & Kostym",
  "Linnen",
  "Overshirts",
  "Plus Size",
  "Pyjamas & loungewear",
  "Shorts",
  "Skjortor",
  "Strumpor & underkläder",
  "T-shirts & pikéer",
  "Träning & funktion",
  "Tröjor",
];

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [currentLinks, setCurrentLinks] = useState(shoesCategories);
  const [isHoverMenuOpen, setIsHoverMenuOpen] = useState(false);
  const { data, loading, error } = useMeQuery();
  return (
    <div className="text-sm ">
      <div
        className="pt-8 pb-4"
        style={{
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 4%)",
        }}
      >
        <MyContainer className="relative">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              {/* open search modal button */}
              <SearchIcon className="w-5 " />
              <div className="opacity-50 hidden lg:block">Search</div>
            </div>
            {/* app name */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href={APP_PAGE_ROUTE.INDEX}>
                <a className="text-[32px] uppercase font-bold">{APP_NAME}</a>
              </Link>
            </div>
            <div className="flex items-center space-x-9">
              {!data ? (
                <Link href={APP_PAGE_ROUTE.LOGIN}>
                  <a className="flex items-center space-x-3">
                    <p className="font-medium">Sign In</p>
                    <MyUserIcon className="w-6" />
                  </a>
                </Link>
              ) : (
                <MyPagesPopover className="hidden lg:block" />
              )}
              <MyCartIcon className="w-6" />
            </div>
          </div>
        </MyContainer>

        <div className="flex justify-center space-x-8 pt-8">
          <button
            className="hover:underline transition duration-300"
            onMouseEnter={() => {
              setCurrentLinks(shoesCategories);
              setIsHoverMenuOpen(true);
            }}
            onMouseLeave={() => {
              setIsHoverMenuOpen(false);
            }}
          >
            Clothes
          </button>
          <button
            onMouseEnter={() => {
              setCurrentLinks(clothesCategories);
              setIsHoverMenuOpen(true);
            }}
            onMouseLeave={() => {
              setIsHoverMenuOpen(false);
            }}
            className="hover:underline transition duration-300"
          >
            Other Links
          </button>
        </div>
        <HoverMenu links={currentLinks} isButtonHovered={isHoverMenuOpen} />

        <div className="flex items-center flex-wrap gap-8 mt-20">
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
          <div className="w-72 h-72 bg-red-500"></div>
        </div>
      </div>
    </div>
  );
};
