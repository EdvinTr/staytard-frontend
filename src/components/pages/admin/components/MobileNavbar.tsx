import { HomeIcon } from "@heroicons/react/solid";
import CSS from "csstype";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { APP_PAGE_ROUTE } from "../../../../constants";
import { navItems } from "./DefaultNavbar";

const styles: { [key: string]: CSS.Properties } = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "20px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "#fff",
    height: "4px",
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
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#222222",
    fontSize: "1.15em",
    paddingTop: "2rem",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
interface MobileNavbarProps {}

const anchorElementClassNames =
  "hover:text-staytard-yellow text-stone-600 transition-all duration-150 ease-in-out";
export const MobileNavbar = ({}: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentQuery = router.query.show;
  return (
    <Fragment>
      <Menu
        styles={{ ...styles }}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <div className="w-full border-b border-stone-700">
          <div className="border-staytard-yellow border-l-2 border-opacity-0 transition-all duration-150 ease-in-out hover:border-opacity-100 hover:bg-black">
            <Link
              shallow
              href={{
                pathname: APP_PAGE_ROUTE.INDEX,
              }}
            >
              <a className={anchorElementClassNames}>
                <div className="ml-4 flex items-center justify-start py-4">
                  <HomeIcon className="w-6" />
                  <NavLinkText>Home</NavLinkText>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <ul className="flex w-full flex-col justify-start">
          {navItems.map((item, idx) => {
            return (
              <li
                onClick={() => setIsOpen(false)}
                key={idx}
                className={`${
                  currentQuery === item.query.show
                    ? "border-staytard-yellow border-l-2 border-opacity-100 bg-black"
                    : "border-staytard-yellow border-l-2 border-opacity-0 transition-all duration-150 ease-in-out hover:border-opacity-100 hover:bg-black"
                }`}
              >
                <Link
                  shallow
                  href={{
                    pathname: APP_PAGE_ROUTE.ADMIN,
                    query: { ...item.query },
                  }}
                >
                  <a className={anchorElementClassNames}>
                    <div className="ml-4 flex items-center justify-start py-4">
                      <item.icon
                        className={`w-6 ${
                          currentQuery === item.query.show
                            ? "text-staytard-yellow"
                            : ""
                        }`}
                      />
                      <NavLinkText>{item.query.show}</NavLinkText>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Menu>
      <HeaderTitle router={router} />
    </Fragment>
  );
};

const HeaderTitle = ({ router }: { router: NextRouter }) => {
  return (
    <div className="flex h-full items-center justify-center">
      {navItems
        .filter((i) => i.query.show === router.query.show)
        .map((item, idx) => {
          return (
            <Fragment key={idx}>
              <item.icon className="text-staytard-yellow w-6 transition-all duration-150" />
              <div className="ml-2 text-xl font-semibold uppercase text-stone-200">
                {item.query.show}
              </div>
            </Fragment>
          );
        })}
    </div>
  );
};

const NavLinkText: React.FC = ({ children }) => {
  return (
    <div className="ml-3 text-center text-sm font-semibold uppercase text-stone-200">
      {children}
    </div>
  );
};
