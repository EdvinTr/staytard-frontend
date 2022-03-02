import { Disclosure } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import CSS from "csstype";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useRecoilState } from "recoil";
import { APP_PAGE_ROUTE } from "../../../constants";
import {
  useGetCategoriesQuery,
  useLogoutMutation,
  useMeQuery,
} from "../../../lib/graphql";
import { mobileMenuState } from "../../../store/mobileMenuState";
import { Accordion } from "../../global/Accordion";
import {
  FacebookIcon,
  InstagramIcon,
  LogoutIcon,
  MyUserIcon,
  TikTokIcon,
  YouTubeIcon,
} from "../../global/icons/Icons";
import { LoadingSpinner } from "../../global/LoadingSpinner";
import { userMenuItems } from "../userMenuItems";

enum MAIN_CATEGORY {
  CLOTHES = "Clothes",
  ACCESSORIES = "Accessories",
  SHOES = "Shoes",
  LIFESTYLE = "Lifestyle",
}
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};
const variantItem = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};
export const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(mobileMenuState);

  const { data: userData } = useMeQuery();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const [logoutUser, { loading: isLogoutUserLoading, client }] =
    useLogoutMutation();

  const closeMenu = () => () => setIsMenuOpen(false);
  return (
    <Menu
      styles={{ ...menuStyles }}
      isOpen={isMenuOpen}
      onOpen={() => setIsMenuOpen(true)}
      onClose={closeMenu()}
      width={360}
    >
      <div>
        <ContentContainer>
          <div className="flex w-full items-start justify-between">
            {userData?.me ? (
              <Accordion
                title="My pages"
                buttonClassName="space-x-2 pb-8"
                childrenAnimationDuration={0}
                inlineBlock
                className="w-full"
              >
                <Accordion.Body>
                  <div className="border-staytard-dark space-y-6 border-t border-opacity-30 py-8">
                    {userMenuItems.map((item, idx) => {
                      return (
                        <Link href={item.href} key={idx}>
                          <a
                            className="flex items-center justify-between"
                            onClick={closeMenu()}
                          >
                            <span className="text-staytard-dark text-base">
                              {item.name}
                            </span>
                            <item.icon aria-hidden="true" className="w-8" />
                          </a>
                        </Link>
                      );
                    })}
                    <button
                      disabled={isLogoutUserLoading}
                      className="flex w-full items-center justify-between"
                      onClick={async () => {
                        try {
                          await client.resetStore();
                          const response = await logoutUser();
                          if (response.data) {
                            setIsMenuOpen(false);
                            window.location.reload();
                          }
                        } catch {
                          // TODO: handle logout error
                        }
                      }}
                    >
                      <span className="text-staytard-dark text-base">
                        Log out
                      </span>
                      <div>
                        {isLogoutUserLoading ? (
                          <LoadingSpinner size={30} />
                        ) : (
                          <LogoutIcon className="w-8" />
                        )}
                      </div>
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion>
            ) : (
              <Link href={APP_PAGE_ROUTE.LOGIN}>
                <a
                  className=" mb-8 flex items-center space-x-2 font-semibold"
                  onClick={closeMenu()}
                >
                  <MyUserIcon className="h-[1.65rem] w-[1.65rem]" aria-hidden />
                  <span className="border-staytard-dark border-b ">
                    Sign in
                  </span>
                </a>
              </Link>
            )}
            <button
              aria-label="Close menu"
              className="-m-4 p-4"
              onClick={closeMenu()}
            >
              <XIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="min-h-[75vh] w-full pt-0">
            <div className="mx-auto h-full w-full space-y-5 rounded-2xl bg-white ">
              {categoriesData?.categories.map((category, idx) => {
                return (
                  <Disclosure key={idx}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          aria-label={category.name}
                          className="relative flex w-full justify-between rounded-lg text-left text-sm font-medium focus-visible:outline-2 "
                        >
                          <div>
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
                            <ImageText text={category.name} />
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-2 pb-2">
                          <motion.ul
                            className="h-auto space-y-5 text-base font-medium"
                            key="menu-content"
                            variants={containerVariant}
                            initial="hidden"
                            animate="visible"
                          >
                            {category.children?.map((child, idx) => {
                              return (
                                <motion.li
                                  onClick={closeMenu()}
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
              <div className="relative">
                <Link href={APP_PAGE_ROUTE.BRAND}>
                  <a onClick={closeMenu()}>
                    <img
                      src="/img/mobile-menu/nav-brands.webp"
                      alt="Brands"
                      className="w-full"
                    />
                    <ImageText text="Brands A-Z" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </ContentContainer>
        <div className="bg-staytard-dark mt-8 w-full px-5 py-8 text-white">
          <div className="space-y-8">
            <Link href={APP_PAGE_ROUTE.MY_PROFILE}>
              <a className="block font-semibold" onClick={closeMenu()}>
                My pages
              </a>
            </Link>
            <Link href={APP_PAGE_ROUTE.INDEX}>
              <a className="block font-semibold" onClick={closeMenu()}>
                Customer service
              </a>
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center space-x-12 opacity-30">
            <InstagramIcon />
            <FacebookIcon />
            <TikTokIcon />
            <YouTubeIcon />
          </div>
        </div>
      </div>
    </Menu>
  );
};
const ImageText = ({ text }: { text: string }) => {
  return (
    <div className="absolute top-[2.6rem] m-auto ml-7 text-base font-semibold">
      {text}
    </div>
  );
};

const ContentContainer: React.FC = ({ children }) => {
  return <div className="w-full px-5 ">{children}</div>;
};

const menuStyles: { [key: string]: CSS.Properties } = {
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
    /*     height: "24px",
    width: "24px",
    marginRight: "29px",
    marginTop: "25px", */
    display: "none", // using custom one to close the menu
  },
  bmCross: {
    // background: "#222222",
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
