import { Disclosure } from "@headlessui/react";
import CSS from "csstype";
import Link from "next/link";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useRecoilState } from "recoil";
import { APP_PAGE_ROUTE } from "../../../constants";
import { useGetCategoriesQuery, useMeQuery } from "../../../lib/graphql";
import { mobileMenuState } from "../../../store/mobileMenuState";
import { MyUserIcon } from "../../global/icons/Icons";
interface MobileNavbarProps {}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({}) => {
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
      <div className="w-full px-3">
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
                          <img
                            src="/img/mobile-menu/nav-clothes.webp"
                            alt="Man in shirt looking shady af"
                            className="w-full"
                          />
                          <div className="absolute top-[3.25rem] ml-7 text-base font-semibold">
                            {category.name}
                          </div>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-2 pb-2">
                        <ul className="space-y-5 text-base font-medium">
                          {category.children?.map((child, idx) => {
                            return (
                              <li key={idx} className="text-base">
                                {child.name}
                              </li>
                            );
                          })}
                        </ul>
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
