import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import {
  GetCategoriesQuery,
  useGetCategoriesQuery,
  useMeQuery,
} from "../../lib/graphql";
import { Localized } from "../../Localized";
import { FadeInContainer } from "../global/FadeInContainer";
import { MyCartIcon, MyUserIcon } from "../icons/Icons";
import { MyContainer } from "../MyContainer";
import { HoverMenu } from "./category-popover/HoverMenu";
import { MyPagesPopover } from "./my-pages-popover/MyPagesPopover";
interface NavbarProps {}

const { deliveryTimeText, freeShippingText, rightOfReturnText } =
  Localized.page.index;
export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [hoverMenuItems, setHoverMenuItems] = useState<
    GetCategoriesQuery["categories"] | null
  >(null);
  const [hoverMenuTitle, setHoverMenuTitle] = useState("");
  const [isHoverMenuOpen, setIsHoverMenuOpen] = useState(false);
  const router = useRouter();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: userData, loading, error } = useMeQuery();

  return (
    <div className="text-sm ">
      {router.pathname === APP_PAGE_ROUTE.INDEX && (
        <div className="bg-staytard-dark text-[10px] py-1 tracking-wider  uppercase flex justify-center items-center space-x-8 text-white">
          <div>{freeShippingText}</div>
          <div>{deliveryTimeText}</div>
          <div>{rightOfReturnText}</div>
        </div>
      )}
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
                <a className="text-4xl uppercase font-bold">{APP_NAME}</a>
              </Link>
            </div>
            <div className="flex items-center space-x-9">
              {!userData ? (
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
        {categoriesLoading && (
          <div className="flex justify-center space-x-7 pt-8">
            <Skeleton inline width={60} />
            <Skeleton inline width={60} />
            <Skeleton inline width={60} />
            <Skeleton inline width={60} />
          </div>
        )}
        {/* hover menu stuff */}
        {categoriesData && (
          <FadeInContainer className="flex justify-center space-x-7 pt-8">
            {categoriesData?.categories.map((category) => {
              return (
                <Link key={category.id} href={category.path}>
                  <a
                    className="underline"
                    onClick={() => setIsHoverMenuOpen(false)} // TODO: refactor with useCallback on all user interactions that mutate state
                    onMouseEnter={() => {
                      if (category.children) {
                        setHoverMenuItems(category.children);
                      }
                      setHoverMenuTitle(category.name);
                      setIsHoverMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      setIsHoverMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </a>
                </Link>
              );
            })}
          </FadeInContainer>
        )}
        {hoverMenuItems && (
          <HoverMenu
            items={hoverMenuItems}
            title={hoverMenuTitle}
            isButtonHovered={isHoverMenuOpen}
          />
        )}
      </div>
    </div>
  );
};
