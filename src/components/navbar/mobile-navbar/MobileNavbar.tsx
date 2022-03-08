import { Disclosure } from "@headlessui/react";
import { LockOpenIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useWindowWidth } from "@react-hook/window-size";
import CSS from "csstype";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useRecoilState } from "recoil";
import { APP_PAGE_ROUTE, COOKIE_NAME } from "../../../constants";
import { useSsrCompatible } from "../../../hooks/useSsrCompatible";
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
  const closeMenu = () => () => setIsMenuOpen(false);

  const currentWindowWidth = useSsrCompatible(useWindowWidth(), 0);
  const { data: userData } = useMeQuery();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const [logoutUser, { loading: isLogoutUserLoading, client }] =
    useLogoutMutation();
  const router = useRouter();
  return (
    <Menu
      styles={{ ...menuStyles }}
      isOpen={isMenuOpen}
      onOpen={() => setIsMenuOpen(true)}
      onClose={closeMenu()}
      width={currentWindowWidth >= 330 ? 360 : 320}
      className="focus:outline-none"
    >
      <div>
        <ContentContainer>
          <div className="relative flex w-full">
            {userData?.me ? (
              /* logged in */
              <Accordion
                data-cy="mobile-menu-accordion"
                title="My pages"
                buttonClassName="space-x-2 py-4 my-4"
                childrenAnimationDuration={0}
                inlineBlock
                className="w-full"
              >
                <Accordion.Body>
                  <div className="border-app-dark w-full space-y-6 border-t border-opacity-30 py-8">
                    {userMenuItems.map((item, idx) => {
                      return (
                        <Link href={item.href} key={idx}>
                          <a
                            className="text-app-dark flex items-center justify-between text-base"
                            onClick={closeMenu()}
                          >
                            {item.name}
                            <item.icon aria-hidden="true" className="w-8" />
                          </a>
                        </Link>
                      );
                    })}
                    {userData.me && userData.me.isAdmin && (
                      <Link href={APP_PAGE_ROUTE.ADMIN}>
                        <a
                          className="text-app-dark flex items-center justify-between text-base"
                          onClick={closeMenu()}
                        >
                          Admin panel
                          <LockOpenIcon
                            aria-hidden="true"
                            className="h-8 w-8 font-light text-black"
                          />
                        </a>
                      </Link>
                    )}
                    <button
                      disabled={isLogoutUserLoading}
                      className="text-app-dark flex w-full items-center justify-between text-base"
                      onClick={async () => {
                        try {
                          const response = await logoutUser();
                          if (response.data) {
                            localStorage.removeItem(COOKIE_NAME.ACCESS_TOKEN);
                            await client.resetStore();
                            router.reload();
                          }
                        } catch {
                          // TODO: handle logout error
                        }
                      }}
                    >
                      Log out
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
              /* not logged in */
              <Link href={APP_PAGE_ROUTE.LOGIN}>
                <a
                  className="my-8 flex items-center space-x-2 font-semibold"
                  onClick={closeMenu()}
                >
                  <MyUserIcon className="h-[1.65rem] w-[1.65rem]" aria-hidden />
                  <span className="border-app-dark border-b ">Sign in</span>
                </a>
              </Link>
            )}
            {/* close menu button */}
            <button
              aria-label="Close menu"
              data-cy="mobile-menu-close-button"
              className="absolute -right-3 mt-4  flex h-14 w-14 items-center justify-center rounded-full"
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
                          data-cy="mobile-menu-disclosure-button"
                          aria-label={category.name}
                          className="relative flex w-full justify-between rounded-lg text-left text-sm font-medium focus-visible:outline-2 "
                        >
                          <div>
                            {category.name === MAIN_CATEGORY.CLOTHES && (
                              <Image
                                src="/img/mobile-menu/nav-clothes.webp"
                                alt={category.name}
                                objectFit="contain"
                                width={580}
                                height={194}
                              />
                            )}
                            {category.name === MAIN_CATEGORY.SHOES && (
                              <Image
                                src="/img/mobile-menu/nav-shoes.webp"
                                alt={category.name}
                                objectFit="contain"
                                width={580}
                                height={194}
                              />
                            )}
                            {category.name === MAIN_CATEGORY.ACCESSORIES && (
                              <Image
                                src="/img/mobile-menu/nav-accessories.webp"
                                alt={category.name}
                                objectFit="contain"
                                width={580}
                                height={194}
                              />
                            )}
                            {category.name === MAIN_CATEGORY.LIFESTYLE && (
                              <Image
                                src="/img/mobile-menu/nav-lifestyle.webp"
                                alt={category.name}
                                objectFit="contain"
                                width={580}
                                height={194}
                              />
                            )}
                            <ImageText
                              text={category.name}
                              windowWidth={currentWindowWidth}
                            />
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
                            <motion.li
                              onClick={closeMenu()}
                              variants={variantItem}
                              key={idx}
                              className="text-base"
                            >
                              <Link href={category.path}>
                                <a data-cy="mobile-menu-disclosure-link">
                                  All {category.name}
                                </a>
                              </Link>
                            </motion.li>
                            {category.children?.map((child, idx) => {
                              return (
                                <motion.li
                                  onClick={closeMenu()}
                                  variants={variantItem}
                                  key={idx}
                                  className="text-base"
                                >
                                  <Link href={child.path}>
                                    <a data-cy="mobile-menu-disclosure-link">
                                      {child.name}
                                    </a>
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
                    <Image
                      src="/img/mobile-menu/nav-brands.webp"
                      alt="Brands"
                      objectFit="contain"
                      width={580}
                      height={194}
                    />
                    <ImageText
                      text="Brands A-Z"
                      windowWidth={currentWindowWidth}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </ContentContainer>
        <div className="bg-app-dark mt-8 w-full px-5 py-8 text-white">
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
const ImageText = ({
  text,
  windowWidth,
}: {
  text: string;
  windowWidth: number;
}) => {
  return (
    <div
      className={`absolute ${
        windowWidth >= 330 ? "top-[2.5rem]" : "top-[2.2rem]"
      } m-auto ml-7 text-base font-semibold`}
    >
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
