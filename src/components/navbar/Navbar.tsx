import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useScrollDirection } from "react-use-scroll-direction";
import { APP_NAME, APP_PAGE_ROUTE } from "../../constants";
import CartContext from "../../contexts/CartContext";
import {
  GetCategoriesQuery,
  useGetCategoriesQuery,
  useMeQuery,
} from "../../lib/graphql";
import { Localized } from "../../Localized";
import { FadeInContainer } from "../global/FadeInContainer";
import { MyCartIcon, MyUserIcon } from "../global/icons/Icons";
import { MyContainer } from "../global/MyContainer";
import { HoverMenu } from "./category-popover/HoverMenu";
import { MyPagesPopover } from "./my-pages-popover/MyPagesPopover";
import { SearchModal } from "./SearchModal";

const { deliveryTimeText, freeShippingText, rightOfReturnText } =
  Localized.page.index;
export const Navbar = () => {
  const [hoverMenuItems, setHoverMenuItems] = useState<
    GetCategoriesQuery["categories"] | null
  >(null);
  const { scrollDirection } = useScrollDirection();

  const [activeScrollDirection, setActiveScrollDirection] = useState<
    string | null
  >(null);
  useEffect(() => {
    if (scrollDirection) {
      setActiveScrollDirection(scrollDirection);
    }
  }, [scrollDirection]);

  const [hoverMenuTitle, setHoverMenuTitle] = useState("");
  const [isHoverMenuOpen, setIsHoverMenuOpen] = useState(false);
  const router = useRouter();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: userData } = useMeQuery();

  const { totalItems: totalCartItems } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`${activeScrollDirection === "UP" ? "opacity-100" : ""} ${
        activeScrollDirection === "DOWN" ? "opacity-0" : ""
      } sticky top-0 z-50 bg-white transition-all duration-200 ease-in-out`}
    >
      <div className="text-sm">
        {router.pathname === APP_PAGE_ROUTE.INDEX && (
          <div className="bg-staytard-dark flex items-center justify-center  space-x-8 py-1 text-[10px] uppercase tracking-wider text-white">
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
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2"
              >
                {/* open search modal button */}
                <SearchIcon className="w-5 " />
                <div className="hidden opacity-[0.55] lg:block">Search</div>
              </button>

              {/* app name */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <Link href={APP_PAGE_ROUTE.INDEX}>
                  <a className="text-4xl font-bold uppercase">{APP_NAME}</a>
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
                  <Link href={APP_PAGE_ROUTE.LOGIN}>
                    <a className="flex items-center space-x-3">
                      <p className="font-medium">Sign In</p>
                      <MyUserIcon className="w-6" />
                    </a>
                  </Link>
                )}
                <Link href={APP_PAGE_ROUTE.CHECKOUT}>
                  <a className="relative" aria-label="Cart">
                    <MyCartIcon className="w-6" />
                    {totalCartItems > 0 && (
                      <span className="bg-staytard-yellow absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ">
                        {totalCartItems}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            </div>
          </MyContainer>
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
              <FadeInContainer className="flex justify-center  pt-8">
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
                    Brands AZ
                  </a>
                </Link>
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
        <SearchModal onClose={() => setShowModal(false)} show={showModal} />
      </div>
    </div>
  );
};
