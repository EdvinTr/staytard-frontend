import { SearchIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useScrollDirection } from "react-use-scroll-direction";
import { useRecoilState } from "recoil";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import CartContext from "../../contexts/CartContext";
import {
  GetCategoriesQuery,
  useGetCategoriesQuery,
  useMeQuery,
} from "../../lib/graphql";
import { Localized } from "../../Localized";
import { mobileMenuState } from "../../store/mobileMenuState";
import { FadeInContainer } from "../global/FadeInContainer";
import { MyCartIcon, MyUserIcon } from "../global/icons/Icons";
import { MyContainer } from "../global/MyContainer";
import { HoverMenu } from "./hover-menu/HoverMenu";
import { MyPagesPopover } from "./my-pages-popover/MyPagesPopover";

const { deliveryTimeText, freeShippingText, rightOfReturnText } =
  Localized.page.index;
export const Navbar = () => {
  const [hoverMenuTitle, setHoverMenuTitle] = useState("");
  const [isHoverMenuOpen, setIsHoverMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setHoverMenuItems] = useState<
    GetCategoriesQuery["categories"] | null
  >(null);
  const [activeScrollDirection, setActiveScrollDirection] = useState<
    string | null
  >(null);

  const router = useRouter();
  const [_, setIsMobileMenuOpen] = useRecoilState(mobileMenuState);
  const { scrollDirection } = useScrollDirection();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: userData } = useMeQuery();
  const { totalItems: totalCartItems } = useContext(CartContext);
  const currentWindowWidth = useWindowWidth();

  useEffect(() => {
    if (scrollDirection) {
      setActiveScrollDirection(scrollDirection);
    }
  }, [scrollDirection]);
  return (
    <>
      <div
        className={` ${
          activeScrollDirection === "UP" ? "visible opacity-100" : ""
        } ${
          activeScrollDirection === "DOWN" ? "invisible opacity-0" : ""
        } sticky top-0 z-50 bg-white transition-all duration-200 ease-in-out`}
      >
        <div className="text-sm">
          {router.pathname === APP_PAGE_ROUTE.INDEX && (
            <div className="bg-app-dark text-xss hidden py-1 text-center uppercase text-white lg:block">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute left-0 inline-block">
                  {freeShippingText}
                </div>
                <div className="inline-block">{deliveryTimeText}</div>
                <div className="absolute right-[6.5rem] inline-block">
                  {rightOfReturnText}
                </div>
              </div>
            </div>
          )}
          <div
            className="py-8 lg:pb-4"
            style={{
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 4%)",
            }}
          >
            <MyContainer className="relative">
              <div className="flex justify-between">
                <div className="flex items-center">
                  {currentWindowWidth <= 1024 && (
                    <div className="mr-3">
                      <button
                        data-cy="mobile-navbar-open-button"
                        aria-label="Open mobile menu"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex items-center"
                      >
                        <MenuIcon className="h-6 w-6" aria-hidden />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-2"
                    aria-label="Search"
                  >
                    {/* open search modal button */}
                    <SearchIcon className="w-5" />
                    <div className="hidden opacity-[0.55] lg:block">Search</div>
                  </button>
                </div>
                {/* app name */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <Link href={APP_PAGE_ROUTE.INDEX}>
                    <a className="text-2xl font-bold uppercase tracking-wider sm:text-3xl md:text-4xl">
                      {APP_NAME}
                    </a>
                  </Link>
                </div>
                <div className="flex items-center space-x-9">
                  {userData ? (
                    <Fragment>
                      <MyPagesPopover
                        className="hidden lg:block"
                        currentUser={userData.me}
                      />
                    </Fragment>
                  ) : (
                    <div className="hidden lg:block">
                      <Link href={APP_PAGE_ROUTE.LOGIN}>
                        <a className="flex items-center space-x-3">
                          <p className="font-medium">Sign In</p>
                          <MyUserIcon className="w-6" />
                        </a>
                      </Link>
                    </div>
                  )}
                  <Link href={APP_PAGE_ROUTE.CHECKOUT}>
                    <a className="relative" aria-label="Cart">
                      <MyCartIcon className="w-6" />
                      {totalCartItems > 0 && (
                        <span className="bg-app-yellow absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ">
                          {totalCartItems}
                        </span>
                      )}
                    </a>
                  </Link>
                </div>
              </div>
            </MyContainer>
            {currentWindowWidth >= 1024 ? (
              <div>
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
                  <FadeInContainer className="flex justify-center pt-6">
                    {categoriesData?.categories.map((category) => {
                      return (
                        <Link key={category.id} href={category.path}>
                          <a
                            className="text-13 underline-from-center mx-2 font-medium"
                            onClick={() => setIsHoverMenuOpen(false)}
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
                    <Link href={APP_PAGE_ROUTE.BRAND}>
                      <a className="text-13 underline-from-center mx-3 font-medium">
                        Brands A-Z
                      </a>
                    </Link>
                  </FadeInContainer>
                )}
                {categories && (
                  <HoverMenu
                    items={categories}
                    title={hoverMenuTitle}
                    isButtonHovered={isHoverMenuOpen}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
