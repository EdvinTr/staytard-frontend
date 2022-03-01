import { Disclosure } from "@headlessui/react";
import CSS from "csstype";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useRecoilState } from "recoil";
import { APP_PAGE_ROUTE } from "../../../constants";
import { useGetCategoriesQuery, useMeQuery } from "../../../lib/graphql";
import { mobileMenuState } from "../../../store/mobileMenuState";
import { MyUserIcon } from "../../global/icons/Icons";

enum MAIN_CATEGORY {
  CLOTHES = "Clothes",
  ACCESSORIES = "Accessories",
  SHOES = "Shoes",
  LIFESTYLE = "Lifestyle",
}
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};
const variantItem = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto" },
};
export const MobileNavbar = () => {
  const [menuState, setMenuState] = useRecoilState(mobileMenuState);
  const { data: userData } = useMeQuery();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  return (
    <Menu
      styles={{ ...styles }}
      isOpen={menuState}
      onOpen={() => setMenuState(true)}
      onClose={() => setMenuState(false)}
      width={400}
    >
      <div className=" w-full px-3">
        <div className="inline-block">
          <Link href={APP_PAGE_ROUTE.LOGIN}>
            <a className=" flex items-center space-x-2 font-semibold">
              <MyUserIcon className="h-[1.65rem] w-[1.65rem]" aria-hidden />
              <span className="border-staytard-dark border-b ">Sign in</span>
            </a>
          </Link>
        </div>
        <div className="w-full pt-4">
          <div className="mx-auto w-full space-y-5 rounded-2xl bg-white p-2">
            {categoriesData?.categories.map((category, idx) => {
              return (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg text-left text-sm font-medium  focus-visible:outline-2 ">
                        <div className="relative">
                          {category.name === MAIN_CATEGORY.CLOTHES && (
                            <img
                              src="/img/mobile-menu/nav-clothes.webp"
                              alt={category.name}
                              className="w-full"
                            />
                          )}
                          {category.name === MAIN_CATEGORY.SHOES && (
                            <img
                              src="/img/mobile-menu/nav-shoes.webp"
                              alt={category.name}
                              className="w-full"
                            />
                          )}
                          {category.name === MAIN_CATEGORY.ACCESSORIES && (
                            <img
                              src="/img/mobile-menu/nav-accessories.webp"
                              alt={category.name}
                              className="w-full"
                            />
                          )}
                          {category.name === MAIN_CATEGORY.LIFESTYLE && (
                            <img
                              src="/img/mobile-menu/nav-lifestyle.webp"
                              alt={category.name}
                              className="w-full"
                            />
                          )}
                          <div className="absolute top-[3.25rem] ml-7 text-base font-semibold">
                            {category.name}
                          </div>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-2 pb-2">
                        <motion.ul
                          className="h-auto space-y-5 text-base font-medium"
                          key="menu-content"
                          variants={containerVariant}
                          initial="hidden"
                          animate="show"
                        >
                          {category.children?.map((child, idx) => {
                            return (
                              <motion.li
                                onClick={() => setMenuState(false)}
                                variants={variantItem}
                                key={idx}
                                className="text-base"
                              >
                                <Link href={child.path}>
                                  <a>{child.name}</a>
                                </Link>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </div>
      </div>
    </Menu>
  );
};

const styles: { [key: string]: CSS.Properties } = {
  bmBurgerButton: {
    display: "none", // using a custom button to open it
  },
  bmBurgerBars: {
    background: "#000",
    height: "2px",
    borderRadius: "4px",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#222222",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#ffff",
    fontSize: "1.15em",
    paddingTop: "2rem",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#222222",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
